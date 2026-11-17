import assert from "node:assert/strict";
import {
  mkdtemp,
  cp,
  mkdir,
  readFile,
  writeFile,
  symlink,
  rm,
  readdir,
  realpath,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { build, createServer } from "vite";

const root = fileURLToPath(new URL("../", import.meta.url));

/** Creates isolated inputs without copying local credentials or original media. */
async function workspace(t) {
  // macOS exposes its temp directory through a symlink; Vite resolves real paths.
  const directory = await realpath(
    await mkdtemp(path.join(os.tmpdir(), "portfolio-tooling-")),
  );
  t.after(() =>
    rm(directory, {
      recursive: true,
      force: true,
      maxRetries: 10,
      retryDelay: 100,
    }),
  );
  await symlink(
    path.join(root, "node_modules"),
    path.join(directory, "node_modules"),
    "dir",
  );
  return directory;
}

/** Runs a maintenance command with HTTP and fetch calls blocked. */
function runScript(directory, script, args = []) {
  const guard = pathToFileURL(path.join(directory, "deny-network.mjs")).href;
  const result = spawnSync(
    process.execPath,
    ["--import", guard, path.join(directory, "scripts", script), ...args],
    {
      cwd: directory,
      encoding: "utf8",
      env: {
        ...process.env,
        NEXT_PUBLIC_SUPABASE_URL: "",
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "",
        SUPABASE_SECRET_KEY: "",
      },
      timeout: 30000,
    },
  );
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout;
}

test("only approved public configuration reaches development modules and production bundles", async (t) => {
  const directory = await workspace(t);
  await cp(
    path.join(root, "vite.config.ts"),
    path.join(directory, "vite.config.ts"),
  );
  const publicUrl = "https://fixture.example.invalid";
  const publicKey = "sb_publishable_fixture";
  const secrets = [
    "DUMMY_SERVER_SECRET_12345",
    "DUMMY_NEXT_PUBLIC_SECRET_12345",
    "DUMMY_VITE_SECRET_12345",
  ];
  await writeFile(
    path.join(directory, ".env.local"),
    [
      `NEXT_PUBLIC_SUPABASE_URL=${publicUrl}`,
      `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=${publicKey}`,
      `SUPABASE_SECRET_KEY=${secrets[0]}`,
      `NEXT_PUBLIC_SUPABASE_SECRET_KEY=${secrets[1]}`,
      `VITE_UNEXPECTED_SECRET=${secrets[2]}`,
    ].join("\n"),
  );
  await writeFile(
    path.join(directory, "probe.ts"),
    `document.body.textContent = JSON.stringify({ all: import.meta.env, url: import.meta.env.NEXT_PUBLIC_SUPABASE_URL, key: import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY });`,
  );
  await writeFile(
    path.join(directory, "index.html"),
    '<html><body><script type="module" src="/probe.ts"></script></body></html>',
  );
  const options = {
    root: directory,
    configFile: path.join(directory, "vite.config.ts"),
    logLevel: "silent",
    optimizeDeps: { noDiscovery: true, include: [] },
  };
  const server = await createServer({
    ...options,
    server: { middlewareMode: true, hmr: false, ws: false, watch: null },
  });
  try {
    const transformed = await server.transformRequest("/probe.ts");
    assert.ok(transformed.code.includes(publicUrl));
    assert.ok(transformed.code.includes(publicKey));
    for (const value of secrets)
      assert.ok(
        !transformed.code.includes(value),
        "Development module leaked a sentinel secret",
      );
  } finally {
    await server.close();
  }
  await build(options);
  const assets = path.join(directory, "dist/assets/js");
  const bundles = (
    await Promise.all(
      (await readdir(assets)).map((name) =>
        readFile(path.join(assets, name), "utf8"),
      ),
    )
  ).join("\n");
  assert.ok(bundles.includes(publicUrl));
  assert.ok(bundles.includes(publicKey));
  for (const value of secrets)
    assert.ok(
      !bundles.includes(value),
      "Production bundle leaked a sentinel secret",
    );
});

test("CMS generation is reproducible and uploader dry-runs cannot send network requests", async (t) => {
  const directory = await workspace(t);
  await mkdir(path.join(directory, "scripts"));
  await mkdir(path.join(directory, "supabase"));
  await cp(path.join(root, "src/data"), path.join(directory, "src/data"), {
    recursive: true,
  });
  await cp(
    path.join(root, "supabase/storage.sql"),
    path.join(directory, "supabase/storage.sql"),
  );
  for (const name of [
    "generate-supabase-import.mjs",
    "upload-supabase-images.mjs",
    "upload-supabase-data.mjs",
  ]) {
    await cp(
      path.join(root, "scripts", name),
      path.join(directory, "scripts", name),
    );
  }
  await writeFile(
    path.join(directory, "deny-network.mjs"),
    `import http from 'node:http'; import https from 'node:https'; import { syncBuiltinESMExports } from 'node:module'; const deny = () => { throw new Error('Network request attempted during offline test'); }; globalThis.fetch = deny; http.request = http.get = https.request = https.get = deny; syncBuiltinESMExports();`,
  );
  runScript(directory, "generate-supabase-import.mjs");
  const outputs = [
    "schema.sql",
    "storage-references.sql",
    "import-content.sql",
    "update-alt-text.sql",
    "image-manifest.json",
  ];
  const first = await Promise.all(
    outputs.map((name) =>
      readFile(path.join(directory, "supabase", name), "utf8"),
    ),
  );
  runScript(directory, "generate-supabase-import.mjs");
  assert.deepEqual(
    await Promise.all(
      outputs.map((name) =>
        readFile(path.join(directory, "supabase", name), "utf8"),
      ),
    ),
    first,
  );
  assert.match(
    runScript(directory, "upload-supabase-data.mjs", ["--dry-run"]),
    /No network requests sent/,
  );
  // Validate actual upload bodies against the schema without contacting a CMS.
  const columns = Object.fromEntries(
    [
      ...first[0].matchAll(
        /create table if not exists public\.(\w+) \(\n([\s\S]*?)\n\);/g,
      ),
    ].map(([, table, definition]) => [
      table,
      definition
        .split("\n")
        .filter((line) => !line.trim().startsWith("primary key"))
        .map((line) => line.trim().split(/\s+/)[0]),
    ]),
  );
  await writeFile(
    path.join(directory, "mock-cms.mjs"),
    `import assert from 'node:assert/strict';
const columns = ${JSON.stringify(columns)};
globalThis.fetch = async (url, options) => {
  const table = new URL(url).pathname.split('/').at(-1);
  assert.ok(columns[table], 'Unknown upload table: ' + table);
  for (const row of JSON.parse(options.body)) {
    for (const key of Object.keys(row)) {
      assert.ok(columns[table].includes(key), table + ' has no column ' + key);
    }
  }
  return { ok: true };
};`,
  );
  const upload = spawnSync(
    process.execPath,
    [
      "--import",
      path.join(directory, "deny-network.mjs"),
      "--import",
      path.join(directory, "mock-cms.mjs"),
      path.join(directory, "scripts/upload-supabase-data.mjs"),
    ],
    {
      cwd: directory,
      encoding: "utf8",
      env: {
        ...process.env,
        NEXT_PUBLIC_SUPABASE_URL: "https://fixture.example.invalid",
        SUPABASE_SECRET_KEY: "sb_secret_fixture",
      },
      timeout: 30000,
    },
  );
  assert.equal(upload.status, 0, upload.stderr || upload.stdout);
  for (const [, table, names] of first[3].matchAll(
    /insert into public\.(\w+) \(([^)]+)\)/g,
  )) {
    for (const name of names.split(",").map((value) => value.trim())) {
      assert.ok(
        columns[table].includes(name),
        `${table} has no column ${name}`,
      );
    }
  }
  const manifest = JSON.parse(first[4]);
  assert.ok(manifest.files.length > 0);
  // These synthetic bytes exercise file/path preflight; nothing is uploaded or decoded.
  const fixture = await readFile(path.join(root, "tests/fixtures/image.svg"));
  for (const name of manifest.files) {
    const target = path.join(directory, "public", name);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, fixture);
  }
  assert.match(
    runScript(directory, "upload-supabase-images.mjs", ["--dry-run"]),
    /Validated/,
  );
  await rm(path.join(directory, "public", manifest.files[0]));
  const failed = spawnSync(
    process.execPath,
    [
      "--import",
      pathToFileURL(path.join(directory, "deny-network.mjs")).href,
      path.join(directory, "scripts/upload-supabase-images.mjs"),
      "--dry-run",
    ],
    { cwd: directory, encoding: "utf8" },
  );
  assert.notEqual(failed.status, 0);
  assert.match(failed.stderr, /Missing local images \(nothing uploaded\)/);
});

test("responsive-image generator works on synthetic artwork without original project images", async (t) => {
  const directory = await workspace(t);
  await mkdir(path.join(directory, "scripts"));
  await mkdir(path.join(directory, "src/data"), { recursive: true });
  await mkdir(path.join(directory, "public/screens"), { recursive: true });
  await cp(
    path.join(root, "scripts/prepare-responsive-images.py"),
    path.join(directory, "scripts/prepare-responsive-images.py"),
  );
  const python = process.env.IMAGE_PYTHON || "python3";
  const create = spawnSync(
    python,
    [
      "-c",
      "from PIL import Image; from pathlib import Path; Image.new('RGB',(640,360),(30,40,50)).save(Path('public/screens/fixture.png'))",
    ],
    { cwd: directory, encoding: "utf8" },
  );
  assert.equal(
    create.status,
    0,
    `${create.stderr}\nInstall scripts/requirements.txt in a virtual environment and activate it.`,
  );
  const result = spawnSync(python, ["scripts/prepare-responsive-images.py"], {
    cwd: directory,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
  const metadata = JSON.parse(
    await readFile(
      path.join(directory, "src/data/image-metadata.json"),
      "utf8",
    ),
  );
  const image = metadata["/screens/fixture.png"];
  assert.equal(image.width, 640);
  assert.equal(image.height, 360);
  assert.deepEqual(
    image.variants.map((variant) => variant.width),
    [480, 640],
  );
  for (const variant of image.variants)
    assert.ok(
      (await readFile(path.join(directory, "public", variant.src.slice(1))))
        .length > 0,
    );
});

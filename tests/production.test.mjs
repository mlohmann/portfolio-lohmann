import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { after, before, test } from "node:test";
import { preview } from "vite";
import puppeteer from "puppeteer-core";

let server;
let browser;
let origin;
before(async () => {
  const executablePath = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].find((candidate) => candidate && existsSync(candidate));
  assert.ok(
    executablePath,
    "Install Chrome or set CHROME_PATH to its executable",
  );
  server = await preview({
    preview: { host: "127.0.0.1", port: 0, open: false },
  });
  origin = `http://127.0.0.1:${server.httpServer.address().port}`;
  // Hosted Linux runners restrict the Chrome sandbox; this browser has no credentials.
  browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: process.env.CI ? ["--no-sandbox"] : [],
  });
});
after(async () => {
  await browser?.close();
  if (server)
    await new Promise((resolve, reject) => {
      server.httpServer.close((error) => (error ? reject(error) : resolve()));
    });
});

async function newPage(t, javascript = true, { failImages = false } = {}) {
  const page = await browser.newPage();
  t.after(() => page.close());
  await page.setJavaScriptEnabled(javascript);
  // Excluded media is not required for browser behavior tests. Only replace
  // same-origin project/news images; fonts, logos, backgrounds, and scripts stay real.
  const image = readFileSync(new URL("./fixtures/image.svg", import.meta.url));
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (
      url.origin === origin &&
      /^\/(?:screens|press-images|optimized\/(?:screens|press-images))\//.test(
        url.pathname,
      )
    ) {
      void request.respond({
        status: failImages ? 404 : 200,
        contentType: "image/svg+xml",
        body: failImages ? "" : image,
      });
    } else if (
      url.origin !== origin &&
      ["http:", "https:"].includes(url.protocol)
    ) {
      void request.abort("blockedbyclient");
    } else {
      void request.continue();
    }
  });
  return page;
}

// Exercise actual built HTML and preview rewrites, not the React test wrapper.
test("deep links receive a neutral shell before JavaScript, never homepage content or canonical", async (t) => {
  const page = await newPage(t, false);
  for (const path of [
    "/about",
    "/portfolio",
    "/press",
    "/portfolio/project/eji",
    "/does-not-exist",
    "/about?source=test",
  ]) {
    await page.goto(origin + path);
    const initial = await page.evaluate(() => ({
      heading: document.querySelector("h1")?.textContent ?? null,
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      structuredData:
        document.getElementById("site-structured-data")?.textContent ?? null,
      root: document.getElementById("root")?.innerHTML,
    }));
    assert.deepEqual(
      initial,
      { heading: null, canonical: null, structuredData: null, root: "" },
      path,
    );
  }
});

test("prerendered homepage keeps its heading and canonical without JavaScript", async (t) => {
  const page = await newPage(t, false);
  await page.goto(origin + "/");
  assert.match(
    await page.$eval("h1", (element) => element.textContent),
    /Hi, I'm Matt/,
  );
  assert.equal(await page.$$eval("main", (elements) => elements.length), 1);
  assert.equal(await page.$$eval("h1", (elements) => elements.length), 1);
  assert.equal(
    await page.$eval('link[rel="canonical"]', (element) => element.href),
    "https://mattlohmann.com/",
  );
  assert.equal(
    await page.$eval("#site-navigation", (element) => element.inert),
    true,
  );
  for (let i = 0; i < 18; i++) {
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(
        () => !!document.activeElement.closest('[aria-hidden="true"]'),
      ),
      false,
    );
  }
});

test("index.html keeps the lightweight static homepage and working menu", async (t) => {
  const page = await newPage(t);
  const requests = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto(origin + "/index.html");
  await page.waitForNetworkIdle();
  assert.equal(
    await page.$eval("#root", (element) => element.dataset.prerendered),
    "true",
  );
  assert.equal(
    requests.some((url) => /\/assets\/js\/(react|tanstack)-/.test(url)),
    false,
  );
  await page.click('button[aria-label="Open menu"]');
  assert.equal(
    await page.$eval("#site-navigation", (element) => element.inert),
    false,
  );
});

test("homepage updates copyright year without rebuilding the static HTML", async (t) => {
  const page = await newPage(t);
  const nextYear = new Date().getFullYear() + 1;
  await page.evaluateOnNewDocument((year) => {
    const OriginalDate = Date;
    window.Date = class extends OriginalDate {
      getFullYear() {
        return year;
      }
    };
  }, nextYear);
  await page.goto(origin + "/");
  await page.waitForNetworkIdle();
  assert.match(
    await page.$eval("body", (element) => element.textContent),
    new RegExp(`© Matt Lohmann\\s+${nextYear}`),
  );
});

test("static homepage still unregisters legacy service workers", async (t) => {
  const page = await newPage(t);
  await page.evaluateOnNewDocument(() => {
    window.legacyWorkerUnregistered = false;
    Object.defineProperty(navigator, "serviceWorker", {
      value: {
        ready: Promise.resolve({
          unregister: async () => {
            window.legacyWorkerUnregistered = true;
            return true;
          },
        }),
      },
    });
  });
  await page.goto(origin + "/");
  await page.waitForNetworkIdle();
  assert.equal(
    await page.evaluate(() => window.legacyWorkerUnregistered),
    true,
  );
});

for (const width of [412, 1440]) {
  test(`production homepage menu traps focus, dismisses, and navigates at ${width}px`, async (t) => {
    const page = await newPage(t);
    await page.setViewport({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(origin + "/");
    await page.waitForNetworkIdle();
    await page.click('button[aria-label="Open menu"]');
    assert.equal(await page.$eval("#main", (element) => element.inert), true);
    assert.equal(
      await page.$eval("#site-navigation", (element) => element.inert),
      false,
    );
    assert.equal(
      await page.evaluate(() =>
        document.activeElement.getAttribute("aria-label"),
      ),
      "Close menu",
    );
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(() => document.activeElement.textContent),
      "Home",
    );
    await page.keyboard.down("Shift");
    await page.keyboard.press("Tab");
    await page.keyboard.up("Shift");
    assert.equal(
      await page.evaluate(() =>
        document.activeElement.getAttribute("aria-label"),
      ),
      "Close menu",
    );
    await page.keyboard.press("Escape");
    assert.equal(await page.$eval("#main", (element) => element.inert), false);
    assert.equal(
      await page.$eval("#site-navigation", (element) => element.inert),
      true,
    );
    assert.equal(
      await page.evaluate(() =>
        document.activeElement.getAttribute("aria-label"),
      ),
      "Open menu",
    );
    await page.click('button[aria-label="Open menu"]');
    await page.waitForFunction(
      () =>
        document.getElementById("site-navigation").getBoundingClientRect()
          .left >= -1,
    );
    await Promise.all([
      page.waitForNavigation(),
      page.click('#site-navigation a[href="/about"]'),
    ]);
    await page.waitForFunction(
      () => document.querySelector("h1")?.textContent === "Welcome To My Site!",
    );
    assert.equal(
      await page.$eval(
        'link[rel="canonical"]',
        (element) => new URL(element.href).pathname,
      ),
      "/about",
    );
    assert.deepEqual(errors, []);
  });
}

for (const path of ["/", "/about"]) {
  test(`navigation remains scrollable on short screens at ${path}`, async (t) => {
    const page = await newPage(t);
    await page.setViewport({ width: 740, height: 320 });
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    await page.goto(origin + path);
    await page.waitForNetworkIdle();
    await page.click('button[aria-label="Open menu"]');
    const reachable = await page.$eval(
      '#site-navigation a[href="/press"]',
      (link) => {
        link.scrollIntoView({ block: "center" });
        const box = link.getBoundingClientRect();
        const target = document.elementFromPoint(
          box.left + box.width / 2,
          box.top + box.height / 2,
        );
        return link.contains(target);
      },
    );
    assert.equal(
      reachable,
      true,
      "Press link must be reachable by scrolling the drawer",
    );
    await page.keyboard.press("Escape");
    assert.equal(await page.$eval("#main", (element) => element.inert), false);
  });
}

test("direct routes render their React content and preserve the not-found view", async (t) => {
  const page = await newPage(t);
  for (const [path, text] of [
    ["/about", "Welcome To My Site!"],
    ["/portfolio/project/lp", "Local Projects Official Website"],
    ["/does-not-exist", "Error404"],
  ]) {
    await page.goto(origin + path);
    await page.waitForFunction(
      (expected) => document.body.textContent.includes(expected),
      {},
      text,
    );
    assert.equal(new URL(page.url()).pathname, path);
  }
});

test("project navigation respects reduced motion, including hover previews", async (t) => {
  const page = await newPage(t);
  await page.setViewport({ width: 1440, height: 900 });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(origin + "/portfolio/project/lp");
  const selector = 'a[title="Go to project PUMA Official Website"]';
  await page.waitForSelector(selector);
  const entrance = await page.$eval(selector, (link) => {
    const style = getComputedStyle(link.parentElement);
    return { animation: style.animationName, opacity: style.opacity };
  });
  assert.deepEqual(entrance, { animation: "none", opacity: "1" });
  await page.hover(selector);
  const hover = await page.$eval(selector, (link) => {
    const image = getComputedStyle(link.querySelector("img"));
    const icon = getComputedStyle(link.querySelector("svg"));
    return {
      imageTransition: image.transitionDuration,
      iconTransition: icon.transitionDuration,
      imageVisible: new DOMMatrix(image.transform).m11 === 1,
    };
  });
  assert.deepEqual(hover, {
    imageTransition: "0s",
    iconTransition: "0s",
    imageVisible: true,
  });
});

test("modified project clicks preserve the current page scroll position", async (t) => {
  const page = await newPage(t);
  await page.setViewport({ width: 1440, height: 900 });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(origin + "/portfolio/project/lp");
  const selector = 'a[title="Go to project PUMA Official Website"]';
  await page.waitForSelector(selector);
  await page.waitForNetworkIdle();
  const position = await page.evaluate(async (linkSelector) => {
    window.scrollTo(0, 700);
    const before = window.scrollY;
    const link = document.querySelector(linkSelector);
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        ctrlKey: true,
        metaKey: true,
      }),
    );
    await new Promise((resolve) => setTimeout(resolve, 250));
    return { before, after: window.scrollY };
  }, selector);
  assert.ok(position.before > 0);
  assert.equal(position.after, position.before);
  assert.equal(new URL(page.url()).pathname, "/portfolio/project/lp");
});

test("selecting the current React menu page restores focus to its opener", async (t) => {
  const page = await newPage(t);
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(origin + "/about");
  await page.waitForSelector("h1");
  await page.click('button[aria-label="Open menu"]');
  await page.focus('#site-navigation a[href="/about"]');
  await page.keyboard.press("Enter");
  await page.waitForFunction(
    () => document.getElementById("site-navigation").inert,
  );
  assert.equal(
    await page.evaluate(() =>
      document.activeElement.getAttribute("aria-label"),
    ),
    "Open menu",
  );
});

test("project navigation resets scroll and Back restores the previous position", async (t) => {
  const page = await newPage(t);
  await page.setViewport({ width: 1440, height: 900 });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(origin + "/portfolio/project/lp");
  await page.waitForSelector('a[title="Go to project PUMA Official Website"]');
  await page.waitForNetworkIdle();
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForFunction(() => window.scrollY === 700);
  await page.click('a[title="Go to project PUMA Official Website"]');
  await page.waitForFunction(
    () => document.querySelector("h1")?.textContent === "PUMA Official Website",
  );
  await page.waitForFunction(() => window.scrollY === 0);
  await page.goBack();
  await page.waitForFunction(
    () =>
      document.querySelector("h1")?.textContent ===
      "Local Projects Official Website",
  );
  await page.waitForFunction(() => window.scrollY === 700);
});

test("project previews respond when reduced motion is enabled during entrance", async (t) => {
  const page = await newPage(t);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(origin + "/portfolio/project/lp");
  const selector = 'a[title="Go to project PUMA Official Website"]';
  await page.waitForSelector(selector);
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.waitForFunction(
    (linkSelector) => {
      const link = document.querySelector(linkSelector);
      return (
        link.classList.contains("active") &&
        getComputedStyle(link.parentElement).opacity === "1"
      );
    },
    {},
    selector,
  );
});

test("React menu route changes focus the destination heading", async (t) => {
  const page = await newPage(t);
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(origin + "/about");
  await page.waitForSelector("h1");
  await page.click('button[aria-label="Open menu"]');
  await page.focus('#site-navigation a[href="/portfolio"]');
  await page.keyboard.press("Enter");
  await page.waitForFunction(
    () => document.querySelector("h1")?.textContent === "Portfolio",
  );
  await page.waitForFunction(
    () => document.activeElement === document.querySelector("h1"),
  );
});

test("keyboard focus reveals project navigation before its delayed entrance", async (t) => {
  const page = await newPage(t);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(origin + "/portfolio/project/lp");
  const selector = 'a[title="Go to project PUMA Official Website"]';
  await page.waitForSelector(selector);
  // Keep the entrance pending so machine speed cannot hide the regression.
  await page.$eval(selector, (link) => {
    link.parentElement.style.animationDelay = "60s";
  });
  await page.keyboard.press("Tab");
  await page.focus(selector);
  const focused = await page.$eval(selector, (link) => ({
    focused: document.activeElement === link,
    opacity: getComputedStyle(link.parentElement).opacity,
    animation: getComputedStyle(link.parentElement).animationName,
  }));
  assert.deepEqual(focused, { focused: true, opacity: "1", animation: "none" });
  await page.focus('button[aria-label="Open menu"]');
  assert.equal(
    await page.$eval(
      selector,
      (link) => getComputedStyle(link.parentElement).opacity,
    ),
    "1",
  );
});

for (const path of ["/", "/portfolio"]) {
  test(`keyboard focus remains visible in forced colors on ${path}`, async (t) => {
    const page = await newPage(t);
    const session = await page.createCDPSession();
    await session.send("Emulation.setEmulatedMedia", {
      features: [
        { name: "forced-colors", value: "active" },
        { name: "prefers-reduced-motion", value: "reduce" },
      ],
    });
    await page.goto(origin + path);
    await page.waitForSelector("h1");
    await page.keyboard.press("Tab");
    for (const selector of [
      'button[aria-label="Open menu"]',
      'a[aria-label="Matt Lohmann on GitHub"]',
    ]) {
      await page.focus(selector);
      const style = await page.$eval(selector, (element) => {
        const computed = getComputedStyle(element);
        return {
          outline: computed.outlineStyle,
          width: parseFloat(computed.outlineWidth),
        };
      });
      assert.notEqual(style.outline, "none", selector);
      assert.ok(style.width >= 2, selector);
    }
  });
}

test("failed portfolio artwork exposes its native alternative text", async (t) => {
  const page = await newPage(t, true, { failImages: true });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(origin + "/portfolio");
  const selector = 'img[alt="Equal Justice Initiative"]';
  await page.waitForSelector(selector);
  await page.waitForNetworkIdle();
  const image = await page.$eval(selector, (element) => ({
    complete: element.complete,
    naturalWidth: element.naturalWidth,
    opacity: getComputedStyle(element).opacity,
    color: getComputedStyle(element).color,
  }));
  assert.deepEqual(image, {
    complete: true,
    naturalWidth: 0,
    opacity: "1",
    color: "rgb(255, 255, 255)",
  });
});

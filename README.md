# Matt Lohmann's portfolio

React and TypeScript portfolio, built with Vite. The production homepage is
prerendered; other routes load the React application.

---

## 🎨 Design System

The application is built on the **Lohmann Design System (LDS)** — a Minimalist Design Engineering Portfolio System featuring strict token governance, WCAG 2.1 AA/AAA accessibility, and living Storybook documentation.

[![Design Tokens](https://img.shields.io/badge/Design%20Tokens-100%25%20Strict-E13C47?style=flat-square)](DESIGN_SYSTEM.md)
[![WCAG](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA%20%2F%20AAA-brightgreen?style=flat-square)](DESIGN_SYSTEM.md#8-accessibility-a11y--inclusivity)
[![Storybook](https://img.shields.io/badge/Storybook-Living%20Styleguide-FF4785?style=flat-square)](DESIGN_SYSTEM.md#10-living-documentation-storybook)

👉 **[Read the Full Design System Guide & Token Reference (DESIGN_SYSTEM.md)](DESIGN_SYSTEM.md)**

### Design System Highlights

| Foundation | Specification | Source Token / Reference |
| :--- | :--- | :--- |
| **Color Palette** | Pure Black (`#000000`), Pure White (`#ffffff`), Imperial Red (`#e63746`) | [`src/style/colors.ts`](src/style/colors.ts) |
| **Typography Trio** | **Oswald** (Display), **Quattrocento** (Editorial Prose), **Source Sans Pro** (UI) | [`src/style/typography.ts`](src/style/typography.ts) |
| **Typographic Scale** | `10rem` (h1) down to `0.75rem` (small) with fluid clamp scaling | [`src/style/typography.ts`](src/style/typography.ts) |
| **Spacing Rhythm** | Harmonic 8-point grid (`xs: 8px` to `xxl: 182px`) with mobile scaling | [`src/style/sizes.ts`](src/style/sizes.ts) |
| **Responsive Grid** | Mobile (2-col), Tablet (2-col), Desktop (12-col), Large Desktop (12-col) | [`src/style/sizes.ts`](src/style/sizes.ts) |
| **Motion & Micro-interactions** | Directional hover underlines, glowing focus ring, custom cubic-beziers | [`src/style/effects.ts`](src/style/effects.ts), [`src/style/animation.ts`](src/style/animation.ts) |
| **Accessibility (a11y)** | 21:1 primary contrast, `@media (forced-colors)` & reduced-motion support | [A11y Guide](DESIGN_SYSTEM.md#8-accessibility-a11y--inclusivity) |

To launch the living Storybook styleguide locally:

```sh
npm run storybook
```

---

## Requirements and setup

- Node **22.23.4**, selected by `.nvmrc`, with npm **10.9.9**.
- Chrome for production browser tests, or `CHROME_PATH` pointing to its executable.
- Python **3.11+** and a virtual environment for image tooling and its tests.

```sh
nvm install
nvm use
npm ci
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r scripts/requirements.txt
# Create a local environment file only if one does not already exist.
test -f .env.local || cp .env.example .env.local
```

`Pillow==13.0.0` is pinned for reproducible responsive-image tooling. Activate the
virtual environment before running image tooling or `npm run test:all`.
Alternatively, set `IMAGE_PYTHON` to the virtual environment's Python executable
when running tests. Do not install image dependencies into the system Python.

## Environment configuration

`.env.example` is the only environment file tracked by Git. Populated environment
files stay local. Choose one content mode:

- **CMS mode:** set `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local`, or in the build
  environment. Both values are public browser configuration. Published CMS
  records use `storage://portfolio-images/...` references resolved to the public
  Storage bucket; local project images are not required for those references.
- **Bundled JSON mode:** leave both values empty. Content comes from `src/data`,
  and its project/news image files must be supplied separately as described below.
  Configured CMS request failures are reported instead of falling back silently.

`SUPABASE_SECRET_KEY` is optional and used only by explicitly invoked maintenance
uploads. Never give a secret a `NEXT_PUBLIC_` or `VITE_` prefix. Vite exposes only
the two approved public CMS values, including in development. Restart the dev
server after changing environment configuration. Previously exposed keys still
need to be rotated through the provider; removing a local variable does not
revoke a key.

## Development and production

```sh
npm run dev
npm run build
npm run preview
```

The development server normally uses port 3000. Audit the **production preview**
URL printed by Vite, normally `http://localhost:4173/`, rather than the development
server. Development includes unminified modules and hot-reload tooling.

The build runs `scripts/prerender.mjs`, producing homepage HTML, captured
styled-components styles, and structured metadata in `dist/index.html`. Native
homepage controls provide menu keyboard behavior without loading React. Deep
links use the neutral `dist/spa.html` shell and then load React. Apache hosting
uses the included `.htaccess`; other hosts must also send non-file deep links to
`spa.html`, preserving `index.html` for the homepage.

## Images and assets

**Tracked site assets:** backgrounds, client logos, self-hosted fonts and their
licenses, favicons, and application icons.

**Excluded project/news media:**

- `public/screens/`: project previews, thumbnails, and screenshots.
- `public/press-images/`: press/news artwork.
- `public/optimized/screens/` and `public/optimized/press-images/`: generated
  responsive WebP variants.

Original archives under `_project_assets/` remain local. A fresh checkout does
not contain excluded project/news images. Obtain the approved asset package from
the owner, preserving filenames and directory structure. For already published
public bucket assets, files can also be downloaded from
`<NEXT_PUBLIC_SUPABASE_URL>/storage/v1/object/public/portfolio-images/<object-path>`;
object paths follow `screens/`, `press-images/`, and `logos/`. Public downloads do
not require a secret key. Keep client logos from the repository unless an
intentional content update requires replacing them.

To prepare local content and its required-file manifest:

```sh
npm run supabase:prepare
```

This generates `supabase/image-manifest.json`, whose `files` list identifies the
original filenames required by the upload tool. It does not download images or
contact Supabase. Place missing project/news originals in their corresponding
`public/` directories before generating responsive variants:

```sh
npm run images:prepare
```

The image command scans local `screens/`, `press-images/`, and `logos/`, writes
responsive variants under `public/optimized/`, and regenerates tracked
`src/data/image-metadata.json`. Run it only with the complete intended local asset
set: an incomplete input directory produces an incomplete metadata index. Review
metadata changes before committing; generated image bytes remain ignored.

Validate local upload inputs without credentials or network writes:

```sh
npm run supabase:upload-images -- --dry-run
npm run supabase:upload-data -- --dry-run
```

Omitting `--dry-run` performs remote writes and requires the server-only key.
Image uploads preserve existing objects; content uploads update matching rows.
See [Supabase setup](supabase/README.md) before applying generated SQL or uploading
content. Public bucket media must be approved for public display.

## Maintenance sources

Versioned operational sources include prerendering, production-test orchestration,
CMS generation and upload scripts, the responsive-image generator, pinned Python
requirements, Supabase storage policies, setup documentation, and migration
history. Generated schema/import/update SQL and image manifests are ignored and
can be regenerated with `npm run supabase:prepare`. Current schema definitions
are maintained in that generator.

Legacy `codegen/`, `yaml-loader.js`, CRA migration helpers, and empty script
stubs remain local and ignored. They are not prerequisites for a fresh checkout.

## Checks and CI

```sh
npm run typecheck
npm run test:all
npm run build-storybook
```

`test:all` runs unit tests, isolated maintenance/environment tests, and a production
build with Chrome browser tests. Tooling tests generate synthetic artwork in
throwaway directories and block network access during uploader dry-runs.
Production browser tests explicitly disable CMS configuration and substitute
small synthetic fixtures for excluded project/news image requests; they verify
rendering and interaction behavior, not live media availability. Fonts, logos,
backgrounds, scripts, and routing remain real. Run `npm run build` again before
publishing to restore the intended production CMS configuration.

GitHub Actions installs the pinned Node runtime, isolated Pillow tooling, and
Chrome for Testing. It runs type checking, the complete test suite, and a
Storybook build with read-only repository permissions. Validation uses no CMS credentials and
performs no uploads or database changes. Storybook uses the Vite integration and the same self-hosted fonts/global styles as the app.

For a production Lighthouse audit, use a clean Chrome profile or disable
extensions. With the preview server running:

```sh
npx --yes --package=node@22.23.4 --package=lighthouse@13.3.0 lighthouse http://localhost:4173/ --chrome-flags="--headless --incognito --disable-extensions" --output=html --output=json --output-path=reports/lighthouse/mobile
```

Add `--preset=desktop` and change the report path for the desktop audit. Reports
are ignored. Local scores do not verify hosting behavior; audit the deployed URL
separately after deployment. Repository visibility and collaborator permissions
are managed by the owner.

## Production deployment

After a push to `master` (including a merge), GitHub Actions checks deployment
configuration, runs validation, builds the release, and uploads `dist` to the
web root. To retry a release from the current `master` tip, run **Validate
repository** manually in Actions and select `master`. Pull requests and other
branches run validation without accessing the deployment environment.

In GitHub **Settings → Environments**, create `production` and restrict its
deployment branches to `master`. Add these environment secrets.

- `FTPS_HOST` is the hostname on the server's TLS certificate, without a scheme or port.
- `FTPS_USERNAME` and `FTPS_PASSWORD` are the dedicated deployment account credentials.

Set the environment variable `FTPS_DIRECTORY` to the existing web root as seen
by that account, for example `/public_html`. The server must support explicit
FTPS on port 21 with a trusted certificate and allow the account to create
directories, upload files, and rename temporary files over existing files.
The upload preserves existing files that are absent from the build. If the
environment requires reviewers, GitHub gates both preflight and upload.

For CMS mode, add both public build values documented above as repository
Actions variables. Leave both unset for bundled content. Store deployment
credentials only as environment secrets.

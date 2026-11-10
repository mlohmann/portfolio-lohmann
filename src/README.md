# Source documentation conventions

Use concise, complete sentences and the same comment formatting throughout this
folder. Document behavior at its declaration and explain non-obvious decisions
next to the code that implements them.

## JSDoc

- Use `/** Summary. */` for a short declaration summary. Wrap longer summaries
  into a block with one leading `*` per line, aligned with the declaration.
- Describe the purpose and observable behavior of components, hooks, shared
  types, exported helpers, and reusable style fragments. Re-export modules need
  only a short summary of their public surface.
- Add `@param`, `@returns`, `@throws`, or `@typeParam` when they explain input
  meaning, units, output shape, failure conditions, or generic contracts. Do not
  repeat types already expressed in TypeScript.
- Put a blank `*` line between the summary, additional paragraphs, and tags.
  Keep summaries around 96 columns and use backticks for identifiers and paths.
- Tests use a short file summary and descriptive test names. Document fixture
  setup and test helpers when isolation or import timing matters.

## Inline and stylesheet comments

Use `// Explanation.` for implementation decisions, lifecycle constraints,
compatibility behavior, and accessibility requirements. Use `{/* Explanation. */}`
inside JSX and `/* Explanation. */` in CSS. Avoid restating assignments, preserving
commented-out code, or using decorative separator lines.

Keep documentation outside styled-components template literals when possible:
comments inside those templates become part of runtime CSS strings. Shared style
fragments document presentation; semantic elements document their HTML role.

## Runtime boundaries

`bootstrap.ts` selects the lightweight static-homepage controls or the React entry
point. `prerender.tsx` renders homepage markup, styles, and structured metadata at
build time. `home-interactions.ts` supplies native menu behavior and refreshes the
copyright year. React routes use the components and hooks under their respective
folders; homepage behavior must also be verified against the production build.

## Content files

JSON does not support comments. Preserve its syntax and factual content, and
record its contracts here or on the TypeScript consumers instead.

| Files                      | Content contract                                                                         |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `data/bio.json`            | `bio` timeline records with location, description, and legacy years.                     |
| `data/work.json`           | `work` timeline records with company, role, and legacy years.                            |
| `data/skills.json`         | `skills` records containing display labels.                                              |
| `data/clients.json`        | `clients` records containing destination, logo reference, and alternative text.          |
| `data/press.json`          | `articles` containing titles, coverage links, and optional media.                        |
| `data/projects.json`       | `projects` listing records with identifiers and preview artwork.                         |
| `data/projects/*.json`     | Individual project details, screenshots, responsibilities, and optional legacy metadata. |
| `data/image-metadata.json` | Public asset paths mapped to dimensions and optional local responsive variants.          |

The CMS adapter normalizes published REST rows into these frontend shapes.
`useContent` selects the configured CMS or bundled JSON; image helpers resolve
asset references and known presentation metadata. Keep comments accurate for
both data sources, especially when legacy runtime records omit declared fields.

## Verification

Run `npx tsc --noEmit` and `npm run test:all` after changing shared behavior.
Documentation-only edits should preserve executable statements, CSS declarations,
and JSON content. Existing production browser tests cover the static homepage,
menu keyboard behavior, direct routes, and the neutral SPA fallback shell.

# Source instructions

These conventions apply to code under `src`, including components, helpers,
tests, stories, and barrel files.

## Imports

- Put external imports first: packages such as React, styled-components, and
  testing libraries.
- Put internal imports below external imports, separated by a blank line.
- Use relative imports for nearby modules: siblings (`./FooterRow`) and paths
  through the direct parent (`../Typography/Typography`) are acceptable,
  including their child modules.
- Prefer the existing `@/` alias for longer paths that traverse two or more
  parent directories, such as `../../components`. `@/` maps to `src/`.
- Use `import type` for imports used only as TypeScript types. Keep these within
  their external or internal group.
- Preserve the order of side-effect imports when their execution order matters.
- Avoid importing a directory's barrel from its own implementation files when
  that would create a circular dependency; import the defining module instead.

```tsx
import styled from "styled-components";
import type { ReactNode } from "react";

import BreakpointWidths from "../layout/BreakpointWidths";
import type { BrandIcon } from "./Footer";
import config from "@/data/config";
```

## Declarations and exports

- Keep imports at the top, followed by types, constants, helpers, and components
  in an order that makes their dependencies clear.
- When a module has multiple exports, declare them without inline `export`
  keywords and collect all exports at the bottom of the file. This includes
  modules with a default component export and named type exports.
- Group component exports separately from type exports. Export runtime values
  with `export { ... }` and types with a separate `export type { ... }` block,
  separated by a blank line. Group other runtime helpers or constants separately
  from components when both are exported.
- A module with a single export may use an inline export or a bottom export.
  Preserve its existing named or default export API.
- Apply the same value/type separation to barrel files. Re-exports belong at the
  bottom, after any imports or declarations.

```tsx
type FooterProps = {
  children: ReactNode;
};

type BrandIcon = {
  width: number;
  height: number;
  path: string;
};

const Footer = ({ children }: FooterProps) => <footer>{children}</footer>;

export default Footer;

export type { FooterProps, BrandIcon };
```

For a barrel exposing components and types:

```ts
export { default as Footer } from "./Footer";
export { default as FooterRow } from "./FooterRow";

export type { FooterProps, BrandIcon } from "./Footer";
```

## Formatting and naming

Follow the surrounding code's formatting: two-space indentation, double quotes,
semicolons, and trailing commas in multiline structures. Use PascalCase for
components and types, camelCase for functions and variables, and descriptive
names. Keep changes focused and preserve runtime behavior when reorganizing
imports or exports.

## Documentation and verification

Read [README.md](README.md) for documentation conventions, runtime boundaries,
content contracts, and verification commands before changing source files.

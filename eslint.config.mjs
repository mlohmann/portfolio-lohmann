import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "storybook-static/**",
      ".venv/**",
      "_project_assets/**",
    ],
  },
  {
    files: [
      "src/**/*.{js,jsx,ts,tsx}",
      ".storybook/**/*.{ts,tsx}",
      "*.config.{ts,mjs}",
      "scripts/*.mjs",
      "tests/*.mjs",
    ],
    extends: [js.configs.recommended],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["src/**/*.{jsx,tsx}", ".storybook/**/*.{jsx,tsx}"],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      reactHooks.configs.flat.recommended,
    ],
    settings: { react: { version: "detect" } },
    rules: {
      // TypeScript checks component props instead of runtime PropTypes.
      "react/prop-types": "off",
    },
  },
);

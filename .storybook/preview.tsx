import type { Preview } from "@storybook/react";
import { GlobalStyle } from "../src/style";
import "../src/fonts.css";
import "../src/index.css";

/** Applies the same self-hosted fonts and global document styles as the site. */
const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <GlobalStyle />
        <Story />
      </>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
};

export default preview;

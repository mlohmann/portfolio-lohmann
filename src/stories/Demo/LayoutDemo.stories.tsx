import type { Meta } from "@storybook/react";
import { LayoutDemo } from "./LayoutDemo";

/** Storybook registration for the responsive grid demonstration. */
const meta: Meta<typeof LayoutDemo> = {
  component: LayoutDemo,
  title: "LayoutDemo",
};

/** Default grid demonstration using the component's built-in examples. */
const Columns = {
  args: {},
};

export default meta;
export { Columns };

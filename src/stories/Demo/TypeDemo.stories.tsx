import type { Meta } from "@storybook/react";
import { TypeDemo } from "./TypeDemo";

/** Storybook registration for the typography demonstration. */
const meta: Meta<typeof TypeDemo> = {
  component: TypeDemo,
  title: "TypeDemo",
};

/** Default typography demonstration using the component's built-in samples. */
const Type = {
  args: {},
};

export default meta;
export { Type };

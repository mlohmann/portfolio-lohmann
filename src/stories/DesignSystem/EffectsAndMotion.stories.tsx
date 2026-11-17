import type { Meta, StoryObj } from "@storybook/react";
import { EffectsAndMotion } from "./EffectsAndMotion";

const meta: Meta<typeof EffectsAndMotion> = {
  title: "Design System / Foundations / Effects & Motion",
  component: EffectsAndMotion,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Showcase of focus indicators, animated hover underlines, custom easing bezier curves, and z-index elevation tokens.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof EffectsAndMotion>;

export const Default: Story = {};

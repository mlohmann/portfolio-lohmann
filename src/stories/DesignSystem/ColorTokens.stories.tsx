import type { Meta, StoryObj } from "@storybook/react";
import { ColorTokens } from "./ColorTokens";

const meta: Meta<typeof ColorTokens> = {
  title: "Design System / Foundations / Colors",
  component: ColorTokens,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Showcase of core palette primitives and semantic surface tokens with WCAG contrast metrics.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ColorTokens>;

export const Default: Story = {};

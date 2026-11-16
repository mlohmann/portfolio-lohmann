import type { Meta, StoryObj } from "@storybook/react";
import { SpacingGrid } from "./SpacingGrid";

const meta: Meta<typeof SpacingGrid> = {
  title: "Design System / Foundations / Spacing & Grid",
  component: SpacingGrid,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Visualizer for the 8pt spacing system, mobile scaling compression, and multi-breakpoint responsive grid metrics.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SpacingGrid>;

export const Default: Story = {};

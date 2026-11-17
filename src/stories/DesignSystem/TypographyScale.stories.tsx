import type { Meta, StoryObj } from "@storybook/react";
import { TypographyScale } from "./TypographyScale";

const meta: Meta<typeof TypographyScale> = {
  title: "Design System / Foundations / Typography",
  component: TypographyScale,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Showcase of the three typefaces (Oswald, Quattrocento, Source Sans Pro) and the full sizing scale.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TypographyScale>;

export const Default: Story = {};

import { colors } from "@/style";
import type { FooterType } from "./Footer";
import { FooterLink } from "./FooterLink";

/** Render a named external social link with its decorative brand icon. */
const FooterIcon = ({ url, icon, label }: FooterType) => (
  <li>
    <FooterLink
      aria-label={label}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Render the icon path directly to avoid loading a runtime icon library. */}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox={`0 0 ${icon.width} ${icon.height}`}
        width={`${(icon.width / icon.height) * 2}em`}
        height="2em"
        fill={colors.white}
        style={{ display: "inline-block", verticalAlign: "-0.125em" }}
      >
        <path d={icon.path} />
      </svg>
    </FooterLink>
  </li>
);

export default FooterIcon;

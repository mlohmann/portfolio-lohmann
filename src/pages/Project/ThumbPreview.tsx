import { useEffect, useRef, useState } from "react";

import { imageUrl } from "@/data/images";
import config from "@/data/config";
import type { ProjectType } from "./Project";
import type { Direction } from "@/types";
import PreviewWrapper from "./PreviewWrapper";
import IconWrapper from "./IconWrapper";
import ArrowWrapper from "./ArrowWrapper";
import LinkWrapper from "./LinkWrapper";
import SVGWrapper from "./SVGWrapper";
import PreviewImage from "./PreviewImage";

/** Edge navigation preview that links to the previous or next project. */
const ThumbPreview = ({
  id,
  title,
  thumbnail,
  direction,
}: ProjectType & Direction) => {
  const [active, setActive] = useState(false);
  const activeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const motion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const activateWithoutAnimation = () => {
      if (motion?.matches) {
        if (activeTimer.current) clearTimeout(activeTimer.current);
        setActive(true);
      }
    };
    activateWithoutAnimation();
    motion?.addEventListener("change", activateWithoutAnimation);
    return () => {
      if (activeTimer.current) clearTimeout(activeTimer.current);
      motion?.removeEventListener("change", activateWithoutAnimation);
    };
  }, []);

  const onAnimationEnd = () => {
    if (activeTimer.current) clearTimeout(activeTimer.current);
    // Delay activation until the entrance animation has had time to finish.
    activeTimer.current = setTimeout(() => setActive(true), 1000);
  };

  return (
    <PreviewWrapper direction={direction}>
      <ArrowWrapper
        direction={direction}
        $active={active}
        onAnimationEnd={onAnimationEnd}
      >
        <LinkWrapper
          className={active ? "active " + direction : direction}
          direction={direction}
          to={`/portfolio/project/${id}`}
          title={"Go to project " + title}
          onFocus={() => setActive(true)}
          onMouseEnter={() => setActive(true)}
        >
          {thumbnail?.src ? (
            <PreviewImage
              src={imageUrl(thumbnail.src, config.screenPath)}
              alt={title}
              direction={direction}
            />
          ) : null}
          <IconWrapper direction={direction}>
            <SVGWrapper
              width="64"
              height="64"
              viewBox="0 0 64 64"
              direction={direction}
              aria-hidden="true"
              focusable="false"
            >
              <path d="M48 10.667q1.104 0 1.885 0.781t0.781 1.885-0.792 1.896l-16.771 16.771 16.771 16.771q0.792 0.792 0.792 1.896t-0.781 1.885-1.885 0.781q-1.125 0-1.896-0.771l-18.667-18.667q-0.771-0.771-0.771-1.896t0.771-1.896l18.667-18.667q0.771-0.771 1.896-0.771zM32 10.667q1.104 0 1.885 0.781t0.781 1.885-0.792 1.896l-16.771 16.771 16.771 16.771q0.792 0.792 0.792 1.896t-0.781 1.885-1.885 0.781q-1.125 0-1.896-0.771l-18.667-18.667q-0.771-0.771-0.771-1.896t0.771-1.896l18.667-18.667q0.771-0.771 1.896-0.771z" />
            </SVGWrapper>
          </IconWrapper>
        </LinkWrapper>
      </ArrowWrapper>
    </PreviewWrapper>
  );
};

export default ThumbPreview;

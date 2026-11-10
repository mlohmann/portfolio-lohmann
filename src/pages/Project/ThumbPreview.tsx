import { imageUrl } from "@/data/images";
import { useEffect, useRef, useState } from "react";
import { ProjectType } from "./Project";
import { Direction } from "@/types";
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
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (activeTimer.current) clearTimeout(activeTimer.current);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    },
    [],
  );

  const onAnimationEnd = () => {
    if (activeTimer.current) clearTimeout(activeTimer.current);
    // Delay activation until the entrance animation has had time to finish.
    activeTimer.current = setTimeout(() => setActive(true), 1000);
  };

  return (
    <PreviewWrapper direction={direction}>
      <ArrowWrapper direction={direction} onAnimationEnd={onAnimationEnd}>
        <LinkWrapper
          className={active ? "active " + direction : direction}
          direction={direction}
          from="/"
          to={`/portfolio/project/${id}`}
          title={"Go to project " + title}
          onClick={() => {
            if (scrollTimer.current) clearTimeout(scrollTimer.current);
            scrollTimer.current = setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 100);
          }}
        >
          <PreviewImage
            src={imageUrl(thumbnail.src, "/screens/")}
            alt={title}
            direction={direction}
          />
          <IconWrapper direction={direction}>
            <SVGWrapper
              width="64"
              height="64"
              viewBox="0 0 64 64"
              direction={direction}
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

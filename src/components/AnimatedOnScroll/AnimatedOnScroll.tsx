import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  animationIn: string;
  delay?: number;
};

/**
 * Start a CSS entrance animation when the wrapped content first enters view.
 *
 * If IntersectionObserver is unavailable, render the content as visible rather
 * than leaving it permanently hidden.
 *
 * @param props - Content and the project-defined entrance keyframe name.
 * @param props.children - Content to reveal.
 * @param props.animationIn - Keyframe class applied when the content enters view. */
const AnimatedOnScroll = ({ children, animationIn, delay }: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  // Keep the initial render stable during SSR; static-homepage CSS reveals this content.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible || !elementRef.current) return;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (typeof IntersectionObserver === "undefined" || prefersReducedMotion) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={elementRef}
      style={delay === undefined ? undefined : { animationDelay: `${delay}s` }}
      className={`scroll-animation${
        visible
          ? ` animate__animated ${animationIn} animate__${animationIn}`
          : ""
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedOnScroll;

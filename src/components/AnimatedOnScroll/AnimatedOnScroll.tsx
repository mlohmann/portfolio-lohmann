import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  animationIn: string;
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
const AnimatedOnScroll = ({ children, animationIn }: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  // Keep the initial render stable during SSR; static-homepage CSS reveals this content.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible || !elementRef.current) return;
    if (typeof IntersectionObserver === "undefined") {
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

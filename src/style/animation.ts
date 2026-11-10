/** Shared transition durations used by interactive and decorative styles. */
const animation = {
  shortTransition: "0.1s",
  fast: "0.3s",
  normal: "0.4s",
  transition: "0.5s",
  slow: "0.7s",
  drawer: "0.8s",
  focus: "1s",
  entranceDistance: "200px",
  delay: 0.5,
  stagger: 0.1,
  ease: {
    standard: "cubic-bezier(0.2, 1, 0.3, 1)",
    drawer: "cubic-bezier(0.7, 0, 0.3, 1)",
    inOut: "ease-in-out",
  },
};

export default animation;

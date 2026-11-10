import { FillImage } from "@/components";

/** Stable decorative artwork shared by build-time and client-rendered homepages. */
const BackgroundImage = () => (
  <FillImage src="/background/background_1.jpg" alt="" aria-hidden={true} />
);

export default BackgroundImage;

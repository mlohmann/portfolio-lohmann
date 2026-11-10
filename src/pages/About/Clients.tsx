import { imagePresentation } from "@/data/imagePresentation";
import { imageUrl } from "@/data/images";

import { useContent } from "@/hooks";
import config from "@/data/config";
import {
  AnimatedOnScroll,
  Row,
  Column,
  AdditionalInfo,
  Loading,
} from "@/components";
import ClientsWrapper from "./ClientsWrapper";
import ClientWrapper from "./ClientWrapper";
import { ErrorDisplay } from "@/components/ErrorDisplay";

/** Client display data, including the logo's accessible text alternative. */
type ClientsType = {
  url: string;
  image: string;
  alt: string;
};

/** Loads the client list and renders linked logos with their text alternatives. */
const Clients = () => {
  const { data, isLoading, error } = useContent<{ clients: ClientsType[] }>(
    "clients",
  );

  if (error) return <ErrorDisplay>{error.toString()}</ErrorDisplay>;
  if (isLoading || !data) return <Loading />;

  return (
    <Row>
      <Column $largeDesktop={2}>
        <AnimatedOnScroll animationIn="fadeIn">
          <AdditionalInfo as="h2">Past Clients</AdditionalInfo>
        </AnimatedOnScroll>
      </Column>
      <Column $largeDesktop={9}>
        <ClientsWrapper>
          {data.clients.map(({ url, image, alt }: ClientsType, idx: number) => {
            return (
              <ClientWrapper
                key={"client-" + idx}
                $desktop="6-12"
                $largeDesktop="3-9"
              >
                <AnimatedOnScroll
                  animationIn="fadeInUpMedium"
                  key={`client-${idx}`}
                >
                  {url ? (
                    <a href={url}>
                      <img
                        {...imagePresentation(
                          imageUrl(image, config.logosPath),
                        )}
                        loading="lazy"
                        src={imageUrl(image, config.logosPath)}
                        alt={alt}
                      />
                    </a>
                  ) : (
                    <img
                      {...imagePresentation(imageUrl(image, config.logosPath))}
                      loading="lazy"
                      src={imageUrl(image, config.logosPath)}
                      alt={alt}
                    />
                  )}
                </AnimatedOnScroll>
              </ClientWrapper>
            );
          })}
        </ClientsWrapper>
      </Column>

      <Column $largeDesktop={1}></Column>
    </Row>
  );
};

export default Clients;

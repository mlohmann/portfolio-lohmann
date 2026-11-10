import styled from "styled-components";

/** Constrains child images to the available width while preserving aspect ratio. */
const ImageWrapper = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }
`;
export default ImageWrapper;

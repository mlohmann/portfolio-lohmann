import styled from "styled-components";

/** Absolutely positioned image that crops to fill its containing box. */
const FillImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export default FillImage;

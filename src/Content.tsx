import styled from "styled-components";

/** Layout container that prevents menu-only props reaching the DOM. */
const Content = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "showmenu",
})<{ showmenu?: boolean }>`
  position: relative;
`;
export default Content;

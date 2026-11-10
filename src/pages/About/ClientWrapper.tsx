import styled from "styled-components";
import { Column } from "@/components";
import { sizes } from "@/style";

/** Grid cell that spaces an individual client mark in the logo collection. */
const ClientWrapper = styled(Column)`
  display: flex;
  min-height: 200px;
  text-align: left;
  justify-content: center;
  align-items: start;

  a {
    width: 100%;
  }
  img {
    width: 65%;
    height: auto;
  }

  ${sizes.query.touch} {
    width: 50%;
    text-align: center;
    align-items: center;
  }
`;
export default ClientWrapper;

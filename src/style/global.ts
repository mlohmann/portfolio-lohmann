import { createGlobalStyle } from "styled-components";

import typography from "./typography";
import colors from "./colors";
import animation from "./animation";

/** Global reset, document defaults, and shared lazy-image placeholders. */
const GlobalStyle = createGlobalStyle`
    :root {
        color-scheme: dark;
        --entrance-distance: ${animation.entranceDistance};
        --entrance-delay: ${animation.delay}s;
    }
    html{
        background: ${colors.backgroundPrimary};
        height: 100%;
        font-size: ${typography.sizing.base};
    }
    body {
        min-height: 100%;
        overflow-x: hidden;
    }
    p {
        text-wrap: balance;
    }
    *{ 
        box-sizing: border-box;
        position: relative;
        margin: 0; 
        padding: 0; 
    }
    :focus-visible {
        outline: 2px solid ${colors.highlight};
        outline-offset: 4px;
    }
    :focus:not(:focus-visible) {
        outline: none;
    }
    @media (forced-colors: active) {
        :focus-visible {
            outline: 2px solid Highlight;
            outline-offset: 4px;
        }
    }
`;

export default GlobalStyle;

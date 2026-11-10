import { createGlobalStyle } from "styled-components";

import typography from "./typography";
import colors from "./colors";
import animation from "./animation";

/** Global reset, document defaults, and shared lazy-image placeholders. */
const GlobalStyle = createGlobalStyle`
    :root {
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
`;

export default GlobalStyle;

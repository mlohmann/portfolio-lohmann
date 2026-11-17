import styled, { css } from "styled-components";

import { colors, sizes, typography } from "@/style";

const { sizing, font, lineHeight } = typography;

/** Large introduction text shared by homepage copy and links. */
const IntroStyle = css`
  font-family: ${font.intro};
  font-size: ${sizing.h3};
  line-height: ${lineHeight.header};

  ${sizes.query.mobile} {
    font-size: ${sizing.h5};
  }
`;

/** Level-one display sizing, family, and spacing without choosing an HTML element. */
const H1Style = css`
  font-family: ${font.header};
  font-size: ${sizing.h1};
  white-space: nowrap;
  margin-top: -44px;
  margin-bottom: -29px;
  line-height: ${lineHeight.header};
`;

/** Semantic level-one page heading. */
const H1 = styled.h1`
  ${H1Style}
`;

/** Level-two display sizing, family, and spacing without choosing an HTML element. */
const H2Style = css`
  font-family: ${font.header};
  font-size: ${sizing.h2};
  margin-top: -30px;
  margin-bottom: -20px;
  line-height: ${lineHeight.header};
`;

/** Semantic level-two section heading. */
const H2 = styled.h2`
  ${H2Style}
`;

/** Level-three display sizing, family, and spacing without choosing an HTML element. */
const H3Style = css`
  font-family: ${font.header};
  font-size: ${sizing.h3};
  margin-top: -18px;
  margin-bottom: -12px;
  line-height: ${lineHeight.header};
`;

/** Semantic level-three heading. */
const H3 = styled.h3`
  ${H3Style}
`;

/** Level-four display sizing, family, and spacing without choosing an HTML element. */
const H4Style = css`
  font-family: ${font.header};
  font-size: ${sizing.h4};
  margin-top: -12px;
  margin-bottom: -8px;
  line-height: ${lineHeight.header};
`;

/** Semantic level-four heading. */
const H4 = styled.h4`
  ${H4Style}
`;

/** Level-five display sizing, family, and spacing without choosing an HTML element. */
const H5Style = css`
  font-family: ${font.header};
  font-size: ${sizing.h5};
  margin-top: -7px;
  margin-bottom: -5px;
  line-height: ${lineHeight.header};
`;

/** Semantic level-five heading. */
const H5 = styled.h5`
  ${H5Style}
`;

/** Level-six display sizing, family, and spacing without choosing an HTML element. */
const H6Style = css`
  font-family: ${font.header};
  font-size: ${sizing.h6};
  margin-top: -4px;
  margin-bottom: -3px;
  line-height: ${lineHeight.header};
`;

/** Semantic level-six heading. */
const H6 = styled.h6`
  ${H6Style}
`;

/** Reusable body-copy sizing, color, and responsive spacing. */
const ParagraphStyle = css`
  font-family: ${font.body};
  font-size: ${sizing.p};
  margin-top: -6px;
  margin-bottom: -6px;
  line-height: ${lineHeight.base};
  color: ${colors.textPrimary};

  ${sizes.query.touch} {
    margin-bottom: 6px;
  }
`;

/** Standard body paragraph with shared color, spacing, and line height. */
const Paragraph = styled.p`
  ${ParagraphStyle}
`;

/** Paragraph-sized text used for individual skill and list entries. */
const ListItem = styled.p`
  ${ParagraphStyle}

  ${sizes.query.mobile} {
    font-size: ${sizing.h5};
  }
`;

/** Reusable small-print font and spacing treatment. */
const SmallStyle = css`
  display: block;
  font-family: ${font.small};
  font-size: ${sizing.small};
  margin-top: -3px;
  margin-bottom: -3px;
  line-height: ${lineHeight.base};
`;

/** Supporting small-print text treatment. */
const Small = styled.span`
  ${SmallStyle}
`;

/** Reusable uppercase footer typography and responsive sizing. */
const FooterStyle = css`
  color: ${colors.white};
  font-family: ${font.footer};
  font-size: ${sizing.p};
  text-transform: uppercase;

  ${sizes.query.mobile} {
    font-size: ${sizing.h6};
  }
`;

/** Footer text treatment using the site's uppercase footer font. */
const FooterText = styled.p`
  ${FooterStyle}
`;

/** Visually clips content while retaining it in the accessibility tree. */
const visuallyHiddenStyle = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;

  &:focus {
    outline: none;
  }
`;

/** Accessible off-screen text for screen readers and semantic orientation. */
const VisuallyHidden = styled.span`
  ${visuallyHiddenStyle}
`;

/** Accent heading used for metadata labels and secondary section headings. */
const AdditionalInfo = styled.h3`
  ${H5Style}
  color: ${colors.textHighlight};
  text-transform: uppercase;

  &:before {
    ${sizes.query.desktop} {
      content: "";
      display: block;
      left: ${sizes.markerDash.desktop.offset}px;
      height: ${sizes.markerDash.desktop.height}px;
      width: ${sizes.markerDash.desktop.width}px;
      top: 9px;
      background: ${colors.white};
      position: absolute;
    }
  }
  ${sizes.query.mobile} {
    font-size: ${sizing.h5};
  }
`;

export {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph,
  ListItem,
  Small,
  FooterText,
  AdditionalInfo,
  VisuallyHidden,
};

export {
  IntroStyle,
  H4Style,
  H6Style,
  ParagraphStyle,
  SmallStyle,
};

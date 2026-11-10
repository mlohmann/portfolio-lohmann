import { sizes } from "@/style";
import { GridUnit } from "@/style/sizes";
import styled, { css } from "styled-components";

/** Transient grid spans consumed by styling instead of being forwarded to the DOM. */
type ColumnType = {
  $mobile?: number | string;
  $tablet?: number | string;
  $desktop?: number | string;
  $largeDesktop?: number | string;
};

/**
 * Converts a grid span into a responsive CSS width. Legacy spans such as `4-6`
 * use the leading number as the grid-unit count.
 *
 * @param grid - Measurements for the active responsive breakpoint.
 * @param count - Number of grid units, or a legacy `span-total` string.
 * @returns A CSS width declaration using percentages or fixed pixel measurements. */
const getColumnWidth = (grid: GridUnit, count: number | string) => {
  const { columnWidth, gutter, columns } = grid;
  const isSubcolumn = typeof count === "string";
  const split = isSubcolumn ? count.split("-") : [];
  const columnNum = isSubcolumn ? Number(split[0]) : count;

  if (columnNum === 0) {
    return "width: 0;";
  }

  if (grid === sizes.grid.mobile) {
    if (columnNum >= columns) {
      return "width: 100%;";
    }
    return `width: calc(${Math.round((columnNum / columns) * 100)}% - ${gutter / 2}px);`;
  }

  const gutterNum = columnNum - 1;
  const width = columnWidth * columnNum + gutter * gutterNum;

  return `width: ${width}px;`;
};

const { grid, query } = sizes;

/**
 * Responsive grid column with optional spans at each supported breakpoint.
 * Tablet rules also match desktop widths; the later desktop rules override them. */
const Column = styled.div<ColumnType>`
  ${({ $mobile, $tablet, $desktop, $largeDesktop }) => css`
    display: flex;
    flex-direction: column;

    ${query.mobile} {
      ${$mobile ? getColumnWidth(grid.mobile, $mobile) : "width: 100%;"}
    }

    ${query.tablet} {
      ${$tablet ? getColumnWidth(grid.tablet, $tablet) : "width: 100%;"}
    }

    ${query.desktop} {
      ${$desktop && getColumnWidth(grid.desktop, $desktop)};
    }

    ${query.largeDesktop} {
      ${$largeDesktop && getColumnWidth(grid.largeDesktop, $largeDesktop)};
    }
  `}
`;

/** Grid column that aligns its children to the cross-axis end. */
const ColumnAlignEnd = styled(Column)`
  align-items: end;
`;
export { ColumnAlignEnd };
export default Column;

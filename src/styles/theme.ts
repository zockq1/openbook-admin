import { DefaultTheme } from "styled-components";

const calcRem = (size: number) => `${size / 16}rem`;

const fontSizes = {
  xs: calcRem(12),
  small: calcRem(14),
  base: calcRem(16),
  large: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  big: calcRem(50),
};

const fontWeight = {
  thin: 100,
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
};

const colors = {
  white: "#fff",
  black: "#000",
  lightGrey: "#BEC5D2",
  grey: "#818BA0",

  blue: "#1890ff",
  semiLightBlue: "#A6CBFF",
  lightBlue: "#EDF5FF",

  red: "#FA4D5E",
  lightRed: "#FF8391",

  green: "#87CF46",

  orange: "#e8b43f",

  purple: "#8A3FFC",
  lightPurple: "#A56EFF",

  bg: "#fafafa",
  border: "rgba(5, 5, 5, 0.06)",
};

const shadow = {
  defaultShadow: "0 20px 27px rgb(0 0 0/5%)",
  small: "0 4px 6px rgb(0 0 0/12%)",
};

const margin = {
  small: "5px",
  base: "10px 20px",
};

const padding = {
  xs_Lsmall: "4px 4px 4px 8px",
  xs: "4px",
  small: "8px",
  base: "12px",
  large: "24px",
};

const borderRadius = {
  xxxs: "5px",
  xxs: "10px",
  xs: "15px",
  small: "20px",
  base: "25px",
};

const border = {
  black: `0px solid ${colors.black}`,
  red: `0px solid ${colors.red}`,
  blue: `0px solid ${colors.blue}`,
};

const deviceSizes = {
  tablet: "768px",
  desktop: "1024px",
};

const device = {
  tablet: `only screen and (min-width: ${deviceSizes.tablet})`,
  desktop: `only screen and (min-width: ${deviceSizes.desktop})`,
};

const theme: DefaultTheme = {
  fontSizes,
  colors,
  deviceSizes,
  device,
  fontWeight,
  shadow,
  margin,
  padding,
  borderRadius,
  border,
};

export type FontSizes = typeof fontSizes;
export type Colors = typeof colors;
export type DeviceSizes = typeof deviceSizes;
export type Device = typeof device;
export type FontWeight = typeof fontWeight;
export type Shadow = typeof shadow;
export type Margin = typeof margin;
export type Padding = typeof padding;
export type BorderRadius = typeof borderRadius;
export type Border = typeof border;
export default theme;

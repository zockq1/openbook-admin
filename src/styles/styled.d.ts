import "styled-components";
import {
  Border,
  BorderRadius,
  Colors,
  Device,
  DeviceSizes,
  FontSizes,
  FontWeight,
  Margin,
  Padding,
  Shadow,
} from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    fontSizes: FontSizes;
    colors: Colors;
    deviceSizes: DeviceSizes;
    device: Device;
    fontWeight: FontWeight;
    shadow: Shadow;
    margin: Margin;
    padding: Padding;
    borderRadius: BorderRadius;
    border: Border;
  }
}

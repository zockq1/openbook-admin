import type { Preview } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import { GlobalStyle as GlobalStyles } from "../src/styles/global-style";
import theme from "../src/styles/theme";
import { ThemeProvider } from "styled-components";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-react-router-v6";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withConsole } from "@storybook/addon-console";

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    reactRouter: reactRouterParameters({}),
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        default: theme,
      },
      defaultTheme: "default",
      Provider: ThemeProvider,
      GlobalStyles,
    }),
    withRouter,
    (storyFn, context) => withConsole()(storyFn)(context),
  ],
};

export default preview;

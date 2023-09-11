import React from "react";
import LoginForm from "./components/LoginForm";
import { GlobalStyle } from "./styles/global-style";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LoginForm />
    </ThemeProvider>
  );
}

export default App;

import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
}

export default App;

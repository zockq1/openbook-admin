import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { Outlet } from "react-router-dom";
import BaseLayout from "./components/commons/BaseLayout";
import SideMenu from "./components/units/ui/SideMenu";
import Header from "./components/units/ui/Header";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BaseLayout>
        <SideMenu />
        <Header />
        <Outlet />
      </BaseLayout>
    </ThemeProvider>
  );
}

export default App;

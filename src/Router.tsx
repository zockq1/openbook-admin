import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Info from "./pages/Info";
import Infos from "./pages/infos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/infos",
    element: <Infos />,
    children: [
      {
        path: ":id",
        element: <Info />,
      },
    ],
  },
]);

export default router;

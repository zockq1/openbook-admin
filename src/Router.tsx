import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TopicInfo from "./pages/TopicInfo";
import Topic from "./pages/Topic";
import TopicCreate from "./pages/TopicCreate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/topic",
    element: <Topic />,
    children: [
      {
        path: ":id",
        element: <TopicInfo />,
      },
      {
        path: "create",
        element: <TopicCreate />,
      },
    ],
  },
]);

export default router;

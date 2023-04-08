import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TopicInfo from "./pages/TopicInfo";
import Topic from "./pages/Topic";
import TopicCreate from "./pages/TopicCreate";
import TopicEdit from "./pages/TopicEdit";

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
        path: ":chapter",
        element: null,
        children: [
          {
            path: ":title",
            element: <TopicInfo />,
          },
          {
            path: "create",
            element: <TopicCreate />,
          },
          {
            path: ":title/edit",
            element: <TopicEdit />,
          },
        ],
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TopicInfo from "./components/Topic/TopicInfo";
import Topic from "./pages/Topic";
import Question from "./pages/Question";
import CreateTopic from "./components/Topic/CreateTopic";
import EditTopic from "./components/Topic/EditTopic";

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
            element: <CreateTopic />,
          },
          {
            path: "question",
            element: <Question />,
          },
          {
            path: ":title/edit",
            element: <EditTopic />,
          },
        ],
      },
    ],
  },
]);

export default router;

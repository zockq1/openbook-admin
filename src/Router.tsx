import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TopicInfo from "./components/Topic/TopicInfo";
import Topic from "./pages/Topic";
import Question from "./pages/Question";
import CreateTopic from "./components/Topic/CreateTopic";
import EditTopic from "./components/Topic/EditTopic";
import ChapterInfo from "./components/Chapter/ChapterInfo";
import EditChapterInfo from "./components/Chapter/EditChpaterInfo";

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
            path: "create-topic",
            element: <CreateTopic />,
          },
          {
            path: "edit-chapter",
            element: <EditChapterInfo />,
          },
          {
            path: "chapter-info",
            element: <ChapterInfo />,
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

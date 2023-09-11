import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TopicInfo from "./components/Topic/TopicInfo";
import Topic from "./components/pages/Topic";
import Question from "./components/pages/Question";
import CreateTopic from "./components/Topic/CreateTopic";
import EditTopic from "./components/Topic/EditTopic";
import ChapterInfo from "./components/Chapter/ChapterInfo";
import EditChapterInfo from "./components/Chapter/EditChpaterInfo";
import CreateQuestion from "./components/Question/CreateQuestion";
import QuestionInfo from "./components/Question/QuestionInfo";
import EditQuestion from "./components/Question/EditQuestion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/question",
    element: <Question />,
    children: [
      {
        path: ":round",
        element: null,
        children: [
          {
            path: ":question",
            element: <QuestionInfo />,
          },

          {
            path: ":question/edit",
            element: <EditQuestion />,
          },
          {
            path: "create-question",
            element: <CreateQuestion />,
          },
        ],
      },
    ],
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
            path: ":title/edit",
            element: <EditTopic />,
          },
        ],
      },
    ],
  },
]);

export default router;

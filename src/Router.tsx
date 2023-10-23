import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TopicPage from "./components/pages/TopicPage";
import QuestionPage from "./components/pages/QuestionPage";
import LoginPage from "./components/pages/LoginPage";
import UserPage from "./components/pages/UserPage";
import TimelinePage from "./components/pages/TimelinePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/question",
        element: <QuestionPage />,
        children: [
          { path: "/question/:round/question-list", element: null },
          { path: "/question/:round/create-question", element: null },
          { path: "/question/:round/:question/question-info", element: null },
          { path: "/question/:round/:question/edit-question", element: null },
        ],
      },
      {
        path: "/topic",
        element: <TopicPage />,
        children: [
          { path: "/topic/:chapter/chapter-info", element: null },
          { path: "/topic/:chapter/edit-chapter", element: null },
          { path: "/topic/:chapter/create-topic", element: null },
          { path: "/topic/:chapter/:topic/topic-info", element: null },
          { path: "/topic/:chapter/:topic/edit-topic", element: null },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/timeline",
        element: <TimelinePage />,
      },
    ],
  },
]);

export default router;

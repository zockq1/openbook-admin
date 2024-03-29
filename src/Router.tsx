import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TopicPage from "./components/pages/TopicPage";
import LoginPage from "./components/pages/LoginPage";
import UserPage from "./components/pages/UserPage";
import TimelinePage from "./components/pages/TimelinePage";
import SearchPage from "./components/pages/SearchPage";
import QuestionCategoryPage from "./components/pages/QuestionCategoryPage";
import ExamPage from "./components/pages/ExamPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/exam",
        element: <ExamPage />,
        children: [
          { path: "/exam/:round/question-list", element: null },
          { path: "/exam/:round/create-question", element: null },
          { path: "/exam/:round/:question/question-info", element: null },
          { path: "/exam/:round/:question/edit-question", element: null },
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
      {
        path: "/question-category",
        element: <QuestionCategoryPage />,
      },
      {
        path: "/search/:search",
        element: <SearchPage />,
      },
    ],
  },
]);

export default router;

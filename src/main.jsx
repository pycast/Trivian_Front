import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";
import AllQuiz from "./components/pages/AllQuiz.jsx";
import DisplayQuiz from "./components/pages/DisplayQuiz.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/login", element: <Login /> },
  { path: "/quiz/all", element: <AllQuiz /> },
  { path: "/quiz/:quizId", element: <DisplayQuiz /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>
);

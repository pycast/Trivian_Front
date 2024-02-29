import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";
import AllQuiz from "./components/pages/AllQuiz.jsx";
import DisplayQuiz from "./components/pages/DisplayQuiz.jsx";
import EditQuiz from "./components/pages/EditQuiz.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/login", element: <Login /> },
  { path: "/quiz/all", element: <AllQuiz /> },
  { path: "/quiz/:id", element: <DisplayQuiz /> },
  { path: "/quiz/edit/:id", element: <EditQuiz /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

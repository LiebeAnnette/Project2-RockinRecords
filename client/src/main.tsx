import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import HomePage from "./pages/HomePage/index.tsx";
import LoginPage from "./pages/LoginPage/index.tsx";
import AlbumDetail from "./pages/AlbumDetail.tsx";
import CurrentLibraryPage from "./pages/CurrentLibrary/index.tsx";
import ErrorPage from "./pages/ErrorPage/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "album/:title",
        element: <AlbumDetail />
      },
      {
        path: "current-library",
        element: <CurrentLibraryPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

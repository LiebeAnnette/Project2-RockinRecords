
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import HomePage from "./pages/HomePage/index.tsx";
import LoginPage from "./pages/LoginPage/index.tsx";
import AlbumDetail from "./pages/AlbumDetail.tsx";
import CurrentLibraryPage from "./pages/CurrentLibrary/index.tsx";
import ErrorPage from "./pages/ErrorPage/index.tsx";
import { RecordProvider } from "./context/recordContext";
import GenresPage from "./pages/GenresPage.tsx";
import CollaboratorsPage from "./pages/CollaboratorsPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "album/:album",
        element: <AlbumDetail />,
      },
      {
        path: "current-library",
        element: <CurrentLibraryPage />,
      },
      {
        path: "genres",
        element: <GenresPage />,
      },
      {
        path: "collaborators",
        element: <CollaboratorsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecordProvider>
      <RouterProvider router={router} />
    </RecordProvider>
  </React.StrictMode>
);

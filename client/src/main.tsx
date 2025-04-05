import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/styles/index.css';

import App from './App';
import HomePage from './pages/HomePage';
import AddRecordPage from './pages/AddRecordPage';
import SearchPage from './pages/SearchPage';

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // This will match the base path "/"
        element: <HomePage />,
      },
      {
        path: 'add-record',
        element: <AddRecordPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
    ],
  },
]);

// Render to the DOM
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}

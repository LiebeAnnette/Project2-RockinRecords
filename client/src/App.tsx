import "./styles/index.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/navBar";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AlbumDetail from "./pages/AlbumDetail";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <main className="container mt-5">
        <Routes>
          <Route path ="/login" element={<LoginPage />} />
          <Route path ="/" element={<HomePage />} />
          <Route path ="/album/:id" element={<AlbumDetail />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
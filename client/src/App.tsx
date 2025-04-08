import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/navBar";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AlbumDetail from "./pages/AlbumDetail";
import SearchPage from "./pages/searchPage";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Navbar />
      <main className='container mt-5'>
        <Routes>
          <Route path ='/login' element={<LoginPage />} />
          <Route path ='/home' element={<HomePage />} />
          <Route path ='/album/:id' element={<AlbumDetail />} />
          <Route path ='/search' element={<SearchPage />} /> 
          <Route path ="/" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
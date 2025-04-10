import "./styles/index.css";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <NavBar />}
      <main className="container mt-5">
        <Outlet />
      </main>
    </>
  );
};

export default App;

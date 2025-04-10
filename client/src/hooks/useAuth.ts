import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();

    const login = () => {
        navigate("/");
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const isAuthenticated = !!localStorage.getItem("token");
    
    return {
        isAuthenticated,
        login,
        logout,
    }
};

export default useAuth;
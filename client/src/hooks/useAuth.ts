import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated'); // Remove from localStorage
        navigate('/login');
    };
    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true'); // Store in localStorage
        navigate('/home');
    };

    return {
        isAuthenticated,
        login,
        logout,
    }
};

export default useAuth;
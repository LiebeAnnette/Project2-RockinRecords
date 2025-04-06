import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    const login = () => {
        setIsAuthenticated(true);
        navigate('/home'); // Redirect to HomePage after login
    };

    const logout = () => {
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to LoginPage after logout
    };

    return {
        isAuthenticated,
        login,
        logout,
    }
};

export default useAuth;
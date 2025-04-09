import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
    isAuthenticated: boolean;
    logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, logout }) => {
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header>
            <h1>Rockin' Records</h1>
            <nav>
                <ul>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/current-library'>Current Library</Link></li>
                    <li><Link to='/wishlist'>Wishlist</Link></li>
                </ul>
            </nav>
            {isAuthenticated ? (
                <button className='logout-btn' onClick={handleLogout}>
                    Logout
                </button>
            ) : (
                <Link to='/login' className='btn'>
                    Login
                </Link>
            )}
        </header>
    );
};

export default Header;
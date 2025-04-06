import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
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
        </header>
    )
};

export default Header;
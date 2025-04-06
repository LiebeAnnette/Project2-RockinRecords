import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
        Home
      </Link>
    </nav>
  );
};

export default NavBar;

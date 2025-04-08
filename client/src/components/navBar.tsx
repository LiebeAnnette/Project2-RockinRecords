import React from 'react';
import { Link } from 'react-router-dom';
const NavBar: React.FC = () => {
  return (
    <nav style={{ padding: '1rem', background: '#F0F0F0' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
      <a href="https://recordstoreday.com/" target="_blank" >Record Store Day</a>
      </Link>
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
      <a href="https://upcomingvinyl.com/" target="_blank" >Upcoming Vinyl</a>
      </Link>
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
      <a href="https://victrola.com/collections/retro" target="_blank" >Victrola</a>
      </Link>
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
      <a href="https://en.wikipedia.org/wiki/Phonograph_record" target="_blank" >What is Vinyl?</a>
      </Link>
      </ul>
    </nav>
  );
 };
 export default NavBar;
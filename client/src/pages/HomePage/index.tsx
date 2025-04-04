import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/index.css';

const HomePage = () => {
  return (
    <div className='home-page'>
      <header>
        <h1>Rockin' Records</h1>
        <nav>
          <Link to='/login' className='btn'>Login/Join Us?</Link>
        </nav>
      </header>
      <main>
        <section className='actions'>
          <Link to ='/add-record' className='btn'>Add a New Record Here</Link>
          <Link to ='/current-library' className='btn'>View Current Library Here</Link>
          <Link to ='/mood-music' className='btn'>Click here for the Mood Board</Link>
          <Link to='/wishlist' className='btn'>Rockin' Records Wishlist</Link>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
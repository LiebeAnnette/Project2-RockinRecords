import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecordModal from '../../components/recordModal';
// import '../assets/styles/index.css';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const handleAddRecordClick = () => {
    setShowModal(true); // Show modal when the 'Add Record' buttin is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Close modal when clicked outside or post submission
  };

  return (
    <div className='home-page'>
      <header>
        <h1>Rockin' Records</h1>

        {/* this nav bar needs restructuring */}

        {/* <nav>
          <Link to='/login' className='btn'>Login/Join Us?</Link>
        </nav> */}

      </header>
      <main>
        <section className='actions'>
          <button onClick={handleAddRecordClick} className='btn'>
            Add a New Record Here
          </button>
          <Link to ='/current-library' className='btn'>View Current Library Here</Link>
          <Link to ='/mood-music' className='btn'>Click here for the Mood Board</Link>
          <Link to='/wishlist' className='btn'>Rockin' Records Wishlist</Link>
        </section>
      </main>

      {/* Show modal when the state is true */}
      {showModal && <RecordModal closeModal={closeModal} />}
    </div>
  );
};



export default HomePage;

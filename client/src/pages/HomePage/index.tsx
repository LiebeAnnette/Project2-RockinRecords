import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import RecordModal from "../../components/recordModal";
import useAuth from "../../hooks/useAuth";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleAddRecordClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="home-background">
      <Header isAuthenticated={isAuthenticated} logout={logout} />

      <h1>Rockin' Records</h1>
      <nav>
        {isAuthenticated ? (
          <button onClick={logout} className="btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </nav>

      <main>
        <section className="actions">
          <button onClick={handleAddRecordClick} className="btn">
            Add a New Record
          </button>
          <Link to="/current-library" className="btn">
            View Current Library
          </Link>
          <Link to="/mood-music" className="btn">
            Click here for the Mood Board
          </Link>
          <Link to="/wishlist" className="btn">
            Rockin' Records Wishlist
          </Link>
        </section>
      </main>

      {showModal && <RecordModal closeModal={closeModal} />}
    </div>
  );
};

export default HomePage;

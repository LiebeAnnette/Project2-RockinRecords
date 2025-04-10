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

      <main>
        <section className="actions">
          <button onClick={handleAddRecordClick} className="btn">
            Add a New Record
          </button>

          <Link to="/current-library" className="btn">
            View Current Library
          </Link>

          <Link to="/genres" className="btn">
            Musical Genres
          </Link>

          <Link to="/wishlist" className="btn">
            Rockin' Records Wishlist
          </Link>

          <Link to="/collaborators" className="btn">
            Collaborators
          </Link>
        </section>

        {/* <section className="library">
          <h2>Your Library</h2>
          <ul>
            {[
              { title: "Rumours", artist: "Fleetwood Mac" },
              { title: "Abbey Road", artist: "The Beatles" },
              { title: "Thriller", artist: "Michael Jackson" },
            ].map((album) => (
              <li key={album.title} className="album-entry">
                <Link
                  to={`/album/${encodeURIComponent(album.title)}`}
                  state={{ artist: album.artist }}
                  className="btn-link"
                >
                  {album.title}
                </Link>{" "}
                <span className="text-gray">by {album.artist}</span>
              </li>
            ))}
          </ul>
        </section> */}
      </main>

      {showModal && <RecordModal closeModal={closeModal} />}
    </div>
  );
};

export default HomePage;

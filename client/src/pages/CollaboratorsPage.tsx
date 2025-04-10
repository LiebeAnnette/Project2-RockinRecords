import { useEffect, useState } from "react";
import classNames from "classnames";

const collaborators = [
  {
    name: "Liebe Stevenson",
    image: "/assets/images/liebe-pic.jpg",
    bio: "Rock star engineer responsible for API integration and JWT setup.",
    GitHub: "https://github.com/LiebeAnnette",
  },
  {
    name: "Matt Bloch",
    image: "/assets/images/matt-pic.jpg",
    bio: "NavBar engineer responsible for links and bug extermination.",
    GitHub: "https://github.com/MattB-ks",
  },
  {
    name: "Fischer Almanza",
    image: "/assets/images/fischer-pic.jpg",
    bio: "Front and Back End Design, added the search functionality and bug extermination.",
    GitHub: "https://github.com/Falmanza94",
  },
  {
    name: "T. Mina Draper-Hammond",
    image: "/assets/images/mina-pic.jpg",
    bio: "Metal master of music genres integration, overall rockin' CSS styling and bug extermination.",
    GitHub: "https://github.com/VampMina528",
  },
];

export default function CollaboratorsPage() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [loading, setLoading] = useState(true);
  

  const current = collaborators[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % collaborators.length);
        setFade(true);
        setLoading(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="collaborators-page">
      
      <div
      className={classNames({
          "transition-opacity": true,
          "opacity-0": !fade,
          "opacity-100": fade,
        })}
        style={{
          transition: "opacity 0.5s ease-in-out",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", width: "400px", height: "400px", marginBottom: "1rem" }}>
          {loading && (
            <div
              className="spinner"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
          <img
            src={current.image}
            alt={current.name}
            onLoad={handleImageLoad}
            style={{
              visibility: loading ? "hidden" : "visible",
            }}
          />
        </div>

        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{current.name}</h2>
        <p style={{ maxWidth: "600px", fontSize: "1.1rem" }}>{current.bio}</p>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
const NavBar: React.FC = () => {
  return (
    <nav style={{ padding: "1rem", background: "#F0F0F0" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "1rem" }}>
        <li>
          <a
            href="https://recordstoreday.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", fontWeight: "bold" }}
          >
            Record Store Day
          </a>
        </li>
        <li>
          <a
            href="https://upcomingvinyl.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", fontWeight: "bold" }}
          >
            Upcoming Vinyl
          </a>
        </li>
        <li>
          <a
            href="https://victrola.com/collections/retro"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", fontWeight: "bold" }}
          >
            Victrola
          </a>
        </li>
        <li>
          <a
            href="https://en.wikipedia.org/wiki/Phonograph_record"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", fontWeight: "bold" }}
          >
            What is Vinyl?
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;

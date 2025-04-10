import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav style={{ padding: "1rem", background: "#0d0909"}}>
      <ul style={{ listStyle: "inside", display: "flex", gap: "200px" }}>
      <li>
          <a
            href="/"         
            rel="noopener noreferrer"
            style={{ textDecoration: "underline  #ff3028", fontWeight: "900", fontSize: "25px" }}
          >
            Home
          </a>
        </li>

        <li>
          <a
            href="https://recordstoreday.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline  #ff3028", fontWeight: "900", fontSize: "25px" }}
          >
            Record Store Day
          </a>
        </li>
        <li>
          <a
            href="https://upcomingvinyl.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline  #ff3028", fontWeight: "900", fontSize: "25px"}}
          >
            Upcoming Vinyl
          </a>
        </li>
        <li>
          <a
            href="https://victrola.com/collections/retro"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline  #ff3028", fontWeight: "900", fontSize: "25px"}}
          >
            Victrola
          </a>
        </li>
        <li>
          <a
            href="https://en.wikipedia.org/wiki/Phonograph_record"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline  #ff3028", fontWeight: "900", fontSize: "25px"}}
          >
            What is Vinyl?
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;


import React from "react";
import {
  FaHome,
  FaRecordVinyl,
  FaCalendarAlt,
  FaCompactDisc,
  FaWikipediaW,
  FaGuitar,
} from "react-icons/fa";

const NavBar: React.FC = () => {
  return (
    <nav
      style={{
        background: "#0d0909",
        fontFamily: "'Times New Roman', Times, serif",
        padding: "1rem",
      }}
    >
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          listStyle: "none",
          margin: 0,
          padding: 0,
          gap: "2rem",
        }}
      >
        <li>
          <a href="/" style={navLinkStyle}>
            <FaHome style={iconStyle} />
            Home
          </a>
        </li>
        <li>
          <a
            href="https://recordstoreday.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={navLinkStyle}
          >
            <FaRecordVinyl style={iconStyle} />
            Record Store Day
          </a>
        </li>
        <li>
          <a
            href="https://upcomingvinyl.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={navLinkStyle}
          >
            <FaCalendarAlt style={iconStyle} />
            Upcoming Vinyl
          </a>
        </li>
        <li>
          <a
            href="https://victrola.com/collections/retro"
            target="_blank"
            rel="noopener noreferrer"
            style={navLinkStyle}
          >
            <FaCompactDisc style={iconStyle} />
            Victrola
          </a>
        </li>
        <li>
          <a
            href="https://www.bandsintown.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={navLinkStyle}
          >
            <FaGuitar style={iconStyle} />
            Who's on Tour?
          </a>
        </li>
        <li>
          <a
            href="https://en.wikipedia.org/wiki/Phonograph_record"
            target="_blank"
            rel="noopener noreferrer"
            style={navLinkStyle}
          >
            <FaWikipediaW style={iconStyle} />
            What is Vinyl?
          </a>
        </li>
      </ul>
    </nav>
  );
};

const navLinkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  textDecoration: "underline #ff3028",
  fontWeight: 700,
  fontSize: "18px",
  color: "white",
};

const iconStyle: React.CSSProperties = {
  fontSize: "18px",
};

export default NavBar;

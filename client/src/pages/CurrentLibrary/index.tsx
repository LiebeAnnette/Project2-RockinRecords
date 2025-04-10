import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authFetch } from "../../services/api";

type RecordType = {
  album: string;
  artist: string;
  yearReleased: string;
};

const fallbackRecords: RecordType[] = [
  { album: "Rumours", artist: "Fleetwood Mac", yearReleased: "1977" },
  { album: "Abbey Road", artist: "The Beatles", yearReleased: "1969" },
  { album: "Thriller", artist: "Michael Jackson", yearReleased: "1982" },
];

const CurrentLibraryPage = () => {
  const [records, setRecords] = useState<RecordType[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await authFetch("/api/library");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setRecords(data);
        } else {
          setRecords(fallbackRecords);
        }
      } catch (err) {
        console.error("Failed to fetch library", err);
        setRecords(fallbackRecords); // fallback on error too
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="library-page">
      <Link
        to="/"
        className="btn"
        style={{
          marginBottom: "2rem",
          display: "inline-block",
          textAlign: "center"
        }}
      >
        Back to Home
      </Link>

      <h1>Current Library</h1>
      <ul className="library-list">
        {records.map((record, index) => (
          <li key={index} className="album-entry">
            <Link
              to={`/album/${encodeURIComponent(record.album)}`}
              state={{ artist: record.artist }}
              className="btn-link"
            >
              {record.album}
            </Link>{" "}
            <span className="text-gray">
              by {record.artist} ({record.yearReleased})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentLibraryPage;

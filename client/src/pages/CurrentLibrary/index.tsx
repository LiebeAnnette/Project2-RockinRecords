import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authFetch } from "../../services/api";

type RecordType = {
  album: string;
  artist: string;
  yearReleased: string; // or number, depending on your DB
};

const CurrentLibraryPage = () => {
  const [records, setRecords] = useState<RecordType[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await authFetch("/api/library");
        const data = await res.json();
        setRecords(data);
      } catch (err) {
        console.error("Failed to fetch library", err);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="library-page">
      <h1>Current Library</h1>
      <ul>
        {records.length === 0 ? (
          <li>No records available.</li>
        ) : (
          records.map((record, index) => (
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
          ))
        )}
      </ul>
    </div>
  );
};

export default CurrentLibraryPage;

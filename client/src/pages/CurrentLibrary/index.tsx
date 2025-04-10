import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecord } from "../../context/recordContext";
import type { Record as RecordType } from "../../context/recordContext";

const fallbackRecords: RecordType[] = [
  { album: "Rumours", artist: "Fleetwood Mac" },
    // yearReleased: "1977" },
  { album: "Abbey Road", artist: "The Beatles" },
    // yearReleased: "1969" },
  { album: "Thriller", artist: "Michael Jackson" },
    // yearReleased: "1982" },
];

const CurrentLibraryPage = () => {
  const { records, fetchRecords, deleteRecord } = useRecord();

  const [combinedRecords, setCombinedRecords] = useState<RecordType[]>([]);

  useEffect(() => {
    const loadRecords = async () => {
      await fetchRecords();
      setCombinedRecords([...fallbackRecords, ... records]);
    };
    loadRecords();
  }, [records]);

  const handleDelete = async (recordId: number) => {
    if (confirm("Are you sure you want to delete this record>")) {
      await deleteRecord(recordId);
    }
  };

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
        {combinedRecords.map((record, index) => (
          <li key={index} className="album-entry">
            <Link
              to={`/album/${encodeURIComponent(record.album)}`}
              state={{ artist: record.artist }}
              className="btn-link"
            >
              {record.album}
            </Link>{" "}
            <span className="text-gray">by {record.artist}</span>

            {"id" in record && (
              <button
                onClick={() => handleDelete(record.id!)}
                className="btn btn-small"
                style={{ marginLeft: "1rem" }}
                >
                  Delete
                </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentLibraryPage;

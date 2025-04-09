import { Link } from "react-router-dom";
import { useRecord } from "../../context/recordContext";

const CurrentLibraryPage = () => {
  const { records } = useRecord();

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
              <span className="text-gray">by {record.artist} ({record.yearReleased})</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CurrentLibraryPage;

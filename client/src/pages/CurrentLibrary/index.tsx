import { useRecord } from "../../context/recordContext";

const CurrentLibraryPage = () => {
    const { records } = useRecord();

    return (
        <div>
            <h1>Current Library</h1>
            <ul>
                {records.length === 0 ? (
                    <li>No records available.</li>
                ) : (
                    records.map((record, index) => (
                        <li key={index}>
                            <strong>{record.album}</strong> by {record.artist} ({record.yearReleased})
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default CurrentLibraryPage
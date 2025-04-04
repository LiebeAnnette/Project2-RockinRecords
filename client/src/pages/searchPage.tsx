import React, { useEffect, useState } from 'react';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allRecords, setAllRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
      fetchRecords();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await fetch('/api/records');
      const data = await res.json();

      const sorted = data.sort((a: any, b: any) =>
        a.artist.localeCompare(b.artist)
      );

      setAllRecords(sorted);
      setFilteredRecords(sorted);
    } catch (err) {
      console.error('Error fetching records:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceTimer) clearTimeout(debounceTimer);

    const newTimer = setTimeout(() => {
      const filtered = allRecords.filter((record: any) => {
        const term = value.toLowerCase();
        return (
          record.artist.toLowerCase().includes(term) ||
          record.album.toLowerCase().includes(term) ||
          record.merchant?.toLowerCase().includes(term) ||
          String(record.yearReleased).includes(term)
        );
      });
      setFilteredRecords(filtered);
    }, 300); // 300ms delay

    setDebounceTimer(newTimer);
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilteredRecords(allRecords);
  };

  const backgroundStyle = {
    backgroundImage: `url('/assets/images/recordupclose.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100%',
    padding: '2rem',
    color: 'black',
    display: 'flex',
    flexDirection: 'column' as const,
  };

  const inputStyle = {
    padding: '0.5rem',
    width: '300px',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '0.5rem',
    width: '100px',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
  };

  const spinnerStyle = {
    width: '120px',
    height: '120px',
    margin: '2rem auto',
    animation: 'spin 2s linear infinite',
  };

  return (
    <div style={backgroundStyle}>
      <h1>Search Collection</h1>

      {showSpinner ? (
        <img
          src="/assets/images/spinning record.jpg"
          alt=""
          style={spinnerStyle}
        />
      ) : (
        <>
          <input
            type="text"
            placeholder="Search by artist, album, merchant, or year"
            value={searchTerm}
            onChange={handleSearchChange}
            style={inputStyle}
          />
          <button onClick={handleReset} style={buttonStyle}>
            Reset
          </button>

          {loading ? (
            <p>Loading records...</p>
          ) : filteredRecords.length === 0 ? (
            <p>No records found matching your search.</p>
          ) : (
            <ul>
              {filteredRecords.map((record: any, index: number) => (
                <li key={index}>
                  {record.artist} – {record.album} ({record.yearReleased}) via {record.merchant}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SearchPage;

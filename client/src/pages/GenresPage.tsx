import { useState, useEffect } from 'react';

interface Genre {
  id: number;
  name: string;
}

interface Artist {
  id: number;
  name: string;
}

interface Track {
  title: string;
  preview: string;
  artist: { name: string };
}

const GenresPage: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("Fetching genres...");
    fetch('http://localhost:5000/api/genres')
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setGenres(data.data);
        } else {
          setError('No genres found');
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to fetch genres');
      });
  }, []);

  const handleGenreClick = async (genre: Genre) => {
    setSelectedGenre(genre);
    setCurrentTrack(null);
    setError('');

    try {
      console.log(`🎯 Fetching artists for genre: ${genre.name} (${genre.id})`);
      const artistRes = await fetch(`http://localhost:5000/api/genre/${genre.id}/artists`);
      const artistData = await artistRes.json();
      console.log('👤 Artist API Response:', artistData);

      if (!artistData.data || artistData.data.length === 0) {
        setError('No artists found for this genre.');
        return;
      }

      const artist: Artist = artistData.data[0];
      console.log(`🎤 Selected artist: ${artist.name} (${artist.id})`);

      const trackRes = await fetch(`http://localhost:5000/api/artist/${artist.id}/top`);
      const trackData = await trackRes.json();
      console.log('🎵 Track API Response:', trackData);

      if (!trackData.data || trackData.data.length === 0) {
        setError('No tracks found for this artist.');
        return;
      }

      const randomTrack = trackData.data[Math.floor(Math.random() * trackData.data.length)];
      console.log('✅ Random Track Chosen:', randomTrack);

      setCurrentTrack(randomTrack);
    } catch (err) {
      console.error('❌ Track Fetch Error:', err);
      setError('Something went wrong while fetching tracks.');
    }
  };

  return (
    <div className="genre-page">
      <h1>Genres</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="genre-buttons">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className="btn"
            onClick={() => handleGenreClick(genre)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {selectedGenre && <p>Selected genre: {selectedGenre.name}</p>}

      {currentTrack && (
        <div>
          <p>
            Now Playing: {currentTrack.title} by {currentTrack.artist.name}
          </p>
          <audio controls src={currentTrack.preview}></audio>
        </div>
      )}
    </div>
  );
};

export default GenresPage;

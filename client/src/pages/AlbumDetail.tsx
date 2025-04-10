import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface DiscogsResult {
  album: string;
  year?: number;
  cover_image?: string;
  country?: string;
  genre?: string[];
  style?: string[];
}

function AlbumDetail() {
  const { album } = useParams<{ album: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const artist = location.state?.artist;
  const [albumData, setAlbumData] = useState<DiscogsResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDiscogsData() {
      if (!album) return;

      // Save search to localStorage
      const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      if (!history.includes(album)) {
        localStorage.setItem("searchHistory", JSON.stringify([...history, album]));
      }

      try {
        const res = await fetch(
          `https://api.discogs.com/database/search?q=${encodeURIComponent(
            album
          )}&type=release&per_page=1&token=FNAmnDyRyqernsKLCkYrniZgdXLRhYErDlFNRqbz`
        );
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setAlbumData(data.results[0]);
        } else {
          setAlbumData(null);
        }
      } catch (error) {
        console.error("Error fetching Discogs data:", error);
        setAlbumData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDiscogsData();
  }, [album]);
  useEffect(() => {
    async function fetchDiscogsData() {
      if (!album) return;
      // ... Discogs logic
    }

    fetchDiscogsData();
  }, [album]);

  // 👇 Paste your YouTube fetch effect here:
  useEffect(() => {
    if (!artist) return;

    const fetchYouTubeVideos = async () => {
      try {
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        const searchQuery = encodeURIComponent(`${artist} live performance`);
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=5&key=${apiKey}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.items) {
          setVideos(data.items);
        } else {
          setVideos([]);
        }
      } catch (err) {
        console.error("YouTube API error:", err);
        setVideos([]);
      }
    };

    fetchYouTubeVideos();
  }, [artist]);

  const handleClearHistory = () => {
    localStorage.removeItem("searchHistory");
    alert("Search history cleared!");
  };

  return (
    <div className="p-4">
      <nav className="flex justify-between mb-4">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 underline"
        >
          ← Back to Library
        </button>
        <button
          onClick={handleClearHistory}
          className="text-red-500 underline"
        >
          🗑️ Clear Search History
        </button>
      </nav>

      {loading ? (
        <p>Loading...</p>
      ) : albumData ? (
        <div>
          <h1 className="text-2xl font-bold mb-2">{albumData.album}</h1>

          {albumData.cover_image && (
            <img
              src={albumData.cover_image}
              alt={albumData.album}
              className="w-64 mb-4 cursor-pointer"
              onClick={() => {
                const imageUrl = albumData.cover_image!;
                const newWin = window.open('', '_blank', 'width=800,height=600');

                if (newWin) {
                  newWin.document.write(`
                    <html>
                      <head>
                        <title>${albumData.album}</title>
                        <style>
                          html, body {
                            margin: 0;
                            padding: 0;
                            height: 100%;
                            overflow: hidden;
                          }
                          body {
                            background-image: url('${imageUrl}');
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                          }
                        </style>
                      </head>
                      <body>
                      </body>
                    </html>
                  `);
                  newWin.document.close();
                }
              }}
            />
          )}

          <p>
            <strong>Year:</strong> {albumData.year || "N/A"}
          </p>
          <p>
            <strong>Country:</strong> {albumData.country || "N/A"}
          </p>
          <p>
            <strong>Genre:</strong> {albumData.genre?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Style:</strong> {albumData.style?.join(", ") || "N/A"}
          </p>
          {artist && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2">
                YouTube Results for {artist}
              </h2>
              {videos.length > 0 ? (
                <ul>
                  {videos.map((video, i) => (
                    <li key={i} className="mb-4">
                      <p className="font-semibold">{video.snippet.album}</p>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Watch on YouTube
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No videos found for this artist.</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>No results found for "{album}"</p>
      )}
    </div>
  );
}

export default AlbumDetail;

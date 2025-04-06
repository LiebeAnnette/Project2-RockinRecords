import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface DiscogsResult {
  title: string;
  year?: number;
  cover_image?: string;
  country?: string;
  genre?: string[];
  style?: string[];
}

function AlbumDetail() {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const [albumData, setAlbumData] = useState<DiscogsResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDiscogsData() {
      if (!title) return;

      // Save search to localStorage
      const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      if (!history.includes(title)) {
        localStorage.setItem(
          "searchHistory",
          JSON.stringify([...history, title])
        );
      }

      try {
        const res = await fetch(
          `https://api.discogs.com/database/search?q=${encodeURIComponent(
            title
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
  }, [title]);

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
        <button onClick={handleClearHistory} className="text-red-500 underline">
          🗑️ Clear Search History
        </button>
      </nav>

      {loading ? (
        <p>Loading...</p>
      ) : albumData ? (
        <div>
          <h1 className="text-2xl font-bold mb-2">{albumData.title}</h1>
          {albumData.cover_image && (
            <img
              src={albumData.cover_image}
              alt={albumData.title}
              className="w-64 mb-4"
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
        </div>
      ) : (
        <p>No results found for "{title}"</p>
      )}
    </div>
  );
}

export default AlbumDetail;

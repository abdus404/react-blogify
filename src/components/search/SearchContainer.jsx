import axios from "axios";
import { useState } from "react";

export default function SearchContainer({ getBlogs }) {
  const [loading, setLoading] = useState(false);

  // Function to handle search using axios
  const handleSearch = async (query) => {
    if (query.length === 0) {
      getBlogs([]); // Clear results if query is empty
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/search?q=${query}`
      );

      getBlogs(response.data.data); // Assuming the API returns results in `data.data`
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
        Search for Your Desire Blogs
      </h3>
      <input
        type="text"
        placeholder="Start Typing to Search"
        className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {loading && <p className="text-slate-400">Loading...</p>}
    </div>
  );
}

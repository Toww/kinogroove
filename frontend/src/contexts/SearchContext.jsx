import { useState, createContext, useCallback } from "react";
import axios from "../axiosInstance";
import { API_URL } from "../constants";
import { useAuth } from "./AuthContext";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  //States
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchedPosts, setSearchedPosts] = useState([]);

  // Hooks
  const { token } = useAuth();

  // Handlers
  const searchPosts = useCallback(
    (searchValue) => {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);

      axios
        // encodeURIComponent changes characters not valid for urls to valid ones
        .get(`${API_URL}/search/posts?q=${encodeURIComponent(searchValue)}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setSearchedPosts(res.data);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [token],
  );
  return (
    <SearchContext.Provider
      value={{ error, loading, searchPosts, searchedPosts }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchProvider, SearchContext };

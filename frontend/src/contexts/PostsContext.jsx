import { createContext, useState, useEffect, useCallback } from "react";
import axios from "../axiosInstance";
import { API_URL } from "../constants";
import { useAuth } from "./AuthContext";

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  //States
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  // Handlers
  const fetchPosts = useCallback(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const createPost = async (data) => {
    axios
      .post(`${API_URL}/posts`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        fetchPosts();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Effects
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PostsContext.Provider value={{ posts, loading, error, createPost }}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsProvider, PostsContext };

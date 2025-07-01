import { createContext, useState, useEffect, useCallback } from "react";
import axios from "../axiosInstance";
import { API_URL } from "../constants";
import { useAuth } from "./AuthContext";

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  //States
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // Hooks
  const { token } = useAuth();

  // Handlers
  const fetchPosts = useCallback(
    (page = 1) => {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);

      axios
        .get(`${API_URL}/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setPosts(res.data.posts);
          setTotalPosts(res.data.total_count);
          setPostsPerPage(res.data.posts_per_page);
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

  const createPost = useCallback(
    (data) => {
      if (!token) {
        setLoading(false);
        return;
      }

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
    },
    [token],
  );

  // Effects
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        error,
        loading,
        totalPosts,
        postsPerPage,
        createPost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export { PostsProvider, PostsContext };

import { useSearchParams } from "react-router";
import { createContext, useState, useEffect, useCallback } from "react";
import axios from "../axiosInstance";
import { API_URL } from "../constants";
import { useAuth } from "./AuthContext";

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  // Hooks
  const { token } = useAuth();
  const [searchParams] = useSearchParams();

  //States
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // Handlers
  const fetchPosts = useCallback(
    (page) => {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);

      axios
        .get(`${API_URL}/posts?page=${page || 1}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setPosts(res.data.posts);
          setTotalPosts(res.data.total_count);
          setPostsPerPage(res.data.posts_per_page);
        })
        .catch((err) => {
          setError(err.response.data.error);
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
          setError(err.response.data.error);
        });
    },
    [token],
  );

  // Effects
  useEffect(() => {
    fetchPosts(searchParams.get("page"));
  }, [fetchPosts]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        error,
        loading,
        totalPosts,
        postsPerPage,
        fetchPosts,
        createPost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export { PostsProvider, PostsContext };

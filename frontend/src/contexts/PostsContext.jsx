import { useNavigate, useSearchParams } from "react-router";
import { createContext, useState, useEffect, useCallback } from "react";
import axios from "../axiosInstance";
import { API_URL } from "../constants";
import { useAuth } from "./AuthContext";

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  // Hooks
  const { token } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  //States
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // Handlers
  const createPost = useCallback(
    (data, resetForm) => {
      if (!token) {
        setLoading(false);
        return;
      }

      axios
        .post(`${API_URL}/posts`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status === 201) {
            fetchPosts();
            resetForm && resetForm();
          }
        })
        .catch((err) => {
          setError(err.response.data.error);
        });
    },
    [token],
  );

  const editPost = useCallback(
    (data, postId) => {
      if (!token) {
        setLoading(false);
        return;
      }

      axios
        .put(`${API_URL}/posts/${postId}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            navigate(`/posts/${postId}`);
          }
        })
        .catch((err) => {
          setError(err.response.data.error);
        });
    },
    [token],
  );

  const fetchPost = useCallback(
    (postId) => {
      if (!token) {
        setLoading(false);
        return;
      }
      setLoading(true);

      axios
        .get(`${API_URL}/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            setPost(res.data);
          }
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
          if ((res.status = 200)) {
            setPosts(res.data.posts);
            setTotalPosts(res.data.total_count);
            setPostsPerPage(res.data.posts_per_page);
          }
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

  // Effects
  useEffect(() => {
    fetchPosts(searchParams.get("page"));
  }, [fetchPosts]);

  return (
    <PostsContext.Provider
      value={{
        post,
        posts,
        error,
        loading,
        totalPosts,
        postsPerPage,
        editPost,
        fetchPost,
        fetchPosts,
        createPost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export { PostsProvider, PostsContext };

import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hooks
  const { token } = useAuth();

  useEffect(() => {
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
  }, []);

  return { posts, loading, error };
}

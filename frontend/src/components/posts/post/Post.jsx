import { useState, useRef, useContext } from "react";
import FullPost from "./FullPost";
import SearchResult from "./SearchResult";
import axios from "../../../axiosInstance";
import { API_URL } from "../../../constants";
import { useAuth } from "../../../contexts/AuthContext";
import { PostsContext } from "../../../contexts/PostsContext";

const Post = ({ postData, format }) => {
  // States
  const [isLiked, setIsLiked] = useState(postData.liked);

  // Refs
  const postLikes = useRef(postData.likes_count);

  // Hooks
  const { token } = useAuth();

  // Contexts
  const { fetchPosts } = useContext(PostsContext);

  // Handlers
  const handleLike = (post) => {
    axios
      .post(
        `${API_URL}/posts/${post.id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => {
        if (res.data.success) {
          const newLikesCount = isLiked
            ? postLikes.current - 1
            : postLikes.current + 1;

          postLikes.current = newLikesCount;
          setIsLiked((value) => !value);
        }
      });
  };

  const handleDelete = async (post) => {
    axios
      .delete(`${API_URL}/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 204) {
          fetchPosts();
        }
      });
  };

  return format === "searchResult" ? (
    <SearchResult
      isLiked={isLiked}
      postData={postData}
      postLikes={postLikes}
      handleLike={handleLike}
    />
  ) : (
    <FullPost
      isLiked={isLiked}
      postData={postData}
      postLikes={postLikes}
      handleLike={handleLike}
      handleDelete={handleDelete}
    />
  );
};

export default Post;

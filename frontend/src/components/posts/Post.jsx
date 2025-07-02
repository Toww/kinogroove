import { useState, useRef, useContext } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import axios from "../../axiosInstance";
import { API_URL } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";
import { PostsContext } from "../../contexts/PostsContext";

const Post = ({ postData }) => {
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

  return (
    <div className="mb-4 gap-y-4 rounded border px-4 py-2">
      <p>{postData.user.name}</p>
      <p>{postData.date}</p>
      <p>{postData.body}</p>

      {postData.is_my_post && (
        <p>
          <FontAwesomeIcon
            icon={faTrashCan}
            className="text-red-500"
            onClick={() => handleDelete(postData)}
          />{" "}
        </p>
      )}

      {postData.song_url && <audio controls src={postData.song_url} />}
      <p>
        <FontAwesomeIcon
          icon={isLiked ? faHeart : faHeartRegular}
          onClick={() => handleLike(postData)}
        />{" "}
        {postLikes.current}
      </p>
    </div>
  );
};

export default Post;

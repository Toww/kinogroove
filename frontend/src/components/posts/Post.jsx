import { useState, useRef } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import axios from "../../axiosInstance";
import { API_URL } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";

const Post = ({ postData }) => {
  // States
  const [isLiked, setIsLiked] = useState(postData.liked);

  const postLikes = useRef(postData.likes_count);

  // Hooks
  const { token } = useAuth();

  // Handlers
  const handleLike = async (post) => {
    const response = await axios.post(
      `${API_URL}/posts/${post.id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.data.success) {
      const newLikesCount = isLiked
        ? postLikes.current - 1
        : postLikes.current + 1;

      postLikes.current = newLikesCount;
      setIsLiked((value) => !value);
    }
  };

  return (
    <div className="mb-4 gap-y-4 rounded border px-4 py-2">
      <p>{postData.user_name}</p>
      <p>{postData.date}</p>
      <p>{postData.body}</p>
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

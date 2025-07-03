import { useState, useRef, useContext } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import axios from "../../axiosInstance";
import { API_URL } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";
import { PostsContext } from "../../contexts/PostsContext";
import DefaultPic from "../../assets/feed/default-pic.svg?react";

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
    <div className="flex items-start space-x-2 rounded-sm bg-white p-4 text-zinc-900">
      {/* Profile column */}
      <DefaultPic className="w-8" />

      {/* Content column */}
      <div className="flex w-full flex-col">
        {/* Post details / icons */}
        <div className="flex justify-between">
          {/* User and date */}
          <div className="flex items-baseline space-x-2 align-bottom">
            <p className="text-base font-bold">{postData.user.name}</p>
            <p className="text-sm text-zinc-400">{postData.date}</p>
          </div>

          {/* Post icons */}
          <div className="flex items-center space-x-4 text-[18px]">
            {/* Delete button */}
            {postData.is_my_post && (
              <FontAwesomeIcon
                icon={faTrashCan}
                className="cursor-pointer text-zinc-400 hover:text-red-400"
                onClick={() => handleDelete(postData)}
              />
            )}
            {/* Like button */}
            <div
              className={`flex cursor-pointer items-center space-x-1 ${isLiked ? "text-emerald-400" : "text-zinc-400 hover:text-emerald-400"}`}
            >
              <FontAwesomeIcon
                icon={isLiked ? faHeart : faHeartRegular}
                onClick={() => handleLike(postData)}
              />
              <div className="text-sm text-zinc-900">{postLikes.current}</div>
            </div>
          </div>
        </div>

        {/* Body */}
        <p className="mt-2">{postData.body}</p>

        {/* Player row */}
        <div className="mt-4 flex items-center space-x-3">
          {/* Album cover */}
          <div className="flex h-12 w-12 items-center justify-center bg-zinc-200">
            <FontAwesomeIcon
              icon={faImage}
              className="text-lg text-zinc-400"
              onClick={() => handleDelete(postData)}
            />
          </div>
          {/* Player */}
          {postData.song_url && (
            <audio controls src={postData.song_url} className="w-full" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;

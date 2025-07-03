import { Link } from "react-router";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faTrashCan,
  faPenToSquare,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import DefaultPic from "../../../assets/feed/default-pic.svg?react";

const FullPost = ({
  isLiked,
  postData,
  postLikes,
  handleLike,
  handleDelete,
}) => {
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
          <div className="flex items-center space-x-3 text-[18px]">
            {/* Delete button */}
            {postData.is_my_post && (
              <FontAwesomeIcon
                icon={faTrashCan}
                className="cursor-pointer text-zinc-400 hover:text-red-400"
                onClick={() => handleDelete(postData)}
              />
            )}
            {/* Edit button */}
            {postData.is_my_post && (
              <Link to={`/posts/${postData.id}/edit`}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="cursor-pointer text-zinc-400 hover:text-emerald-400"
                />
              </Link>
            )}
            {/* Like button */}
            <div
              className={`flex cursor-pointer items-center space-x-1 hover:text-emerald-400 ${isLiked ? "text-emerald-400" : "text-zinc-400"}`}
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
            <FontAwesomeIcon icon={faImage} className="text-lg text-zinc-400" />
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

export default FullPost;

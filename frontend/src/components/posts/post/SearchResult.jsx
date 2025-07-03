import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import DefaultPic from "../../../assets/feed/default-pic.svg?react";

const SearchResult = ({ isLiked, postData, postLikes }) => (
  <div className="flex items-start space-x-2 rounded-sm bg-white p-4 text-zinc-900">
    <div className="flex w-full flex-col">
      {/* Post details / icons */}
      <div className="flex items-center space-x-2">
        {/* User and date */}

        <DefaultPic className="w-8" />
        <div className="flex w-full flex-col">
          <p className="text-sm font-medium">{postData.user.name}</p>
          <p className="text-xs text-zinc-400">{postData.date}</p>
        </div>

        {/* Like button */}
        <div
          className={`flex items-center space-x-1 ${isLiked ? "text-emerald-400" : "text-zinc-400 hover:text-emerald-400"}`}
        >
          <FontAwesomeIcon icon={isLiked ? faHeart : faHeartRegular} />
          <div className="text-xs text-zinc-900">{postLikes.current}</div>
        </div>
      </div>

      {/* Body */}
      <p className="mt-2 text-sm">{postData.body}</p>

      {/* Music row */}
      <div className="mt-3 flex items-center space-x-3">
        {/* Album cover */}
        <div className="flex h-10 w-10 items-center justify-center bg-zinc-200">
          <FontAwesomeIcon icon={faImage} className="text-lg text-zinc-400" />
        </div>
        <p className="text-sm font-bold">{`#${postData.hash_tags.join(" #")}`}</p>
      </div>
    </div>
  </div>
);

export default SearchResult;

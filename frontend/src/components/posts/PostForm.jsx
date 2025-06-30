import { useContext } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { PostsContext } from "../../contexts/PostsContext";

const PostForm = () => {
  // Contexts
  const { createPost, error } = useContext(PostsContext);

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("post[title]", e.target.title.value);
    data.append("post[body]", e.target.body.value);
    data.append("post[song]", e.target.song.files[0]);
    createPost(data);
  };

  return (
    <div className="bg-gray-100 p-4 mb-8">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            className="bg-white ml-2"
            type="text"
            name="title"
            id="title"
          />
        </div>

        <div className="mt-2">
          <label htmlFor="body">Text</label>
          <input className="bg-white ml-2" type="text" name="body" id="body" />
        </div>
        <div className="mt-2">
          <label htmlFor="body">Text</label>
          <input className="bg-white ml-2" type="file" name="song" id="song" />
        </div>

        <button
          type="submit"
          className="rounded bg-teal-400 px-2 py-2 mt-4 cursor-pointer"
        >
          Create post
        </button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default PostForm;

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

    data.append("post[body]", e.target.body.value);

    if (e.target.song.files[0]) {
      data.append("post[song]", e.target.song.files[0]);
    }
    createPost(data);
  };

  return (
    <div className="mb-8 bg-gray-100 p-4">
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <label htmlFor="body">Text</label>
          <input className="ml-2 bg-white" type="text" name="body" id="body" />
        </div>
        <div className="mt-2">
          <label htmlFor="body">Song</label>
          <input className="ml-2 bg-white" type="file" name="song" id="song" />
        </div>

        <button
          type="submit"
          className="mt-4 cursor-pointer rounded bg-teal-400 px-2 py-2"
        >
          Create post
        </button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default PostForm;

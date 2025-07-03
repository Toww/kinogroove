import { useContext } from "react";
import Post from "./Post";

import { PostsContext } from "../../contexts/PostsContext";

const PostsList = () => {
  // Contexts
  const { posts, loading, error } = useContext(PostsContext);
  if (loading) return "Loading...";

  return (
    <div className="flex flex-col space-y-4">
      {error && <p className="mb-6 text-red-500">{error}</p>}
      {posts.map((post) => (
        <Post key={post.id} postData={post} />
      ))}
    </div>
  );
};

export default PostsList;

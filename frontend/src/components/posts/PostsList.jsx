import { useContext } from "react";
import Post from "./post/Post";
import ErrorMessage from "../ui/ErrorMessage";
import { PostsContext } from "../../contexts/PostsContext";

const PostsList = () => {
  // Contexts
  const { posts, loading, error } = useContext(PostsContext);
  if (loading) return "Loading...";

  return (
    <div className="flex flex-col space-y-4">
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {posts.map((post) => (
        <Post key={post.id} postData={post} />
      ))}
    </div>
  );
};

export default PostsList;

import { useContext } from "react";
import Post from "./Post";

import { PostsContext } from "../../contexts/PostsContext";

const PostsList = () => {
  // Contexts
  const { posts, loading, error } = useContext(PostsContext);

  if (error) return <p className="text-red">{error}</p>;
  if (loading) return "Loading...";

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} postData={post} />
      ))}
    </>
  );
};

export default PostsList;

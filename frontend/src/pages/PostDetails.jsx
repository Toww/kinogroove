import { useParams } from "react-router";
import { useContext, useEffect } from "react";
import Post from "../components/posts/post/Post";
import BackButton from "../components/ui/BackButton";
import { PostsContext } from "../contexts/PostsContext";

const PostDetails = () => {
  // Hooks
  const { id } = useParams();

  // Contexts
  const { post, fetchPost, loading, error } = useContext(PostsContext);

  // Effects
  useEffect(() => {
    id && fetchPost(id);
  }, [id]);

  if (loading) return "Loading...";

  return (
    <>
      <BackButton />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Post postData={post} />
    </>
  );
};

export default PostDetails;

import { useParams } from "react-router";
import { useContext, useEffect } from "react";
import PostForm from "../components/posts/PostForm";
import BackButton from "../components/ui/BackButton";
import { PostsContext } from "../contexts/PostsContext";

const PostEdit = () => {
  // Hooks
  const { id } = useParams();

  //Contexts
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
      <PostForm postData={post} />
    </>
  );
};

export default PostEdit;

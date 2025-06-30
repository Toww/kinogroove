import PostForm from "../components/posts/PostForm";
import PostsList from "../components/posts/PostsList";
import { PostsProvider } from "../contexts/PostsContext";

const Feed = () => {
  return (
    <>
      <PostsProvider>
        <PostForm />
        <PostsList />
      </PostsProvider>
    </>
  );
};

export default Feed;

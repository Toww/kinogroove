import { useAuth } from "../contexts/AuthContext";
import PostForm from "../components/posts/PostForm";
import PostsList from "../components/posts/PostsList";
import Pagination from "../components/posts/Pagination";
import { PostsProvider } from "../contexts/PostsContext";

const Feed = () => {
  // Hooks
  const { isLogged } = useAuth();

  // Redirect to home if not logged
  if (!isLogged) return <Navigate to="/" />;

  return (
    <>
      <PostForm />
      <PostsList />
      <Pagination />
    </>
  );
};

export default Feed;

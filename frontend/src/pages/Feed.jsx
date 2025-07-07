import PostForm from "../components/posts/PostForm";
import PostsList from "../components/posts/PostsList";
import Pagination from "../components/posts/Pagination";

const Feed = () => {
  return (
    <>
      <PostForm />
      <PostsList />
      <Pagination />
    </>
  );
};

export default Feed;

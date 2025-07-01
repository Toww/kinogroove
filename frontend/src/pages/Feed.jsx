import PostForm from "../components/posts/PostForm";
import PostsList from "../components/posts/PostsList";
import Pagination from "../components/posts/Pagination";
import { PostsProvider } from "../contexts/PostsContext";
import PostsSearch from "../components/posts/PostsSearch";
import { SearchProvider } from "../contexts/SearchContext";

const Feed = () => {
  return (
    <>
      <PostsProvider>
        <SearchProvider>
          <PostsSearch />
        </SearchProvider>
        <PostForm />
        <PostsList />
        <Pagination />
      </PostsProvider>
    </>
  );
};

export default Feed;

import PostForm from "../components/posts/PostForm";
import PostsList from "../components/posts/PostsList";
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
      </PostsProvider>
    </>
  );
};

export default Feed;

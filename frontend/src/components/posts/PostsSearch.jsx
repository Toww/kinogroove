import { useRef, useState, useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";

const PostsSearch = () => {
  // Refs
  // A timeout is set at the end of the handler using this ref
  //  to avoid fetching on each keystroke if the user is still typing.
  const debounceRef = useRef(null);

  // States
  const [searchValue, setSearchValue] = useState("");

  // Contexts
  const { error, loading, searchedPosts, searchPosts } =
    useContext(SearchContext);

  // Handlers
  const handleChange = (e) => {
    setSearchValue(e.target.value);

    // Clearing timeout if it already exists
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Setting a new timeout
    debounceRef.current = setTimeout(() => {
      searchPosts(e.target.value.toLowerCase());
    }, 600);
  };

  // Getters
  const getSearchResults = () => {
    if (error) return <p className="text-red">{error}</p>;
    if (loading) return "Loading...";

    return searchedPosts.map((post, index) => (
      <div
        key={`search-post-${index}`}
        className="mb-2 rounded border border-gray-200 p-4 text-left"
      >
        <h3>Title: {post.title}</h3>
        <p>{post.hash_tags.map((hash) => `#${hash}`).join(" ")}</p>
      </div>
    ));
  };

  return (
    <div className="px-8 text-center">
      <input
        type="text"
        id="search"
        name="search"
        className="mb-4 rounded-full px-3 py-2 leading-none outline-1 outline-gray-200 focus:outline-2 focus:outline-teal-200"
        value={searchValue}
        onChange={handleChange}
        placeholder="Search..."
      />
      <div className="relative">
        {searchValue && (
          <div className="absolute z-50 block h-120 w-full rounded border border-gray-100 bg-white p-4 shadow">
            {getSearchResults()}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsSearch;

import { Link } from "react-router";
import { useRef, useState, useContext, useEffect } from "react";
import Post from "./post/Post";
import ErrorMessage from "../ui/ErrorMessage";
import { SearchContext } from "../../contexts/SearchContext";

const PostsSearch = () => {
  // Refs
  // A timeout is set at the end of the handler using this ref
  // to avoid fetching on each keystroke if the user is still typing.
  const searchInputRef = useRef();
  const debounceRef = useRef(null);
  const resultsContainerRef = useRef();

  // States
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Contexts
  const { error, loading, searchedPosts, searchPosts } =
    useContext(SearchContext);

  // Handlers
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setIsSearchOpen(true);

    // Clearing timeout if it already exists
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Setting a new timeout
    debounceRef.current = setTimeout(() => {
      searchPosts(e.target.value.toLowerCase());
    }, 600);
  };

  const handleClearSearch = () => {
    setIsSearchOpen(false);
    setSearchValue("");
  };

  // Effects
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        handleClearSearch();
      }
    };

    const handleClickOutside = (e) => {
      if (isSearchOpen === true) {
        const clickedOnInput = searchInputRef.current?.contains(e.target);
        const clickedOnResults = resultsContainerRef.current?.contains(
          e.target,
        );

        if (!clickedOnInput && !clickedOnResults) {
          setIsSearchOpen(false);
        }
      }
    };

    window.addEventListener("keyup", handleEscapeKey);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keyup", handleEscapeKey);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  // Getters
  const getSearchResults = () => {
    if (loading) return <p className="p-4">"Loading..."</p>;

    if (!loading && searchedPosts.length === 0) {
      return <p className="p-4">No posts found.</p>;
    }

    return searchedPosts.map((post, index) => {
      return (
        <div
          key={`search-post-${index}`}
          className={`text-left text-zinc-900 ${index !== 0 && "border-t border-zinc-300"}`}
        >
          <div className="cursor-pointer bg-white hover:bg-emerald-50">
            <Link to={`/posts/${post.id}`} onClick={handleClearSearch}>
              <Post
                key={`searchPost-${index}`}
                format="searchResult"
                postData={post}
              />
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <input
        type="text"
        id="search"
        name="search"
        autoComplete="off"
        ref={searchInputRef}
        onFocus={() => searchValue && setIsSearchOpen(true)}
        className="mb-4 w-full rounded-full px-4 py-2 leading-none outline-1 outline-white focus:bg-white focus:text-zinc-900 focus:outline-2 focus:outline-emerald-400"
        value={searchValue}
        onChange={handleChange}
        placeholder="Search..."
      />
      {/* Search list */}
      {isSearchOpen && (
        <div className="relative">
          <div
            ref={resultsContainerRef}
            className="absolute z-20 block max-h-142 w-full overflow-hidden overflow-y-auto rounded bg-white text-zinc-900"
          >
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {getSearchResults()}
          </div>
        </div>
      )}
      {/* Tags list */}
      <ul className="mt-2 ml-1 space-y-3">
        <li>Discover</li>
        <li>Following</li>
        <li>#Jazz</li>
        <li>#Hip-hop</li>
        <li>#Work</li>
        <li>#Focus</li>
      </ul>
    </>
  );
};

export default PostsSearch;

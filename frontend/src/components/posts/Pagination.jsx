import { useContext } from "react";
import { useSearchParams } from "react-router";
import PaginationButton from "../ui/PaginationButton";
import { PostsContext } from "../../contexts/PostsContext";

const Pagination = () => {
  // Context
  const { error, loading, totalPosts, postsPerPage, fetchPosts } =
    useContext(PostsContext);

  // Hooks
  const [searchParams, setSearchParams] = useSearchParams();

  // Variables
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const currentPage = Number(searchParams.get("page")) || 1;

  // Handlers
  const handlePageChange = (pageNum) => {
    setSearchParams({ page: pageNum });
    fetchPosts(pageNum);
  };

  // Getters
  const getRangeArray = (start, end) => {
    const rangeArray = [];
    for (let i = start; i <= end; i++) {
      rangeArray.push(i);
    }
    return rangeArray;
  };

  const getPaginationButtons = () => {
    // Variables
    const maxInlinePages = 8;
    const sideNumbersOnEllipsis = 4;

    // If there is less than n pages, show all buttons, ex :
    // <- 1 2 3 4 5 6 7 8 9 10 ->
    if (totalPages <= maxInlinePages) {
      return getRangeArray(1, totalPages);
    }

    // Else, we should use ellipsises, depending on the current page
    // First pages :
    // <- 1 2 3 4 5 6 ... 99 ->
    if (currentPage <= sideNumbersOnEllipsis - 1) {
      return [...getRangeArray(1, sideNumbersOnEllipsis), "...", totalPages];
    }

    // Last pages
    // <- 1 ... 95 96 97 98 99 ->
    if (currentPage >= totalPages - (sideNumbersOnEllipsis - 1)) {
      return [
        1,
        "...",
        ...getRangeArray(totalPages - sideNumbersOnEllipsis, totalPages),
      ];
    }

    // Middle pages
    // <- 1 ... 49 50 51  ... 99 ->
    return [
      1,
      "...",
      ...getRangeArray(currentPage - 1, currentPage + 1),
      "...",
      totalPages,
    ];
  };

  // Conditions
  if (error) return null;
  if (loading) return null;

  return (
    <div className="space-x-2 text-center">
      {/* Previous button */}
      {currentPage !== 1 && (
        <PaginationButton
          currentPage={currentPage}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {"<"}
        </PaginationButton>
      )}

      {/* Page numbers */}
      {getPaginationButtons().map((pageNum, index) => (
        <PaginationButton
          currentPage={currentPage}
          key={`page-btn-${index}`}
          onClick={() => handlePageChange(pageNum)}
        >
          {pageNum}
        </PaginationButton>
      ))}

      {/* Next button */}
      {currentPage !== totalPages && (
        <PaginationButton
          currentPage={currentPage}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {">"}
        </PaginationButton>
      )}
    </div>
  );
};

export default Pagination;

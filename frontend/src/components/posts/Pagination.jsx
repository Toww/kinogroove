import { useContext } from "react";
import { useSearchParams } from "react-router";
import PaginationButton from "../ui/PaginationButton";
import { PostsContext } from "../../contexts/PostsContext";

const Pagination = () => {
  // Context
  const { error, loading, fetchPosts, pagination, pagesCount } =
    useContext(PostsContext);

  // Hooks
  const [searchParams, setSearchParams] = useSearchParams();

  // Variables
  const currentPage = Number(searchParams.get("page")) || 1;

  // Handlers
  const handlePageChange = (pageNum) => {
    setSearchParams({ page: pageNum });
    fetchPosts(pageNum);
  };

  // Getters
  const getPaginationButtons = () => {
    return (
      pagination &&
      pagination.map((pageNum, index) => (
        <PaginationButton
          key={`page-btn-${index}`}
          currentPage={currentPage}
          onClick={() => pageNum !== "gap" && handlePageChange(pageNum)}
        >
          {pageNum !== "gap" ? `${pageNum}` : "..."}
        </PaginationButton>
      ))
    );
  };

  // Conditions
  if (error) return null;
  if (loading) return null;

  return (
    <div className="mt-6 space-x-2 text-center">
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
      {getPaginationButtons()}

      {/* Next button */}
      {currentPage !== pagesCount && (
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

const PaginationButton = ({ onClick, currentPage, children }) => {
  // Variables
  const isEllipsis = children === "...";

  // Handlers
  const handleClick = () => {
    if (!isEllipsis) {
      onClick();
    }
  };

  // Getters
  const getButtonClasses = () => {
    const ellipsisClasses = "bg-transparent border-none";
    const baseClasses = "h-10 w-10 rounded bg-gray-200 leading-none";
    const currentPageClasses = "bg-gray-400 text-white cursor-pointer";
    const otherPageClasses = "bg-gray-200 hover:bg-gray-300 cursor-pointer";

    if (currentPage === children) {
      return `${baseClasses} ${currentPageClasses}`;
    }
    if (isEllipsis) {
      return `${baseClasses} ${ellipsisClasses}`;
    }

    return `${baseClasses} ${otherPageClasses}`;
  };

  return (
    <button onClick={handleClick} className={getButtonClasses()}>
      {children}
    </button>
  );
};

export default PaginationButton;

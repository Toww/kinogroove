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
    const baseClasses = "h-10 w-10 rounded leading-none";
    const currentPageClasses =
      "bg-emerald-400 text-zinc-900 cursor-pointer font-medium";
    const otherPageClasses =
      "bg-zinc-700 hover:bg-emerald-400 hover:text-zinc-900 cursor-pointer";

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

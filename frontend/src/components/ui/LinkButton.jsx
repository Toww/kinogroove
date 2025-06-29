import { Link } from "react-router";

const LinkButton = ({ url, label, className }) => {
  return (
    <Link
      to={url}
      className={`inline-block px-3 py-3 bg-teal-400 leading-none rounded ${className}`}
    >
      {label}
    </Link>
  );
};

export default LinkButton;

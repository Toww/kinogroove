const ErrorMessage = ({ children, className }) => {
  return <p className={`mt-4 text-red-500 ${className}`}>{children}</p>;
};

export default ErrorMessage;

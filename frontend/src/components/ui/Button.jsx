const Button = ({ className, label, type, ...props }) => {
  const baseClasses = "cursor-pointer rounded bg-teal-400 px-3 py-2";
  const inlineClasses = "inline-block cursor-pointer leading-none underline";

  if (type === "submitInput") {
    return (
      <input
        type="submit"
        value={label}
        className={`${baseClasses} ${className}`}
        {...props}
      />
    );
  }

  return (
    <button
      className={`${type === "inline" ? inlineClasses : baseClasses} ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;

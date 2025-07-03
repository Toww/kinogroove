const Button = ({ className, children, style, ...props }) => {
  const buttonClasses = {
    base: "cursor-pointer rounded-full bg-emerald-400 px-4 py-2 font-medium text-zinc-900 hover:bg-emerald-300",
    outline:
      "cursor-pointer border-2 border-emerald-400 rounded-full bg-transparent hover:bg-emerald-400 px-4 py-2 font-medium text-emerald-400 hover:text-zinc-900",
    inline: "cursor-pointer leading-none underline",
  };

  return (
    <button
      className={`${(style && buttonClasses[style]) || buttonClasses["base"]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

const FormInput = (props) => {
  // Variables
  const {
    id,
    type,
    formState,
    labelText,
    containerClasses,
    inputClasses,
    ...inputProps
  } = props;

  // Getters
  const getInputClasses = () => {
    return inputClasses
      ? inputClasses
      : "rounded-full bg-white px-4 py-2 font-medium text-zinc-900";
  };
  return (
    <div className={containerClasses}>
      <div className="flex flex-col text-sm">
        {labelText && (
          <label className="mr-2" htmlFor={id}>
            {labelText}
          </label>
        )}
        {type === "textArea" ? (
          <textarea
            id={id}
            name={id}
            className={getInputClasses()}
            {...inputProps}
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            className={getInputClasses()}
            {...inputProps}
          />
        )}
      </div>
      <p className="pt-2 text-sm text-red-500">
        {formState.errors &&
          formState.errors[id] &&
          formState.errors[id].message}
      </p>
    </div>
  );
};

export default FormInput;

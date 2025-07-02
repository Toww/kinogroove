const FormInput = (props) => {
  // Variables
  const { id, formState, labelText, containerClasses, ...inputProps } = props;

  return (
    <div className={containerClasses}>
      {labelText && (
        <label className="mr-2" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        id={id}
        name={id}
        label={labelText}
        className="bg-white"
        {...inputProps}
      />
      {formState.errors && formState.errors[id] && (
        <p className="text-red-500">{formState.errors[id].message}</p>
      )}
    </div>
  );
};

export default FormInput;

const FormRowTextArea = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input-text-area"
      ></textarea>
    </div>
  );
};

export default FormRowTextArea;

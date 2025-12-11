import PropTypes from "prop-types";
export const TextArea = (props) => {
  const {
    id,
    name,
    value,
    onChange,
    disabled = false,
    readOnly = false,
    rows = 4,
    placeholder,
    isError = false,
    maxLength,
    ...rest
  } = props;
  const className = [
    "input-field",
    isError && "input-field--error",
    maxLength && "input-field--with-counter",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={className}>
      <textarea
        className="input"
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        value={value || ""}
        {...rest}
      ></textarea>
      {maxLength && (
        <span className="input-counter">
          {(value || "").length}/{maxLength}
        </span>
      )}
    </div>
  );
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  isError: PropTypes.bool,
  maxLength: PropTypes.number,
};
TextArea.defaultProps = {
  rows: 4,
  placeholder: "입력 전",
  isError: false,
};

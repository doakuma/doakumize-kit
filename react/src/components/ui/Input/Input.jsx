import PropTypes from "prop-types";

export const Input = (props) => {
  const {
    type = "text",
    size = "medium",
    value,
    defaultValue,
    disabled,
    readOnly,
    placeholder,
    error,
    onChange,
    firstAddon,
    endAddon,
    ...rest
  } = props;
  const className = [
    "input-field",
    `input-field--${size}`,
    disabled && "input-field--disabled",
    readOnly && "input-field--read-only",
    error && "input-field--error",
    (firstAddon || endAddon) && "input-field--addon",
  ];
  return (
    <div className={className.join(" ")}>
      <div className="input-field--content">
        {firstAddon && (
          <div className="input-field--first-addon">{firstAddon}</div>
        )}
        <input
          type={type}
          className="input"
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          error={error}
          onChange={onChange}
          {...rest}
        />
        {endAddon && <div className="input-field--end-addon">{endAddon}</div>}
      </div>
      {error && <div className="input-field--error">{error}</div>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf([
    "text",
    "password",
    "email",
    "number",
    "tel",
    "url",
    "search",
    "date",
    "time",
    "datetime-local",
    "month",
    "week",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: "text",
  size: "medium",
  value: "",
  defaultValue: "",
  disabled: false,
  readOnly: false,
  placeholder: "",
  error: "",
  onChange: () => {},
};

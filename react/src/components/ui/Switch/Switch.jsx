import PropTypes from "prop-types";
export const Switch = (props) => {
  const {
    id,
    name,
    value,
    onChange,
    disabled = false,
    checked,
    defaultChecked,
    label,
    size = "medium",
    labelPosition = "right",
    ...rest
  } = props;

  // rest에서 이미 사용한 props 제외 (안전장치)
  const {
    checked: _checked,
    defaultChecked: _defaultChecked,
    ...safeRest
  } = rest;
  const className = [
    "toggle-field",
    disabled && "toggle-field--disabled",
    size && `toggle-field--${size}`,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={className}>
      <input
        className="toggle-input"
        type="checkbox"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...(checked !== undefined ? { checked } : {})}
        {...(checked === undefined && defaultChecked !== undefined
          ? { defaultChecked }
          : {})}
        {...safeRest}
      />
      <label htmlFor={id} className="toggle"></label>
      {label && (
        <>
          {label.map((item, idx) => {
            const isBoth = labelPosition === "both";
            const bothCase = ["left", "right"];
            return (
              <span
                className={`toggle-label__${
                  isBoth ? bothCase[idx] : labelPosition
                }`}
                key={idx}
              >
                {item}
              </span>
            );
          })}
        </>
      )}
    </span>
  );
};
Switch.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  label: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  labelPosition: PropTypes.oneOf(["left", "right", "both"]),
};
Switch.defaultProps = {
  disabled: false,
  size: "medium",
  labelPosition: "right",
};

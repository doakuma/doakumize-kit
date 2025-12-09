import PropTypes from "prop-types";
export const Radio = (props) => {
  const {
    name,
    id,
    value,
    onChange,
    checked,
    disabled,
    label,
    size = "medium",
  } = props;

  const className = [
    "radio",
    disabled && "radio--disabled",
    size && `radio--${size}`,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={className}>
      <input
        className="radio__input"
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <span className="radio__circle" aria-hidden="true"></span>
      <label htmlFor={id} className="radio__label">
        {label}
      </label>
    </span>
  );
};
Radio.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};
Radio.defaultProps = {
  disabled: false,
  checked: false,
  size: "medium",
};

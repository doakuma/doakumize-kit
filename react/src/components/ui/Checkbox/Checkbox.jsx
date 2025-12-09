import PropTypes from "prop-types";
export const Checkbox = (props) => {
  const {
    name,
    id,
    value,
    onChange,
    disabled = false,
    checked,
    defaultChecked,
    label,
    size = "medium",
    ...rest
  } = props;

  const className = ["chk", disabled && "chk--disabled", size && `chk--${size}`]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={className}>
      <input
        className="chk__input"
        type="checkbox"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        {...rest}
      />
      <span className="chk__box" aria-hidden="true"></span>
      <label htmlFor={id} className="chk__label">
        {label}
      </label>
    </span>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.string,
  defaultChecked: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};
Checkbox.defaultProps = {
  disabled: false,
  checked: false,
  size: "medium",
};

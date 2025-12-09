import PropTypes from "prop-types";
import { Radio } from "./Radio";
export const RadioGroup = (props) => {
  const {
    name,
    value,
    onChange,
    disabled,
    label,
    size = "medium",
    options,
    direction = "vertical",
  } = props;
  const className = ["radio-group", direction && `radio-group--${direction}`]
    .filter(Boolean)
    .join(" ");

  const handleChange = (e) => {
    const clickedValue = e.target.value;
    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: clickedValue,
        },
      };
      onChange(syntheticEvent);
    }
  };
  return (
    <div className={className}>
      <legend className="radio-group__legend">{label}</legend>
      <div className="radio-group__items">
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            id={`${name}-${option.value}`}
            value={option.value}
            onChange={handleChange}
            checked={value === option.value}
            disabled={disabled}
            label={option.label}
            size={size}
          />
        ))}
      </div>
    </div>
  );
};
RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
};

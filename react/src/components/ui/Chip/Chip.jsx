import PropTypes from "prop-types";

/**
 * Chip Component
 *
 * @param {string} variant - 칩 스타일: 'default' | 'selected' | 'disabled' | 'clickable'
 * @param {string} children - 칩 텍스트
 * @param {object} ...props - 나머지 chip props (onClick, type 등)
 */
export const Chip = ({
  variant = "default",
  children,
  rounded = false,
  selected = false,
  disabled = false,
  clickable = false,
  removable = false,
  color = "",
  size = "medium",
  ...props
}) => {
  return (
    <span
      className={`chip chip--${variant} ${rounded && "chip--rounded"} ${
        selected && "chip--selected"
      } ${disabled && "chip--disabled"} ${clickable && "chip--clickable"} ${
        removable && "chip--removable"
      } ${color && `chip--${color}`} ${size && `chip--${size}`}`}
      {...props}
    >
      {children}
    </span>
  );
};

Chip.propTypes = {
  variant: PropTypes.oneOf(["default", "selected", "disabled", "clickable"])
    .isRequired,
  children: PropTypes.node.isRequired,
  rounded: PropTypes.bool,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  clickable: PropTypes.bool,
  removable: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "quaternary",
    "quinary",
    "senary",
    "septenary",
    "octonary",
    "nonary",
    "denary",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

Chip.defaultProps = {
  variant: "default",
  rounded: false,
  selected: false,
  disabled: false,
  clickable: false,
  removable: false,
  children: null,
  color: "",
  size: "medium",
};

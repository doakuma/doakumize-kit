/**
 * Dropdown Component
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.value
 * @param {Function} props.onChange
 * @param {boolean} props.disabled
 * @param {string} props.size
 * @param {Array} props.options
 * @param {string} props.placeholder
 * @param {boolean} props.isError
 * @returns {JSX.Element}
 */
/**
 * TODO
 * - [ ] 검색 기능 추가
 * - [ ] 키보드 네비게이션 추가
 * - [ ] 멀티 선택 기능 추가
 * - [ ] ARIA 속성 추가
 */
import PropTypes from "prop-types";
import { useMemo, useState, useEffect, useRef } from "react";
export const Dropdown = (props) => {
  const {
    name,
    value = "",
    onChange,
    disabled,
    size = "medium",
    options,
    placeholder,
    isError,
  } = props;
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const className = [
    "dropdown",
    disabled && "dropdown--disabled",
    size && `dropdown--${size}`,
    isOpen && "dropdown--open",
    isError && "dropdown--error",
  ]
    .filter(Boolean)
    .join(" ");

  const handleToggle = (e) => {
    if (disabled) return;
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  const handleItemClick = (optionValue) => {
    const syntheticEvent = {
      target: {
        name,
        value: optionValue.target.dataset.value,
      },
    };
    if (onChange) {
      onChange(syntheticEvent);
    }
    setIsOpen(false);
  };
  const renderValue = useMemo(() => {
    if (value !== "") {
      return options?.find((option) => option.value === value)?.label || value;
    }
    return placeholder;
  }, [value, options, placeholder]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div className={className} ref={dropdownRef}>
      <button
        className="dropdown__trigger"
        type="button"
        onClick={handleToggle}
        disabled={disabled}
      >
        <span
          className={`dropdown__text ${
            value !== "" ? "" : "dropdown__text--placeholder"
          }`}
        >
          {renderValue}
        </span>
        <span className="dropdown__arrow"></span>
      </button>
      <div className="dropdown__menu">
        {options?.map((option) => (
          <div
            className={`dropdown__item ${
              value === option.value ? "dropdown__item--selected" : ""
            }`}
            key={option.value}
            onClick={handleItemClick}
            data-value={option.value}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};
Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  placeholder: PropTypes.string,
  isError: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};
Dropdown.defaultProps = {
  disabled: false,
  size: "medium",
  placeholder: "Select",
  isError: false,
};

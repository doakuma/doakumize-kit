import PropTypes from "prop-types";
import { Checkbox } from "./Checkbox";

export const CheckBoxGroup = (props) => {
  const {
    name,
    value,
    onChange,
    // defaultValue,
    options,
    // children,
    size = "medium",
    disabled = false,
    showSelectAll,
    selectAllLabel,
    direction = "horizontal",
    groupTitle = "Checkbox Group",
  } = props;

  const handleChange = (e) => {
    const clickedValue = e.target.value;
    const currentValue = value || [];
    const safeOptions = options || [];

    let newValue;
    if (clickedValue === "select-all") {
      // 전체 선택/해제 로직
      const allOptionValues = safeOptions.map((opt) => opt.value);
      const allSelected =
        allOptionValues.length > 0 &&
        allOptionValues.every((val) => currentValue.includes(val));

      if (allSelected) {
        // 모두 선택되어 있으면 모두 해제
        newValue = [];
      } else {
        // 하나라도 선택 안 되어 있으면 모두 선택
        newValue = [...allOptionValues];
      }
    } else {
      // 개별 체크박스 선택/해제 로직
      if (currentValue.includes(clickedValue)) {
        // 이미 선택되어 있으면 제거
        newValue = currentValue.filter((v) => v !== clickedValue);
      } else {
        // 선택 안 되어 있으면 추가
        newValue = [...currentValue, clickedValue];
      }
    }

    // 부모의 onChange에 새로운 배열 전달
    if (onChange) {
      // 이벤트 객체를 유사하게 만들어서 전달
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: newValue,
        },
      };
      onChange(syntheticEvent);
    }
  };

  const safeOptions = options || [];

  return (
    <div className={`chk-group chk-group--${direction}`} role="group">
      {groupTitle && <p className="chk-group__legend">{groupTitle}</p>}
      {showSelectAll && safeOptions.length > 0 && (
        <Checkbox
          id={`${name}-select-all`}
          name={`${name}-select-all`}
          value="select-all"
          onChange={handleChange}
          disabled={disabled}
          checked={
            value &&
            value.length > 0 &&
            safeOptions.length > 0 &&
            safeOptions.every((opt) => value.includes(opt.value))
          }
          label={selectAllLabel}
          size={size}
        />
      )}
      {safeOptions.map((option, idx) => {
        return (
          <Checkbox
            key={option.value || idx}
            id={`${name}-${option.value}`}
            name={`${name}-${option.value}`}
            value={option.value}
            onChange={handleChange}
            disabled={option.disabled || disabled}
            checked={value && value.includes(option.value)}
            label={option.label}
            size={size}
          />
        );
      })}
    </div>
  );
};
CheckBoxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  // defaultValue: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ),
  // children: PropTypes.node,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  showSelectAll: PropTypes.bool,
  selectAllLabel: PropTypes.string,
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
  groupTitle: PropTypes.string,
};
CheckBoxGroup.defaultProps = {
  value: [],
  onChange: () => {},
  // defaultValue: [],
  options: [],
  // children: null,
  size: "medium",
  disabled: false,
  showSelectAll: true,
  selectAllLabel: "전체 선택",
  direction: "vertical",
  groupTitle: "",
};

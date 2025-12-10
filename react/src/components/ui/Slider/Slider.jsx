import PropTypes from "prop-types";
import { useState, useMemo, useEffect } from "react";
export const Slider = (props) => {
  const {
    name,
    value,
    min,
    max,
    step = 1,
    disabled = false,
    unit = "",
    onChange,
    ...rest
  } = props;
  const [currentValue, setCurrentValue] = useState(value);
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setCurrentValue(newValue);

    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          name,
          value: newValue,
        },
      };
      onChange(syntheticEvent);
    }
  };
  const trackOverlayStyle = useMemo(() => {
    //  max === min 인 경우 처리
    if (max === min) {
      return {
        background: `linear-gradient(to right, var(--info-300) 50%, var(--gray-200) 50%)`,
      };
    }
    const percentage = ((currentValue - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, var(--info-300) ${percentage}%, var(--gray-200) ${percentage}%)`,
    };
  }, [currentValue, min, max]);
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);
  const className = [
    "slider-container",
    disabled && "slider-container--disabled",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={className}>
      <div className="slider-header">
        <div className="slider-value">
          <span className="slider-current-value">{currentValue}</span>
        </div>
        {unit && (
          <div className="slider-unit">
            <span className="slider-unit-text">{unit}</span>
          </div>
        )}
      </div>
      <div className="slider-wrapper">
        <input
          type="range"
          className="slider-input"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          disabled={disabled}
          onChange={handleChange}
          name={name}
          {...rest}
        />
        <div className="slider-track-overlay" style={trackOverlayStyle}></div>
      </div>
      <div className="slider-labels">
        <span className="slider-min-label">{min}</span>
        <span className="slider-max-label">{max}</span>
      </div>
    </div>
  );
};

Slider.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  disabled: PropTypes.bool,
  unit: PropTypes.string,
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  step: 1,
  disabled: false,
};

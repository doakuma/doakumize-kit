import { cloneElement, useCallback } from "react";
import PropTypes from "prop-types";
import { useInteractiveShowcase } from "./useInteractiveShowcase";
import "./InteractiveShowcase.css";

/**
 * InteractiveShowcase
 * 컴포넌트의 props를 실시간으로 변경하고 이벤트를 로깅하는 인터랙티브 쇼케이스
 */
export const InteractiveShowcase = ({
  component,
  defaultProps = {},
  controls = [],
  eventHandlers = [],
  validationRules = null,
  children,
}) => {
  const { props, updateProp, resetProps, eventLogs, logEvent, clearLogs } =
    useInteractiveShowcase(defaultProps);

  // Validation 체크
  const validateValue = useCallback(
    (value) => {
      if (!validationRules) return "";

      const { isRequired, pattern, patternMessage } = validationRules;

      // Required 체크
      if (isRequired && (!value || value.trim() === "")) {
        return "필수 입력 항목입니다";
      }

      // 패턴 체크 (값이 있을 때만)
      if (value && pattern) {
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
          return patternMessage || "형식이 올바르지 않습니다";
        }
      }

      return "";
    },
    [validationRules]
  );

  // 이벤트 핸들러 생성
  const createEventHandlers = useCallback(() => {
    const handlers = {};
    eventHandlers.forEach((eventName) => {
      handlers[eventName] = (event) => {
        logEvent(eventName, event);

        // onChange 이벤트의 경우 value prop 자동 업데이트
        if (eventName === "onChange" && event?.target) {
          const newValue =
            event.target.type === "checkbox" || event.target.type === "radio"
              ? event.target.checked
              : event.target.value;
          updateProp("value", newValue);

          // Validation 체크
          if (validationRules) {
            const errorMessage = validateValue(newValue);
            updateProp("error", errorMessage);
          }
        }

        // 원본 핸들러가 있으면 실행
        if (props[eventName]) {
          props[eventName](event);
        }
      };
    });
    return handlers;
  }, [
    eventHandlers,
    logEvent,
    updateProp,
    props,
    validationRules,
    validateValue,
  ]);

  // 렌더링할 컴포넌트
  const renderComponent = () => {
    const componentProps = {
      ...props,
      ...createEventHandlers(),
    };

    if (children) {
      return cloneElement(children, componentProps);
    }

    return cloneElement(component, componentProps);
  };

  // 컨트롤 렌더링
  const renderControl = (control) => {
    const { prop, type, label, options } = control;
    const currentValue = props[prop];

    switch (type) {
      case "boolean":
        return (
          <label
            key={prop}
            className="interactive-showcase__control-item"
            htmlFor={`control-${prop}`}
          >
            <span className="interactive-showcase__control-label">
              {label || prop}
            </span>
            <input
              id={`control-${prop}`}
              type="checkbox"
              className="interactive-showcase__control-checkbox"
              checked={Boolean(currentValue)}
              onChange={(e) => updateProp(prop, e.target.checked)}
            />
          </label>
        );

      case "select":
        return (
          <div key={prop} className="interactive-showcase__control-item">
            <label
              htmlFor={`control-${prop}`}
              className="interactive-showcase__control-label"
            >
              {label || prop}
            </label>
            <select
              id={`control-${prop}`}
              className="interactive-showcase__control-input"
              value={currentValue || ""}
              onChange={(e) => updateProp(prop, e.target.value)}
            >
              {options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case "number":
        return (
          <div key={prop} className="interactive-showcase__control-item">
            <label
              htmlFor={`control-${prop}`}
              className="interactive-showcase__control-label"
            >
              {label || prop}
            </label>
            <input
              id={`control-${prop}`}
              type="number"
              className="interactive-showcase__control-input"
              value={currentValue || ""}
              onChange={(e) => updateProp(prop, e.target.value)}
            />
          </div>
        );

      case "text":
      default:
        return (
          <div key={prop} className="interactive-showcase__control-item">
            <label
              htmlFor={`control-${prop}`}
              className="interactive-showcase__control-label"
            >
              {label || prop}
            </label>
            <input
              id={`control-${prop}`}
              type="text"
              className="interactive-showcase__control-input"
              value={currentValue || ""}
              onChange={(e) => updateProp(prop, e.target.value)}
            />
          </div>
        );
    }
  };

  return (
    <div className="interactive-showcase">
      {/* 컴포넌트 프리뷰 */}
      <div className="interactive-showcase__preview">{renderComponent()}</div>

      {/* 컨트롤 패널 */}
      {controls.length > 0 && (
        <div className="interactive-showcase__controls">
          <div className="interactive-showcase__controls-header">
            <span className="interactive-showcase__controls-title">
              Props Controls
            </span>
            <button
              type="button"
              className="interactive-showcase__controls-reset"
              onClick={resetProps}
            >
              Reset
            </button>
          </div>
          <div className="interactive-showcase__controls-body">
            {controls.map(renderControl)}
          </div>
        </div>
      )}

      {/* 이벤트 로그 */}
      {eventHandlers.length > 0 && (
        <div className="interactive-showcase__logs">
          <div className="interactive-showcase__logs-header">
            <span className="interactive-showcase__logs-title">Event Logs</span>
            <button
              type="button"
              className="interactive-showcase__logs-clear"
              onClick={clearLogs}
            >
              Clear
            </button>
          </div>
          <div className="interactive-showcase__logs-body">
            {eventLogs.length === 0 ? (
              <div className="interactive-showcase__logs-empty">
                No events yet. Interact with the component above.
              </div>
            ) : (
              eventLogs.map((log, index) => (
                <div key={index} className="interactive-showcase__log-item">
                  <div className="interactive-showcase__log-event">
                    <span>{log.eventName}</span>
                    <span className="interactive-showcase__log-timestamp">
                      {log.timestamp}
                    </span>
                  </div>
                  <pre className="interactive-showcase__log-payload">
                    {JSON.stringify(log.payload, null, 2)}
                  </pre>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

InteractiveShowcase.propTypes = {
  component: PropTypes.element,
  defaultProps: PropTypes.object,
  controls: PropTypes.arrayOf(
    PropTypes.shape({
      prop: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["text", "number", "boolean", "select"]),
      label: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  eventHandlers: PropTypes.arrayOf(PropTypes.string),
  validationRules: PropTypes.shape({
    isRequired: PropTypes.bool,
    pattern: PropTypes.string,
    patternMessage: PropTypes.string,
  }),
  children: PropTypes.element,
};

InteractiveShowcase.defaultProps = {
  component: null,
  defaultProps: {},
  controls: [],
  eventHandlers: [],
  validationRules: null,
  children: null,
};

export default InteractiveShowcase;

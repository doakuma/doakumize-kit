import { useState, useCallback } from "react";

/**
 * Interactive Showcase 훅
 * props 상태 관리와 이벤트 로깅을 담당
 */
export function useInteractiveShowcase(initialProps = {}) {
  const [props, setProps] = useState(initialProps);
  const [eventLogs, setEventLogs] = useState([]);

  // Props 업데이트
  const updateProp = useCallback((propName, value) => {
    setProps((prev) => ({
      ...prev,
      [propName]: value,
    }));
  }, []);

  // Props 일괄 업데이트
  const updateProps = useCallback((newProps) => {
    setProps((prev) => ({
      ...prev,
      ...newProps,
    }));
  }, []);

  // Props 초기화
  const resetProps = useCallback(() => {
    setProps(initialProps);
  }, [initialProps]);

  // 이벤트 로깅
  const logEvent = useCallback((eventName, event) => {
    const timestamp = new Date().toLocaleTimeString();
    const payload = event?.target
      ? {
          name: event.target.name,
          value: event.target.value,
          type: event.target.type,
          checked: event.target.checked,
        }
      : event;

    setEventLogs((prev) => {
      // 마지막 로그가 같은 이벤트면 업데이트
      if (prev.length > 0 && prev[0].eventName === eventName) {
        return [
          {
            eventName,
            timestamp,
            payload,
          },
          ...prev.slice(1), // 첫 번째를 제외한 나머지
        ];
      }
      // 다른 이벤트면 새로 추가
      return [
        {
          eventName,
          timestamp,
          payload,
        },
        ...prev.slice(0, 9), // 최대 10개만 유지
      ];
    });
  }, []);

  // 로그 클리어
  const clearLogs = useCallback(() => {
    setEventLogs([]);
  }, []);

  return {
    props,
    updateProp,
    updateProps,
    resetProps,
    eventLogs,
    logEvent,
    clearLogs,
  };
}

export default useInteractiveShowcase;

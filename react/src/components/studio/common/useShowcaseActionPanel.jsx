import { useState, useCallback, useMemo } from "react";
import ShowcaseActionPanel from "./ShowcaseActionPanel";

const formatEventPayload = (event) => {
  if (!event || !event.target) {
    return null;
  }

  const { name, value, type, checked } = event.target;
  const parsedValue =
    type === "checkbox" || type === "radio" ? Boolean(checked) : value;

  return {
    name: name || "value",
    value: parsedValue,
    type,
  };
};

export function useShowcaseActionPanel(options = {}) {
  const { title = "Action Result", formatter } = options;
  const [payload, setPayload] = useState(null);

  const handleEvent = useCallback(
    (input) => {
      let nextPayload = null;

      if (input && input.target) {
        nextPayload = formatEventPayload(input);
      } else if (typeof formatter === "function") {
        nextPayload = formatter(input);
      } else {
        nextPayload = input;
      }

      setPayload(nextPayload);
    },
    [formatter]
  );

  const clear = useCallback(() => setPayload(null), []);

  const ActionPanel = useMemo(() => {
    return () => (
      <ShowcaseActionPanel title={title} payload={payload} onClear={clear} />
    );
  }, [clear, payload, title]);

  return {
    ActionPanel,
    logAction: handleEvent,
    clear,
    payload,
  };
}

export default useShowcaseActionPanel;

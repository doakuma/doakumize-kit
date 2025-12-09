import { useState } from "react";
import { RadioGroup } from "@/components/ui";
export const RadioGroupExample = (props) => {
  const { direction = "vertical" } = props;
  const [groupValue, setGroupValue] = useState("radio-1");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setGroupValue(newValue);
  };
  return (
    <RadioGroup
      direction={direction}
      name={`radio-group-${direction}`}
      label={`Radio Group ${direction}`}
      value={groupValue}
      onChange={handleChange}
      options={[
        { value: "radio-1", label: "Radio 1" },
        { value: "radio-2", label: "Radio 2" },
        { value: "radio-3", label: "Radio 3" },
      ]}
    />
  );
};

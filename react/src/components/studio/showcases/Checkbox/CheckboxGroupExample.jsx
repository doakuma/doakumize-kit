import { useState } from "react";
import { CheckBoxGroup } from "@/components/ui";

export const CheckboxGroupExample = (props) => {
  const { direction = "vertical" } = props;
  const [groupValue, setGroupValue] = useState([]);

  const handleChange = (e) => {
    // CheckBoxGroup은 이미 계산된 배열을 e.target.value로 전달함
    const newValue = e.target.value;
    setGroupValue(newValue);
  };
  return (
    <CheckBoxGroup
      direction={direction}
      name={`checkbox-group-${direction}`}
      groupTitle={`Checkbox Group ${direction}`}
      value={groupValue}
      onChange={handleChange}
      options={[
        { value: `${direction}-option1`, label: "Option 1" },
        { value: `${direction}-option2`, label: "Option 2" },
        { value: `${direction}-option3`, label: "Option 3" },
      ]}
    />
  );
};

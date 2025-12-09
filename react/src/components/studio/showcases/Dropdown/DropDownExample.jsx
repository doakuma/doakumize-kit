import { useState, useEffect } from "react";
import { Dropdown } from "@/components/ui";
export const DropDownExample = (props) => {
  const {
    filledValue,
    isError,
    disabled,
    size,
    placeholder = "Default",
  } = props;
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    setValue(filledValue);
  }, [filledValue]);
  return (
    <Dropdown
      options={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ]}
      value={value}
      onChange={handleChange}
      size={size || "medium"}
      disabled={disabled}
      name="dropdown"
      placeholder={placeholder}
      isError={isError}
    />
  );
};

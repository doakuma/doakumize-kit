import { useState } from "react";
import { Input } from "../../ui";
import { useShowcaseActionPanel } from "./useShowcaseActionPanel";

const ValidationWithActionPanel = () => {
  const [value, setValue] = useState("");
  const { ActionPanel, logAction } = useShowcaseActionPanel({
    title: "onChange payload",
  });

  const handleChange = (event) => {
    setValue(event.target.value);
    logAction(event);
  };

  const errorMessage =
    value.length === 0
      ? "값을 입력해주세요"
      : value.includes("@")
      ? ""
      : "이메일 형식을 확인해주세요";

  return (
    <>
      <Input
        type="email"
        name="validationEmail"
        size="medium"
        value={value}
        placeholder="name@example.com"
        error={errorMessage}
        onChange={handleChange}
      />
      <ActionPanel />
    </>
  );
};

export default ValidationWithActionPanel;

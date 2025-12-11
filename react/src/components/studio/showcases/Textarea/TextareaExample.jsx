import { useState } from "react";
import { TextArea } from "../../../ui";

export const TextAreaExample = (props) => {
  const { id, name, isError, value, disabled, readOnly, rows, maxLength } =
    props;
  const [text, setText] = useState(value);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <TextArea
      id={id}
      name={name}
      value={text}
      onChange={handleChange}
      isError={isError}
      disabled={disabled}
      readOnly={readOnly}
      rows={rows}
      maxLength={maxLength}
    />
  );
};

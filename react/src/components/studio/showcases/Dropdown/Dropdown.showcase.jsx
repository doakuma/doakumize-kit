import { Dropdown } from "@/components/ui";
import { DropDownExample } from "./DropDownExample";
export const dropdownShowcase = {
  title: "Dropdown",
  description: "다양한 스타일과 상태를 지원하는 드롭다운 컴포넌트입니다.",
  useage: `import { Dropdown } from "@doakumize-kit/react";`,
  property: [
    {
      title: "State",
      description:
        "드롭다운의 다양한 상태를 지원합니다. 기본 상태, 활성화 상태, 비활성화 상태, 읽기 전용 상태를 지원합니다.",
      items: [
        {
          name: "Default",
          component: <DropDownExample />,
          code: `import { useState, useEffect } from "react";
import { Dropdown } from "@/components/ui";
export const DropDownExample = (props) => {
  const { filledValue, isError } = props;
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
      size="medium"
      disabled={false}
      name="dropdown"
      placeholder="Select"
      isError={isError}
    />
  );
};`,
        },
        {
          name: "Filled",
          component: <DropDownExample filledValue="option1" />,
          code: ` `,
        },
        {
          name: "Error",
          component: <DropDownExample filledValue="option1" isError={true} />,
          code: ` `,
        },
        {
          name: "Disabled",
          component: <DropDownExample disabled={true} placeholder="Disabled" />,
          code: ` `,
        },
      ],
    },
    {
      title: "Size",
      description:
        "드롭다운의 크기를 조절할 수 있습니다. small, medium, large 세 가지 크기를 지원합니다.",
      items: [
        {
          name: "Small",
          component: <DropDownExample size="small" placeholder="Small" />,
          code: `<Dropdown
      options={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ]}
      value={value}
      onChange={handleChange}
      size="small" // size="small" | size="medium" | size="large"
      disabled={false}
      name="dropdown"
      placeholder="Select"
      isError={isError}`,
        },
        {
          name: "Medium",
          component: <DropDownExample size="medium" placeholder="Medium" />,
          code: ` `,
        },
        {
          name: "Large",
          component: <DropDownExample size="large" placeholder="Large" />,
          code: ` `,
        },
      ],
    },
  ],
  props: [
    {
      propName: "name",
      type: "string",
      isRequired: true,
      defaultValue: "dropdown",
      description: "드롭다운 이름",
    },
    {
      propName: "value",
      type: "string",
      isRequired: false,
      defaultValue: "",
      description: "드롭다운 값",
    },
    {
      propName: "onChange",
      type: "function",
      isRequired: false,
      defaultValue: () => {},
      description: "드롭다운 값 변경 시 호출되는 함수",
    },
    {
      propName: "disabled",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "드롭다운 비활성화 여부",
    },
    {
      propName: "size",
      type: "oneOf",
      isRequired: false,
      defaultValue: "medium",
      description: "드롭다운 크기 (small, medium, large)",
    },
    {
      propName: "placeholder",
      type: "string",
      isRequired: false,
      defaultValue: "Select",
      description: "드롭다운 플레이스홀더",
    },
    {
      propName: "isError",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "드롭다운 에러 여부",
    },
    {
      propName: "options",
      type: "array",
      isRequired: true,
      defaultValue: [],
      description: "드롭다운 옵션 배열 (각 항목은 value와 label 속성을 가짐)",
      items: [
        {
          name: "value",
          type: "string",
          isRequired: true,
          defaultValue: "",
          description: "드롭다운 옵션 값",
        },
        {
          name: "label",
          type: "string",
          isRequired: true,
          defaultValue: "",
          description: "드롭다운 옵션 라벨",
        },
      ],
    },
  ],
};

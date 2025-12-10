import { Checkbox } from "@/components/ui";
import { CheckboxGroupExample } from "./CheckboxGroupExample";

export const checkboxShowcase = {
  title: "Checkbox",
  description: "다양한 스타일과 크기를 지원하는 체크박스 컴포넌트입니다.",
  useage: `// Checkbox \nimport { Checkbox } from "@doakumize-kit/react";\n// CheckBoxGroup \nimport { CheckBoxGroup } from "@doakumize-kit/react";`,
  property: [
    {
      title: "State",
      description:
        "체크박스의 다양한 상태를 지원합니다. 기본 상태, 체크된 상태, 비활성화 상태, 읽기 전용 상태를 지원합니다.",
      items: [
        {
          name: "Default",
          component: (
            <Checkbox
              name="checkbox-default"
              id="checkbox-default"
              value="checkbox"
              onChange={() => {}}
              label="Default"
            />
          ),
          code: `<Checkbox name="checkbox-default" id="checkbox-default" value="checkbox" onChange={() => {}} label="체크박스" />`,
        },
        {
          name: "Default Checked",
          component: (
            <Checkbox
              name="checkbox-checked"
              id="checkbox-checked"
              value="checkbox"
              onChange={() => {}}
              defaultChecked={true}
              label="Checked"
            />
          ),
          code: `<Checkbox name="checkbox-checked" id="checkbox-checked" value="checkbox" onChange={() => {}} checked={true} label="체크박스" />`,
        },
        {
          name: "Disabled",
          component: (
            <Checkbox
              name="checkbox-disabled"
              id="checkbox-disabled"
              value="checkbox"
              onChange={() => {}}
              disabled={true}
              label="Disabled"
            />
          ),
          code: `<Checkbox name="checkbox-disabled" id="checkbox-disabled" value="checkbox" onChange={() => {}} disabled={true} label="체크박스" />`,
        },
      ],
    },
    {
      title: "Size",
      description:
        "체크박스의 크기를 조절할 수 있습니다. small, medium, large 세 가지 크기를 지원합니다.",
      items: [
        {
          name: "Small",
          component: (
            <Checkbox
              name="checkbox-small"
              id="checkbox-small"
              value="checkbox"
              onChange={() => {}}
              label="Small"
              size="small"
            />
          ),
        },
        {
          name: "Medium",
          component: (
            <Checkbox
              name="checkbox-medium"
              id="checkbox-medium"
              value="checkbox"
              onChange={() => {}}
              label="Medium"
              size="medium"
            />
          ),
        },
        {
          name: "Large",
          component: (
            <Checkbox
              name="checkbox-large"
              id="checkbox-large"
              value="checkbox"
              onChange={() => {}}
              label="Large"
              size="large"
            />
          ),
        },
      ],
    },
    {
      title: "Group",
      description:
        "체크박스 그룹을 생성할 수 있습니다. 전체 선택, 개별 체크박스, 그룹 내 체크박스를 지원합니다.",
      items: [
        {
          name: "Default",
          component: <CheckboxGroupExample />,
          code: `<CheckBoxGroup name="checkbox-group" value={[]} onChange={() => {}} options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
          ]} />`,
        },
        {
          name: "Default",
          component: <CheckboxGroupExample direction="horizontal" />,
          code: `<CheckBoxGroup name="checkbox-group" value={[]} onChange={() => {}} options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
          ]} />`,
        },
      ],
    },
  ],
  props: [
    {
      propName: "name",
      type: "string",
      isRequired: true,
      defaultValue: "",
      description: "체크박스의 이름입니다.",
    },
    {
      propName: "id",
      type: "string",
      isRequired: true,
      defaultValue: "",
      description: "체크박스의 id입니다.",
    },
    {
      propName: "value",
      type: "string",
      isRequired: true,
      defaultValue: "",
      description: "체크박스의 값입니다.",
    },
    {
      propName: "onChange",
      type: "function",
      isRequired: true,
      defaultValue: () => {},
      description: "체크박스의 값이 변경될 때 호출되는 함수입니다.",
    },
    {
      propName: "checked",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "체크박스의 체크 상태입니다.",
    },
    {
      propName: "disabled",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "체크박스의 비활성화 상태입니다.",
    },
    {
      propName: "label",
      type: "string",
      isRequired: true,
      defaultValue: "",
      description: "체크박스의 라벨입니다.",
    },
    {
      propName: "size",
      type: "oneOf",
      isRequired: false,
      defaultValue: "medium",
      description: "체크박스의 크기입니다. small, medium, large 중 하나입니다.",
    },
  ],
};

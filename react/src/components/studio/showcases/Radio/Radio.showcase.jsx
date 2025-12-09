import { Radio } from "@/components/ui";
import { RadioGroupExample } from "./RadioGroupExample";
export const radioShowcase = {
  title: "Radio",
  description: "다양한 스타일과 크기를 지원하는 라디오 버튼 컴포넌트입니다.",
  useage: `import { Radio } from "@doakumize-kit/react";`,
  property: [
    {
      title: "State",
      description:
        "라디오 버튼의 다양한 상태를 지원합니다. 기본 상태, 선택된 상태, 비활성화 상태, 읽기 전용 상태를 지원합니다.",
      items: [
        {
          name: "Default",
          component: (
            <Radio
              name="radio-default"
              id="radio-default"
              value="radio"
              onChange={() => {}}
              label="Default"
            />
          ),
          code: `<Radio name="radio-default" id="radio-default" value="radio" onChange={() => {}} label="Default" />`,
        },
        {
          name: "Checked",
          component: (
            <Radio
              name="radio-checked"
              id="radio-checked"
              value="radio"
              onChange={() => {}}
              checked={true}
              label="Checked"
            />
          ),
          code: `<Radio name="radio-checked" id="radio-checked" value="radio" onChange={() => {}} checked={true} label="Checked" />`,
        },
        {
          name: "Disabled",
          component: (
            <Radio
              name="radio-disabled"
              id="radio-disabled"
              value="radio"
              onChange={() => {}}
              disabled={true}
              label="Disabled"
            />
          ),
          code: `<Radio name="radio-disabled" id="radio-disabled" value="radio" onChange={() => {}} disabled={true} label="Disabled" />`,
        },
        {
          name: "Disabled + Checked",
          component: (
            <Radio
              name="radio-disabled-checked"
              id="radio-disabled-checked"
              value="radio"
              onChange={() => {}}
              disabled={true}
              checked={true}
              label="Disabled + Checked"
            />
          ),
          code: `<Radio name="radio-disabled-checked" id="radio-disabled-checked" value="radio" onChange={() => {}} disabled={true} checked={true} label="Disabled + Checked" />`,
        },
      ],
    },
    {
      title: "Sizes",
      description:
        "라디오 버튼의 크기를 조절할 수 있습니다. small, medium, large 세 가지 크기를 지원합니다.",
      items: [
        {
          name: "Small",
          component: (
            <Radio
              name="radio-small"
              id="radio-small"
              value="radio"
              onChange={() => {}}
              label="Small"
              size="small"
            />
          ),
        },
        {
          name: "Medium",
          component: (
            <Radio
              name="radio-medium"
              id="radio-medium"
              value="radio"
              onChange={() => {}}
              label="Medium"
              size="medium"
            />
          ),
        },
        {
          name: "Large",
          component: (
            <Radio
              name="radio-large"
              id="radio-large"
              value="radio"
              onChange={() => {}}
              label="Large"
              size="large"
            />
          ),
        },
      ],
    },
    {
      title: "Radio Group",
      description:
        "라디오 버튼 그룹을 생성할 수 있습니다. vertical, horizontal 두 가지 방향을 지원합니다.",
      items: [
        {
          name: "Vertical",
          component: <RadioGroupExample direction="vertical" />,
        },
        {
          name: "Horizontal",
          component: <RadioGroupExample direction="horizontal" />,
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
      description: "라디오 버튼의 이름입니다.",
    },
    {
      propName: "id",
      type: "string",
      isRequired: true,
      defaultValue: "",
      description: "라디오 버튼의 id입니다.",
    },
    {
      propName: "value",
      type: "string",
      isRequired: true,
      defaultValue: "",
      description: "라디오 버튼의 값입니다.",
    },
    {
      propName: "onChange",
      type: "function",
      isRequired: true,
      defaultValue: () => {},
      description: "라디오 버튼의 값이 변경될 때 호출되는 함수입니다.",
    },
    {
      propName: "checked",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "라디오 버튼의 체크 상태입니다.",
    },
    {
      propName: "disabled",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "라디오 버튼의 비활성화 상태입니다.",
    },
    {
      propName: "label",
      type: "string",
      isRequired: true,
      defaultValue: "",
      description: "라디오 버튼의 라벨입니다.",
    },
    {
      propName: "size",
      type: "oneOf",
      isRequired: false,
      defaultValue: "medium",
      description:
        "라디오 버튼의 크기입니다. small, medium, large 중 하나입니다.",
    },
    {
      propName: "options",
      type: "array",
      isRequired: true,
      defaultValue: [],
      description: "라디오 버튼의 옵션입니다.",
    },
    {
      propName: "direction",
      type: "oneOf",
      isRequired: false,
      defaultValue: "vertical",
      description:
        "라디오 버튼 그룹의 방향입니다. vertical, horizontal 중 하나입니다.",
    },
    {
      propName: "label",
      type: "string",
      isRequired: true,
      defaultValue: "",
      description: "라디오 버튼 그룹의 라벨입니다.",
    },
  ],
};

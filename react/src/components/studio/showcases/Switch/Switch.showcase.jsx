import { Switch } from "@/components/ui";
export const switchShowcase = {
  title: "Switch",
  description: "스위치 컴포넌트입니다.",
  useage: `import { Switch } from "@doakumize-kit/react";`,
  property: [
    {
      title: "State",
      description: "스위치의 상태를 지원합니다.",
      items: [
        {
          name: "Default",
          component: (
            <Switch
              id="switch-default"
              name="switch-default"
              value="switch"
              onChange={() => {}}
            />
          ),
        },
        {
          name: "Checked",
          component: (
            <Switch
              id="switch-checked"
              name="switch-checked"
              value="switch"
              onChange={() => {}}
              checked={true}
            />
          ),
        },
        {
          name: "Disabled",
          component: (
            <Switch
              id="switch-disabled"
              name="switch-disabled"
              value="switch"
              onChange={() => {}}
              disabled={true}
            />
          ),
        },
        {
          name: "Disabled Checked ",
          component: (
            <Switch
              id="switch-disabled-checked"
              name="switch-disabled-checked"
              value="switch"
              onChange={() => {}}
              checked={true}
              disabled={true}
            />
          ),
        },
      ],
    },
    {
      title: "Labels",
      description: "스위치의 라벨을 지원합니다.",
      items: [
        {
          name: "Left Label",
          component: (
            <Switch
              id="switch-left-label"
              name="switch-left-label"
              value="switch"
              onChange={() => {}}
              label={["Left Label"]}
              labelPosition="left"
            />
          ),
        },
        {
          name: "Right Label",
          component: (
            <Switch
              id="switch-right-label"
              name="switch-right-label"
              value="switch"
              onChange={() => {}}
              label={["Right Label"]}
              labelPosition="right"
            />
          ),
        },
        {
          name: "Both Labels",
          component: (
            <Switch
              id="switch-both-labels"
              name="switch-both-labels"
              value="switch"
              onChange={() => {}}
              label={["Left Label", "Right Label"]}
              labelPosition="both"
            />
          ),
        },
      ],
    },
  ],
  props: [
    {
      propName: "id",
      type: "string",
      isRequired: true,
      defaultValue: "",
      description: "스위치의 id입니다.",
    },
    {
      propName: "name",
      type: "string",
      isRequired: true,
      defaultValue: "",
      description: "스위치의 이름입니다.",
    },
    {
      propName: "value",
      type: "string",
      isRequired: true,
      defaultValue: "",
      description: "스위치의 값입니다.",
    },
    {
      propName: "onChange",
      type: "function",
      isRequired: true,
      defaultValue: () => {},
      description: "스위치의 값이 변경될 때 호출되는 함수입니다.",
    },
    {
      propName: "disabled",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "스위치의 비활성화 여부입니다.",
    },
    {
      propName: "checked",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "스위치의 체크 상태입니다.",
    },
    {
      propName: "defaultChecked",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "스위치의 기본 체크 상태입니다.",
    },
    {
      propName: "label",
      type: "arrayOf(string)",
      isRequired: false,
      defaultValue: [],
      description:
        "스위치의 라벨입니다. 배열로 전달하며, labelPosition이 'both'일 때는 [leftLabel, rightLabel] 형식으로 전달합니다.",
    },
    {
      propName: "size",
      type: "oneOf",
      isRequired: false,
      defaultValue: "medium",
      description: "스위치의 크기입니다. small, medium, large 중 하나입니다.",
    },
    {
      propName: "labelPosition",
      type: "oneOf",
      isRequired: false,
      defaultValue: "right",
      description:
        "스위치의 라벨 위치입니다. left, right, both 중 하나입니다. 'both'일 때는 label 배열의 첫 번째 요소가 왼쪽, 두 번째 요소가 오른쪽에 표시됩니다.",
    },
  ],
};

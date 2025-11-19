import { Button } from "./Button";
import { Icon } from "../Icon/Icon";
/**
 * Button Component Showcase Data
 */
export const buttonShowcase = {
  title: "Button",
  description: "다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.",
  useage: `import { Button } from "@doakumize-kit/react";`,
  property: [
    {
      title: "Variants",
      description:
        "버튼의 다양한 스타일 변형입니다. 용도와 중요도에 따라 적절한 variant를 선택할 수 있습니다.",
      items: [
        {
          name: "Primary",
          component: <Button variant="primary">Primary</Button>,
        },
        {
          name: "Secondary",
          component: <Button variant="secondary">Secondary</Button>,
        },
        {
          name: "Default",
          component: <Button variant="default">Default</Button>,
        },
        {
          name: "Ghost",
          component: <Button variant="ghost">Ghost</Button>,
        },
        { name: "Text", component: <Button variant="text">Text</Button> },
        {
          name: "Point",
          component: <Button variant="point">Point</Button>,
        },
        {
          name: "Point Secondary",
          component: <Button variant="point-secondary">Point Secondary</Button>,
        },
      ],
    },
    {
      title: "Sizes",
      description:
        "버튼의 크기를 조절할 수 있습니다. small, medium, large 세 가지 크기를 지원합니다.",
      items: [
        { name: "Small", component: <Button size="small">Small</Button> },
        {
          name: "Medium",
          component: <Button size="medium">Medium</Button>,
        },
        { name: "Large", component: <Button size="large">Large</Button> },
      ],
    },
    {
      title: "With Icons",
      description:
        "버튼에 아이콘을 추가할 수 있습니다. startIcon으로 시작 부분에, endIcon으로 끝 부분에 아이콘을 배치할 수 있습니다.",
      items: [
        {
          name: "Start Icon",
          component: (
            <Button startIcon={<Icon name="arrow-left" />}>Start Icon</Button>
          ),
        },
        {
          name: "End Icon",
          component: (
            <Button endIcon={<Icon name="arrow-right" />}>End Icon</Button>
          ),
        },
        {
          name: "Only Icon",
          component: <Button startIcon={<Icon name="arrow-right" />}></Button>,
        },
      ],
    },
    {
      title: "States",
      description:
        "버튼의 상태를 제어할 수 있습니다. disabled로 비활성화하거나, circle로 원형 버튼을 만들 수 있습니다.",
      items: [
        { name: "Disabled", component: <Button disabled>Disabled</Button> },
        { name: "Circle", component: <Button circle>○</Button> },
      ],
    },
  ],
  propTypes: Button.propTypes,
  defaultProps: Button.defaultProps,
  propDescriptions: {
    variant:
      "버튼 스타일 (primary, secondary, default, ghost, text, point, point-secondary)",
    size: "버튼 크기 (small, medium, large)",
    disabled: "비활성화 여부",
    circle: "원형 버튼 여부",
    startIcon: "시작 아이콘",
    endIcon: "끝 아이콘",
    children: "버튼 텍스트",
  },
};

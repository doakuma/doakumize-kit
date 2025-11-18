import { Button } from "./Button";
import { parsePropTypes } from "@/utils/propTypesParser";

/**
 * Button Component Showcase Data
 */
export const buttonShowcase = {
  title: "Button",
  description: "다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.",
  variants: [
    {
      title: "Variants",
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
      title: "States",
      items: [
        { name: "Disabled", component: <Button disabled>Disabled</Button> },
        { name: "Circle", component: <Button circle>○</Button> },
      ],
    },
  ],
  props: parsePropTypes(Button.propTypes, Button.defaultProps, {
    variant:
      "버튼 스타일 (primary, secondary, default, ghost, text, point, point-secondary)",
    size: "버튼 크기 (small, medium, large)",
    disabled: "비활성화 여부",
    circle: "원형 버튼 여부",
    startIcon: "시작 아이콘",
    endIcon: "끝 아이콘",
    children: "버튼 텍스트",
  }),
  codeExample: `import { Button } from "@doakumize-kit/react";

function App() {
  return (
    <div>
      <Button variant="primary" size="medium">
        Click me
      </Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
    </div>
  );
}`,
};

import { Icon } from "@/components/ui";

/**
 * Icon Component Showcase Data
 */
export const iconShowcase = {
  title: "Icon",
  description: "다양한 크기를 지원하는 아이콘 컴포넌트입니다.",
  useage: `import { Icon } from "@doakumize-kit/react";`,
  property: [
    {
      title: "Icons",
      description:
        "사용 가능한 다양한 아이콘들입니다. 화살표 방향에 따라 다른 아이콘을 표시할 수 있습니다.",
      items: [
        {
          name: "Arrow Left",
          component: <Icon name="arrow-left" />,
          code: `<Icon name="arrow-left" />`,
        },
        {
          name: "Arrow Right",
          component: <Icon name="arrow-right" />,
          code: `<Icon name="arrow-right" />`,
        },
        {
          name: "Arrow Up",
          component: <Icon name="arrow-up" />,
          code: `<Icon name="arrow-up" />`,
        },
        {
          name: "Arrow Down",
          component: <Icon name="arrow-down" />,
          code: `<Icon name="arrow-down" />`,
        },
        {
          name: "Arrow Up Right",
          component: <Icon name="arrow-up-right" />,
          code: `<Icon name="arrow-up-right" />`,
        },
        {
          name: "Arrow Down Right",
          component: <Icon name="arrow-down-right" />,
          code: `<Icon name="arrow-down-right" />`,
        },
      ],
    },
    {
      title: "Sizes",
      description:
        "아이콘의 크기를 조절할 수 있습니다. small, medium, large 세 가지 크기를 지원합니다.",
      items: [
        {
          name: "Small",
          component: <Icon name="arrow-right" size="small" />,
          code: `<Icon name="arrow-right" size="small" />`,
        },
        {
          name: "Medium",
          component: <Icon name="arrow-right" size="medium" />,
          code: `<Icon name="arrow-right" size="medium" />`,
        },
        {
          name: "Large",
          component: <Icon name="arrow-right" size="large" />,
          code: `<Icon name="arrow-right" size="large" />`,
        },
      ],
    },
  ],
  props: [
    {
      propName: "name",
      type: "oneOf",
      isRequired: false,
      defaultValue: "icon",
      description:
        "아이콘 이름 (arrow-left, arrow-right, arrow-up, arrow-down, arrow-up-right, arrow-down-right)",
    },
    {
      propName: "size",
      type: "oneOf",
      isRequired: false,
      defaultValue: "medium",
      description: "아이콘 크기 (small, medium, large)",
    },
  ],
};

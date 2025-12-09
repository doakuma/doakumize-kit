import { Chip } from "@/components/ui/Chip";

/**
 * Chip Component Showcase Data
 */
export const chipShowcase = {
  title: "Chip",
  description: "다양한 스타일과 상태를 지원하는 칩 컴포넌트입니다.",
  useage: `import { Chip } from "@doakumize-kit/react";`,
  property: [
    {
      title: "Variants",
      description:
        "칩의 다양한 스타일 변형입니다. 용도에 따라 적절한 variant를 선택할 수 있습니다.",
      items: [
        {
          name: "Default",
          component: <Chip variant="default">Default</Chip>,
          code: `<Chip variant="default">Default</Chip>`,
        },
        {
          name: "Selected",
          component: <Chip variant="selected">Selected</Chip>,
          code: `<Chip variant="selected">Selected</Chip>`,
        },
        {
          name: "Disabled",
          component: <Chip variant="disabled">Disabled</Chip>,
          code: `<Chip variant="disabled">Disabled</Chip>`,
        },
        {
          name: "Clickable",
          component: <Chip variant="clickable">Clickable</Chip>,
          code: `<Chip variant="clickable">Clickable</Chip>`,
        },
      ],
    },
    {
      title: "Sizes",
      description:
        "칩의 크기를 조절할 수 있습니다. small, medium, large 세 가지 크기를 지원합니다.",
      items: [
        {
          name: "Small",
          component: (
            <Chip variant="default" size="small">
              Small
            </Chip>
          ),
          code: `<Chip variant="default" size="small">Small</Chip>`,
        },
        {
          name: "Medium",
          component: (
            <Chip variant="default" size="medium">
              Medium
            </Chip>
          ),
          code: `<Chip variant="default" size="medium">Medium</Chip>`,
        },
        {
          name: "Large",
          component: (
            <Chip variant="default" size="large">
              Large
            </Chip>
          ),
          code: `<Chip variant="default" size="large">Large</Chip>`,
        },
      ],
    },
    {
      title: "Colors",
      description:
        "칩에 다양한 색상을 적용할 수 있습니다. primary, secondary 등 다양한 색상 옵션을 지원합니다.",
      items: [
        {
          name: "Primary",
          component: (
            <Chip variant="default" color="primary">
              Primary
            </Chip>
          ),
          code: `<Chip variant="default" color="primary">Primary</Chip>`,
        },
        {
          name: "Secondary",
          component: (
            <Chip variant="default" color="secondary">
              Secondary
            </Chip>
          ),
          code: `<Chip variant="default" color="secondary">Secondary</Chip>`,
        },
        {
          name: "Tertiary",
          component: (
            <Chip variant="default" color="tertiary">
              Tertiary
            </Chip>
          ),
          code: `<Chip variant="default" color="tertiary">Tertiary</Chip>`,
        },
      ],
    },
    {
      title: "States",
      description:
        "칩의 상태를 제어할 수 있습니다. rounded로 둥근 모서리를 적용하거나, selected와 함께 사용할 수 있습니다.",
      items: [
        {
          name: "Rounded",
          component: (
            <Chip variant="default" rounded>
              Rounded
            </Chip>
          ),
          code: `<Chip variant="default" rounded>Rounded</Chip>`,
        },
        {
          name: "Selected",
          component: (
            <Chip variant="default" selected>
              Selected
            </Chip>
          ),
          code: `<Chip variant="default" selected>Selected</Chip>`,
        },
        {
          name: "Clickable",
          component: (
            <Chip variant="default" clickable>
              Clickable
            </Chip>
          ),
          code: `<Chip variant="default" clickable>Clickable</Chip>`,
        },
        {
          name: "Removable",
          component: (
            <Chip variant="default" removable>
              Removable
            </Chip>
          ),
          code: `<Chip variant="default" removable>Removable</Chip>`,
        },
      ],
    },
  ],
  props: [
    {
      propName: "variant",
      type: "oneOf",
      isRequired: true,
      defaultValue: "default",
      description: "칩 스타일 (default, selected, disabled, clickable)",
    },
    {
      propName: "children",
      type: "ReactNode",
      isRequired: true,
      defaultValue: null,
      description: "칩 텍스트",
    },
    {
      propName: "rounded",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "둥근 모서리 여부",
    },
    {
      propName: "selected",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "선택된 상태 여부",
    },
    {
      propName: "disabled",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "비활성화 여부",
    },
    {
      propName: "clickable",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "클릭 가능 여부",
    },
    {
      propName: "removable",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "제거 가능 여부",
    },
    {
      propName: "color",
      type: "oneOf",
      isRequired: false,
      defaultValue: "",
      description:
        "칩 색상 (primary, secondary, tertiary, quaternary, quinary, senary, septenary, octonary, nonary, denary)",
    },
    {
      propName: "size",
      type: "oneOf",
      isRequired: false,
      defaultValue: "medium",
      description: "칩 크기 (small, medium, large)",
    },
  ],
};

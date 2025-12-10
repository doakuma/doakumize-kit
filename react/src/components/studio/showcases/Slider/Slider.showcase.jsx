import { Slider } from "@/components/ui";
export const sliderShowcase = {
  title: "Slider",
  description: "슬라이더 컴포넌트입니다.",
  useage: `import { Slider } from "@doakumize-kit/react";`,
  property: [
    {
      title: "State",
      description: "슬라이더의 상태를 지원합니다.",
      items: [
        {
          name: "Default",
          component: (
            <Slider
              value={50}
              min={0}
              max={100}
              step={1}
              unit="tokens/minute"
              name="slider"
            />
          ),
        },
        {
          name: "Disabled",
          component: (
            <Slider
              value={50}
              min={0}
              max={100}
              step={1}
              unit="tokens/minute"
              disabled
              name="slider-disabled"
            />
          ),
        },
      ],
    },
  ],
  props: [
    {
      propName: "name",
      type: "string",
      isRequired: true,
      defaultValue: "slider",
      description: "슬라이더의 이름입니다.",
    },
    {
      propName: "onChange",
      type: "function",
      isRequired: false,
      defaultValue: () => {},
      description: "슬라이더의 값이 변경될 때 호출되는 함수입니다.",
    },
    {
      propName: "value",
      type: "number",
      isRequired: true,
      defaultValue: 0,
      description: "슬라이더의 값입니다.",
    },
    {
      propName: "min",
      type: "number",
      isRequired: true,
      defaultValue: 0,
      description: "슬라이더의 최소값입니다.",
    },
    {
      propName: "max",
      type: "number",
      isRequired: true,
      defaultValue: 100,
      description: "슬라이더의 최대값입니다.",
    },
    {
      propName: "step",
      type: "number",
      isRequired: false,
      defaultValue: 1,
      description: "슬라이더의 스텝값입니다.",
    },
    {
      propName: "disabled",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "슬라이더의 비활성화 여부입니다.",
    },
    {
      propName: "unit",
      type: "string",
      isRequired: false,
      defaultValue: "",
      description: "슬라이더의 유닛입니다.",
    },
  ],
};

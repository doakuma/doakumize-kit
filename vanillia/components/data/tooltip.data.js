/**
 * Tooltip Component Data
 * 툴팁 컴포넌트 데이터
 * wrapper로 감싼 요소에 호버 시 툴팁이 표시됩니다.
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Tooltip 데이터 등록
window.ComponentData.tooltip = {
  type: "tooltip",
  id: "componentTooltip",
  title: "Tooltip Components",
  description:
    "호버 시 추가 정보를 표시하는 툴팁 컴포넌트입니다. wrapper로 감싼 자식 요소가 트리거가 되며, 하나의 popper가 동적으로 생성/제거됩니다.",
  variants: [
    {
      title: "기본 툴팁 - 위치별",
      description:
        "12가지 위치 옵션을 지원합니다. wrapper 속성으로 툴팁 설정이 가능합니다.",
      items: [
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="상단 왼쪽 툴팁"
  data-tooltip-position="tl"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Top Left</button>
</div>`,
          label: "tl (top-left)",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="상단 중앙 툴팁"
  data-tooltip-position="tm"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Top Middle</button>
</div>`,
          label: "tm (top-middle)",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="상단 오른쪽 툴팁"
  data-tooltip-position="tr"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Top Right</button>
</div>`,
          label: "tr (top-right)",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="우측 상단 툴팁"
  data-tooltip-position="rt"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Right Top</button>
</div>`,
          label: "rt (right-top)",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="우측 중앙 툴팁"
  data-tooltip-position="rm"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Right Middle</button>
</div>`,
          label: "rm (right-middle)",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="우측 하단 툴팁"
  data-tooltip-position="rb"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Right Bottom</button>
</div>`,
          label: "rb (right-bottom)",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="하단 오른쪽 툴팁"
  data-tooltip-position="br"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Bottom Right</button>
</div>`,
          label: "br (bottom-right)",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="하단 중앙 툴팁"
  data-tooltip-position="bm"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Bottom Middle</button>
</div>`,
          label: "bm (bottom-middle)",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="하단 왼쪽 툴팁"
  data-tooltip-position="bl"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Bottom Left</button>
</div>`,
          label: "bl (bottom-left)",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="좌측 하단 툴팁"
  data-tooltip-position="lb"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Left Bottom</button>
</div>`,
          label: "lb (left-bottom)",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="좌측 중앙 툴팁"
  data-tooltip-position="lm"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Left Middle</button>
</div>`,
          label: "lm (left-middle)",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="좌측 상단 툴팁"
  data-tooltip-position="lt"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Left Top</button>
</div>`,
          label: "lt (left-top)",
        },
      ],
    },
    {
      title: "화살표 옵션",
      description: "hasArrow 옵션으로 화살표 표시 여부를 제어할 수 있습니다.",
      items: [
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="화살표가 있는 툴팁"
  data-tooltip-position="tm"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--primary btn--medium">With Arrow</button>
</div>`,
          label: "hasArrow: true",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="화살표가 없는 툴팁"
  data-tooltip-position="tm"
  data-tooltip-offset="8"
  data-tooltip-arrow="false"
>
  <button class="btn btn--primary btn--medium">Without Arrow</button>
</div>`,
          label: "hasArrow: false",
        },
      ],
    },
    {
      title: "오프셋 간격 조절",
      description:
        "offset 속성으로 wrapper와 툴팁 사이의 간격을 조절할 수 있습니다.",
      items: [
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="작은 간격 (4px)"
  data-tooltip-position="tm"
  data-tooltip-offset="4"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Small Offset</button>
</div>`,
          label: "offset: 4px",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="기본 간격 (8px)"
  data-tooltip-position="tm"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Default Offset</button>
</div>`,
          label: "offset: 8px (기본)",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="큰 간격 (16px)"
  data-tooltip-position="tm"
  data-tooltip-offset="16"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Large Offset</button>
</div>`,
          label: "offset: 16px",
        },
      ],
    },
    {
      title: "다양한 트리거 요소",
      description:
        "wrapper 내부의 어떤 자식 요소든 툴팁 트리거가 될 수 있습니다.",
      items: [
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="버튼에 대한 툴팁"
  data-tooltip-position="tm"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--primary btn--medium">Button Trigger</button>
</div>`,
          label: "버튼 요소",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="링크에 대한 툴팁"
  data-tooltip-position="tm"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <a href="#" class="text-link">Link Trigger</a>
</div>`,
          label: "링크 요소",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="아이콘에 대한 툴팁"
  data-tooltip-position="tm"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <i class="icon icon--medium icon--info" style="cursor: pointer;"></i>
</div>`,
          label: "아이콘 요소",
        },
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="복잡한 자식 요소 구조도 가능합니다"
  data-tooltip-position="tm"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <div style="display: flex; align-items: center; gap: 8px;">
    <i class="icon icon--small icon--info"></i>
    <span>Complex Trigger</span>
  </div>
</div>`,
          label: "복잡한 구조",
        },
      ],
    },
    {
      title: "긴 텍스트 툴팁",
      description: "긴 텍스트도 자동으로 줄바꿈되어 표시됩니다.",
      items: [
        {
          preview: `<div
  class="tooltip-wrapper"
  data-tooltip-content="이것은 긴 텍스트를 가진 툴팁입니다. 자동으로 줄바꿈되어 표시되며, 최대 너비를 초과하지 않도록 조절됩니다."
  data-tooltip-position="tm"
  data-tooltip-offset="8"
  data-tooltip-arrow="true"
>
  <button class="btn btn--default btn--medium">Long Text Tooltip</button>
</div>`,
          label: "긴 텍스트 예시",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Tooltip data registered");

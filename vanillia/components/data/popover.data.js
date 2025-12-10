/**
 * Popover Component Data
 * 팝오버 컴포넌트 데이터
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Popover 데이터 등록
window.ComponentData.popover = {
  type: "popover",
  id: "componentPopover",
  title: "Popover Components",
  description:
    "호버 시 추가 정보를 표시하는 팝오버 컴포넌트입니다. 다양한 위치와 스타일을 지원합니다.",
  variants: [
    {
      title: "기본 팝오버",
      items: [
        {
          preview: `<button
  class="btn btn--default btn--medium"
  data-popover="simple"
  data-popover-title="우측 팝오버"
  data-popover-body="이것은 기본 팝오버입니다. 우측 중앙에 표시됩니다."
  data-popover-origin="right-center">
  우측 팝오버 (hover)
</button>`,
          label: "right-center (기본)",
        },
        {
          preview: `<button
  class="btn btn--default btn--medium"
  data-popover="simple"
  data-popover-title="하단 팝오버"
  data-popover-body="버튼 하단 중앙에 표시되는 팝오버입니다."
  data-popover-origin="bottom-center">
  하단 팝오버 (hover)
</button>`,
          label: "bottom-center",
        },
        {
          preview: `<button
  class="btn btn--default btn--medium"
  data-popover="simple"
  data-popover-title="상단 팝오버"
  data-popover-body="버튼 상단 중앙에 표시되는 팝오버입니다."
  data-popover-origin="top-center">
  상단 팝오버 (hover)
</button>`,
          label: "top-center",
        },
        {
          preview: `<button
  class="btn btn--default btn--medium"
  data-popover="simple"
  data-popover-title="좌측 팝오버"
  data-popover-body="버튼 좌측 중앙에 표시되는 팝오버입니다."
  data-popover-origin="left-center">
  좌측 팝오버 (hover)
</button>`,
          label: "left-center",
        },
      ],
    },
    {
      title: "상세 정보 팝오버 (드롭다운 항목 호버용)",
      items: [
        {
          preview: `<div
  class="dropdown__item"
  data-popover="details"
  data-popover-details='[{"label":"최대 입력 토큰","value":"1M tokens"},{"label":"최대 출력 토큰","value":"8,192 tokens"},{"label":"입력 비용","value":"101.25원/1M tokens"},{"label":"출력 비용","value":"405원/1M tokens"}]'
  data-popover-origin="right-center"
  data-popover-delay="300"
  style="
    width: 300px;
    padding: 12px;
    border: 1px solid var(--gray-300);
    border-radius: 4px;
    cursor: pointer;
  ">
  GPT-5 mini (2025.08.07)
</div>`,
          label: "드롭다운 항목에 호버",
        },
        {
          preview: `<div
  class="dropdown__item"
  data-popover="details"
  data-popover-details='[{"label":"월 사용량","value":"100,000 요청"},{"label":"저장 공간","value":"50GB"},{"label":"지원","value":"이메일"},{"label":"가격","value":"₩29,000/월"}]'
  data-popover-origin="right-center"
  data-popover-delay="300"
  style="
    width: 300px;
    padding: 12px;
    border: 1px solid var(--gray-300);
    border-radius: 4px;
    cursor: pointer;
  ">
  프로 플랜
</div>`,
          label: "요금제 정보",
        },
      ],
    },
    {
      title: "팝오버 변형",
      items: [
        {
          preview: `<button
  class="btn btn--default btn--medium"
  data-popover="simple"
  data-popover-body="간결한 팝오버입니다."
  data-popover-origin="bottom-center"
  data-popover-variant="compact">
  Compact 팝오버
</button>`,
          label: "compact 사이즈",
        },
        {
          preview: `<button
  class="btn btn--default btn--medium"
  data-popover="simple"
  data-popover-title="큰 팝오버"
  data-popover-body="더 많은 정보를 담을 수 있는 큰 팝오버입니다. 긴 설명이나 복잡한 내용을 표시할 때 유용합니다."
  data-popover-origin="bottom-center"
  data-popover-variant="large">
  Large 팝오버
</button>`,
          label: "large 사이즈",
        },
        {
          preview: `<button
  class="btn btn--default btn--medium"
  data-popover="simple"
  data-popover-title="Dark 테마"
  data-popover-body="어두운 배경의 팝오버입니다."
  data-popover-origin="bottom-center"
  data-popover-theme="dark">
  Dark 팝오버
</button>`,
          label: "dark 테마",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Popover data registered");

/**
 * Chip Component Data
 * 로컬 파일 지원을 위한 데이터 파일
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Chip 데이터 등록
window.ComponentData.chip = {
  type: "chip",
  id: "componentChip",
  title: "Chip Components",
  variants: [
    {
      title: "Basic States",
      items: [
        {
          preview: '<span class="chip">Chip</span>',
          label: "default",
        },
        {
          preview: '<span class="chip chip--selected">Chip</span>',
          label: "selected",
        },
        {
          preview: '<span class="chip chip--disabled">Chip</span>',
          label: "disabled",
        },
        {
          preview: '<span class="chip chip--clickable">Chip</span>',
          label: "clickable",
        },
      ],
    },
    {
      title: "With Actions",
      items: [
        {
          preview: `<span class="chip chip--rounded">
  <span class="chip__text">Chip</span>
  <button class="chip__remove" type="button"></button>
</span>`,
          label: "removable",
        },
        {
          preview: `<span class="chip chip--rounded">
  <span class="chip__text">Chip</span>
  <button class="chip__remove" type="button"></button>
  <span class="chip__dropdown">
    <button class="chip__dropdown-item" type="button">
      <span class="chip__dropdown-item-text">Can edit</span>
      <i class="icon icon--small icon--chevron-down"></i>
    </button>
    <span class="chip__dropdown-menu">
      <span class="chip__dropdown-item">
        <span class="chip__dropdown-item-text">Can edit</span>
      </span>
      <span class="chip__dropdown-item">
        <span class="chip__dropdown-item-text">Can View</span>
      </span>
    </span>
  </span>
</span>`,
          label: "with dropdown",
        },
        {
          preview: `<button class="chip chip--rounded chip--add" type="button"></button>`,
          label: "add button",
        },
      ],
    },
    {
      title: "Rounded Chips",
      items: [
        {
          preview: '<span class="chip chip--rounded">Rounded Chip</span>',
          label: "rounded",
        },
        {
          preview:
            '<span class="chip chip--rounded chip--selected">Selected</span>',
          label: "rounded + selected",
        },
        {
          preview: `<span class="chip chip--rounded">
  <span class="chip__text">Removable</span>
  <button class="chip__remove" type="button"></button>
</span>`,
          label: "rounded + removable",
        },
        {
          preview:
            '<span class="chip chip--rounded chip--disabled">Disabled</span>',
          label: "rounded + disabled",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Chip data registered");

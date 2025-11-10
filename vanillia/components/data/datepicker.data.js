/**
 * datepicker data file
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Datepicker 데이터 등록
window.ComponentData.datepicker = {
  type: "datepicker",
  id: "componentDatepicker",
  title: "Datepicker Components",
  variants: [
    {
      title: "Datepicker States",
      items: [
        {
          preview: `<div class="input-field input-with-icon input-field--start-icon">
  <i class="icon icon--small icon--calendar input-icon"></i>
  <input type="text" class="input input--datepicker" data-picker-type="range" placeholder="입력 전" value="2025-12-31" />
</div>`,
          label: "DateRangePicker",
        },
        {
          preview: `<div class="input-field input-with-icon input-field--start-icon">
  <i class="icon icon--small icon--calendar input-icon"></i>
  <input type="text" class="input input--datepicker" placeholder="입력 전" data-picker-type="single" value="2025-12-31" />
</div>`,
          label: "Datepicker",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Datepicker data registered");

/**
 * Input Component Data
 * 로컬 파일 지원을 위한 데이터 파일
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Input 데이터 등록
window.ComponentData.input = {
  type: "input",
  id: "componentInput",
  title: "Input Components",
  variants: [
    {
      title: "Input States",
      items: [
        {
          preview: `<div class="input-field">
  <input type="text" class="input" placeholder="입력 전" />
</div>`,
          label: "입력 전 (default)",
        },
        {
          preview: `<div class="input-field">
  <input type="text" class="input" value="활성화" />
</div>`,
          label: "활성화 (focus)",
        },
        {
          preview: `<div class="input-field">
  <input type="text" class="input" value="입력 후" />
</div>`,
          label: "입력 후 (filled)",
        },
        {
          preview: `<div class="input-field input-field--error">
  <input type="text" class="input" value="에러" />
</div>`,
          label: "에러 (error)",
        },
        {
          preview: `<div class="input-field">
  <input type="text" class="input" value="비활성화" disabled />
</div>`,
          label: "비활성화 (disabled)",
        },
        {
          preview: `<div class="input-field">
  <input type="text" class="input" value="읽기전용" readonly />
</div>`,
          label: "읽기전용 (readonly)",
        },
      ],
    },
    {
      title: "Input with Close Button",
      items: [
        {
          preview: `<div class="input-field input-field--with-close">
  <input type="text" class="input" placeholder="입력 전" />
  <button type="button" class="input-addon input-addon--close"></button>
</div>`,
          label: "medium + close",
        },
        {
          preview: `<div class="input-field input-field--with-close">
  <input type="text" class="input" value="활성화" />
  <button type="button" class="input-addon input-addon--close"></button>
</div>`,
          label: "medium + close (활성화)",
        },
        {
          preview: `<div class="input-field input-field--large input-field--with-close">
  <input type="text" class="input" value="입력 후" />
  <button type="button" class="input-addon input-addon--close"></button>
</div>`,
          label: "large + close",
        },
        {
          preview: `<div class="input-field input-field--error input-field--with-close">
  <input type="text" class="input" value="에러" />
  <button type="button" class="input-addon input-addon--close"></button>
</div>`,
          label: "error + close",
        },
        {
          preview: `<div class="input-field input-field--with-close">
  <input type="text" class="input" value="비활성화" disabled />
  <button type="button" class="input-addon input-addon--close" disabled></button>
</div>`,
          label: "disabled + close",
        },
        {
          preview: `<div class="input-field input-field--with-close">
  <input type="text" class="input" value="읽기전용" readonly />
  <button type="button" class="input-addon input-addon--close"></button>
</div>`,
          label: "readonly + close",
        },
      ],
    },
    {
      title: "Input Sizes",
      items: [
        {
          preview: `<div class="input-field input-field--small">
  <input type="text" class="input" placeholder="Small 입력 필드" />
</div>`,
          label: "small",
        },
        {
          preview: `<div class="input-field">
  <input type="text" class="input" placeholder="Medium 입력 필드" />
</div>`,
          label: "medium (기본)",
        },
        {
          preview: `<div class="input-field input-field--large">
  <input type="text" class="input" placeholder="Large 입력 필드" />
</div>`,
          label: "large",
        },
        {
          preview: `<div class="input-field input-field--small input-field--with-close">
  <input type="text" class="input" value="Small with close" />
  <button type="button" class="input-addon input-addon--close"></button>
</div>`,
          label: "small + close (16x16, 8px 간격)",
        },
        {
          preview: `<div class="input-field input-field--with-close">
  <input type="text" class="input" value="Medium with close" />
  <button type="button" class="input-addon input-addon--close"></button>
</div>`,
          label: "medium + close",
        },
        {
          preview: `<div class="input-field input-field--large input-field--with-close">
  <input type="text" class="input" value="Large with close" />
  <button type="button" class="input-addon input-addon--close"></button>
</div>`,
          label: "large + close",
        },
      ],
    },
    {
      title: "Input with Chips",
      items: [
        {
          preview: `<div class="input-field input-field--with-close input-field--with-chips">
  <div class="chip-group">
    <span class="chip chip--rounded">
      <span class="chip__text">Chip</span>
      <button type="button" class="chip__remove"></button>
    </span>
    <span class="chip chip--rounded">
      <span class="chip__text">Chip</span>
      <button type="button" class="chip__remove"></button>
    </span>
    <button class="chip chip--rounded chip--add" type="button"></button>
  </div>
  <button type="button" class="input-addon input-addon--close"></button>
</div>`,
          label: "medium + chip",
        },
        {
          preview: `<div class="input-field input-field--large input-field--with-close input-field--with-chips">
  <div class="chip-group">
    <span class="chip chip--rounded">
      <span class="chip__text">Chip</span>
      <button type="button" class="chip__remove"></button>
    </span>
    <span class="chip chip--rounded">
      <span class="chip__text">Chip</span>
      <button type="button" class="chip__remove"></button>
    </span>
    <button class="chip chip--rounded chip--add" type="button"></button>
  </div>
  <button type="button" class="input-addon input-addon--close"></button>
</div>`,
          label: "large + chip",
        },
      ],
    },
    {
      title: "Textarea with Character Counter",
      items: [
        {
          preview: `<div class="input-field input-field--with-counter">
  <textarea class="input" rows="4" maxlength="500" placeholder="입력 전"></textarea>
  <span class="input-counter">0/500</span>
</div>`,
          label: "기본 상태 (placeholder)",
        },
        {
          preview: `<div class="input-field input-field--with-counter input-field--focused">
  <textarea class="input" rows="4" maxlength="500">활성화</textarea>
  <span class="input-counter">3/500</span>
</div>`,
          label: "활성화 상태 (텍스트 입력됨)",
        },
        {
          preview: `<div class="input-field input-field--with-counter">
  <textarea class="input" rows="4" maxlength="500">입력 후</textarea>
  <span class="input-counter">4/500</span>
</div>`,
          label: "입력 완료 상태",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Input data registered");

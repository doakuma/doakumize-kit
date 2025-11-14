/**
 * Checkbox Component Data
 * 체크박스 컴포넌트 데이터
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Checkbox 데이터 등록
window.ComponentData.checkbox = {
  type: "checkbox",
  id: "componentCheckbox",
  title: "Checkbox Components",
  variants: [
    {
      title: "기본 상태",
      items: [
        {
          preview: `<label class="chk">
  <input type="checkbox" class="chk__input" />
  <span class="chk__box" aria-hidden="true"></span>
  <span class="chk__label">체크박스</span>
</label>`,
          label: "default",
        },
        {
          preview: `<label class="chk">
  <input type="checkbox" class="chk__input" checked />
  <span class="chk__box" aria-hidden="true"></span>
  <span class="chk__label">체크박스</span>
</label>`,
          label: "checked",
        },
        {
          preview: `<label class="chk">
  <input type="checkbox" class="chk__input" disabled />
  <span class="chk__box" aria-hidden="true"></span>
  <span class="chk__label">체크박스</span>
</label>`,
          label: "disabled",
        },
        {
          preview: `<label class="chk">
  <input type="checkbox" class="chk__input" checked disabled />
  <span class="chk__box" aria-hidden="true"></span>
  <span class="chk__label">체크박스</span>
</label>`,
          label: "checked + disabled",
        },
      ],
    },
    {
      title: "Only checkbox",
      items: [
        {
          preview: `<label class="chk">
  <input type="checkbox" class="chk__input" />
  <span class="chk__box" aria-hidden="true"></span>
</label>`,
          label: "default",
        },
        {
          preview: `<label class="chk">
  <input type="checkbox" class="chk__input" checked />
  <span class="chk__box" aria-hidden="true"></span>
</label>`,
          label: "checked",
        },
        {
          preview: `<label class="chk">
  <input type="checkbox" class="chk__input" disabled />
  <span class="chk__box" aria-hidden="true"></span>
</label>`,
          label: "disabled",
        },
        {
          preview: `<label class="chk">
  <input type="checkbox" class="chk__input" checked disabled />
  <span class="chk__box" aria-hidden="true"></span>
</label>`,
          label: "checked + disabled",
        },
      ],
    },
    {
      title: "Checkbox Group",
      items: [
        {
          preview: `<fieldset class="chk-group" id="chkGroup1">
  <legend class="chk-group__legend">
    관심 분야 선택
  </legend>
  <div class="chk-group__items">
    <label class="chk">
      <input type="checkbox" class="chk__input chk-group__all" />
      <span class="chk__box" aria-hidden="true"></span>
      <span class="chk__label">전체 선택</span>
    </label>
    <div class="chk-group__items chk-group__items--indented">
      <label class="chk">
        <input type="checkbox" class="chk__input chk-group__item" value="design" />
        <span class="chk__box" aria-hidden="true"></span>
        <span class="chk__label">디자인</span>
      </label>
      <label class="chk">
        <input type="checkbox" class="chk__input chk-group__item" value="development" />
        <span class="chk__box" aria-hidden="true"></span>
        <span class="chk__label">개발</span>
      </label>
      <label class="chk">
        <input type="checkbox" class="chk__input chk-group__item" value="marketing" />
        <span class="chk__box" aria-hidden="true"></span>
        <span class="chk__label">마케팅</span>
      </label>
      <label class="chk">
        <input type="checkbox" class="chk__input chk-group__item" value="sales" />
        <span class="chk__box" aria-hidden="true"></span>
        <span class="chk__label">영업</span>
      </label>
    </div>
  </div>
</fieldset>`,
          label: "전체 선택 + indeterminate",
        },
        {
          preview: `<fieldset class="chk-group chk-group--horizontal">
  <legend class="chk-group__legend">
    알림 수신 동의
  </legend>
  <div class="chk-group__items">
    <label class="chk">
      <input type="checkbox" class="chk__input" value="email" />
      <span class="chk__box" aria-hidden="true"></span>
      <span class="chk__label">이메일</span>
    </label>
    <label class="chk">
      <input type="checkbox" class="chk__input" value="sms" />
      <span class="chk__box" aria-hidden="true"></span>
      <span class="chk__label">SMS</span>
    </label>
    <label class="chk">
      <input type="checkbox" class="chk__input" value="push" />
      <span class="chk__box" aria-hidden="true"></span>
      <span class="chk__label">푸시 알림</span>
    </label>
  </div>
  <p class="chk-group__helper">
    원하시는 알림 수신 방법을 선택하세요.
  </p>
</fieldset>`,
          label: "horizontal + helper text",
        },
        {
          preview: `<fieldset class="chk-group chk-group--grid">
  <legend class="chk-group__legend">
    선호하는 기능
  </legend>
  <div class="chk-group__items">
    <label class="chk">
      <input type="checkbox" class="chk__input" value="feature1" />
      <span class="chk__box" aria-hidden="true"></span>
      <span class="chk__label">자동 저장</span>
    </label>
    <label class="chk">
      <input type="checkbox" class="chk__input" value="feature2" />
      <span class="chk__box" aria-hidden="true"></span>
      <span class="chk__label">다크 모드</span>
    </label>
    <label class="chk">
      <input type="checkbox" class="chk__input" value="feature3" />
      <span class="chk__box" aria-hidden="true"></span>
      <span class="chk__label">단축키</span>
    </label>
    <label class="chk">
      <input type="checkbox" class="chk__input" value="feature4" />
      <span class="chk__box" aria-hidden="true"></span>
      <span class="chk__label">협업 기능</span>
    </label>
  </div>
</fieldset>`,
          label: "grid (2열)",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Checkbox data registered");

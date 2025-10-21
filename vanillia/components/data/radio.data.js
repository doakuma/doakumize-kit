/**
 * Radio Component Data
 * 라디오 버튼 컴포넌트 데이터
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Radio 데이터 등록
window.ComponentData.radio = {
  type: "radio",
  id: "componentRadio",
  title: "Radio Components",
  variants: [
    {
      title: "기본 상태",
      items: [
        {
          preview: `<label class="radio">
  <input type="radio" name="radio-basic" class="radio__input" />
  <span class="radio__circle" aria-hidden="true"></span>
  <span class="radio__label">라디오버튼</span>
</label>`,
          label: "default",
        },
        {
          preview: `<label class="radio">
  <input type="radio" name="radio-basic" class="radio__input" checked />
  <span class="radio__circle" aria-hidden="true"></span>
  <span class="radio__label">라디오버튼</span>
</label>`,
          label: "selected",
        },
        {
          preview: `<label class="radio">
  <input type="radio" name="radio-disabled" class="radio__input" disabled />
  <span class="radio__circle" aria-hidden="true"></span>
  <span class="radio__label">라디오버튼</span>
</label>`,
          label: "disabled",
        },
        {
          preview: `<label class="radio">
  <input type="radio" name="radio-disabled" class="radio__input" checked disabled />
  <span class="radio__circle" aria-hidden="true"></span>
  <span class="radio__label">라디오버튼</span>
</label>`,
          label: "selected + disabled",
        },
      ],
    },
    {
      title: "Radio Group",
      items: [
        {
          preview: `<fieldset class="radio-group">
  <legend class="radio-group__legend">결제 방법</legend>
  <div class="radio-group__items">
    <label class="radio">
      <input type="radio" name="payment" class="radio__input" value="card" checked />
      <span class="radio__circle" aria-hidden="true"></span>
      <span class="radio__label">신용카드</span>
    </label>
    <label class="radio">
      <input type="radio" name="payment" class="radio__input" value="bank" />
      <span class="radio__circle" aria-hidden="true"></span>
      <span class="radio__label">계좌이체</span>
    </label>
    <label class="radio">
      <input type="radio" name="payment" class="radio__input" value="phone" />
      <span class="radio__circle" aria-hidden="true"></span>
      <span class="radio__label">휴대폰 결제</span>
    </label>
  </div>
</fieldset>`,
          label: "vertical layout",
        },
        {
          preview: `<fieldset class="radio-group radio-group--horizontal">
  <legend class="radio-group__legend">회원 유형</legend>
  <div class="radio-group__items">
    <label class="radio">
      <input type="radio" name="userType" class="radio__input" value="individual" checked />
      <span class="radio__circle" aria-hidden="true"></span>
      <span class="radio__label">개인</span>
    </label>
    <label class="radio">
      <input type="radio" name="userType" class="radio__input" value="business" />
      <span class="radio__circle" aria-hidden="true"></span>
      <span class="radio__label">사업자</span>
    </label>
  </div>
  <p class="radio-group__helper">
    가입하실 회원 유형을 선택하세요.
  </p>
</fieldset>`,
          label: "horizontal + helper",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Radio data registered");

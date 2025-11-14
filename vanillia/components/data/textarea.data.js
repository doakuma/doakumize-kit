/**
 * Textarea Component Data
 * Textarea 컴포넌트 데이터 파일
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Textarea 데이터 등록
window.ComponentData.textarea = {
  type: "textarea",
  id: "componentTextarea",
  title: "Textarea Components",
  variants: [
    {
      title: "Textarea States",
      items: [
        {
          preview: `<div class="input-field">
  <textarea class="input" rows="4" placeholder="입력 전"></textarea>
</div>`,
          label: "입력 전 (default)",
        },
        {
          preview: `<div class="input-field input-field--focused">
  <textarea class="input" rows="4">활성화된 텍스트 영역입니다.</textarea>
</div>`,
          label: "활성화 (focus)",
        },
        {
          preview: `<div class="input-field">
  <textarea class="input" rows="4">입력이 완료된 텍스트 영역입니다.</textarea>
</div>`,
          label: "입력 후 (filled)",
        },
        {
          preview: `<div class="input-field input-field--error">
  <textarea class="input" rows="4">에러 상태의 텍스트 영역입니다.</textarea>
</div>`,
          label: "에러 (error)",
        },
        {
          preview: `<div class="input-field">
  <textarea class="input" rows="4" disabled>비활성화된 텍스트 영역입니다.</textarea>
</div>`,
          label: "비활성화 (disabled)",
        },
        {
          preview: `<div class="input-field">
  <textarea class="input" rows="4" readonly>읽기전용 텍스트 영역입니다.</textarea>
</div>`,
          label: "읽기전용 (readonly)",
        },
      ],
    },
    {
      title: "Textarea Sizes",
      items: [
        {
          preview: `<div class="input-field">
  <textarea class="input" rows="2" placeholder="2줄 텍스트 영역"></textarea>
</div>`,
          label: "rows=2 (작은 크기)",
        },
        {
          preview: `<div class="input-field">
  <textarea class="input" rows="4" placeholder="4줄 텍스트 영역"></textarea>
</div>`,
          label: "rows=4 (기본 크기)",
        },
        {
          preview: `<div class="input-field">
  <textarea class="input" rows="6" placeholder="6줄 텍스트 영역"></textarea>
</div>`,
          label: "rows=6 (중간 크기)",
        },
        {
          preview: `<div class="input-field">
  <textarea class="input" rows="10" placeholder="10줄 텍스트 영역"></textarea>
</div>`,
          label: "rows=10 (큰 크기)",
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
        {
          preview: `<div class="input-field input-field--with-counter input-field--error">
  <textarea class="input" rows="4" maxlength="500">에러 상태의 텍스트입니다.</textarea>
  <span class="input-counter">14/500</span>
</div>`,
          label: "에러 상태 + counter",
        },
        {
          preview: `<div class="input-field input-field--with-counter">
  <textarea class="input" rows="4" maxlength="500" disabled>비활성화된 텍스트입니다.</textarea>
  <span class="input-counter">15/500</span>
</div>`,
          label: "비활성화 + counter",
        },
        {
          preview: `<div class="input-field input-field--with-counter">
  <textarea class="input" rows="4" maxlength="500" readonly>읽기전용 텍스트입니다.</textarea>
  <span class="input-counter">13/500</span>
</div>`,
          label: "읽기전용 + counter",
        },
      ],
    },
    {
      title: "Character Counter Variations",
      items: [
        {
          preview: `<div class="input-field input-field--with-counter">
  <textarea class="input" rows="4" maxlength="100" placeholder="100자 제한"></textarea>
  <span class="input-counter">0/100</span>
</div>`,
          label: "maxlength=100",
        },
        {
          preview: `<div class="input-field input-field--with-counter">
  <textarea class="input" rows="4" maxlength="200" placeholder="200자 제한"></textarea>
  <span class="input-counter">0/200</span>
</div>`,
          label: "maxlength=200",
        },
        {
          preview: `<div class="input-field input-field--with-counter">
  <textarea class="input" rows="4" maxlength="500" placeholder="500자 제한"></textarea>
  <span class="input-counter">0/500</span>
</div>`,
          label: "maxlength=500",
        },
        {
          preview: `<div class="input-field input-field--with-counter">
  <textarea class="input" rows="6" maxlength="1000" placeholder="1000자 제한"></textarea>
  <span class="input-counter">0/1000</span>
</div>`,
          label: "maxlength=1000",
        },
      ],
    },
    {
      title: "Textarea with Long Text",
      items: [
        {
          preview: `<div class="input-field input-field--with-counter">
  <textarea class="input" rows="6" maxlength="500">안녕하세요. 이것은 긴 텍스트를 테스트하기 위한 예제입니다. Textarea는 여러 줄의 텍스트를 입력받을 수 있는 컴포넌트로, 댓글이나 설명 등을 작성할 때 사용됩니다. 사용자가 자유롭게 텍스트를 입력할 수 있으며, 필요에 따라 최대 글자 수를 제한할 수 있습니다.</textarea>
  <span class="input-counter">152/500</span>
</div>`,
          label: "긴 텍스트 예제",
        },
        {
          preview: `<div class="input-field input-field--with-counter">
  <textarea class="input" rows="4" maxlength="100">이 텍스트는 100자 제한이 있는 Textarea입니다. 제한을 초과하면 더 이상 입력되지 않습니다. 현재 텍스트 길이를 확인할 수 있습니다.</textarea>
  <span class="input-counter">82/100</span>
</div>`,
          label: "제한에 가까운 텍스트",
        },
        {
          preview: `<div class="input-field input-field--with-counter input-field--error">
  <textarea class="input" rows="4" maxlength="100">이 텍스트는 100자 제한이 있고 에러 상태입니다. 입력 검증에 실패했을 때 이런 상태로 표시됩니다. 사용자에게 명확한 피드백을 제공합니다.</textarea>
  <span class="input-counter">92/100</span>
</div>`,
          label: "긴 텍스트 + 에러 상태",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Textarea data registered");

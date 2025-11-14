/**
 * Switch Component Data
 * 로컬 파일 지원을 위한 데이터 파일
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Switch 데이터 등록
window.ComponentData.switch = {
  type: "switch",
  id: "componentSwitch",
  title: "Switch Components",
  variants: [
    {
      title: "Basic Switch (기본 스위치)",
      items: [
        {
          preview:
            '<div class="toggle-field"><input id="toggle-off" class="toggle-input" type="checkbox" /><label for="toggle-off" class="toggle" aria-label="기본 토글"></label></div>',
          label: "OFF",
        },
        {
          preview:
            '<div class="toggle-field"><input id="toggle-on" class="toggle-input" type="checkbox" checked /><label for="toggle-on" class="toggle" aria-label="기본 토글"></label></div>',
          label: "ON",
        },
      ],
    },
    {
      title: "Disabled State",
      items: [
        {
          preview:
            '<div class="toggle-field"><input id="toggle-disabled-off" class="toggle-input" type="checkbox" disabled /><label for="toggle-disabled-off" class="toggle" aria-label="비활성 토글"></label></div>',
          label: "disabled / OFF",
        },
        {
          preview:
            '<div class="toggle-field"><input id="toggle-disabled-on" class="toggle-input" type="checkbox" checked disabled /><label for="toggle-disabled-on" class="toggle" aria-label="비활성 토글"></label></div>',
          label: "disabled / ON",
        },
      ],
    },
    {
      title: "With Left Label (왼쪽 레이블)",
      items: [
        {
          preview:
            '<div class="toggle-field toggle-field__single"><input id="toggle-left-off" class="toggle-input" type="checkbox" /><label for="toggle-left-off" class="toggle" aria-label="알림 받기"></label><span class="toggle-label__left">알림 받기</span></div>',
          label: "left label / OFF",
        },
        {
          preview:
            '<div class="toggle-field toggle-field__single"><input id="toggle-left-on" class="toggle-input" type="checkbox" checked /><label for="toggle-left-on" class="toggle" aria-label="알림 받기"></label><span class="toggle-label__left">알림 받기</span></div>',
          label: "left label / ON",
        },
      ],
    },
    {
      title: "With Right Label (오른쪽 레이블)",
      items: [
        {
          preview:
            '<div class="toggle-field toggle-field__single"><input id="toggle-right-off" class="toggle-input" type="checkbox" /><label for="toggle-right-off" class="toggle" aria-label="자동 저장"></label><span class="toggle-label__right">자동 저장</span></div>',
          label: "right label / OFF",
        },
        {
          preview:
            '<div class="toggle-field toggle-field__single"><input id="toggle-right-on" class="toggle-input" type="checkbox" checked /><label for="toggle-right-on" class="toggle" aria-label="자동 저장"></label><span class="toggle-label__right">자동 저장</span></div>',
          label: "right label / ON",
        },
      ],
    },
    {
      title: "With Both Labels (양쪽 레이블)",
      items: [
        {
          preview:
            '<div class="toggle-field"><input id="toggle-both-off" class="toggle-input" type="checkbox" /><label for="toggle-both-off" class="toggle" aria-label="다크모드"></label><span class="toggle-label__left">끄기</span><span class="toggle-label__right">켜기</span></div>',
          label: "both labels / OFF",
        },
        {
          preview:
            '<div class="toggle-field"><input id="toggle-both-on" class="toggle-input" type="checkbox" checked /><label for="toggle-both-on" class="toggle" aria-label="다크모드"></label><span class="toggle-label__left">끄기</span><span class="toggle-label__right">켜기</span></div>',
          label: "both labels / ON",
        },
      ],
    },
    {
      title: "Examples (실사용 예시)",
      items: [
        {
          preview:
            '<div class="toggle-field toggle-field__single"><input id="toggle-example-1" class="toggle-input" type="checkbox" checked /><label for="toggle-example-1" class="toggle" aria-label="이메일 알림"></label><span class="toggle-label__left">이메일 알림</span></div>',
          label: "이메일 알림 ON",
        },
        {
          preview:
            '<div class="toggle-field toggle-field__single"><input id="toggle-example-2" class="toggle-input" type="checkbox" /><label for="toggle-example-2" class="toggle" aria-label="푸시 알림"></label><span class="toggle-label__left">푸시 알림</span></div>',
          label: "푸시 알림 OFF",
        },
        {
          preview:
            '<div class="toggle-field"><input id="toggle-example-3" class="toggle-input" type="checkbox" checked /><label for="toggle-example-3" class="toggle" aria-label="다크모드"></label><span class="toggle-label__left">다크모드</span><span class="toggle-label__right">활성화</span></div>',
          label: "다크모드 ON",
        },
        {
          preview:
            '<div class="toggle-field"><input id="toggle-example-4" class="toggle-input" type="checkbox" disabled /><label for="toggle-example-4" class="toggle" aria-label="자동 백업"></label><span class="toggle-label__left">자동 백업</span><span class="toggle-label__right">프리미엄 전용</span></div>',
          label: "비활성 with 양쪽 레이블",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Switch data registered");

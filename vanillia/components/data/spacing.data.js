/**
 * Spacing Component Data
 * 디자인 시스템의 Spacing 시스템 표시
 * 4px 기반 확장 가능한 spacing 시스템
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Spacing 데이터 등록
window.ComponentData.spacing = {
  type: "spacing",
  id: "componentSpacing",
  title: "Spacing System",
  variants: [
    {
      title: "📏 Spacing System Guide",
      description:
        "4px 기준값을 바탕으로 확장 가능한 spacing 시스템입니다. 일관된 여백으로 시각적 리듬을 만들어냅니다.",
      isGuide: true,
      items: [
        {
          preview:
            '<div class="spacing-system-guide"><div class="guide-item" style="margin-bottom: 20px;"><strong style="font: var(--sub-sb-md); color: var(--text-primary); display: block; margin-bottom: 8px;">📌 사용법</strong><ul style="margin: 0; padding-left: 20px; font: var(--body-sm); color: var(--text-secondary); line-height: 1.8;"><li>기준값 <code style="background: var(--gray-100); padding: 2px 6px; border-radius: 4px; font-family: monospace;">--spacing-base: 4px</code>만 변경하면 전체 시스템 업데이트</li><li>배수 기반 확장으로 예측 가능한 스케일 제공</li><li>Semantic 변수로 용도별 사용 권장</li></ul></div><div class="guide-item" style="margin-bottom: 20px;"><strong style="font: var(--sub-sb-md); color: var(--text-primary); display: block; margin-bottom: 8px;">🎯 스케일 패턴</strong><ul style="margin: 0; padding-left: 20px; font: var(--body-sm); color: var(--text-secondary); line-height: 1.8;"><li><strong>--spacing-0 ~ --spacing-5:</strong> 작은 여백 (0px ~ 16px) - 컴포넌트 내부</li><li><strong>--spacing-6 ~ --spacing-10:</strong> 중간 여백 (20px ~ 48px) - 카드, 섹션</li><li><strong>--spacing-11 ~ --spacing-15:</strong> 큰 여백 (56px ~ 128px) - 레이아웃</li></ul></div><div class="guide-item"><strong style="font: var(--sub-sb-md); color: var(--text-primary); display: block; margin-bottom: 8px;">💡 예시</strong><pre style="margin: 0; padding: 12px; background: var(--gray-900); color: var(--gray-100); border-radius: 6px; font-family: monospace; font-size: 13px; line-height: 1.6; overflow-x: auto;"><code>/* 숫자 스케일 사용 */\npadding: var(--spacing-5); /* 16px */\nmargin: var(--spacing-7); /* 24px */\n\n/* Semantic 변수 사용 (권장) */\npadding: var(--spacing-md); /* 16px */\ngap: var(--spacing-icon-gap); /* 4px */</code></pre></div></div>',
          label: "Spacing System Overview",
        },
      ],
    },
    {
      title: "Base Scale (숫자 기반)",
      description:
        "4px 기준으로 확장되는 기본 스케일입니다. 대표적인 간격 두 가지를 시각화했습니다.",
      isGridDemo: true,
      gridType: "gap", // gap 데모
      items: [
        {
          value: "8px",
          variable: "--spacing-3",
          label: "spacing-3 (8px)",
          description: "작은 간격 - 버튼 내부 여백, 아이템 간 간격",
        },
        {
          value: "24px",
          variable: "--spacing-7",
          label: "spacing-7 (24px)",
          description: "큰 간격 - 섹션 여백, 카드 간격",
        },
      ],
    },
    {
      title: "Semantic Spacing - Gap (간격)",
      description:
        "요소 간 간격에 사용되는 spacing입니다. 그리드 gap으로 시각화했습니다.",
      isGridDemo: true,
      gridType: "gap",
      items: [
        {
          value: "4px",
          variable: "--spacing-xs",
          label: "spacing-xs (4px)",
          description: "아주 작은 간격 - 아이콘과 텍스트",
        },
        {
          value: "8px",
          variable: "--spacing-sm",
          label: "spacing-sm (8px)",
          description: "작은 간격 - 리스트 아이템",
        },
        {
          value: "16px",
          variable: "--spacing-md",
          label: "spacing-md (16px)",
          description: "중간 간격 - 카드 사이",
        },
        {
          value: "24px",
          variable: "--spacing-lg",
          label: "spacing-lg (24px)",
          description: "큰 간격 - 섹션 사이",
        },
      ],
    },
    {
      title: "Semantic Spacing - Padding (여백)",
      description:
        "요소 내부 여백에 사용되는 spacing입니다. 패딩으로 시각화했습니다.",
      isGridDemo: true,
      gridType: "padding",
      items: [
        {
          value: "8px",
          variable: "--spacing-sm",
          label: "spacing-sm (8px)",
          description: "작은 패딩 - 버튼, 태그",
        },
        {
          value: "16px",
          variable: "--spacing-md",
          label: "spacing-md (16px)",
          description: "중간 패딩 - 카드, 입력 필드",
        },
        {
          value: "24px",
          variable: "--spacing-lg",
          label: "spacing-lg (24px)",
          description: "큰 패딩 - 모달, 패널",
        },
        {
          value: "32px",
          variable: "--spacing-xl",
          label: "spacing-xl (32px)",
          description: "아주 큰 패딩 - 페이지 컨테이너",
        },
      ],
    },
    {
      title: "Layout & Component Spacing",
      description: "레이아웃 및 컴포넌트 전용 spacing 변수들입니다.",
      isTextOnly: true,
      items: [
        {
          variable: "--layout-gutter",
          value: "16px",
          description: "그리드 거터 (컬럼 간격)",
        },
        {
          variable: "--layout-container",
          value: "32px",
          description: "컨테이너 패딩",
        },
        {
          variable: "--layout-section",
          value: "48px",
          description: "섹션 간격",
        },
        {
          variable: "--spacing-input-padding-x",
          value: "12px",
          description: "Input 가로 패딩",
        },
        {
          variable: "--spacing-input-padding-y",
          value: "8px",
          description: "Input 세로 패딩",
        },
        {
          variable: "--spacing-button-padding-x",
          value: "16px",
          description: "Button 가로 패딩",
        },
        {
          variable: "--spacing-button-padding-y",
          value: "8px",
          description: "Button 세로 패딩",
        },
        {
          variable: "--spacing-card-padding",
          value: "20px",
          description: "Card 패딩",
        },
        {
          variable: "--spacing-modal-padding",
          value: "24px",
          description: "Modal 패딩",
        },
        {
          variable: "--spacing-icon-gap",
          value: "4px",
          description: "아이콘과 텍스트 간격",
        },
        {
          variable: "--spacing-list-item-gap",
          value: "12px",
          description: "리스트 아이템 간격",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Spacing data registered");

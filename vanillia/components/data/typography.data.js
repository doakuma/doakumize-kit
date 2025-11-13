/**
 * Typography Component Data
 * 로컬 파일 지원을 위한 데이터 파일
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Typography 데이터 등록
window.ComponentData.typography = {
  type: "typography",
  id: "componentTypography",
  title: "Typography System",
  variants: [
    {
      title: "🔤 Font Family",
      description: "프로젝트에서 사용하는 폰트와 import 방법을 안내합니다",
      content: `<div class="overview-section">
              <h3>현재 프로젝트 구성</h3>
              
              <div class="overview-guide-list">
                <div class="overview-guide-item">
                  <span class="overview-guide-item__label">Import 방식:</span>
                  <span class="overview-guide-item__value"> <code>common.css</code>에서 CDN으로 로드</span>
                </div>
                <div class="overview-guide-item">
                  <span class="overview-guide-item__label">변수 정의:</span>
                  <span class="overview-guide-item__value"> <code>variables.css</code>에서 fallback 체계 정의</span>
                </div>
                <div class="overview-guide-item">
                  <span class="overview-guide-item__label">전역 적용:</span>
                  <span class="overview-guide-item__value"> <code>base.css</code>에서 모든 요소에 적용</span>
                </div>
              </div>

              <div class="overview-code-block">
                <div class="overview-code-block__header">common.css - CDN Import</div>
                <pre><code>@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css");</code></pre>
              </div>

              <div class="overview-code-block">
                <div class="overview-code-block__header">variables.css - Fallback 정의</div>
                <pre><code>--font: "Pretendard", -apple-system, BlinkMacSystemFont, 
        "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;</code></pre>
              </div>

              <div class="overview-info-box">
                <i class="icon icon--small icon--info"></i>
                <div class="overview-info-box__content">
                  <strong>Fallback 순서:</strong> Pretendard가 로드되지 않으면 시스템 기본 폰트(-apple-system, Segoe UI 등)로 자동 대체됩니다.
                </div>
              </div>
            </div>`,
    },
    {
      id: "headers",
      title: "Headers (Bold, -2% letter-spacing)",
      gridStyle: "--minmax: 100%",
      items: [
        {
          tag: "h1",
          className: "text-h1",
          label: "H1 - 700 20px/1.35",
          sampleText: "헤더 폰트입니다. Bold 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "h2",
          className: "text-h2",
          label: "H2 - 700 20px/1.4",
          sampleText: "헤더 폰트입니다. Bold 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "h3",
          className: "text-h3",
          label: "H3 - 700 18px/1.4",
          sampleText: "헤더 폰트입니다. Bold 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "h4",
          className: "text-h4",
          label: "H4 - 700 16px/1.4",
          sampleText: "헤더 폰트입니다. Bold 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "h5",
          className: "text-h5",
          label: "H5 - 700 14px/1.4",
          sampleText: "헤더 폰트입니다. Bold 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
      ],
    },
    {
      id: "body-text",
      title: "Body Text (Regular, 140% line-height)",
      gridStyle: "--minmax: 100%",
      items: [
        {
          tag: "p",
          className: "text-body-xl",
          label: "Body XL - 400 18px/1.4",
          sampleText: "바디 폰트입니다. Regular 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-body-lg",
          label: "Body Large - 400 16px/1.4",
          sampleText: "바디 폰트입니다. Regular 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-body-md",
          label: "Body Medium - 400 16px/1.4",
          sampleText: "바디 폰트입니다. Regular 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-body-sm",
          label: "Body Small - 400 14px/1.4",
          sampleText: "바디 폰트입니다. Regular 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-body-xs",
          label: "Body XS - 400 13px/1.4",
          sampleText: "바디 폰트입니다. Regular 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
      ],
    },
    {
      id: "sub-semibold",
      title: "Sub-Semibold (600, 140% line-height, -2% letter-spacing)",
      gridStyle: "--minmax: 100%",
      items: [
        {
          tag: "p",
          className: "text-sub-sb-xl",
          label: "Sub-SB XL - 600 18px/1.4",
          sampleText: "Sub-Semibold 폰트입니다. Semibold 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-sub-sb-lg",
          label: "Sub-SB Large - 600 16px/1.4",
          sampleText: "Sub-Semibold 폰트입니다. Semibold 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-sub-sb-md",
          label: "Sub-SB Medium - 600 16px/1.4",
          sampleText: "Sub-Semibold 폰트입니다. Semibold 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-sub-sb-sm",
          label: "Sub-SB Small - 600 14px/1.4",
          sampleText: "Sub-Semibold 폰트입니다. Semibold 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-sub-sb-xs",
          label: "Sub-SB XS - 600 13px/1.4",
          sampleText: "Sub-Semibold 폰트입니다. Semibold 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
      ],
    },
    {
      id: "sub-medium",
      title: "Sub-Medium (500, 140% line-height, -2% letter-spacing)",
      gridStyle: "--minmax: 100%",
      items: [
        {
          tag: "p",
          className: "text-sub-md-xl",
          label: "Sub-MD XL - 500 20px/1.4",
          sampleText: "Sub-Medium 폰트입니다. Medium 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-sub-md-lg",
          label: "Sub-MD Large - 500 18px/1.4",
          sampleText: "Sub-Medium 폰트입니다. Medium 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-sub-md-md",
          label: "Sub-MD Medium - 500 16px/1.4",
          sampleText: "Sub-Medium 폰트입니다. Medium 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-sub-md-sm",
          label: "Sub-MD Small - 500 14px/1.4",
          sampleText: "Sub-Medium 폰트입니다. Medium 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-sub-md-xs",
          label: "Sub-MD XS - 500 13px/1.4",
          sampleText: "Sub-Medium 폰트입니다. Medium 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
      ],
    },
    {
      id: "text-colors",
      title: "Text Colors",
      gridStyle: "--minmax: 100%",
      items: [
        {
          tag: "p",
          className: "text-body-lg text-primary",
          label: "Primary Text",
          sampleText: "바디 폰트입니다. Regular 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-body-lg text-secondary",
          label: "Secondary Text",
          sampleText: "바디 폰트입니다. Regular 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-body-lg text-tertiary",
          label: "Tertiary Text",
          sampleText: "바디 폰트입니다. Regular 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-body-lg text-disabled",
          label: "Disabled Text",
          sampleText: "바디 폰트입니다. Regular 스타일을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-body-lg text-inverse",
          label: "Inverse Text",
          sampleText: "바디 폰트입니다. Regular 스타일을 사용합니다.",
          wrapper: {
            tag: "div",
            styles: {
              background: "var(--gray-800)",
              padding: "8px",
              "border-radius": "4px",
            },
          },
          styles: {
            margin: "0",
          },
        },
      ],
    },
    {
      id: "letter-spacing",
      title: "Letter Spacing",
      gridStyle: "--minmax: 100%",
      items: [
        {
          tag: "p",
          className: "text-body-lg ls-tight",
          label: "Tight (-0.02em)",
          sampleText: "바디 폰트입니다. Tight letter-spacing을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-body-lg ls-normal",
          label: "Normal (0)",
          sampleText: "바디 폰트입니다. Normal letter-spacing을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
        {
          tag: "p",
          className: "text-body-lg ls-wide",
          label: "Wide (0.02em)",
          sampleText: "바디 폰트입니다. Wide letter-spacing을 사용합니다.",
          styles: {
            margin: "0",
          },
        },
      ],
    },
  ],
};

console.log("[ComponentData] Typography data registered");

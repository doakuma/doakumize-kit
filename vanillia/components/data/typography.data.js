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

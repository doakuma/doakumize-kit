/**
 * Color Component Data
 * 디자인 시스템의 컬러 팔레트 표시
 * HSL 기반 동적 컬러 시스템으로 리팩토링됨
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Color 데이터 등록
window.ComponentData.color = {
  type: "color",
  id: "componentColor",
  title: "Color Palette",
  variants: [
    {
      title: "🎨 Color System Guide",
      description:
        "HSL 기반 동적 컬러 시스템을 사용합니다. 기준 HSL 값만 변경하면 전체 스케일이 자동으로 업데이트됩니다.",
      isGuide: true,
      items: [
        {
          preview:
            '<div class="color-system-guide" style="padding: 24px; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-primary);"><div class="guide-item" style="margin-bottom: 20px;"><strong style="font: var(--sub-sb-md); color: var(--text-primary); display: block; margin-bottom: 8px;">📌 사용법</strong><ul style="margin: 0; padding-left: 20px; font: var(--body-sm); color: var(--text-secondary); line-height: 1.8;"><li><code style="background: var(--gray-100); padding: 2px 6px; border-radius: 4px; font-family: monospace;">--primary-h</code>, <code style="background: var(--gray-100); padding: 2px 6px; border-radius: 4px; font-family: monospace;">--primary-s</code> 값만 변경하면 전체 스케일 자동 업데이트</li><li>개별 색상 오버라이드 가능</li><li>모든 브라우저 호환 (IE11 포함)</li></ul></div><div class="guide-item" style="margin-bottom: 20px;"><strong style="font: var(--sub-sb-md); color: var(--text-primary); display: block; margin-bottom: 8px;">🎯 스케일 패턴</strong><ul style="margin: 0; padding-left: 20px; font: var(--body-sm); color: var(--text-secondary); line-height: 1.8;"><li><strong>50-200:</strong> 채도 낮춤 (0.85~0.9x), 밝기 높음 (93~98%)</li><li><strong>300-600:</strong> 채도 유지 (1x), 밝기 중간 (38~72%)</li><li><strong>700-900:</strong> 채도 높임 (1.05~1.15x), 밝기 낮음 (17~35%)</li></ul></div><div class="guide-item"><strong style="font: var(--sub-sb-md); color: var(--text-primary); display: block; margin-bottom: 8px;">💡 예시</strong><pre style="margin: 0; padding: 12px; background: var(--gray-900); color: var(--gray-100); border-radius: 6px; font-family: monospace; font-size: 13px; line-height: 1.6; overflow-x: auto;"><code>/* variables.css */\n--primary-h: 190;  /* 이 값만 바꾸면 */\n--primary-s: 70%;  /* 전체 스케일 변경! */</code></pre></div></div>',
          label: "Color System Overview",
        },
      ],
    },
    {
      title: "Gray Scale",
      description:
        "기본 그레이스케일 컬러 시스템입니다. 텍스트, 배경, 보더 등에 사용됩니다. [Base: hsl(200, 15%, 65%)]",
      items: [
        {
          preview:
            '<div class="color-swatch" data-color="gray-0" style="background-color: var(--gray-0);"></div>',
          label: "gray-0",
          variable: "--gray-0",
          hex: "#ffffff",
          hsl: "순백색",
        },
        {
          preview:
            '<div class="color-swatch" data-color="gray-50" style="background-color: var(--gray-50);"></div>',
          label: "gray-50",
          variable: "--gray-50",
          hex: "#f8fbfc",
          hsl: "h:200, s:12%, l:98%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="gray-100" style="background-color: var(--gray-100);"></div>',
          label: "gray-100",
          variable: "--gray-100",
          hex: "#eff4f6",
          hsl: "h:200, s:13.5%, l:95%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="gray-150" style="background-color: var(--gray-150);"></div>',
          label: "gray-150",
          variable: "--gray-150",
          hex: "#e6eff2",
          hsl: "h:200, s:15%, l:93%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="gray-200" style="background-color: var(--gray-200);"></div>',
          label: "gray-200",
          variable: "--gray-200",
          hex: "#dae8ed",
          hsl: "h:200, s:15%, l:90%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="gray-300" style="background-color: var(--gray-300);"></div>',
          label: "gray-300",
          variable: "--gray-300",
          hex: "#c2dae3",
          hsl: "h:200, s:15%, l:85%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="gray-400" style="background-color: var(--gray-400);"></div>',
          label: "gray-400",
          variable: "--gray-400",
          hex: "#9abfcf",
          hsl: "h:200, s:15%, l:75%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="gray-500" style="background-color: var(--gray-500);"></div>',
          label: "gray-500 [BASE]",
          variable: "--gray-500",
          hex: "#8baab8",
          hsl: "h:200, s:15%, l:65%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="gray-600" style="background-color: var(--gray-600);"></div>',
          label: "gray-600",
          variable: "--gray-600",
          hex: "#637f8d",
          hsl: "h:200, s:15%, l:48%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="gray-700" style="background-color: var(--gray-700);"></div>',
          label: "gray-700",
          variable: "--gray-700",
          hex: "#425460",
          hsl: "h:200, s:16.5%, l:32%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="gray-800" style="background-color: var(--gray-800);"></div>',
          label: "gray-800",
          variable: "--gray-800",
          hex: "#303f48",
          hsl: "h:200, s:18%, l:24%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="gray-900" style="background-color: var(--gray-900);"></div>',
          label: "gray-900",
          variable: "--gray-900",
          hex: "#212b31",
          hsl: "h:200, s:19.5%, l:16%",
        },
      ],
    },
    {
      title: "Primary Color (Cyan Theme)",
      description:
        "메인 브랜드 컬러입니다. 버튼, 링크, 강조 요소 등에 사용됩니다. [Base: hsl(190, 70%, 50%)]",
      items: [
        {
          preview:
            '<div class="color-swatch" data-color="primary-50" style="background-color: var(--primary-50);"></div>',
          label: "primary-50",
          variable: "--primary-50",
          hex: "#f4fcfe",
          hsl: "h:190, s:59.5%, l:98%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="primary-100" style="background-color: var(--primary-100);"></div>',
          label: "primary-100",
          variable: "--primary-100",
          hex: "#dcf5fa",
          hsl: "h:190, s:63%, l:93%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="primary-200" style="background-color: var(--primary-200);"></div>',
          label: "primary-200",
          variable: "--primary-200",
          hex: "#afe8f4",
          hsl: "h:190, s:70%, l:84%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="primary-300" style="background-color: var(--primary-300);"></div>',
          label: "primary-300",
          variable: "--primary-300",
          hex: "#7fd9ee",
          hsl: "h:190, s:70%, l:72%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="primary-400" style="background-color: var(--primary-400);"></div>',
          label: "primary-400",
          variable: "--primary-400",
          hex: "#3ec5e3",
          hsl: "h:190, s:70%, l:58%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="primary-500" style="background-color: var(--primary-500);"></div>',
          label: "primary-500 [BASE]",
          variable: "--primary-500",
          hex: "#26b7d9",
          hsl: "h:190, s:70%, l:50%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="primary-600" style="background-color: var(--primary-600);"></div>',
          label: "primary-600",
          variable: "--primary-600",
          hex: "#1d8ca4",
          hsl: "h:190, s:70%, l:38%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="primary-700" style="background-color: var(--primary-700);"></div>',
          label: "primary-700",
          variable: "--primary-700",
          hex: "#177989",
          hsl: "h:190, s:73.5%, l:34%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="primary-800" style="background-color: var(--primary-800);"></div>',
          label: "primary-800",
          variable: "--primary-800",
          hex: "#0d5268",
          hsl: "h:190, s:77%, l:23%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="primary-900" style="background-color: var(--primary-900);"></div>',
          label: "primary-900",
          variable: "--primary-900",
          hex: "#083d50",
          hsl: "h:190, s:80.5%, l:17%",
        },
      ],
    },
    {
      title: "Secondary Color (Purple Theme)",
      description:
        "보조 브랜드 컬러입니다. 액센트, 하이라이트 등에 사용됩니다. [Base: hsl(255, 80%, 60%)] ⚠️ 기존 중복 문제 해결됨",
      items: [
        {
          preview:
            '<div class="color-swatch" data-color="secondary-50" style="background-color: var(--secondary-50);"></div>',
          label: "secondary-50",
          variable: "--secondary-50",
          hex: "#f6f4fe",
          hsl: "h:255, s:68%, l:98%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="secondary-100" style="background-color: var(--secondary-100);"></div>',
          label: "secondary-100",
          variable: "--secondary-100",
          hex: "#eae3fd",
          hsl: "h:255, s:72%, l:94%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="secondary-200" style="background-color: var(--secondary-200);"></div>',
          label: "secondary-200",
          variable: "--secondary-200",
          hex: "#cbb9fb",
          hsl: "h:255, s:80%, l:85%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="secondary-300" style="background-color: var(--secondary-300);"></div>',
          label: "secondary-300",
          variable: "--secondary-300",
          hex: "#a689f9",
          hsl: "h:255, s:80%, l:73%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="secondary-400" style="background-color: var(--secondary-400);"></div>',
          label: "secondary-400",
          variable: "--secondary-400",
          hex: "#7a4ef7",
          hsl: "h:255, s:80%, l:60%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="secondary-500" style="background-color: var(--secondary-500);"></div>',
          label: "secondary-500 [BASE]",
          variable: "--secondary-500",
          hex: "#5f2df4",
          hsl: "h:255, s:80%, l:52%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="secondary-600" style="background-color: var(--secondary-600);"></div>',
          label: "secondary-600",
          variable: "--secondary-600",
          hex: "#4916c6",
          hsl: "h:255, s:80%, l:42% (Fixed)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="secondary-700" style="background-color: var(--secondary-700);"></div>',
          label: "secondary-700",
          variable: "--secondary-700",
          hex: "#3910a5",
          hsl: "h:255, s:84%, l:35% (Fixed)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="secondary-800" style="background-color: var(--secondary-800);"></div>',
          label: "secondary-800",
          variable: "--secondary-800",
          hex: "#250a72",
          hsl: "h:255, s:88%, l:24% (Fixed)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="secondary-900" style="background-color: var(--secondary-900);"></div>',
          label: "secondary-900",
          variable: "--secondary-900",
          hex: "#1a0754",
          hsl: "h:255, s:92%, l:17% (Fixed)",
        },
      ],
    },
    {
      title: "Semantic Colors",
      description:
        "상태나 의미를 전달하는 컬러입니다. 성공, 에러, 경고 등의 피드백에 사용됩니다.",
      items: [
        {
          preview:
            '<div class="color-swatch" data-color="sementic-essential" style="background-color: var(--sementic-essential);"></div>',
          label: "Essential",
          variable: "--sementic-essential",
          hex: "#eb1c7f",
        },
        {
          preview:
            '<div class="color-swatch" data-color="sementic-info" style="background-color: var(--sementic-info);"></div>',
          label: "Info",
          variable: "--sementic-info",
          hex: "#1290ff",
        },
        {
          preview:
            '<div class="color-swatch" data-color="sementic-error" style="background-color: var(--sementic-error);"></div>',
          label: "Error",
          variable: "--sementic-error",
          hex: "#f84f63",
        },
        {
          preview:
            '<div class="color-swatch" data-color="sementic-save" style="background-color: var(--sementic-save);"></div>',
          label: "Success/Save",
          variable: "--sementic-save",
          hex: "#22c55e",
        },
        {
          preview:
            '<div class="color-swatch" data-color="sementic-warning" style="background-color: var(--sementic-warning);"></div>',
          label: "Warning",
          variable: "--sementic-warning",
          hex: "#eab308",
        },
      ],
    },
    {
      title: "Text Colors",
      description:
        "텍스트에 사용되는 시맨틱 컬러입니다. 계층 구조에 따라 사용됩니다.",
      items: [
        {
          preview:
            '<div class="color-swatch color-swatch--text" data-color="text-primary" style="background-color: var(--text-primary);"></div>',
          label: "text-primary",
          variable: "--text-primary",
          reference: "var(--gray-900)",
        },
        {
          preview:
            '<div class="color-swatch color-swatch--text" data-color="text-secondary" style="background-color: var(--text-secondary);"></div>',
          label: "text-secondary",
          variable: "--text-secondary",
          reference: "var(--gray-600)",
        },
        {
          preview:
            '<div class="color-swatch color-swatch--text" data-color="text-tertiary" style="background-color: var(--text-tertiary);"></div>',
          label: "text-tertiary",
          variable: "--text-tertiary",
          reference: "var(--gray-500)",
        },
        {
          preview:
            '<div class="color-swatch color-swatch--text" data-color="text-disabled" style="background-color: var(--text-disabled);"></div>',
          label: "text-disabled",
          variable: "--text-disabled",
          reference: "var(--gray-400)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="text-inverse" style="background-color: var(--text-inverse);"></div>',
          label: "text-inverse",
          variable: "--text-inverse",
          reference: "var(--gray-0)",
        },
      ],
    },
    {
      title: "Background Colors",
      description: "배경에 사용되는 시맨틱 컬러입니다.",
      items: [
        {
          preview:
            '<div class="color-swatch" data-color="bg-primary" style="background-color: var(--bg-primary);"></div>',
          label: "bg-primary",
          variable: "--bg-primary",
          reference: "var(--gray-0)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="bg-secondary" style="background-color: var(--bg-secondary);"></div>',
          label: "bg-secondary",
          variable: "--bg-secondary",
          reference: "var(--gray-50)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="bg-tertiary" style="background-color: var(--bg-tertiary);"></div>',
          label: "bg-tertiary",
          variable: "--bg-tertiary",
          reference: "var(--gray-100)",
        },
      ],
    },
    {
      title: "Border Colors",
      description: "테두리에 사용되는 시맨틱 컬러입니다.",
      items: [
        {
          preview:
            '<div class="color-swatch" data-color="border-primary" style="background-color: var(--border-primary);"></div>',
          label: "border-primary",
          variable: "--border-primary",
          reference: "var(--gray-200)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="border-secondary" style="background-color: var(--border-secondary);"></div>',
          label: "border-secondary",
          variable: "--border-secondary",
          reference: "var(--gray-300)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="border-focus" style="background-color: var(--border-focus);"></div>',
          label: "border-focus",
          variable: "--border-focus",
          reference: "var(--primary-500)",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Color data registered (HSL-based)");

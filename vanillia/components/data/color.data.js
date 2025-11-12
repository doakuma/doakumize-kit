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
      title: "🎨 Theme Switcher",
      description:
        "아래 테마를 클릭하면 실시간으로 컬러 시스템이 변경됩니다. HSL 기반 동적 컬러 시스템의 강력함을 체험해보세요!",
      isThemeSwitcher: true,
      items: [
        {
          preview: `
            <div class="theme-switcher" style="display: flex; gap: 16px; flex-wrap: wrap;">
              <button class="theme-button" data-theme="cyan" data-primary-h="190" data-primary-s="70" data-secondary-h="255" data-secondary-s="80" style="
                padding: 16px 24px;
                border: 2px solid var(--border-default);
                border-radius: 8px;
                background: linear-gradient(135deg, hsl(190, 70%, 50%) 0%, hsl(190, 70%, 35%) 100%);
                color: white;
                font: var(--sub-sb-md);
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 2px 8px rgba(38, 183, 217, 0.3);
              ">
                <div style="font-size: 20px; margin-bottom: 4px;">🌊</div>
                <div>Cyan (Default)</div>
                <div style="font: var(--body-xs); opacity: 0.9; margin-top: 4px;">P:190/70% S:255/80%</div>
              </button>
              
              <button class="theme-button" data-theme="blue" data-primary-h="210" data-primary-s="100" data-secondary-h="270" data-secondary-s="80" style="
                padding: 16px 24px;
                border: 2px solid var(--border-default);
                border-radius: 8px;
                background: linear-gradient(135deg, hsl(210, 100%, 50%) 0%, hsl(210, 100%, 35%) 100%);
                color: white;
                font: var(--sub-sb-md);
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 2px 8px rgba(0, 102, 255, 0.3);
              ">
                <div style="font-size: 20px; margin-bottom: 4px;">💙</div>
                <div>Blue</div>
                <div style="font: var(--body-xs); opacity: 0.9; margin-top: 4px;">P:210/100% S:270/80%</div>
              </button>
              
              <button class="theme-button" data-theme="green" data-primary-h="150" data-primary-s="70" data-secondary-h="170" data-secondary-s="75" style="
                padding: 16px 24px;
                border: 2px solid var(--border-default);
                border-radius: 8px;
                background: linear-gradient(135deg, hsl(150, 70%, 45%) 0%, hsl(150, 70%, 30%) 100%);
                color: white;
                font: var(--sub-sb-md);
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
              ">
                <div style="font-size: 20px; margin-bottom: 4px;">🍃</div>
                <div>Green</div>
                <div style="font: var(--body-xs); opacity: 0.9; margin-top: 4px;">P:150/70% S:170/75%</div>
              </button>
              
              <button class="theme-button" data-theme="red" data-primary-h="0" data-primary-s="85" data-secondary-h="340" data-secondary-s="85" style="
                padding: 16px 24px;
                border: 2px solid var(--border-default);
                border-radius: 8px;
                background: linear-gradient(135deg, hsl(0, 85%, 55%) 0%, hsl(0, 85%, 40%) 100%);
                color: white;
                font: var(--sub-sb-md);
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
              ">
                <div style="font-size: 20px; margin-bottom: 4px;">🔥</div>
                <div>Red</div>
                <div style="font: var(--body-xs); opacity: 0.9; margin-top: 4px;">P:0/85% S:340/85%</div>
              </button>
              
              <button class="theme-button" data-theme="orange" data-primary-h="30" data-primary-s="90" data-secondary-h="200" data-secondary-s="80" style="
                padding: 16px 24px;
                border: 2px solid var(--border-default);
                border-radius: 8px;
                background: linear-gradient(135deg, hsl(30, 90%, 55%) 0%, hsl(30, 90%, 40%) 100%);
                color: white;
                font: var(--sub-sb-md);
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
              ">
                <div style="font-size: 20px; margin-bottom: 4px;">🍊</div>
                <div>Orange</div>
                <div style="font: var(--body-xs); opacity: 0.9; margin-top: 4px;">P:30/90% S:200/80%</div>
              </button>
            </div>
            <div class="theme-switcher-info" style="
              margin-top: 16px;
              padding: 12px 16px;
              background: var(--bg-secondary);
              border-radius: 6px;
              border-left: 3px solid var(--primary-500);
              font: var(--body-sm);
              color: var(--text-secondary);
            ">
              💡 <strong>Tip:</strong> 테마를 변경한 후 아래 Primary Color와 Secondary Color 섹션을 확인해보세요. 모든 스케일과 hex/hsl 값이 자동으로 업데이트됩니다!
            </div>
          `,
          label: "Theme Switcher",
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
            '<div class="color-swatch color-swatch--base" data-color="gray-500" style="background-color: var(--gray-500);"></div>',
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
      title: "Primary Color",
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
            '<div class="color-swatch color-swatch--base" data-color="primary-500" style="background-color: var(--primary-500);"></div>',
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
      title: "Secondary Color",
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
            '<div class="color-swatch color-swatch--base" data-color="secondary-500" style="background-color: var(--secondary-500);"></div>',
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
      title: "Success Color",
      description:
        "성공 메시지, 완료 상태, 확인 버튼에 사용됩니다. [Base: hsl(142, 72%, 47%)]",
      items: [
        {
          preview:
            '<div class="color-swatch" data-color="success-50" style="background-color: var(--success-50);"></div>',
          label: "success-50",
          variable: "--success-50",
          hsl: "h:142, s:57.6%, l:97%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="success-100" style="background-color: var(--success-100);"></div>',
          label: "success-100",
          variable: "--success-100",
          hsl: "h:142, s:61.2%, l:94%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="success-200" style="background-color: var(--success-200);"></div>',
          label: "success-200",
          variable: "--success-200",
          hsl: "h:142, s:64.8%, l:87%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="success-300" style="background-color: var(--success-300);"></div>',
          label: "success-300",
          variable: "--success-300",
          hsl: "h:142, s:72%, l:75%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="success-400" style="background-color: var(--success-400);"></div>',
          label: "success-400",
          variable: "--success-400",
          hsl: "h:142, s:72%, l:61%",
        },
        {
          preview:
            '<div class="color-swatch color-swatch--base" data-color="success-500" style="background-color: var(--success-500);"></div>',
          label: "success-500 [BASE]",
          variable: "--success-500",
          hsl: "h:142, s:72%, l:47%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="success-600" style="background-color: var(--success-600);"></div>',
          label: "success-600",
          variable: "--success-600",
          hsl: "h:142, s:74.2%, l:39%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="success-700" style="background-color: var(--success-700);"></div>',
          label: "success-700",
          variable: "--success-700",
          hsl: "h:142, s:76.3%, l:31%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="success-800" style="background-color: var(--success-800);"></div>',
          label: "success-800",
          variable: "--success-800",
          hsl: "h:142, s:79.2%, l:24%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="success-900" style="background-color: var(--success-900);"></div>',
          label: "success-900",
          variable: "--success-900",
          hsl: "h:142, s:82.8%, l:18%",
        },
      ],
    },
    {
      title: "Error Color",
      description:
        "오류 메시지, 위험 경고, 삭제 버튼에 사용됩니다. [Base: hsl(356, 90%, 63%)]",
      items: [
        {
          preview:
            '<div class="color-swatch" data-color="error-50" style="background-color: var(--error-50);"></div>',
          label: "error-50",
          variable: "--error-50",
          hsl: "h:356, s:72%, l:97%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="error-100" style="background-color: var(--error-100);"></div>',
          label: "error-100",
          variable: "--error-100",
          hsl: "h:356, s:76.5%, l:94%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="error-200" style="background-color: var(--error-200);"></div>',
          label: "error-200",
          variable: "--error-200",
          hsl: "h:356, s:81%, l:87%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="error-300" style="background-color: var(--error-300);"></div>',
          label: "error-300",
          variable: "--error-300",
          hsl: "h:356, s:90%, l:77%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="error-400" style="background-color: var(--error-400);"></div>',
          label: "error-400",
          variable: "--error-400",
          hsl: "h:356, s:90%, l:69%",
        },
        {
          preview:
            '<div class="color-swatch color-swatch--base" data-color="error-500" style="background-color: var(--error-500);"></div>',
          label: "error-500 [BASE]",
          variable: "--error-500",
          hsl: "h:356, s:90%, l:63%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="error-600" style="background-color: var(--error-600);"></div>',
          label: "error-600",
          variable: "--error-600",
          hsl: "h:356, s:91.8%, l:51%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="error-700" style="background-color: var(--error-700);"></div>',
          label: "error-700",
          variable: "--error-700",
          hsl: "h:356, s:94.5%, l:42%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="error-800" style="background-color: var(--error-800);"></div>',
          label: "error-800",
          variable: "--error-800",
          hsl: "h:356, s:97.2%, l:32%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="error-900" style="background-color: var(--error-900);"></div>',
          label: "error-900",
          variable: "--error-900",
          hsl: "h:356, s:100.8%, l:24%",
        },
      ],
    },
    {
      title: "Warning Color",
      description:
        "경고 메시지, 주의 필요 상태에 사용됩니다. [Base: hsl(48, 89%, 48%)]",
      items: [
        {
          preview:
            '<div class="color-swatch" data-color="warning-50" style="background-color: var(--warning-50);"></div>',
          label: "warning-50",
          variable: "--warning-50",
          hsl: "h:48, s:71.2%, l:97%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="warning-100" style="background-color: var(--warning-100);"></div>',
          label: "warning-100",
          variable: "--warning-100",
          hsl: "h:48, s:75.7%, l:93%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="warning-200" style="background-color: var(--warning-200);"></div>',
          label: "warning-200",
          variable: "--warning-200",
          hsl: "h:48, s:80.1%, l:84%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="warning-300" style="background-color: var(--warning-300);"></div>',
          label: "warning-300",
          variable: "--warning-300",
          hsl: "h:48, s:89%, l:70%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="warning-400" style="background-color: var(--warning-400);"></div>',
          label: "warning-400",
          variable: "--warning-400",
          hsl: "h:48, s:89%, l:59%",
        },
        {
          preview:
            '<div class="color-swatch color-swatch--base" data-color="warning-500" style="background-color: var(--warning-500);"></div>',
          label: "warning-500 [BASE]",
          variable: "--warning-500",
          hsl: "h:48, s:89%, l:48%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="warning-600" style="background-color: var(--warning-600);"></div>',
          label: "warning-600",
          variable: "--warning-600",
          hsl: "h:48, s:90.8%, l:40%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="warning-700" style="background-color: var(--warning-700);"></div>',
          label: "warning-700",
          variable: "--warning-700",
          hsl: "h:48, s:93.5%, l:32%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="warning-800" style="background-color: var(--warning-800);"></div>',
          label: "warning-800",
          variable: "--warning-800",
          hsl: "h:48, s:96.1%, l:26%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="warning-900" style="background-color: var(--warning-900);"></div>',
          label: "warning-900",
          variable: "--warning-900",
          hsl: "h:48, s:99.7%, l:20%",
        },
      ],
    },
    {
      title: "Info Color",
      description:
        "정보 메시지, 도움말, 안내에 사용됩니다. [Base: hsl(210, 100%, 54%)]",
      items: [
        {
          preview:
            '<div class="color-swatch" data-color="info-50" style="background-color: var(--info-50);"></div>',
          label: "info-50",
          variable: "--info-50",
          hsl: "h:210, s:80%, l:97%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="info-100" style="background-color: var(--info-100);"></div>',
          label: "info-100",
          variable: "--info-100",
          hsl: "h:210, s:85%, l:94%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="info-200" style="background-color: var(--info-200);"></div>',
          label: "info-200",
          variable: "--info-200",
          hsl: "h:210, s:90%, l:87%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="info-300" style="background-color: var(--info-300);"></div>',
          label: "info-300",
          variable: "--info-300",
          hsl: "h:210, s:100%, l:75%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="info-400" style="background-color: var(--info-400);"></div>',
          label: "info-400",
          variable: "--info-400",
          hsl: "h:210, s:100%, l:64%",
        },
        {
          preview:
            '<div class="color-swatch color-swatch--base" data-color="info-500" style="background-color: var(--info-500);"></div>',
          label: "info-500 [BASE]",
          variable: "--info-500",
          hsl: "h:210, s:100%, l:54%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="info-600" style="background-color: var(--info-600);"></div>',
          label: "info-600",
          variable: "--info-600",
          hsl: "h:210, s:102%, l:44%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="info-700" style="background-color: var(--info-700);"></div>',
          label: "info-700",
          variable: "--info-700",
          hsl: "h:210, s:105%, l:36%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="info-800" style="background-color: var(--info-800);"></div>',
          label: "info-800",
          variable: "--info-800",
          hsl: "h:210, s:108%, l:28%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="info-900" style="background-color: var(--info-900);"></div>',
          label: "info-900",
          variable: "--info-900",
          hsl: "h:210, s:112%, l:21%",
        },
      ],
    },
    {
      title: "Essential Color",
      description:
        "브랜드 강조 색상(Pink/Magenta)입니다. [Base: hsl(330, 85%, 52%)]",
      items: [
        {
          preview:
            '<div class="color-swatch" data-color="essential-50" style="background-color: var(--essential-50);"></div>',
          label: "essential-50",
          variable: "--essential-50",
          hsl: "h:330, s:68%, l:97%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="essential-100" style="background-color: var(--essential-100);"></div>',
          label: "essential-100",
          variable: "--essential-100",
          hsl: "h:330, s:72.3%, l:94%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="essential-200" style="background-color: var(--essential-200);"></div>',
          label: "essential-200",
          variable: "--essential-200",
          hsl: "h:330, s:76.5%, l:87%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="essential-300" style="background-color: var(--essential-300);"></div>',
          label: "essential-300",
          variable: "--essential-300",
          hsl: "h:330, s:85%, l:74%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="essential-400" style="background-color: var(--essential-400);"></div>',
          label: "essential-400",
          variable: "--essential-400",
          hsl: "h:330, s:85%, l:63%",
        },
        {
          preview:
            '<div class="color-swatch color-swatch--base" data-color="essential-500" style="background-color: var(--essential-500);"></div>',
          label: "essential-500 [BASE]",
          variable: "--essential-500",
          hsl: "h:330, s:85%, l:52%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="essential-600" style="background-color: var(--essential-600);"></div>',
          label: "essential-600",
          variable: "--essential-600",
          hsl: "h:330, s:86.7%, l:42%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="essential-700" style="background-color: var(--essential-700);"></div>',
          label: "essential-700",
          variable: "--essential-700",
          hsl: "h:330, s:89.3%, l:34%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="essential-800" style="background-color: var(--essential-800);"></div>',
          label: "essential-800",
          variable: "--essential-800",
          hsl: "h:330, s:91.8%, l:26%",
        },
        {
          preview:
            '<div class="color-swatch" data-color="essential-900" style="background-color: var(--essential-900);"></div>',
          label: "essential-900",
          variable: "--essential-900",
          hsl: "h:330, s:95.2%, l:20%",
        },
      ],
    },
    {
      title: "Surface Colors",
      description:
        "배경 계층 시스템입니다. 페이지 → 카드 → 드롭다운 → 모달 순으로 떠오르는 느낌을 줍니다.",
      items: [
        {
          preview:
            '<div class="color-swatch" data-color="surface-page" style="background-color: var(--surface-page);"></div>',
          label: "surface-page",
          variable: "--surface-page",
          reference: "var(--gray-0)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="surface-base" style="background-color: var(--surface-base);"></div>',
          label: "surface-base",
          variable: "--surface-base",
          reference: "var(--gray-50)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="surface-raised" style="background-color: var(--surface-raised);"></div>',
          label: "surface-raised",
          variable: "--surface-raised",
          reference: "var(--gray-100)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="surface-overlay" style="background-color: var(--surface-overlay);"></div>',
          label: "surface-overlay",
          variable: "--surface-overlay",
          reference: "var(--gray-0)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="surface-hover" style="background-color: var(--surface-hover);"></div>',
          label: "surface-hover",
          variable: "--surface-hover",
          reference: "var(--gray-100)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="surface-active" style="background-color: var(--surface-active);"></div>',
          label: "surface-active",
          variable: "--surface-active",
          reference: "var(--gray-200)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="surface-disabled" style="background-color: var(--surface-disabled);"></div>',
          label: "surface-disabled",
          variable: "--surface-disabled",
          reference: "var(--gray-50)",
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
        {
          preview:
            '<div class="color-swatch" data-color="text-link" style="background-color: var(--text-link);"></div>',
          label: "text-link",
          variable: "--text-link",
          reference: "var(--primary-600)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="text-link-hover" style="background-color: var(--text-link-hover);"></div>',
          label: "text-link-hover",
          variable: "--text-link-hover",
          reference: "var(--primary-700)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="text-link-visited" style="background-color: var(--text-link-visited);"></div>',
          label: "text-link-visited",
          variable: "--text-link-visited",
          reference: "var(--secondary-600)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="text-success" style="background-color: var(--text-success);"></div>',
          label: "text-success",
          variable: "--text-success",
          reference: "var(--success-700)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="text-error" style="background-color: var(--text-error);"></div>',
          label: "text-error",
          variable: "--text-error",
          reference: "var(--error-700)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="text-warning" style="background-color: var(--text-warning);"></div>',
          label: "text-warning",
          variable: "--text-warning",
          reference: "var(--warning-700)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="text-info" style="background-color: var(--text-info);"></div>',
          label: "text-info",
          variable: "--text-info",
          reference: "var(--info-700)",
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
      description:
        "테두리에 사용되는 시맨틱 컬러입니다. subtle → default → strong 순으로 진해집니다.",
      items: [
        {
          preview:
            '<div class="color-swatch" data-color="border-subtle" style="background-color: var(--border-subtle);"></div>',
          label: "border-subtle",
          variable: "--border-subtle",
          reference: "var(--gray-200)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="border-default" style="background-color: var(--border-default);"></div>',
          label: "border-default",
          variable: "--border-default",
          reference: "var(--gray-300)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="border-strong" style="background-color: var(--border-strong);"></div>',
          label: "border-strong",
          variable: "--border-strong",
          reference: "var(--gray-400)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="border-disabled" style="background-color: var(--border-disabled);"></div>',
          label: "border-disabled",
          variable: "--border-disabled",
          reference: "var(--gray-200)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="border-focus" style="background-color: var(--border-focus);"></div>',
          label: "border-focus",
          variable: "--border-focus",
          reference: "var(--primary-500)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="border-hover" style="background-color: var(--border-hover);"></div>',
          label: "border-hover",
          variable: "--border-hover",
          reference: "var(--gray-400)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="border-success" style="background-color: var(--border-success);"></div>',
          label: "border-success",
          variable: "--border-success",
          reference: "var(--success-500)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="border-error" style="background-color: var(--border-error);"></div>',
          label: "border-error",
          variable: "--border-error",
          reference: "var(--error-500)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="border-warning" style="background-color: var(--border-warning);"></div>',
          label: "border-warning",
          variable: "--border-warning",
          reference: "var(--warning-500)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="border-info" style="background-color: var(--border-info);"></div>',
          label: "border-info",
          variable: "--border-info",
          reference: "var(--info-500)",
        },
      ],
    },
    {
      title: "Interactive Colors",
      description:
        "버튼, 링크 등 상호작용 요소에 사용됩니다. default → hover → active 순으로 진해집니다.",
      items: [
        {
          preview:
            '<div class="color-swatch" data-color="interactive-default" style="background-color: var(--interactive-default);"></div>',
          label: "interactive-default",
          variable: "--interactive-default",
          reference: "var(--primary-500)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="interactive-hover" style="background-color: var(--interactive-hover);"></div>',
          label: "interactive-hover",
          variable: "--interactive-hover",
          reference: "var(--primary-600)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="interactive-active" style="background-color: var(--interactive-active);"></div>',
          label: "interactive-active",
          variable: "--interactive-active",
          reference: "var(--primary-700)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="interactive-disabled" style="background-color: var(--interactive-disabled);"></div>',
          label: "interactive-disabled",
          variable: "--interactive-disabled",
          reference: "var(--gray-400)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="interactive-bg-default" style="background-color: var(--interactive-bg-default);"></div>',
          label: "interactive-bg-default",
          variable: "--interactive-bg-default",
          reference: "var(--primary-500)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="interactive-bg-hover" style="background-color: var(--interactive-bg-hover);"></div>',
          label: "interactive-bg-hover",
          variable: "--interactive-bg-hover",
          reference: "var(--primary-600)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="interactive-bg-active" style="background-color: var(--interactive-bg-active);"></div>',
          label: "interactive-bg-active",
          variable: "--interactive-bg-active",
          reference: "var(--primary-700)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="interactive-bg-disabled" style="background-color: var(--interactive-bg-disabled);"></div>',
          label: "interactive-bg-disabled",
          variable: "--interactive-bg-disabled",
          reference: "var(--gray-300)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="interactive-text-default" style="background-color: var(--interactive-text-default);"></div>',
          label: "interactive-text-default",
          variable: "--interactive-text-default",
          reference: "var(--primary-600)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="interactive-text-hover" style="background-color: var(--interactive-text-hover);"></div>',
          label: "interactive-text-hover",
          variable: "--interactive-text-hover",
          reference: "var(--primary-700)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="interactive-text-active" style="background-color: var(--interactive-text-active);"></div>',
          label: "interactive-text-active",
          variable: "--interactive-text-active",
          reference: "var(--primary-800)",
        },
        {
          preview:
            '<div class="color-swatch" data-color="interactive-text-disabled" style="background-color: var(--interactive-text-disabled);"></div>',
          label: "interactive-text-disabled",
          variable: "--interactive-text-disabled",
          reference: "var(--gray-400)",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Color data registered (HSL-based)");

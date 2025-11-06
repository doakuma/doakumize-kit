# Vanillia Component System - TODO

> 향후 개선 및 확장 계획

## 📊 프로젝트 현황 요약

### ✅ 완료된 항목

- **컴포넌트 구현**: 20개 컴포넌트 완료

  - Foundation: Typography, Icon, Color, Spacing
  - Form Controls: Button, Input, Checkbox, Radio, Dropdown, Slider, Switch, Textarea
  - Data Display: Chip, Table, File Card, Badge
  - Feedback: Modal, Popover
  - Navigation: Tab, Accordion

- **HSL 기반 동적 컬러 시스템**: 구현 완료

  - `components/styles/variables.css`에 HSL 기반 동적 스케일 시스템 구현
  - 기준값(`--primary-h`, `--primary-s`)만 변경하면 전체 스케일 자동 업데이트
  - CSS `calc()` 함수 활용으로 빌드 도구 없이 동작

- **Semantic 변수 기본 정의**: 완료
  - `--text-primary`, `--text-secondary`, `--text-tertiary`
  - `--bg-primary`, `--bg-secondary`, `--bg-tertiary`
  - `--border-primary`, `--border-secondary`, `--border-focus`

### 🚧 진행 중 / 계획 중

- **SCSS 빌드 환경**: 미구성 (계획 단계)
- **다크모드**: 미구현 (준비 단계)
- **레거시 파일 정리**: 필요 (`resources/styles/variables.css`)

---

## 🎨 1. SCSS를 통한 컬러 스케일 자동화

**📅 시작일:** 2025-10-23  
**✅ 완료일:** -  
**📊 진행 상태:** 계획 단계

### 📌 현재 상태

- ✅ **HSL 기반 동적 컬러 시스템 구현 완료** (`components/styles/variables.css`)
  - `--primary-h`, `--primary-s` 기준값만 변경하면 전체 스케일 자동 업데이트
  - `calc()` 함수를 사용한 CSS 네이티브 동적 스케일 생성
  - Gray, Primary, Secondary 컬러 스케일 모두 구현됨
- ⚠️ **레거시 파일 존재** (`resources/styles/variables.css`)
  - 하드코딩된 컬러 값 사용
  - 마이그레이션 필요 (components/styles/variables.css로 통합)
- ❌ **SCSS 빌드 환경 미구성**
  - package.json 없음
  - 빌드 스크립트 없음
  - BUILD_SETUP_GUIDE.md 문서만 존재 (실제 설정 안 됨)

### 🎯 개선 방향

SCSS 믹스인을 사용하여 스케일 자동 생성

### 💻 구현 방법

#### 방법 1: SCSS 함수 + 믹스인

```scss
// _color-system.scss

// 스케일 설정 맵
$scale-config: (
  50: (
    lightness: 98%,
    saturation-multiplier: 0.9,
  ),
  100: (
    lightness: 94%,
    saturation-multiplier: 0.95,
  ),
  200: (
    lightness: 85%,
    saturation-multiplier: 1,
  ),
  300: (
    lightness: 73%,
    saturation-multiplier: 1,
  ),
  400: (
    lightness: 60%,
    saturation-multiplier: 1,
  ),
  500: (
    lightness: 50%,
    saturation-multiplier: 1,
  ),
  600: (
    lightness: 42%,
    saturation-multiplier: 1,
  ),
  700: (
    lightness: 35%,
    saturation-multiplier: 1.05,
  ),
  800: (
    lightness: 24%,
    saturation-multiplier: 1.1,
  ),
  900: (
    lightness: 17%,
    saturation-multiplier: 1.15,
  ),
);

// 컬러 스케일 자동 생성 믹스인
@mixin generate-color-scale($name, $hue, $saturation) {
  // Base HSL 컴포넌트 정의
  --#{$name}-h: #{$hue};
  --#{$name}-s: #{$saturation};

  // 각 스케일 생성
  @each $level, $config in $scale-config {
    --#{$name}-#{$level}: hsl(
      #{$hue},
      calc(#{$saturation} * #{map-get($config, saturation-multiplier)}),
      #{map-get($config, lightness)}
    );
  }
}

// 사용 예시
:root {
  @include generate-color-scale("primary", 190, 70%);
  @include generate-color-scale("secondary", 255, 80%);
  @include generate-color-scale("gray", 200, 15%);
}
```

#### 컴파일 결과

```css
:root {
  --primary-h: 190;
  --primary-s: 70%;
  --primary-50: hsl(190, calc(70% * 0.9), 98%);
  --primary-100: hsl(190, calc(70% * 0.95), 94%);
  /* ... 자동 생성 */
}
```

### ✅ 장점

- **코드 간소화**: 3줄로 전체 스케일 생성
- **일관성**: 모든 컬러가 동일한 패턴 사용
- **유지보수**: 스케일 공식 수정 시 한 곳만 변경
- **확장성**: 새 컬러 추가 = 1줄 추가

### ⚠️ 단점

- 빌드 도구 필요 (Webpack, Vite, Parcel 등)
- 초기 설정 복잡도 증가

### 📦 필요한 패키지

```json
{
  "devDependencies": {
    "sass": "^1.69.0",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16"
  }
}
```

### 🚀 구현 단계

1. [ ] `package.json` 생성 및 SCSS 패키지 설치
   - `sass` 또는 `dart-sass` 설치
   - 빌드 스크립트 추가 (npm scripts)
2. [ ] `vanillia/components/styles/` 구조 개편
   - `_color-system.scss` - 컬러 시스템 믹스인
   - `_mixins.scss` - 믹스인 모음
   - `variables.scss` - 메인 진입점 (기존 variables.css 변환)
3. [ ] 빌드 스크립트 작성
   - `npm run build:css` - CSS 컴파일
   - `npm run build:css:watch` - 개발 모드 (watch)
4. [ ] 기존 `variables.css` → `variables.scss` 마이그레이션
   - HSL 기반 동적 시스템 유지하면서 SCSS로 변환
   - 믹스인 활용하여 코드 간소화
5. [ ] 레거시 파일 정리
   - `resources/styles/variables.css` → `components/styles/variables.css`로 통합
   - 참조하는 모든 파일 경로 업데이트
6. [ ] 테스트 및 검증
   - 빌드된 CSS 파일 확인
   - 모든 컴포넌트 스타일 정상 동작 확인

---

## 🌓 2. 다크모드 구현

**📅 시작일:** 2025-10-23  
**✅ 완료일:** -  
**📊 진행 상태:** 준비 단계

### 📌 현재 상태

- ✅ **Semantic 변수 정의 완료** (`components/styles/variables.css`)
  - `--text-primary`, `--text-secondary`, `--text-tertiary`
  - `--bg-primary`, `--bg-secondary`, `--bg-tertiary`
  - `--border-primary`, `--border-secondary`, `--border-focus`
- ❌ **다크모드 미구현**
  - `@media (prefers-color-scheme: dark)` 쿼리 없음
  - `[data-theme]` 속성 기반 토글 없음
  - ThemeManager JavaScript 클래스 없음
- ⚠️ **컴포넌트 스타일 마이그레이션 필요**
  - 현재 많은 컴포넌트가 하드코딩된 컬러 값 사용 (`--gray-900`, `--gray-0` 등)
  - Semantic 변수로 교체 필요

### 🎯 개선 방향

OS 설정 감지 + 수동 토글 기능 추가

### 💻 구현 방법

#### 옵션 A: Media Query 방식 (자동)

```css
/* variables.css */
:root {
  /* Light Mode - Default */
  --bg-page: var(--gray-0);
  --bg-surface: var(--gray-50);
  --bg-elevated: var(--gray-100);

  --text-1: var(--gray-900);
  --text-2: var(--gray-600);
  --text-3: var(--gray-500);

  --border-1: var(--gray-200);
  --border-2: var(--gray-300);
}

/* Dark Mode - OS 설정 자동 감지 */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-page: var(--gray-900);
    --bg-surface: var(--gray-800);
    --bg-elevated: var(--gray-700);

    --text-1: var(--gray-0);
    --text-2: var(--gray-300);
    --text-3: var(--gray-400);

    --border-1: var(--gray-700);
    --border-2: var(--gray-600);

    /* Primary 색상 밝게 조정 */
    --primary-500: hsl(var(--primary-h), calc(var(--primary-s) * 1.1), 55%);
  }
}
```

#### 옵션 B: Attribute 방식 (수동 토글)

```css
/* Light Mode - Default */
:root {
  --bg-page: var(--gray-0);
  --text-1: var(--gray-900);
}

/* Dark Mode - Attribute Toggle */
[data-theme="dark"] {
  --bg-page: var(--gray-900);
  --text-1: var(--gray-0);
  /* ... */
}
```

#### 옵션 C: 하이브리드 (권장)

```css
/* 기본: OS 설정 따름 */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-page: var(--gray-900);
  }
}

/* 수동 오버라이드 */
[data-theme="light"] {
  --bg-page: var(--gray-0) !important;
}

[data-theme="dark"] {
  --bg-page: var(--gray-900) !important;
}
```

### 📱 JavaScript 토글 구현

```javascript
// resources/js/theme-toggle.js

class ThemeManager {
  constructor() {
    this.theme = this.getInitialTheme();
    this.init();
  }

  getInitialTheme() {
    // 1. localStorage 확인
    const saved = localStorage.getItem("theme");
    if (saved) return saved;

    // 2. OS 설정 확인
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    // 3. 기본값
    return "light";
  }

  init() {
    // 초기 테마 적용
    this.applyTheme(this.theme);

    // OS 설정 변경 감지
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          this.applyTheme(e.matches ? "dark" : "light");
        }
      });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.theme = theme;
  }

  toggle() {
    const newTheme = this.theme === "light" ? "dark" : "light";
    this.applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }
}

// 전역 인스턴스
window.themeManager = new ThemeManager();
```

### 🎨 다크모드 컬러 전략

#### 1. Semantic Variables 확장

```css
:root {
  /* ========================================
   * Semantic Colors - Light Mode
   * ======================================== */

  /* Backgrounds */
  --color-bg-page: var(--gray-0);
  --color-bg-surface: var(--gray-50);
  --color-bg-elevated: var(--gray-100);
  --color-bg-overlay: rgba(0, 0, 0, 0.5);

  /* Text */
  --color-text-primary: var(--gray-900);
  --color-text-secondary: var(--gray-600);
  --color-text-tertiary: var(--gray-500);
  --color-text-disabled: var(--gray-400);
  --color-text-inverse: var(--gray-0);

  /* Borders */
  --color-border-primary: var(--gray-200);
  --color-border-secondary: var(--gray-300);
  --color-border-focus: var(--primary-500);

  /* Interactive */
  --color-interactive-default: var(--primary-500);
  --color-interactive-hover: var(--primary-600);
  --color-interactive-active: var(--primary-700);

  /* Status */
  --color-status-info: var(--sementic-info);
  --color-status-success: var(--sementic-save);
  --color-status-warning: var(--sementic-warning);
  --color-status-error: var(--sementic-error);
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Backgrounds - Inverted */
    --color-bg-page: #0f1419;
    --color-bg-surface: #1a1f26;
    --color-bg-elevated: #242933;
    --color-bg-overlay: rgba(0, 0, 0, 0.7);

    /* Text - Inverted */
    --color-text-primary: #e8eaed;
    --color-text-secondary: #9ca3af;
    --color-text-tertiary: #6b7280;
    --color-text-disabled: #4b5563;
    --color-text-inverse: #1f2937;

    /* Borders - Darker */
    --color-border-primary: #374151;
    --color-border-secondary: #4b5563;
    --color-border-focus: var(--primary-400);

    /* Interactive - Brighter */
    --color-interactive-default: var(--primary-400);
    --color-interactive-hover: var(--primary-300);
    --color-interactive-active: var(--primary-200);
  }
}
```

#### 2. 컴포넌트 CSS 업데이트

```css
/* Before - 하드코딩 */
.card {
  background: var(--gray-0);
  color: var(--gray-900);
  border: 1px solid var(--gray-200);
}

/* After - Semantic 사용 */
.card {
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
}
```

### 🚀 구현 단계

#### Phase 1: Semantic Variables 확장 (진행 중)

1. [x] `variables.css`에 Semantic 변수 기본 정의 완료
2. [ ] Semantic 변수 확장 (더 많은 용도별 변수 추가)
   - `--color-bg-page`, `--color-bg-surface`, `--color-bg-elevated`
   - `--color-bg-overlay`
   - `--color-interactive-default`, `--color-interactive-hover`, `--color-interactive-active`
   - `--color-status-*` 변수들
3. [ ] 라이트 모드 기본값 설정 (현재 일부만 정의됨)
4. [ ] 다크모드 `@media` 쿼리 추가

#### Phase 2: JavaScript 토글 구현

1. [ ] `theme-toggle.js` 생성
2. [ ] localStorage 저장/로드 기능
3. [ ] OS 설정 감지 기능
4. [ ] 테마 전환 함수 구현

#### Phase 3: UI 컴포넌트 추가

1. [ ] 헤더에 다크모드 토글 버튼 추가
2. [ ] 아이콘 추가 (🌙 / ☀️)
3. [ ] 전환 애니메이션

#### Phase 4: 기존 스타일 마이그레이션

1. [ ] `common.css` Semantic 변수로 교체
2. [ ] `components.css` Semantic 변수로 교체
3. [ ] 각 컴포넌트별 다크모드 테스트

#### Phase 5: 테스트 및 검증

1. [ ] 브라우저별 호환성 테스트
2. [ ] Semantic 변수 누락 확인
3. [ ] 접근성 확인 (명도 대비)

---

## 📋 우선순위

### 🔥 High Priority

- [ ] **레거시 variables.css 파일 통합**

  - `resources/styles/variables.css` → `components/styles/variables.css`로 통합
  - 모든 참조 경로 업데이트
  - 중복 제거 및 일관성 확보

- [ ] **다크모드 기본 구현** (Semantic Variables + Media Query)
  - 빠르게 적용 가능
  - 사용자 경험 크게 향상
  - 별도 빌드 도구 불필요
  - Semantic 변수 확장 후 진행

### 🟡 Medium Priority

- [ ] **컴포넌트 스타일 Semantic 변수 마이그레이션**

  - 하드코딩된 컬러 값 → Semantic 변수로 교체
  - `common.css`, `components.css` 전체 점검
  - 다크모드 대비 선행 작업

- [ ] **토글 버튼 UI 추가**
  - 수동 전환 기능
  - localStorage 저장
  - OS 설정 감지 기능

### 🟢 Low Priority

- [ ] **SCSS 마이그레이션**
  - 코드 간소화 효과
  - 빌드 환경 구축 필요
  - 기존 시스템 안정화 후 진행
  - 현재 HSL 기반 동적 시스템이 잘 작동 중이므로 급하지 않음

---

## 🎯 예상 효과

### SCSS 도입 시

- 코드 라인 수: **~60% 감소**
- 새 컬러 추가: **1줄** (기존 10줄)
- 스케일 수정: **한 곳**만 변경
- 실수 가능성: **대폭 감소**

### 다크모드 도입 시

- 사용자 만족도 **향상**
- 접근성 **개선**
- 눈의 피로 **감소**
- 모던한 UX 제공

---

## 📚 참고 자료

### SCSS

- [Sass 공식 문서](https://sass-lang.com/documentation/)
- [Vite + SCSS 가이드](https://vitejs.dev/guide/features.html#css-pre-processors)

### 다크모드

- [Web.dev - prefers-color-scheme](https://web.dev/prefers-color-scheme/)
- [CSS-Tricks - Dark Mode](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/)
- [Material Design 3 - Dark Theme](https://m3.material.io/styles/color/dark-theme/overview)

### 컬러 시스템

- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors)
- [Radix Colors](https://www.radix-ui.com/colors)
- [Adobe Color](https://color.adobe.com/)

---

## 💡 추가 아이디어

### 1. 컬러 테마 프리셋

```javascript
const THEMES = {
  default: { primary: { h: 190, s: 70 } },
  ocean: { primary: { h: 200, s: 80 } },
  sunset: { primary: { h: 25, s: 90 } },
  forest: { primary: { h: 140, s: 60 } },
};
```

### 2. 실시간 컬러 프리뷰

- Color Palette 페이지에서 HSL 값 조정
- 실시간으로 전체 UI 변경 확인
- Export 기능 (variables.css 다운로드)

### 3. 접근성 검사 도구

- WCAG 명도 대비 자동 검사
- 경고 표시 (AAA/AA 기준)
- 추천 색상 제안

---

## 📝 변경 이력

### 2025-11-05

- 프로젝트 상태 파악 및 TODO 업데이트
- 현재 구현 상태 반영:
  - ✅ HSL 기반 동적 컬러 시스템 구현 완료 (`components/styles/variables.css`)
  - ✅ Semantic 변수 기본 정의 완료 (text, bg, border)
  - ✅ 20개 컴포넌트 구현 완료
  - ❌ SCSS 빌드 환경 미구성 (package.json 없음)
  - ❌ 다크모드 미구현 (다크모드 쿼리 및 토글 기능 없음)
  - ⚠️ 레거시 variables.css 파일 존재 (`resources/styles/variables.css`)
- 우선순위 재정렬:
  - High: 레거시 파일 통합, 다크모드 기본 구현
  - Medium: Semantic 변수 마이그레이션, 토글 버튼 UI
  - Low: SCSS 마이그레이션 (현재 시스템이 잘 작동 중)

### 2025-10-23

- TODO 문서 생성
- SCSS 자동화 방안 정리
- 다크모드 구현 계획 수립

---

> 💬 **Note**: 이 문서는 프로젝트 진행에 따라 지속적으로 업데이트됩니다.

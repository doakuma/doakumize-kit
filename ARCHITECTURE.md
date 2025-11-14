# Component Studio - 아키텍처 가이드

> 📅 작성일: 2025-11-14  
> 📝 버전: 1.0.0  
> 🎯 목적: 멀티 프레임워크 컴포넌트 스튜디오 구조 설명

## 📋 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [디렉토리 구조](#디렉토리-구조)
3. [공통 리소스 (shared)](#공통-리소스-shared)
4. [프레임워크별 구현](#프레임워크별-구현)
5. [확장 가이드](#확장-가이드)
6. [의사결정 기록](#의사결정-기록)

---

## 프로젝트 개요

Component Studio는 **동일한 디자인 시스템을 여러 프레임워크로 제공**하는 UI 컴포넌트 라이브러리입니다.

### 핵심 철학

1. **일관된 디자인**: 모든 프레임워크에서 동일한 디자인 토큰 사용
2. **화면 뼈대 제작**: 빠른 프로토타이핑과 초기 개발 지원
3. **복사 & 붙여넣기**: npm 없이 즉시 사용 가능
4. **점진적 확장**: Vanilla → React → MUI 순차 개발

### 지원 프레임워크

| 프레임워크 | 상태 | 설명 |
|-----------|------|------|
| **Vanilla JS** | ✅ 사용 가능 | 순수 HTML/CSS/JS 구현 |
| **React** | 🚧 준비 중 | React 컴포넌트 (Next.js 호환) |
| **MUI** | 📅 계획 중 | Material-UI 기반 |

---

## 디렉토리 구조

```
component-studio/
├── index.html                    # 메인 랜딩 페이지
├── index.css                     # 랜딩 페이지 스타일
├── index.js                      # 랜딩 페이지 스크립트
│
├── shared/                       # 🌟 공통 리소스
│   ├── styles/                   
│   │   ├── variables.css         # 디자인 토큰 (색상, 폰트, 간격)
│   │   ├── normalize.css         # CSS Reset
│   │   └── animations.css        # 공통 애니메이션
│   │
│   └── images/                   
│       ├── icons/                # 아이콘 PNG 파일들
│       └── logo.png              # 로고
│
├── vanillia/                     # Vanilla JS 구현
│   ├── index.html                # Vanilla 랜딩
│   ├── components.html           # 컴포넌트 목록 페이지
│   ├── generator.html            # 컴포넌트 생성기
│   │
│   ├── components/               
│   │   ├── component-engine.js   # 렌더링 엔진
│   │   ├── components-init.js    # 초기화
│   │   │
│   │   ├── data/                 # Vanilla 전용 데이터 (HTML 문자열)
│   │   │   ├── button.data.js
│   │   │   ├── input.data.js
│   │   │   └── ...
│   │   │
│   │   ├── renderers/            # 렌더러 (Generic, Modal 등)
│   │   ├── scripts/              # 컴포넌트 스크립트
│   │   └── styles/               # Vanilla 전용 스타일
│   │       ├── base.css
│   │       ├── components.css
│   │       └── items/
│   │
│   ├── resources/
│   │   ├── js/
│   │   │   ├── components-config.js  # 컴포넌트 메타데이터
│   │   │   └── ...
│   │   └── styles/
│   │
│   ├── core/                     # 빌드된 패키지 (Generator용)
│   ├── docs/                     # Vanilla 문서
│   └── scripts/                  # 빌드 스크립트
│
├── react/                        # 🚧 React 구현 (예정)
│   ├── index.html
│   ├── src/
│   │   ├── components/           # React 컴포넌트
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   └── ...
│   │   │
│   │   └── styles/               # React 전용 스타일
│   │       └── components.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── mui/                          # 📅 MUI 구현 (예정)
    ├── index.html
    ├── src/
    │   ├── components/           # MUI 컴포넌트
    │   ├── theme.js              # MUI 테마 (variables.css 기반)
    │   └── styles/
    │
    └── package.json
```

---

## 공통 리소스 (shared)

### 개요

`shared/` 폴더는 **모든 프레임워크가 공유하는 리소스**를 포함합니다.

### 포함 항목

#### 1. CSS Variables (`shared/styles/variables.css`)

**역할:**
- 디자인 토큰 정의 (색상, 폰트, 간격, Elevation 등)
- HSL 기반 동적 컬러 시스템
- 다크모드 지원 구조

**사용 예시:**
```css
/* Vanilla */
.btn--primary {
  background-color: var(--primary-500);
  color: var(--text-inverse);
}

/* React */
const Button = () => (
  <button style={{ backgroundColor: 'var(--primary-500)' }}>
    Click
  </button>
);

/* MUI - theme.js */
const theme = createTheme({
  palette: {
    primary: { main: 'var(--primary-500)' }
  }
});
```

#### 2. Normalize CSS (`shared/styles/normalize.css`)

- CSS Reset
- 브라우저 기본 스타일 통일

#### 3. Animations (`shared/styles/animations.css`)

- fade-in, slide-up 등 공통 애니메이션
- @keyframes 정의

#### 4. Images (`shared/images/`)

- 아이콘 PNG 파일 (mask-image 방식)
- 로고, 공통 이미지

### 사용 방법

#### Vanilla
```html
<!-- vanillia/components.html -->
<link rel="stylesheet" href="../shared/styles/variables.css">
<link rel="stylesheet" href="../shared/styles/normalize.css">
<link rel="stylesheet" href="./components/styles/components.css">
```

#### React (예정)
```css
/* react/src/index.css */
@import '../../shared/styles/variables.css';
@import '../../shared/styles/normalize.css';

/* 컴포넌트에서 CSS Variables 사용 */
```

#### MUI (예정)
```javascript
// mui/src/theme.js
// CSS Variables를 읽어서 MUI 테마로 변환
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-500');

const theme = createTheme({
  palette: {
    primary: { main: primaryColor }
  }
});
```

---

## 프레임워크별 구현

### Vanilla JavaScript

**특징:**
- 의존성 없음
- ComponentEngine 패턴 사용
- HTML 문자열 기반 렌더링

**데이터 구조:**
```javascript
// vanillia/components/data/button.data.js
window.ComponentData.button = {
  type: "button",
  variants: [
    {
      title: "Primary Buttons",
      items: [
        {
          preview: '<button class="btn btn--primary">Click</button>',
          label: "primary / medium"
        }
      ]
    }
  ]
};
```

**렌더링:**
```javascript
await componentEngine.loadAndMount(
  "button",
  "components/data/button.data.js",
  "#componentButton"
);
```

### React (예정)

**특징:**
- JSX 기반
- Hook 사용
- CSS Variables 활용
- Next.js, Vite, CRA 모두 호환

**컴포넌트 구조 (예시):**
```jsx
// react/src/components/Button.jsx
import './Button.css';

export const Button = ({ 
  variant = 'primary', 
  size = 'medium',
  children 
}) => {
  return (
    <button className={`btn btn--${variant} btn--${size}`}>
      {children}
    </button>
  );
};

// CSS는 variables.css 기반
```

### MUI (예정)

**특징:**
- Material-UI 컴포넌트 래핑
- Theme을 variables.css 기반으로 생성
- MUI의 접근성 기능 활용

**컴포넌트 구조 (예시):**
```jsx
// mui/src/components/Button.jsx
import { Button as MuiButton } from '@mui/material';

export const Button = ({ variant, children }) => {
  return (
    <MuiButton variant={variant}>
      {children}
    </MuiButton>
  );
};

// theme.js에서 variables.css 값을 MUI theme으로 변환
```

---

## 확장 가이드

### 새 프레임워크 추가 시

#### 1단계: 폴더 생성
```bash
mkdir framework-name/
cd framework-name/
```

#### 2단계: shared 리소스 참조
```html
<!-- index.html -->
<link rel="stylesheet" href="../shared/styles/variables.css">
```

#### 3단계: 컴포넌트 구현
- `vanillia/resources/js/components-config.js` 참고
- 동일한 컴포넌트 목록 구현
- CSS Variables 활용

#### 4단계: 메인 index.html 업데이트
```html
<!-- index.html -->
<a href="framework-name/index.html" class="card">
  <h3>New Framework</h3>
</a>
```

### 새 컴포넌트 추가 시

#### 1단계: Vanilla 구현
```javascript
// vanillia/components/data/new-component.data.js
window.ComponentData.newComponent = { ... };
```

#### 2단계: components-config.js 등록
```javascript
// vanillia/resources/js/components-config.js
const COMPONENT_LIST = [
  // ...
  {
    id: "new-component",
    name: "New Component",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: true
  }
];
```

#### 3단계: 다른 프레임워크에 동일하게 구현
- React: `react/src/components/NewComponent.jsx`
- MUI: `mui/src/components/NewComponent.jsx`

---

## 의사결정 기록

### 왜 Next.js 따로 안 만드나요?

**결정:** Next.js 버전을 별도로 만들지 않음

**이유:**
1. Next.js는 React의 상위 집합
2. 순수 React 컴포넌트는 Next.js에서 그대로 사용 가능
3. UI 컴포넌트는 SSR/SSG 기능 불필요
4. 유지보수 부담 감소

**대상:**
- React 버전 하나로 CRA, Vite, Next.js, Remix 등 모두 커버

### 왜 데이터를 shared로 안 빼나요?

**결정:** 컴포넌트 데이터(*.data.js)는 각 프레임워크에 유지

**이유:**
1. Vanilla는 HTML 문자열 사용
2. React는 JSX 사용
3. MUI는 MUI 컴포넌트 사용
4. 구조가 달라서 공통화 불가능

**단계적 접근:**
- **지금 (Phase 1):** 각자 보관
- **React 구현 (Phase 2):** 공통점 파악
- **공통화 (Phase 3):** 메타데이터만 추출 고려

### 공통 리소스 선정 기준

**shared로 이동:**
- ✅ CSS Variables (모든 프레임워크 동일)
- ✅ Normalize CSS (브라우저 초기화)
- ✅ Animations (공통 애니메이션)
- ✅ Images/Icons (동일 이미지 사용)

**각 프레임워크에 유지:**
- ❌ 컴포넌트 데이터 (구조가 다름)
- ❌ 렌더링 로직 (프레임워크마다 다름)
- ❌ 프레임워크 전용 스타일

### 디렉토리 구조 원칙

1. **명확한 분리**: shared vs 프레임워크별
2. **상대 경로 일관성**: `../shared/` 형태
3. **확장 가능성**: 새 프레임워크 추가 용이
4. **실용주의**: 오버엔지니어링 지양

---

## 다음 단계

### Phase 1: Vanilla 완성 (현재)
- ✅ 컴포넌트 구현 완료
- 🚧 shared 폴더 구조 변경
- 🚧 경로 수정

### Phase 2: React 버전 개발
- React 컴포넌트 작성
- CSS Variables 활용
- Storybook 또는 독립 페이지

### Phase 3: 공통 구조 추출
- 2개 버전 비교 후 공통점 파악
- 메타데이터 추출 고려
- 자동화 도구 검토

### Phase 4: MUI 버전 개발
- MUI Theme을 variables.css 기반 생성
- 빠른 구현 (패턴 확립됨)

---

## 참고 문서

- [Vanilla 가이드](vanillia/docs/INDEX.md)
- [컴포넌트 스크립트 가이드](vanillia/docs/COMPONENT_SCRIPT_GUIDE.md)
- [디자인 시스템](vanillia/components/styles/variables.css)
- [TODO](vanillia/TODO.md)

---

**Last Updated:** 2025-11-14  
**Maintainer:** Doakumize Kit Team


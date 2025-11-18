# @doakumize-kit/react

> React UI 컴포넌트 라이브러리 - 디자인 토큰 기반의 일관된 컴포넌트 제공

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.0.0-green.svg)]()

## 📖 소개

`@doakumize-kit/react`는 **화면 뼈대 제작을 위한 React UI 컴포넌트 라이브러리**입니다.  
CSS Variables 기반의 디자인 토큰을 사용하여 일관된 디자인 시스템을 제공하며, 빠른 프로토타이핑과 개발을 지원합니다.

### ✨ 주요 특징

- 🎨 **디자인 토큰 기반**: CSS Variables로 중앙 관리되는 일관된 디자인
- ⚡ **빠른 프로토타이핑**: 간단한 설치와 사용으로 빠른 화면 구성
- 🧩 **타입 안전성**: TypeScript 지원 (준비 중)
- 📦 **트리 쉐이킹**: 필요한 컴포넌트만 import하여 번들 크기 최적화
- 🎯 **접근성**: WCAG 가이드라인 준수

## 🚀 설치

### npm

```bash
npm install @doakumize-kit/react
```

### pnpm

```bash
pnpm add @doakumize-kit/react
```

### yarn

```bash
yarn add @doakumize-kit/react
```

## 📦 사용법

### 1. CSS 스타일 import

컴포넌트를 사용하기 전에 CSS 파일을 import해야 합니다.

```jsx
// App.jsx 또는 메인 진입점
import "@doakumize-kit/react/dist/styles.css";
```

### 2. 컴포넌트 import 및 사용

```jsx
import { Button } from "@doakumize-kit/react";

function App() {
  return (
    <div>
      <Button variant="primary" size="medium">
        클릭하세요
      </Button>
    </div>
  );
}
```

## 🎨 컴포넌트

### Button

다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.

#### 기본 사용법

```jsx
import { Button } from "@doakumize-kit/react";

function App() {
  return (
    <>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="default">Default Button</Button>
    </>
  );
}
```

#### Props

| Prop        | Type                                                                                         | Default     | Description                            |
| ----------- | -------------------------------------------------------------------------------------------- | ----------- | -------------------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'default' \| 'ghost' \| 'text' \| 'point' \| 'point-secondary'` | `'primary'` | 버튼 스타일                            |
| `size`      | `'small' \| 'medium' \| 'large'`                                                             | `'medium'`  | 버튼 크기                              |
| `disabled`  | `boolean`                                                                                    | `false`     | 비활성화 여부                          |
| `circle`    | `boolean`                                                                                    | `false`     | 원형 버튼 여부                         |
| `startIcon` | `ReactNode`                                                                                  | -           | 시작 아이콘                            |
| `endIcon`   | `ReactNode`                                                                                  | -           | 끝 아이콘                              |
| `children`  | `ReactNode`                                                                                  | -           | 버튼 텍스트                            |
| `...props`  | `ButtonHTMLAttributes`                                                                       | -           | 나머지 button props (onClick, type 등) |

#### Variants

```jsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="default">Default</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="text">Text</Button>
<Button variant="point">Point (Gradient)</Button>
<Button variant="point-secondary">Point Secondary</Button>
```

#### Sizes

```jsx
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>
```

#### States

```jsx
<Button disabled>Disabled Button</Button>
<Button circle>Circle Button</Button>
```

#### With Icons

```jsx
<Button startIcon={<Icon />}>Start Icon</Button>
<Button endIcon={<Icon />}>End Icon</Button>
<Button startIcon={<Icon />} /> {/* Icon Only */}
```

#### Event Handlers

```jsx
<Button
  onClick={() => console.log("Clicked!")}
  onMouseEnter={() => console.log("Hovered!")}
>
  Click me
</Button>
```

## 🛠️ 개발

### 개발 서버 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (http://localhost:5173)
pnpm dev
```

### 빌드

```bash
# 데모 빌드
pnpm build:demo

# 패키지 빌드
pnpm build:package

# 통합 빌드 (데모 + 패키지)
pnpm build
```

### 컴포넌트 쇼케이스 관리

컴포넌트 쇼케이스는 각 컴포넌트 폴더에 `{ComponentName}.showcase.jsx` 파일로 관리됩니다.  
스토리북과 유사한 구조로, 컴포넌트와 함께 showcase 데이터를 관리할 수 있습니다.

#### 쇼케이스 파일 구조

각 컴포넌트 폴더에 showcase 파일을 생성합니다:

```
src/components/ui/
├── Button/
│   ├── Button.jsx
│   ├── Button.css
│   ├── Button.showcase.jsx  ← 쇼케이스 파일
│   └── index.js
```

#### 쇼케이스 파일 작성 방법

```jsx
// Button.showcase.jsx
import { Button } from "./Button";
import { parsePropTypes } from "@/utils/propTypesParser";

/**
 * Button Component Showcase Data
 */
export const buttonShowcase = {
  title: "Button",
  description: "다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.",
  variants: [
    {
      title: "Variants",
      items: [
        {
          name: "Primary",
          component: <Button variant="primary">Primary</Button>,
        },
        // ... 더 많은 variant들
      ],
    },
    // ... 더 많은 variant 그룹들
  ],
  props: parsePropTypes(Button.propTypes, Button.defaultProps, {
    variant: "버튼 스타일 설명",
    size: "버튼 크기 설명",
    // ... 각 prop의 description
  }),
  codeExample: `import { Button } from "@doakumize-kit/react";

function App() {
  return (
    <Button variant="primary">Click me</Button>
  );
}`,
};
```

#### 쇼케이스 데이터 구조

- **title**: 컴포넌트 이름
- **description**: 컴포넌트 설명
- **variants**: 컴포넌트 variant 그룹 배열
  - **title**: 그룹 이름 (예: "Variants", "Sizes", "States")
  - **items**: 각 variant 항목
    - **name**: variant 이름
    - **component**: React 컴포넌트 인스턴스
- **props**: Props 정보 배열 (propTypes에서 자동 추출)
  - `parsePropTypes()` 함수를 사용하여 propTypes에서 자동으로 타입과 기본값 추출
  - description은 수동으로 전달
- **codeExample**: 사용 예제 코드 (문자열)

#### 자동 등록 시스템

쇼케이스는 자동으로 등록됩니다:

1. `components-config.js`에서 React가 `enabled: true`인 컴포넌트만 자동 등록
2. 컴포넌트 ID를 기반으로 showcase 파일 경로 자동 생성
   - 예: `"button"` → `@/components/ui/Button/Button.showcase.jsx`
3. Export 이름 규칙: `{componentId}Showcase` (camelCase)
   - 예: `"button"` → `buttonShowcase`

#### propTypes 활용

컴포넌트에 propTypes를 정의하면 자동으로 Props 테이블에 반영됩니다:

```jsx
// Button.jsx
import PropTypes from "prop-types";

export const Button = ({ variant, size, ... }) => {
  // ...
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", ...]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  // ...
};

Button.defaultProps = {
  variant: "primary",
  size: "medium",
  // ...
};
```

`parsePropTypes()` 함수가 propTypes에서 타입과 기본값을 자동으로 추출하므로, showcase 파일에서는 description만 추가하면 됩니다.

#### 새 컴포넌트 추가 시

1. 컴포넌트 폴더 생성: `src/components/ui/{ComponentName}/`
2. 컴포넌트 파일 작성: `{ComponentName}.jsx`
3. propTypes 정의 (선택사항)
4. 쇼케이스 파일 생성: `{ComponentName}.showcase.jsx`
5. `components-config.js`에서 해당 컴포넌트의 `enabled.react = true` 설정

이제 자동으로 쇼케이스가 등록되어 `/components/{componentId}` 경로에서 확인할 수 있습니다.

#### 경로 Alias

모든 import는 `@/` alias를 사용합니다:

- `@/components/...` - 컴포넌트
- `@/utils/...` - 유틸리티
- `@/data/...` - 데이터

상대 경로 대신 alias를 사용하면 파일 이동 시에도 경로 수정이 필요 없습니다.

## 📁 프로젝트 구조

```
react/
├── src/
│   ├── components/
│   │   ├── ui/              # 📦 패키지에 포함될 컴포넌트
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Button.css
│   │   │   │   ├── Button.showcase.jsx  # 쇼케이스 파일
│   │   │   │   └── index.js
│   │   │   └── ...
│   │   ├── studio/          # 🌐 스튜디오 데모 전용
│   │   │   ├── layout/      # 레이아웃 (Header, Footer, Layout)
│   │   │   ├── ComponentsSidebar.jsx
│   │   │   ├── ComponentShowcase.jsx  # 쇼케이스 렌더러
│   │   │   └── ...
│   │   └── sections/        # 🌐 스튜디오 데모 전용 (홈페이지 섹션)
│   │       ├── Hero.jsx
│   │       └── Features.jsx
│   ├── utils/              # 유틸리티 함수
│   │   └── propTypesParser.js  # propTypes 파서
│   ├── data/               # 데이터 파일
│   │   └── components-config.js  # 컴포넌트 설정
│   ├── styles/             # 스타일 파일 (variables.css, normalize.css)
│   ├── index.js            # 패키지 진입점
│   └── ...
├── dist/                   # 빌드 결과물
│   ├── index.js            # CommonJS
│   ├── index.esm.js        # ES Module
│   ├── index.umd.js        # UMD
│   └── styles.css          # 통합 CSS
├── rollup.config.js        # Rollup 설정
└── package.json
```

## 🎨 디자인 토큰

모든 컴포넌트는 CSS Variables 기반의 디자인 토큰을 사용합니다.  
디자인 토큰을 커스터마이징하여 전체 디자인을 쉽게 변경할 수 있습니다.

```css
:root {
  --primary-500: #1fcfe1;
  --text-primary: #1a1a1a;
  /* ... 기타 토큰들 */
}
```

자세한 디자인 토큰 목록은 [디자인 시스템 문서](../../ARCHITECTURE.md)를 참고하세요.

## 📚 문서

- [전체 문서](../../README.md)
- [아키텍처 가이드](../../ARCHITECTURE.md)
- [패키지 구조 가이드](./PACKAGE_GUIDE.md)

## 🤝 기여

기여를 환영합니다! 이슈를 등록하거나 Pull Request를 보내주세요.

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](../../LICENSE) 파일을 참고하세요.

## 🔗 관련 링크

- [데모 페이지](https://[username].github.io/doakumize-kit/react/)
- [GitHub Repository](https://github.com/[username]/doakumize-kit)

---

**Last Updated:** 2025-11-18

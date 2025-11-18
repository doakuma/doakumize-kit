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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'default' \| 'ghost' \| 'text' \| 'point' \| 'point-secondary'` | `'primary'` | 버튼 스타일 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 버튼 크기 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `circle` | `boolean` | `false` | 원형 버튼 여부 |
| `startIcon` | `ReactNode` | - | 시작 아이콘 |
| `endIcon` | `ReactNode` | - | 끝 아이콘 |
| `children` | `ReactNode` | - | 버튼 텍스트 |
| `...props` | `ButtonHTMLAttributes` | - | 나머지 button props (onClick, type 등) |

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
  onClick={() => console.log('Clicked!')}
  onMouseEnter={() => console.log('Hovered!')}
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

## 📁 프로젝트 구조

```
react/
├── src/
│   ├── components/
│   │   ├── ui/              # 📦 패키지에 포함될 컴포넌트
│   │   ├── studio/          # 🌐 스튜디오 데모 전용
│   │   │   ├── layout/      # 레이아웃 (Header, Footer, Layout)
│   │   │   ├── ComponentsSidebar.jsx
│   │   │   ├── ComponentShowcase.jsx
│   │   │   └── ...
│   │   └── sections/        # 🌐 스튜디오 데모 전용 (홈페이지 섹션)
│   │       ├── Hero.jsx
│   │       └── Features.jsx
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

**Last Updated:** 2025-11-17

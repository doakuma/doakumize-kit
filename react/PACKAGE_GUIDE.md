# React 패키지 구조 가이드

> 📅 작성일: 2025-11-14  
> 🎯 목적: npm 패키지 배포를 위한 최종 구조 설계 및 구현 가이드

## 📋 목차

1. [최종 추천 구조](#최종-추천-구조)
2. [핵심 결정 사항](#핵심-결정-사항)
3. [구현 방법](#구현-방법)
4. [로컬 개발 워크플로우](#로컬-개발-워크플로우)
5. [패키지 사용 예시](#패키지-사용-예시)
6. [구현 단계](#구현-단계)

---

## 🎯 최종 추천 구조

### 단일 빌드 폴더 패턴

```
react/
├── src/
│   ├── components/
│   │   ├── ui/              # 📦 패키지 컴포넌트
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Button.css
│   │   │   │   └── index.js
│   │   │   └── ...
│   │   ├── layout/          # 🌐 데모 전용
│   │   └── sections/        # 🌐 데모 전용
│   ├── styles/              # 📦 패키지 스타일
│   │   ├── variables.css    # shared에서 복사
│   │   ├── normalize.css    # shared에서 복사
│   │   ├── components.css   # 컴포넌트 스타일
│   │   └── index.css        # 진입점
│   ├── index.js              # 📦 패키지 진입점
│   ├── pages/               # 🌐 데모 전용
│   ├── App.jsx              # 🌐 데모 전용
│   └── main.jsx             # 🌐 데모 전용
│
├── dist/                     # 통합 빌드 폴더
│   ├── index.html           # 데모 (패키지 제외)
│   ├── assets/              # 데모 (패키지 제외)
│   ├── index.js             # 패키지 (CommonJS)
│   ├── index.esm.js         # 패키지 (ES Module)
│   ├── index.umd.js         # 패키지 (UMD)
│   └── styles.css           # 패키지 (컴포넌트 스타일)
│
├── rollup.config.js          # 패키지 빌드 설정
├── vite.config.js            # 데모 빌드 설정
└── package.json              # 패키지 메타데이터
```

**핵심 원칙:**
- ✅ 같은 `src/` 폴더에 데모와 컴포넌트 공존
- ✅ `dist/` 하나로 통합 (Vite + Rollup 모두)
- ✅ `package.json` `files` 필드로 선택적 포함
- ✅ URL 구조 유지 (`/doakumize-kit/react/`)

---

## 🔍 핵심 결정 사항

### 1. 빌드 폴더: 단일 vs 분리

**✅ 추천: 단일 빌드 폴더 (`dist/`)**

**이유:**
- 로컬 개발 시 패키지 빌드 결과물도 바로 확인 가능
- 실제 사용 환경과 동일한 빌드 결과
- 구조가 간단하고 유지보수 쉬움
- `files` 필드로 패키지에 포함할 것만 선택

**대안 (비추천):**
- `dist/` + `package-dist/` 분리: 로컬 확인 어려움
- Monorepo: 초기 설정 복잡, URL 변경 필요

### 2. Shared 리소스 처리

**✅ 추천: 패키지에 복사**

```
react/src/styles/
├── variables.css      # shared/styles/variables.css 복사
├── normalize.css      # shared/styles/normalize.css 복사
└── components.css    # 컴포넌트 스타일
```

**이유:**
- 독립적인 패키지 (외부 의존성 없음)
- 사용자가 바로 사용 가능
- 초기 단계에서 가장 실용적

**향후 마이그레이션:**
- 나중에 `@doakumize-kit/styles` 별도 패키지로 분리 가능

### 3. 데모 코드 분리

**✅ 추천: 현재 구조 유지**

- `src/`에 데모와 컴포넌트 공존
- 빌드 설정으로 패키지에 포함할 것만 선택
- URL 구조 변경 없음

---

## 🛠️ 구현 방법

### package.json 설정

```json
{
  "name": "@doakumize-kit/react",
  "version": "1.0.0",
  "description": "React UI components with design tokens",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "unpkg": "dist/index.umd.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist/index.js",
    "dist/index.esm.js",
    "dist/index.umd.js",
    "dist/styles.css",
    "README.md",
    "LICENSE"
  ],
  "scripts": {
    "dev": "vite --base /",
    "build": "vite build && rollup -c",
    "build:demo": "vite build",
    "build:package": "rollup -c",
    "preview": "vite preview"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

### vite.config.js (데모 빌드)

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(() => {
  return {
    plugins: [react()],
    base: "/doakumize-kit/react/",
    build: {
      outDir: "dist",
      rollupOptions: {
        input: {
          main: "index.html",
        },
      },
    },
    resolve: {
      alias: {
        "@shared": resolve(__dirname, "../shared"),
      },
    },
    server: {
      port: 5173,
      fs: {
        allow: [".."],
      },
    },
  };
});
```

### rollup.config.js (패키지 빌드)

```javascript
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      exports: "named",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "DoakumizeKit",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    postcss({
      extract: true,
      minimize: true,
      output: "dist/styles.css",
    }),
    terser(),
  ],
  external: ["react", "react-dom"],
};
```

### src/index.js (패키지 진입점)

```javascript
// 패키지에 포함될 컴포넌트만 export
export { Button } from "./components/ui/Button";
export { Input } from "./components/ui/Input";
// ... 기타 컴포넌트들

// 데모 전용은 export하지 않음
// (layout, sections, pages 등)
```

---

## 💻 로컬 개발 워크플로우

### 개발 서버 실행

```bash
pnpm dev
# → localhost:5173 접속
# → Vite가 src/ 직접 서빙
# → 핫 리로드 지원
```

**작업 흐름:**
1. `src/components/ui/Button.jsx` 수정
2. 브라우저 자동 새로고침
3. 데모 페이지에서 확인
4. 수정 반복

### 빌드 및 확인

```bash
# 데모 빌드
pnpm build:demo
# → dist/index.html, dist/assets/ 생성

# 패키지 빌드
pnpm build:package
# → dist/index.js, dist/styles.css 생성

# 통합 빌드
pnpm build
# → 데모 + 패키지 모두 빌드
```

**로컬에서 확인:**
- 데모: `dist/index.html` 브라우저에서 열기
- 패키지: `dist/index.js` 파일 확인
- 같은 `dist/` 폴더에서 모두 확인 가능 ✅

---

## 📦 패키지 사용 예시

### 설치

```bash
npm install @doakumize-kit/react
# 또는
pnpm add @doakumize-kit/react
# 또는
yarn add @doakumize-kit/react
```

### 사용

```jsx
// App.jsx
import { Button, Input } from "@doakumize-kit/react";
import "@doakumize-kit/react/dist/styles.css";

function App() {
  return (
    <div>
      <Button variant="primary" size="medium">
        Click me
      </Button>
      <Input placeholder="Enter text" />
    </div>
  );
}
```

### 패키지 내부 구조

```
node_modules/@doakumize-kit/react/
├── dist/
│   ├── index.js          # CommonJS
│   ├── index.esm.js      # ES Module
│   ├── index.umd.js      # UMD (CDN용)
│   └── styles.css       # 컴포넌트 스타일
├── package.json
└── README.md
```

**참고:** `dist/index.html`, `dist/assets/`는 `files` 필드에 없어서 패키지에 포함되지 않음

---

## 🚀 구현 단계

### Phase 1: 구조 준비

- [ ] `src/components/ui/` 폴더 생성
- [ ] `src/styles/` 폴더 생성
- [ ] `src/index.js` 패키지 진입점 생성
- [ ] Shared 리소스를 `src/styles/`로 복사

### Phase 2: 첫 컴포넌트 구현

- [ ] Button 컴포넌트 구현
  - `src/components/ui/Button/Button.jsx`
  - `src/components/ui/Button/Button.css`
  - `src/components/ui/Button/index.js`
- [ ] `src/index.js`에 Button export 추가
- [ ] 데모 페이지에서 테스트

### Phase 3: 빌드 설정

- [ ] Rollup 설치 및 설정
- [ ] `rollup.config.js` 작성
- [ ] `package.json` 설정 (files, scripts 등)
- [ ] 빌드 테스트 (`pnpm build`)

### Phase 4: 패키지 배포 준비

- [ ] README.md 작성
- [ ] LICENSE 파일 추가
- [ ] npm 배포 테스트 (로컬 또는 npm test registry)
- [ ] 실제 npm 배포

---

## 📊 비교: 다른 패턴들

| 항목 | 단일 빌드 (추천) | 분리 빌드 | Monorepo |
|------|----------------|----------|----------|
| 로컬 개발 편의성 | ✅ 좋음 | ⚠️ 보통 | ✅ 좋음 |
| 빌드 결과물 확인 | ✅ 쉬움 | ❌ 어려움 | ✅ 쉬움 |
| 구조 복잡도 | ✅ 간단 | ⚠️ 보통 | ❌ 복잡 |
| URL 유지 | ✅ 가능 | ✅ 가능 | ⚠️ 변경 필요 |
| 초기 설정 | ✅ 쉬움 | ✅ 쉬움 | ❌ 복잡 |

---

## 🎯 핵심 요약

1. **구조**: `src/`에 데모와 컴포넌트 공존, `dist/` 하나로 통합
2. **빌드**: Vite (데모) + Rollup (패키지) → 모두 `dist/`
3. **패키지**: `files` 필드로 선택적 포함
4. **Shared 리소스**: 패키지에 복사 (초기 단계)
5. **URL**: `/doakumize-kit/react/` 유지

**장점:**
- 로컬 개발 편의성 최대
- 실제 사용 환경과 동일
- 구조 간단, 유지보수 쉬움
- URL 구조 유지

---

**Last Updated:** 2025-11-14


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
7. [npm 배포 가이드](#-npm-배포-가이드)
8. [로컬 npm 패키지 테스트 방법](#-로컬-npm-패키지-테스트-방법)

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

| 항목             | 단일 빌드 (추천) | 분리 빌드 | Monorepo     |
| ---------------- | ---------------- | --------- | ------------ |
| 로컬 개발 편의성 | ✅ 좋음          | ⚠️ 보통   | ✅ 좋음      |
| 빌드 결과물 확인 | ✅ 쉬움          | ❌ 어려움 | ✅ 쉬움      |
| 구조 복잡도      | ✅ 간단          | ⚠️ 보통   | ❌ 복잡      |
| URL 유지         | ✅ 가능          | ✅ 가능   | ⚠️ 변경 필요 |
| 초기 설정        | ✅ 쉬움          | ✅ 쉬움   | ❌ 복잡      |

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

## 🚀 npm 배포 가이드

### 버전 번호 이해하기

#### Semantic Versioning (SemVer)

npm 패키지는 **Semantic Versioning** 규칙을 따릅니다:

```
MAJOR.MINOR.PATCH
  1  .  0  .  0
  │     │     │
  │     │     └─ PATCH: 버그 수정, 작은 변경
  │     └─────── MINOR: 새 기능 추가 (하위 호환)
  └───────────── MAJOR: 큰 변경, 하위 호환성 깨짐
```

#### 버전별 의미

| 버전    | 의미             | 사용 시기       | 예시                       |
| ------- | ---------------- | --------------- | -------------------------- |
| `0.0.0` | 초기 템플릿 값   | 개발 시작 전    | Vite/React 템플릿 기본값   |
| `0.1.0` | 초기 개발 버전   | 첫 기능 구현    | 첫 컴포넌트 추가           |
| `0.x.x` | 개발 중 (불안정) | API 변경 가능   | `0.2.0`, `0.3.0` 등        |
| `1.0.0` | 첫 안정 버전     | 공식 배포       | 첫 공개 배포               |
| `1.0.1` | 버그 수정        | 패치 업데이트   | 작은 버그 수정             |
| `1.1.0` | 새 기능 추가     | 마이너 업데이트 | 새 컴포넌트 추가           |
| `2.0.0` | 큰 변경          | 메이저 업데이트 | API 변경, Breaking Changes |

#### 현재 상태

```json
{
  "version": "0.0.0", // ❌ 배포 불가능한 플레이스홀더
  "private": true // ❌ npm 배포 차단
}
```

**의미:**

- `0.0.0`은 Vite/React 템플릿의 기본값으로, 실제 배포용 버전이 아닙니다
- 개발 중이거나 배포 준비가 되지 않았음을 나타냅니다

#### 배포 시 권장 버전

**초기 배포:**

- `0.1.0`: 아직 불안정, API 변경 가능
- `1.0.0`: 안정적, 공식 배포 준비 완료 (권장)

**버전 업데이트 규칙:**

- **PATCH** (`1.0.0` → `1.0.1`): 버그 수정, 문서 개선
- **MINOR** (`1.0.0` → `1.1.0`): 새 기능 추가 (하위 호환)
- **MAJOR** (`1.0.0` → `2.0.0`): Breaking Changes, API 변경

#### 버전 업데이트 방법

```bash
# 패치 버전 (1.0.0 → 1.0.1)
npm version patch

# 마이너 버전 (1.0.0 → 1.1.0)
npm version minor

# 메이저 버전 (1.0.0 → 2.0.0)
npm version major
```

**참고:** `npm version` 명령어는 자동으로:

- `package.json`의 `version` 업데이트
- Git 태그 생성 (`v1.0.1`)
- Git 커밋 생성

**주의:** 한 번 배포된 버전은 수정할 수 없으므로, 버전 업데이트 전에 충분히 테스트해야 합니다.

### 배포 전 준비사항

#### 1. package.json 수정

배포를 위해 다음 항목들을 수정해야 합니다:

```json
{
  "name": "@doakumize-kit/react", // 스코프 이름 사용
  "version": "1.0.0", // 초기 버전
  "private": false, // private 제거 또는 false
  "description": "React UI components with design tokens",
  "keywords": ["react", "components", "ui", "design-system", "css-variables"],
  "repository": {
    "type": "git",
    "url": "https://github.com/[username]/doakumize-kit.git",
    "directory": "react"
  },
  "license": "MIT",
  "author": "Your Name",
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

**중요 사항:**

- `name`: 스코프 이름(`@doakumize-kit`)을 사용하려면 npm에서 조직을 먼저 생성해야 합니다
- `private`: `true`이면 배포할 수 없습니다
- `peerDependencies`: React 버전 호환성 명시

#### 2. npm 계정 및 조직 설정

**스코프 이름 사용 시:**

1. npm 계정 로그인: `npm login`
2. npm 조직 생성: https://www.npmjs.com/org/create
   - 조직 이름: `doakumize-kit`
   - 조직 멤버 초대 (선택)
3. 조직 멤버로 추가되면 스코프 패키지 배포 가능

**일반 이름 사용 시:**

- 스코프 없이 `doakumize-kit-react` 같은 이름 사용 가능
- 조직 생성 불필요

### 배포 절차

#### 1. 빌드 확인

```bash
cd react

# 패키지 빌드
pnpm build:package

# 빌드 결과 확인
ls dist/
# → index.js, index.esm.js, index.umd.js, styles.css 확인
```

#### 2. 패키지 내용 확인

```bash
# 배포될 파일 목록 확인
npm pack --dry-run

# 실제 tarball 생성 (테스트용)
npm pack
# → react-1.0.0.tgz 생성됨
```

**확인 사항:**

- ✅ `dist/` 파일들 포함 여부
- ✅ `README.md`, `LICENSE` 포함 여부
- ✅ 불필요한 파일 제외 여부 (`node_modules`, `src/` 등)

#### 3. npm 로그인

```bash
# npm 계정 로그인
npm login

# 로그인 확인
npm whoami
```

#### 4. 배포 실행

**최초 배포:**

```bash
# 스코프 패키지인 경우
npm publish --access public

# 일반 패키지인 경우
npm publish
```

**배포 후 확인:**

- npm 페이지: `https://www.npmjs.com/package/@doakumize-kit/react`
- unpkg CDN: `https://unpkg.com/@doakumize-kit/react@1.0.0/dist/index.umd.js`

#### 5. 버전 업데이트 및 재배포

```bash
# 패치 버전 (1.0.0 → 1.0.1)
npm version patch
npm publish

# 마이너 버전 (1.0.0 → 1.1.0)
npm version minor
npm publish

# 메이저 버전 (1.0.0 → 2.0.0)
npm version major
npm publish
```

**참고:** `npm version` 명령어는 자동으로:

- `package.json`의 `version` 업데이트
- Git 태그 생성 (`v1.0.1`)
- Git 커밋 생성

### 배포 후 확인

#### 1. npm 페이지 확인

```
https://www.npmjs.com/package/@doakumize-kit/react
```

**확인 사항:**

- ✅ README.md 내용 표시
- ✅ 버전 정보
- ✅ 다운로드 통계
- ✅ 의존성 정보

#### 2. 설치 테스트

새로운 프로젝트에서 설치 테스트:

```bash
# 새 프로젝트 생성
mkdir test-install
cd test-install
npm init -y

# 패키지 설치
npm install @doakumize-kit/react

# 사용 테스트
```

```jsx
// test.jsx
import { Button } from "@doakumize-kit/react";
import "@doakumize-kit/react/dist/styles.css";

function App() {
  return <Button variant="primary">Test</Button>;
}
```

#### 3. CDN 테스트 (UMD)

```html
<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@doakumize-kit/react@1.0.0/dist/styles.css"
    />
  </head>
  <body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@19/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@doakumize-kit/react@1.0.0/dist/index.umd.js"></script>
    <script>
      const { Button } = DoakumizeKit;
      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(
        React.createElement(Button, { variant: "primary" }, "CDN Test")
      );
    </script>
  </body>
</html>
```

## 🧪 로컬 npm 패키지 테스트 방법

배포 전에 **반드시** 로컬에서 패키지를 테스트해야 합니다. 실제 npm에 배포하기 전에 다른 프로젝트에서 설치하고 사용해보는 것이 중요합니다.

### npm pack + 설치 (권장)

**장점:**

- 실제 npm 설치와 동일한 방식
- tarball 내용을 확인할 수 있음
- 배포 전 최종 검증에 적합

**단점:**

- 패키지 수정 시마다 다시 pack 해야 함

**사용 방법:**

```bash
# 1. 패키지 폴더에서 빌드 및 pack
cd react

# 패키지 빌드
pnpm build:package

# tarball 생성
npm pack
# → doakumize-kit-react-0.0.0.tgz 생성됨

# 2. 테스트 프로젝트에서 설치
cd /path/to/test-project

# React 설치 (아직 안 했다면)
npm install react react-dom

# tarball 설치
npm install /path/to/react/doakumize-kit-react-0.0.0.tgz
```

**tarball 내용 확인:**

```bash
# 배포될 파일 목록 확인 (실제 생성 없이)
npm pack --dry-run

# 실제 tarball 생성
npm pack
```

### 테스트 프로젝트 예시

로컬 테스트를 위한 최소한의 React 프로젝트:

**package.json:**

```json
{
  "name": "test-doakumize",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "doakumize-kit-react": "file:../doakumize-kit/react/doakumize-kit-react-0.0.0.tgz"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.1.0",
    "vite": "^7.2.2"
  }
}
```

**index.html:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Package Test</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.jsx"></script>
  </body>
</html>
```

**main.jsx:**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Button } from "doakumize-kit-react";
import "doakumize-kit-react/dist/styles.css";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Package Test</h1>
      <Button variant="primary" size="medium">
        Test Button
      </Button>
      <Button variant="secondary" size="small" style={{ marginLeft: "10px" }}>
        Secondary
      </Button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**vite.config.js:**

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

### 테스트 체크리스트

로컬 테스트 시 확인할 사항:

- [ ] 패키지가 정상적으로 설치되는가?
- [ ] `node_modules/doakumize-kit-react/` 폴더가 생성되었는가?
- [ ] `dist/` 폴더에 빌드 파일들이 있는가?
  - `index.js` (CommonJS)
  - `index.esm.js` (ES Module)
  - `index.umd.js` (UMD)
  - `styles.css` (스타일)
- [ ] 컴포넌트를 import할 수 있는가?
- [ ] CSS 스타일이 정상적으로 적용되는가?
- [ ] 컴포넌트가 정상적으로 렌더링되는가?
- [ ] 콘솔에 에러가 없는가?

### 주의사항

#### ⚠️ 배포 전 체크리스트

- [ ] `package.json`의 `private` 필드 제거 또는 `false`
- [ ] `version`이 의미 있는 버전인지 확인 (0.0.0 아님)
- [ ] `name`이 고유한지 확인 (npm에서 검색)
- [ ] `files` 필드에 필요한 파일만 포함
- [ ] `README.md`가 완성되었는지 확인
- [ ] `LICENSE` 파일 포함 여부 확인
- [ ] 빌드가 성공적으로 완료되었는지 확인
- [ ] `npm pack --dry-run`으로 내용 확인

#### ⚠️ 배포 후 주의사항

- **버전 관리**: 한 번 배포된 버전은 수정할 수 없습니다
- **Breaking Changes**: 메이저 버전 업데이트 시 `CHANGELOG.md` 작성 권장
- **보안**: `.npmignore` 또는 `files` 필드로 민감한 정보 제외
- **의존성**: `peerDependencies`로 React 버전 명시

### 문제 해결

#### 배포 실패 시

**에러: "You cannot publish over the previously published versions"**

- 해결: 버전을 올려서 다시 배포

**에러: "Package name already exists"**

- 해결: 다른 이름 사용 또는 스코프 이름 사용

**에러: "You do not have permission to publish"**

- 해결: npm 조직 멤버 확인 또는 일반 이름 사용

#### 배포 취소

배포 후 문제가 발견되면:

```bash
# 특정 버전 삭제 (24시간 이내만 가능)
npm unpublish @doakumize-kit/react@1.0.0

# 전체 패키지 삭제 (72시간 이내만 가능, 권장하지 않음)
npm unpublish @doakumize-kit/react --force
```

**주의:** unpublish는 최후의 수단이며, 이미 사용 중인 패키지는 삭제하지 않는 것이 좋습니다.

---

**Last Updated:** 2025-11-17 (로컬 테스트 방법 추가)

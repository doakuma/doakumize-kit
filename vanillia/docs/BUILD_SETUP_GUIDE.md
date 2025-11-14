# 빌드 환경 설정 가이드

## 📋 목표

CSS 파일을 여러 개로 분리해서 개발하되, 프로덕션에서는 하나의 파일로 번들링하여 성능 최적화

## 🆕 현재 빌드 시스템 (2025-11-11)

### ✅ 구현 완료된 빌드 시스템

Doakumize Kit은 **3단계 빌드 시스템**을 사용합니다:

#### 1️⃣ 개발 (resources/styles/)
```bash
# Studio에서 스타일 개발
resources/styles/
├── base.css
├── animations.css
├── scrollbar.css
├── layout.css (Studio 전용)
├── lnb.css (Studio 전용)
└── studio.css (Studio 페이지 전용)
```

#### 2️⃣ 빌드 (core/styles/)
```bash
# resources → core로 자동 복사
npm run build:core

# 결과:
core/styles/
├── common.css         # Import 진입점 (자동 생성)
├── base.css           # resources에서 복사
├── animations.css     # resources에서 복사
├── scrollbar.css      # resources에서 복사
├── normalize.css      # components에서 복사
└── variables.css      # components에서 복사
```

#### 3️⃣ 배포 (Component Generator)
```bash
# 사용자가 Generator에서 선택
# → ZIP 다운로드 (선택한 컴포넌트만!)

doakumize-components.zip
├── examples.js
└── styles/
    ├── common.css
    ├── components.css  # 선택한 컴포넌트만 포함!
    ├── base.css
    └── ...
```

### 📋 빌드 명령어

```bash
# Core 스타일 빌드 (CSS)
npm run build:core

# 컴포넌트 스크립트 빌드 (JS)
npm run build

# 전체 빌드
npm run build:core && npm run build
```

---

## 🎯 추천 방식 비교

### 1️⃣ PostCSS + postcss-import (가장 가벼움) ⭐ **권장**

**장점:**
- ✅ CSS 전용으로 가볍고 빠름
- ✅ 설정이 매우 간단
- ✅ 기존 프로젝트 구조 변경 최소화
- ✅ Node.js만 설치하면 바로 사용 가능

**단점:**
- ❌ JavaScript 번들링은 불가 (하지만 현재 프로젝트에는 필요 없음)

**적합한 경우:**
- CSS 번들링만 필요한 경우 (현재 프로젝트)
- 최소한의 설정으로 시작하고 싶은 경우

---

### 2️⃣ Vite (최신, 빠름, 확장성)

**장점:**
- ✅ 매우 빠른 개발 서버 (HMR)
- ✅ CSS + JavaScript 모두 처리 가능
- ✅ 향후 확장성 (TypeScript, JSX 등)
- ✅ 프로덕션 빌드 최적화

**단점:**
- ❌ 설정이 PostCSS보다 복잡
- ❌ 현재 프로젝트에는 Overkill일 수 있음

**적합한 경우:**
- 향후 JavaScript 번들링도 필요할 가능성이 있는 경우
- 최신 도구를 사용하고 싶은 경우

---

## 🚀 추천: PostCSS 방식 (단계별 설정)

### Step 1: Node.js 설치 확인

```bash
node --version  # v16 이상 권장
npm --version   # v7 이상 권장
```

### Step 2: 프로젝트 초기화

```bash
cd vanillia
npm init -y
```

### Step 3: PostCSS 및 플러그인 설치

```bash
npm install --save-dev postcss postcss-cli postcss-import postcss-preset-env cssnano
```

**패키지 설명:**
- `postcss`: CSS 변환 도구
- `postcss-cli`: CLI 도구
- `postcss-import`: `@import` 처리
- `postcss-preset-env`: 최신 CSS 기능 사용
- `cssnano`: CSS 압축 (프로덕션용)

### Step 4: PostCSS 설정 파일 생성

**`postcss.config.js` 파일 생성:**

```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 2, // 최신 CSS 기능 사용
    },
    cssnano: process.env.NODE_ENV === 'production' ? {} : false, // 프로덕션에서만 압축
  },
};
```

### Step 5: package.json 스크립트 추가

**`package.json`에 추가:**

```json
{
  "scripts": {
    "build:css": "postcss resources/styles/components.css -o dist/components.bundle.css",
    "build:css:watch": "postcss resources/styles/components.css -o dist/components.bundle.css --watch",
    "build": "npm run build:css",
    "dev": "npm run build:css:watch"
  }
}
```

### Step 6: 빌드 실행

```bash
# 개발 모드 (파일 변경 감지)
npm run dev

# 프로덕션 빌드
NODE_ENV=production npm run build
```

### Step 7: HTML에서 번들 파일 사용

**개발 환경:**
```html
<link rel="stylesheet" href="resources/styles/components.css">
```

**프로덕션:**
```html
<link rel="stylesheet" href="dist/components.bundle.css">
```

---

## 📁 최종 프로젝트 구조

```
vanillia/
├── dist/                          # 빌드 결과물 (gitignore에 추가)
│   └── components.bundle.css
├── node_modules/                  # npm 패키지
├── package.json                   # 새로 생성
├── postcss.config.js              # 새로 생성
├── resources/
│   └── styles/
│       ├── components.css         # Entry point (변경 없음)
│       └── components/            # 분리된 파일들
│           ├── _base.css
│           ├── form/
│           └── ...
└── ...
```

---

## 🔄 빌드 워크플로우

### 개발 환경

1. **파일 수정**: `resources/styles/components/form/input.css` 수정
2. **자동 빌드**: `npm run dev`가 변경 사항 감지하여 자동 빌드
3. **브라우저 새로고침**: `dist/components.bundle.css` 확인

### 프로덕션 배포

1. **빌드 실행**: `NODE_ENV=production npm run build`
2. **결과물 확인**: `dist/components.bundle.css` (압축됨)
3. **배포**: `dist/` 폴더의 파일만 배포

---

## 🎨 Vite 방식 (대안)

PostCSS가 너무 단순하다면 Vite를 사용할 수도 있어요.

### Vite 설치

```bash
npm install --save-dev vite
```

### `vite.config.js` 생성

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    cssCodeSplit: false, // CSS를 하나의 파일로 번들링
    rollupOptions: {
      input: {
        main: 'resources/styles/components.css',
      },
      output: {
        assetFileNames: 'components.bundle.css',
      },
    },
  },
});
```

### package.json 스크립트

```json
{
  "scripts": {
    "build": "vite build",
    "dev": "vite build --watch"
  }
}
```

---

## 📝 .gitignore 추가

```gitignore
# Dependencies
node_modules/

# Build output
dist/

# Environment
.env
.env.local
```

---

## ✅ 검증 방법

### 빌드 결과 확인

```bash
# 빌드 실행
npm run build

# 파일 크기 확인
ls -lh dist/components.bundle.css

# 내용 확인 (@import가 제거되었는지 확인)
cat dist/components.bundle.css | head -20
```

### 예상 결과

**빌드 전 (`components.css`):**
```css
@import url(components/_base.css);
@import url(components/button.css);
```

**빌드 후 (`components.bundle.css`):**
```css
/* _base.css 내용 */
.base { ... }

/* button.css 내용 */
.btn { ... }
```

---

## 🎯 최종 추천

**현재 프로젝트에는 PostCSS 방식을 추천해요:**

1. ✅ **가볍고 빠름**: CSS 전용으로 최적화
2. ✅ **설정 간단**: 몇 줄의 설정으로 완료
3. ✅ **기존 구조 유지**: 프로젝트 구조 변경 최소화
4. ✅ **학습 곡선 낮음**: 빠르게 적용 가능

**향후 확장이 필요하면 Vite로 마이그레이션 가능!**

---

## 🚨 주의사항

1. **경로 문제**: `@import`에서 상대 경로 확인 필요
2. **순서 보장**: `postcss-import`가 `@import` 순서대로 병합
3. **CSS Variables**: 변수는 `variables.css`를 먼저 import해야 함

---

## 📚 참고 자료

- [PostCSS 공식 문서](https://postcss.org/)
- [postcss-import 문서](https://github.com/postcss/postcss-import)
- [Vite 공식 문서](https://vitejs.dev/)


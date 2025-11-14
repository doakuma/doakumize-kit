# React 환경 설정 & GitHub Pages 배포 트러블슈팅

> 📅 작성일: 2025-11-14  
> 🎯 목표: React + Vite 환경 구축 및 GitHub Pages 자동 배포 설정  
> ⏱️ 소요 시간: 약 2시간  
> 📊 난이도: ⭐⭐⭐⭐ (어려움)

---

## 📋 목차

1. [문제 1: ES Module에서 process, __dirname 사용 불가](#문제-1-es-module에서-process-__dirname-사용-불가)
2. [문제 2: import.meta.env 초기화 시점 에러](#문제-2-importmetaenv-초기화-시점-에러)
3. [문제 3: GitHub Actions 권한 에러](#문제-3-github-actions-권한-에러)
4. [문제 4: Node.js 버전 호환성](#문제-4-nodejs-버전-호환성)
5. [문제 5: GitHub Pages base 경로 문제](#문제-5-github-pages-base-경로-문제)
6. [문제 6: GitHub Pages 브랜치 설정 오류](#문제-6-github-pages-브랜치-설정-오류)
7. [최종 해결 방법](#최종-해결-방법)

---

## 문제 1: ES Module에서 process, __dirname 사용 불가

### 🐛 에러 메시지
```
ReferenceError: process is not defined
ReferenceError: __dirname is not defined
```

### 📝 원인
Vite는 ES Module을 사용하는데, `process`와 `__dirname`은 CommonJS 변수라서 사용 불가.

### ✅ 해결 방법

**잘못된 코드:**
```javascript
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'), // ❌ __dirname 없음
    }
  }
})
```

**올바른 코드:**
```javascript
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// ES Module에서 __dirname 생성
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  resolve: {
    alias: {
      '@shared': resolve(__dirname, '../shared'), // ✅ 작동!
    }
  }
})
```

### 💡 핵심 개념
- **CommonJS**: `__dirname`, `process` 자동 제공
- **ES Module**: `import.meta.url`로 직접 생성해야 함

---

## 문제 2: import.meta.env 초기화 시점 에러

### 🐛 에러 메시지
```
TypeError: Cannot read properties of undefined (reading 'MODE')
```

### 📝 원인
`vite.config.js` 로딩 시점에는 `import.meta.env`가 아직 초기화되지 않음.

### ✅ 해결 방법

**시도 1: import.meta.env 사용 (실패) ❌**
```javascript
export default defineConfig({
  base: import.meta.env.MODE === 'production' ? '/path/' : '/'
  // ❌ config 로딩 시점에 import.meta.env가 undefined
})
```

**시도 2: 함수형 defineConfig (성공) ✅**
```javascript
export default defineConfig(({ command, mode }) => {
  return {
    base: command === 'build' ? '/doakumize-kit/react/' : '/'
    // ✅ Vite가 command, mode를 전달해줌
  }
})
```

### 💡 핵심 개념
- `defineConfig({})`는 즉시 실행
- `defineConfig(({ command, mode }) => ({}))`는 Vite 초기화 후 실행
- `command`: 'build' | 'serve'
- `mode`: 'development' | 'production'

---

## 문제 3: GitHub Actions 권한 에러

### 🐛 에러 메시지
```
remote: Permission to doakuma/doakumize-kit.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/...': The requested URL returned error: 403
```

### 📝 원인
GitHub Actions의 기본 권한이 읽기 전용이라 gh-pages 브랜치에 푸시 불가.

### ✅ 해결 방법

**1. Repo Settings 변경:**
```
GitHub repo → Settings → Actions → General
→ Workflow permissions
→ "Read and write permissions" 선택 ✅
→ Save
```

**2. workflow 파일에 명시적 권한 설정:**
```yaml
# .github/workflows/deploy.yml
permissions:
  contents: write  # gh-pages에 푸시하려면 필수!
  pages: write
  id-token: write
```

### 💡 핵심 개념
- 기본 설정: `contents: read` (읽기 전용)
- gh-pages 배포: `contents: write` 필요
- 보안상 기본값이 read-only

---

## 문제 4: Node.js 버전 호환성

### 🐛 에러 메시지
```
You are using Node.js 18.20.8. Vite requires Node.js version 20.19+ or 22.12+.
```

### 📝 원인
Vite 7.x는 Node.js 20+ 필요.

### ✅ 해결 방법

**GitHub Actions 설정 수정:**
```yaml
# Before ❌
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: 18

# After ✅
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: 20
```

### 💡 참고
- **로컬 환경**: Node 18.x도 작동 (경고만 나옴)
- **GitHub Actions**: Node 20+ 필수
- 로컬과 서버 버전이 달라도 됨

---

## 문제 5: GitHub Pages base 경로 문제

### 🐛 에러 메시지
```
GET https://doakuma.github.io/src/main.jsx net::ERR_ABORTED 404 (Not Found)
```

### 📝 원인
Vite가 빌드 시 루트 경로(`/`)로 빌드되어, GitHub Pages 서브 경로(`/doakumize-kit/react/`)에서 리소스를 찾지 못함.

### ✅ 해결 과정

**시도 1: process.env 사용 (실패) ❌**
```javascript
base: process.env.NODE_ENV === 'production' ? '/path/' : '/'
// ❌ ES Module에서 process 사용 불가
```

**시도 2: import.meta.env 사용 (실패) ❌**
```javascript
base: import.meta.env.MODE === 'production' ? '/path/' : '/'
// ❌ config 로딩 시점에 undefined
```

**시도 3: 환경 변수 + loadEnv (실패) ❌**
```javascript
const env = loadEnv(mode, process.cwd(), '')
// ❌ process.cwd() 사용 불가
```

**시도 4: command 파라미터 사용 (성공!) ✅**
```javascript
export default defineConfig(({ command, mode }) => {
  return {
    base: command === 'build' ? '/doakumize-kit/react/' : '/'
  }
})
```

### 📦 package.json 스크립트 설정
```json
{
  "scripts": {
    "dev": "vite --base /",  // 개발: 루트 경로
    "build": "vite build",   // 빌드: config의 base 사용
    "preview": "vite preview" // preview: config의 base 사용
  }
}
```

### 💡 핵심 개념
- **개발 환경**: `localhost:5173/` (루트 경로)
- **배포 환경**: `/doakumize-kit/react/` (서브 경로)
- `command === 'build'`로 구분하는 것이 가장 확실!

---

## 문제 6: GitHub Pages 브랜치 설정 오류

### 🐛 증상
- 빌드는 성공
- gh-pages 브랜치에 빌드 파일 존재
- 하지만 사이트에 원본 소스가 표시됨

### 📝 원인
GitHub Pages Settings가 **main 브랜치**를 바라보고 있었음.

### ✅ 해결 방법

**GitHub Settings 변경:**
```
GitHub repo → Settings → Pages
→ Source: Deploy from a branch
→ Branch: gh-pages 선택 ✅ (main이 아니라!)
→ Folder: / (root)
→ Save
```

### 💡 핵심 개념
- **main 브랜치**: 원본 소스 코드
- **gh-pages 브랜치**: 빌드된 배포 파일
- GitHub Actions가 자동으로 gh-pages에 배포
- Settings에서 gh-pages를 바라봐야 함!

---

## 최종 해결 방법

### 📁 파일 구조
```
doakumize-kit/
├── .github/
│   └── workflows/
│       └── deploy.yml          # 자동 배포 설정
├── react/
│   ├── src/                    # React 소스 (main 브랜치)
│   ├── vite.config.js          # Vite 설정
│   └── package.json
└── shared/                     # 공통 리소스
```

### ⚙️ vite.config.js (최종)
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// ES Module에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // build 명령어면 GitHub Pages 경로, dev면 루트 경로
  const base = command === "build" ? "/doakumize-kit/react/" : "/";
  
  return {
    plugins: [react()],

    // GitHub Pages 배포 경로
    base: base,

    // Shared 리소스 접근을 위한 alias
    resolve: {
      alias: {
        "@shared": resolve(__dirname, "../shared"),
      },
    },

    // 개발 서버 설정
    server: {
      port: 5173,
      // shared 폴더를 정적 파일로 서빙
      fs: {
        allow: [".."],
      },
    },
  };
});
```

### 🚀 .github/workflows/deploy.yml (최종)
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

# GitHub Pages 배포 권한 설정
permissions:
  contents: write  # gh-pages에 푸시하려면 write 필요!
  pages: write
  id-token: write

# 동시 배포 방지
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 10

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20  # Vite 7 요구사항
          cache: "pnpm"
          cache-dependency-path: "react/pnpm-lock.yaml"

      - name: Install React dependencies
        working-directory: ./react
        run: pnpm install

      - name: Build React
        working-directory: ./react
        run: pnpm build

      - name: Prepare deployment directory
        run: |
          mkdir -p deploy
          # 메인 파일들 복사 (빌드 필요 없음)
          cp index.html deploy/
          cp index.css deploy/
          cp index.js deploy/
          # Shared 리소스 복사
          cp -r shared deploy/
          # Vanilla 복사 (빌드 필요 없음)
          cp -r vanillia deploy/
          # React 빌드 결과물 복사 (dist 내부 파일들을 react/ 폴더로)
          mkdir -p deploy/react
          cp -r react/dist/* deploy/react/

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./deploy
          # 배포 브랜치
          publish_branch: gh-pages
          # .nojekyll 파일 추가 (GitHub Pages Jekyll 비활성화)
          enable_jekyll: false
          # 강제 푸시 (orphan)
          force_orphan: true
```

### 📦 package.json 스크립트 (최종)
```json
{
  "scripts": {
    "dev": "vite --base /",      // 개발: 루트 경로
    "build": "vite build",       // 빌드: config의 base 사용
    "lint": "eslint .",
    "preview": "vite preview"    // preview: config의 base 사용
  }
}
```

---

## 🎓 배운 교훈

### 1. ES Module 환경 이해
- `__dirname`, `process`는 CommonJS 전용
- ES Module에서는 `import.meta.url`로 경로 생성
- `fileURLToPath`, `dirname` 사용 필수

### 2. Vite 설정의 타이밍
- 객체 리터럴 방식: 즉시 실행
- 함수형 방식: Vite 초기화 후 실행
- 환경 변수 사용 시 함수형 필수

### 3. GitHub Actions 권한
- 기본값: 읽기 전용 (`contents: read`)
- gh-pages 배포: 쓰기 필요 (`contents: write`)
- 보안상 명시적으로 설정해야 함

### 4. Vite 버전별 요구사항
- Vite 7.x: Node.js 20.19+ 또는 22.12+
- 로컬과 CI/CD 환경 버전 다를 수 있음

### 5. GitHub Pages 배포 구조
- **main**: 원본 소스 코드
- **gh-pages**: 빌드된 배포 파일
- Settings에서 gh-pages 브랜치 선택 필수!

### 6. 브라우저 캐시
- CDN 업데이트: 1~10분 소요
- 하드 새로고침: `Ctrl + Shift + R`
- 시크릿 모드로 테스트하면 확실

---

## 🔍 디버깅 체크리스트

배포가 안 되면 다음 순서로 확인:

### 1단계: 로컬 빌드 테스트
```bash
cd react
pnpm build  # 빌드 성공하는지 확인
pnpm preview  # 로컬에서 미리보기

# http://localhost:4173/doakumize-kit/react/ 접속
# 정상 작동하면 빌드는 OK!
```

### 2단계: GitHub Actions 로그 확인
```
GitHub repo → Actions 탭
→ 최근 워크플로우 클릭
→ 각 단계별 로그 확인
→ 빌드 성공했는지, 어디서 에러났는지 확인
```

### 3단계: gh-pages 브랜치 확인
```
GitHub repo → Code 탭
→ 브랜치 드롭다운에서 "gh-pages" 선택
→ react/index.html 열어서 빌드된 파일인지 확인
→ <script src="/doakumize-kit/react/assets/..." 있으면 OK!
```

### 4단계: GitHub Pages Settings 확인
```
Settings → Pages
→ Source: Deploy from a branch
→ Branch: gh-pages / (root) ✅
→ main이면 ❌ 잘못된 설정!
```

### 5단계: 브라우저 캐시 클리어
```
Ctrl + Shift + R (하드 새로고침)
또는
시크릿 모드로 테스트
```

---

## 🚀 테스트 방법

### 로컬 개발
```bash
cd react
pnpm dev

# → http://localhost:5173/
# 루트 경로에서 작동
```

### 로컬 빌드 미리보기
```bash
cd react
pnpm build
pnpm preview

# → http://localhost:4173/doakumize-kit/react/
# 배포 환경과 동일한 경로에서 테스트
```

### 배포 테스트
```
https://doakuma.github.io/doakumize-kit/react/

F12 → Console 탭
→ 404 에러 없으면 성공!
```

---

## 📊 소요 시간 분석

| 단계 | 예상 | 실제 | 이유 |
|------|------|------|------|
| React 프로젝트 생성 | 5분 | 10분 | pnpm 대화형 질문 |
| vite.config.js 설정 | 10분 | 40분 | ES Module 문제 |
| GitHub Actions 설정 | 15분 | 30분 | 권한 에러 |
| base 경로 설정 | 5분 | 30분 | 여러 방법 시도 |
| GitHub Pages 설정 | 2분 | 10분 | 브랜치 설정 실수 |
| **총합** | **37분** | **120분** | **디버깅 포함** |

---

## 💡 다음 프로젝트 시 빠른 설정 가이드

### 🚀 10분 완성 가이드

**1. React 프로젝트 생성 (2분)**
```bash
mkdir react
cd react
pnpm create vite . --template react
pnpm install
```

**2. vite.config.js 설정 (3분)**
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/repo-name/react/" : "/",
  resolve: {
    alias: {
      "@shared": resolve(__dirname, "../shared"),
    },
  },
  server: {
    port: 5173,
    fs: { allow: [".."] },
  },
}));
```

**3. package.json 스크립트 (1분)**
```json
{
  "scripts": {
    "dev": "vite --base /",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**4. GitHub Actions 설정 (2분)**
- 위의 `deploy.yml` 복사
- repo 이름만 수정

**5. GitHub Settings (2분)**
```
Settings → Actions → General
→ Workflow permissions: Read and write ✅

Settings → Pages
→ Branch: gh-pages / (root) ✅
```

**끝! 🎉**

---

## ⚠️ 주의사항

### 1. base 경로 일관성
```javascript
// vite.config.js
base: "/repo-name/react/"

// deploy.yml
cp -r react/dist/* deploy/react/  // react 폴더 이름 일치!

// GitHub Pages URL
https://username.github.io/repo-name/react/  // 경로 일치!
```

### 2. .gitignore 필수
```
# react/.gitignore
node_modules
dist          # 빌드 결과물은 git에 포함하지 않음!
dist-ssr
*.local
```

### 3. pnpm vs npm
- **pnpm 사용 시**: cache-dependency-path 설정 필수
- **npm 사용 시**: package-lock.json 경로로 변경

### 4. 브라우저 캐시
- 배포 후 변경사항 안 보이면: Ctrl + Shift + R
- 시크릿 모드로 테스트하면 확실

---

## 🎯 성공 요인

1. **포기하지 않음** - 여러 번 실패해도 계속 시도
2. **단계별 디버깅** - 문제를 작게 나누어 해결
3. **로그 분석** - GitHub Actions 로그 꼼꼼히 확인
4. **로컬 테스트** - pnpm preview로 배포 전 확인
5. **브랜치 이해** - main vs gh-pages 역할 구분

---

## 📚 참고 자료

- [Vite 공식 문서 - Config Reference](https://vitejs.dev/config/)
- [GitHub Actions - peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
- [Vite ES Module 가이드](https://vitejs.dev/guide/features.html#glob-import)
- [GitHub Pages 문서](https://docs.github.com/en/pages)

---

**Last Updated:** 2025-11-14 (심야)  
**Status:** ✅ 해결 완료  
**배포 URL:** https://doakuma.github.io/doakumize-kit/react/


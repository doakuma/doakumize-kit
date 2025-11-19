# GitHub Pages 배포 완벽 가이드

> 📅 작성일: 2025-11-14
> 🎯 대상: React + Vite 프로젝트를 GitHub Pages에 배포하려는 개발자
> ⏱️ 예상 소요 시간: 15~20분

---

## 📋 목차

1. [사전 준비](#사전-준비)
2. [프로젝트 구조 이해](#프로젝트-구조-이해)
3. [Vite 설정](#vite-설정)
4. [GitHub Actions 설정](#github-actions-설정)
5. [GitHub Repo 설정](#github-repo-설정)
6. [배포 및 테스트](#배포-및-테스트)
7. [문제 해결](#문제-해결)

---

## 사전 준비

### ✅ 필요한 것들

1. **GitHub 계정**
2. **Git 설치**
3. **Node.js 20+** (Vite 7 요구사항)
4. **pnpm** (또는 npm, yarn)
5. **React + Vite 프로젝트**

### 📦 프로젝트 확인

```bash
# React 프로젝트 폴더에서
pnpm dev  # 로컬에서 정상 작동하는지 확인
```

---

## 프로젝트 구조 이해

### 🌳 디렉토리 구조

```
my-project/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions 설정
├── react/                    # React 프로젝트 (또는 루트)
│   ├── src/
│   ├── public/
│   ├── vite.config.js        # Vite 설정 ⭐
│   ├── package.json
│   └── .gitignore
└── README.md
```

### 🔄 배포 흐름

```
코드 작성
  ↓
Git Push (main 브랜치)
  ↓
GitHub Actions 실행
  ↓ (자동)
빌드 (vite build)
  ↓
배포 (gh-pages 브랜치)
  ↓
GitHub Pages 서빙
  ↓
🌐 사이트 라이브!
```

---

## Vite 설정

### 1️⃣ vite.config.js 생성

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// ES Module에서 __dirname 생성
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ command, mode }) => {
  // GitHub Pages 배포 경로 설정
  // ⚠️ 'your-repo-name'과 'react'를 실제 이름으로 변경!
  const base =
    command === "build"
      ? "/your-repo-name/react/" // 배포 시
      : "/"; // 개발 시

  return {
    plugins: [react()],

    // GitHub Pages 경로
    base: base,

    // (선택) shared 폴더 alias
    resolve: {
      alias: {
        "@shared": resolve(__dirname, "../shared"),
      },
    },

    // 개발 서버 설정
    server: {
      port: 5173,
      fs: {
        allow: [".."], // 상위 폴더 접근 허용
      },
    },
  };
});
```

### 2️⃣ package.json 스크립트 설정

```json
{
  "scripts": {
    "dev": "vite --base /", // 개발: 루트 경로
    "build": "vite build", // 빌드: config의 base 사용
    "lint": "eslint .",
    "preview": "vite preview" // 미리보기: config의 base 사용
  }
}
```

### 3️⃣ .gitignore 확인

```
# react/.gitignore
node_modules
dist              # ⭐ 중요! 빌드 파일은 git에 포함 안 함
dist-ssr
*.local
```

---

## GitHub Actions 설정

### 📁 파일 생성

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main] # main 브랜치에 push하면 실행
  workflow_dispatch: # 수동 실행 가능

# GitHub Pages 배포 권한 설정 ⭐ 중요!
permissions:
  contents: write # gh-pages에 푸시하려면 필수!
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
      # 1. 코드 체크아웃
      - name: Checkout
        uses: actions/checkout@v3

      # 2. pnpm 설치
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 10 # 또는 최신 버전

      # 3. Node.js 설정
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20 # ⭐ Vite 7은 Node 20+ 필요!
          cache: "pnpm"
          cache-dependency-path: "react/pnpm-lock.yaml" # 프로젝트 경로

      # 4. 의존성 설치
      - name: Install dependencies
        working-directory: ./react # React 프로젝트 경로
        run: pnpm install

      # 5. 빌드
      - name: Build
        working-directory: ./react
        run: pnpm build

      # 6. 배포 폴더 준비
      - name: Prepare deployment
        run: |
          mkdir -p deploy
          # React 빌드 결과물 복사
          mkdir -p deploy/react
          cp -r react/dist/* deploy/react/

          # (선택) 다른 파일들도 복사 가능
          # cp index.html deploy/
          # cp -r shared deploy/

      # 7. GitHub Pages 배포
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./deploy
          publish_branch: gh-pages
          enable_jekyll: false
          force_orphan: true
```

### 📝 설정 설명

| 항목                   | 설명                            |
| ---------------------- | ------------------------------- |
| `on.push.branches`     | 어느 브랜치에 push하면 실행할지 |
| `permissions.contents` | `write` 필수 (gh-pages에 푸시)  |
| `node-version`         | Vite 7은 Node 20+ 필요          |
| `working-directory`    | React 프로젝트 위치             |
| `publish_dir`          | 배포할 폴더                     |
| `publish_branch`       | 배포 브랜치 (보통 gh-pages)     |

---

## GitHub Repo 설정

### 1️⃣ Actions 권한 설정

```
GitHub repo → Settings → Actions → General
↓
Workflow permissions 섹션
↓
● Read and write permissions ✅ 선택
↓
Save
```

**⚠️ 이걸 안 하면 403 에러 발생!**

### 2️⃣ GitHub Pages 활성화

```
GitHub repo → Settings → Pages
↓
Source 섹션
↓
Deploy from a branch 선택
↓
Branch: gh-pages / (root) ✅ 선택
↓
Save
```

**⚠️ main이 아니라 gh-pages를 선택해야 함!**

### 3️⃣ (선택) Custom Domain 설정

```
Settings → Pages → Custom domain
↓
도메인 입력 (예: components.example.com)
↓
DNS 설정 (CNAME 레코드)
```

---

## 배포 및 테스트

### 🚀 배포하기

```bash
# 1. 모든 파일 커밋
git add .
git commit -m "feat: GitHub Pages 배포 설정 추가"

# 2. Push
git push origin main

# 3. GitHub Actions 확인
# GitHub repo → Actions 탭에서 진행 상황 확인
```

### ⏰ 배포 시간

```
GitHub Actions 실행: 1~2분
↓
CDN 캐시 업데이트: 1~5분
↓
총 소요: 2~7분
```

### 🧪 테스트 체크리스트

#### 로컬 빌드 테스트 (배포 전)

```bash
cd react

# 1. 빌드
pnpm build

# 2. 미리보기
pnpm preview
# → http://localhost:4173/your-repo-name/react/

# 3. 확인 사항
# ✅ 페이지 정상 로드
# ✅ 콘솔 에러 없음
# ✅ 모든 기능 작동
```

#### 배포 후 테스트

```
1. GitHub Actions 성공 확인 (초록불 ✅)

2. gh-pages 브랜치 확인
   → 빌드된 파일 존재하는지 확인

3. 사이트 접속
   → https://username.github.io/repo-name/react/

4. F12 → Console 탭
   → 404 에러 없는지 확인

5. 기능 테스트
   → 모든 버튼/링크 작동 확인
```

---

## 문제 해결

### 🔧 자주 발생하는 문제들

#### 문제 1: 하얀 화면 (404 에러)

**증상:**

```
페이지는 열리는데 하얀 화면
Console: Failed to load resource: 404
```

**원인:**

- `vite.config.js`의 base 경로 잘못 설정
- 또는 GitHub Pages Settings가 잘못됨

**해결:**

```javascript
// vite.config.js 확인
base: "/repo-name/react/"  // ← 경로 정확한지 확인!

// GitHub Settings 확인
Settings → Pages → Branch: gh-pages ✅
```

#### 문제 2: Actions 권한 에러 (403)

**증상:**

```
remote: Permission denied to github-actions[bot]
fatal: unable to access '...': 403
```

**해결:**

```
Settings → Actions → General
→ Workflow permissions
→ "Read and write permissions" ✅
```

#### 문제 3: Node 버전 에러

**증상:**

```
Vite requires Node.js version 20.19+ or 22.12+
```

**해결:**

```yaml
# .github/workflows/deploy.yml
- uses: actions/setup-node@v3
  with:
    node-version: 20 # ← 20으로 변경!
```

#### 문제 4: 이전 버전이 계속 보임

**원인:** 브라우저 캐시

**해결:**

```
1. Ctrl + Shift + R (하드 새로고침)
2. 시크릿 모드로 테스트
3. 5~10분 기다리기 (CDN 업데이트)
```

#### 문제 5: build는 성공하는데 배포가 안 됨

**원인:** gh-pages 브랜치 설정 안 함

**해결:**

```
Settings → Pages
→ Source: Deploy from a branch
→ Branch: gh-pages ✅ (main이 아니라!)
→ Save
```

#### 문제 6: SPA 라우팅 404 에러 (새로고침 시)

**증상:**

```
- 링크 클릭으로 페이지 이동: ✅ 정상 작동
- 직접 URL 접근 또는 새로고침: ❌ GitHub Pages 404 에러
- 예: /react/components에서 새로고침하면 404
```

**원인:**

- GitHub Pages는 정적 파일 서버라서 실제 파일/폴더만 서빙
- React Router는 클라이언트 사이드에서만 동작
- `/react/components`라는 실제 파일이 없어서 404 발생
- GitHub Pages는 루트의 `404.html`만 인식 (서브디렉토리의 `404.html`은 무시)

**해결 방법 (GitHub Pages):**

**1. GitHub Actions 배포 스크립트 수정:**

```yaml
# .github/workflows/deploy.yml
- name: Prepare deployment directory
  run: |
    mkdir -p deploy
    # ... 기존 복사 작업 ...

    # React 빌드 결과물 복사
    mkdir -p deploy/react
    cp -r react/dist/* deploy/react/

    # 404.html 생성: SPA 라우팅 처리
    # 1. react/404.html: index.html과 동일하게 (서브디렉토리 내부 라우팅용)
    cp deploy/react/index.html deploy/react/404.html

    # 2. 루트 404.html: React 앱의 index.html과 동일하게 복사
    # GitHub Pages는 루트의 404.html만 인식하므로, 여기서 React 앱 경로를 처리
    # React Router가 현재 URL을 읽어서 라우팅 처리 (basename 설정됨)
    cp deploy/react/index.html deploy/404.html
```

**2. React Router basename 설정 확인:**

```javascript
// react/src/main.jsx
const router = createBrowserRouter(
  [
    // ... 라우트 설정 ...
  ],
  {
    basename: "/doakumize-kit/react", // ← GitHub Pages 경로와 일치해야 함
  }
);
```

**동작 원리:**

```
1. 사용자가 /react/components로 직접 접근
   ↓
2. GitHub Pages가 "react/components" 파일 찾기 시도
   ↓
3. 파일 없음 → 404 에러 발생
   ↓
4. GitHub Pages가 루트의 404.html 사용
   ↓
5. 404.html = React 앱의 index.html (동일하게 복사)
   ↓
6. React 앱 로드 (스크립트 경로는 절대 경로라서 정상 작동)
   ↓
7. React Router가 현재 URL 읽기: /doakumize-kit/react/components
   ↓
8. basename 제거: /components
   ↓
9. Components 페이지 표시 ✅
```

**다른 서비스별 해결 방법:**

**Netlify:**

```bash
# public/_redirects 파일 생성
/*    /index.html   200
```

**Vercel:**

```
자동으로 처리됨 (별도 설정 불필요)
프레임워크 감지 후 자동 설정
```

**Firebase Hosting:**

```json
// firebase.json
{
  "hosting": {
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

**AWS S3 + CloudFront:**

```
CloudFront → Error Pages 설정
- HTTP Error Code: 404
- Response Page Path: /index.html
- HTTP Response Code: 200
```

**일반 웹 서버 (Apache):**

```apache
# .htaccess
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**일반 웹 서버 (Nginx):**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**서비스별 비교:**

| 서비스       | 문제 발생 | 해결 난이도 | 자동화         |
| ------------ | --------- | ----------- | -------------- |
| GitHub Pages | ✅        | 중간        | ❌ (수동 설정) |
| Netlify      | ✅        | 쉬움        | ⚠️ (설정 파일) |
| Vercel       | ❌        | 매우 쉬움   | ✅ (자동)      |
| Firebase     | ✅        | 쉬움        | ⚠️ (설정 파일) |
| AWS S3       | ✅        | 어려움      | ❌             |
| 일반 웹 서버 | ✅        | 어려움      | ❌             |

**핵심 개념:**

- **정적 파일 서버**: 실제 파일/폴더만 서빙
- **SPA (Single Page Application)**: `index.html` 하나로 모든 라우트 처리
- **충돌**: 정적 서버가 없는 경로에 대해 404 반환
- **해결**: 모든 경로를 `index.html`로 리다이렉트/서빙

**테스트 방법:**

```bash
# 1. 배포 후 테스트
https://username.github.io/repo-name/react/components

# 2. 새로고침 (F5)
# → 정상 작동하면 성공! ✅

# 3. 직접 URL 입력 후 엔터
# → 정상 작동하면 성공! ✅
```

#### 문제 7: 동적 import로 인한 showcase 파일 404 에러

**증상:**

```
GET https://username.github.io/repo-name/react/ui/Button/Button.showcase.jsx
net::ERR_ABORTED 404 (Not Found)

또는

동적으로 로드하려는 파일이 빌드 후 사라짐
```

**원인:**

- `import()` 동적 import를 사용하면 Vite가 빌드 시점에 어떤 파일을 포함해야 할지 모를 수 있음
- 빌드 후 `.jsx` 파일이 번들에 포함되지 않아서 GitHub Pages에서 404 발생
- 런타임에 동적으로 파일을 로드하려고 하지만 실제 파일이 존재하지 않음

**해결 방법: Vite `import.meta.glob` 사용**

동적 import 대신 Vite의 `import.meta.glob`을 사용하면 빌드 시점에 모든 파일을 자동으로 찾아서 번들에 포함시킬 수 있습니다.

**1. showcase 파일 자동 로드 설정:**

```javascript
// src/components/ui/showcases/index.js

/**
 * 모든 showcase 파일을 자동으로 로드
 *
 * import.meta.glob은 빌드 시점에 모든 매칭되는 파일을 찾아서
 * 번들에 포함시키고, 런타임에 동적으로 로드할 수 있게 해줍니다.
 *
 * eager: true 옵션으로 빌드 시점에 모든 파일을 미리 로드합니다.
 */
const showcaseModules = import.meta.glob("../**/*.showcase.jsx", {
  eager: true,
});

/**
 * showcase 맵 생성
 */
function createShowcaseMap() {
  const map = {};

  Object.entries(showcaseModules).forEach(([path, module]) => {
    // 경로에서 컴포넌트 이름 추출
    // 예: "../Button/Button.showcase.jsx" -> "Button"
    const match = path.match(/\/([^/]+)\/\1\.showcase\.jsx$/);
    if (!match) return;

    const componentName = match[1]; // "Button"
    const componentId = componentName
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace(/^-/, ""); // "Button" -> "button"

    // export 이름 규칙: {componentId}Showcase (camelCase)
    const exportName = `${componentId}Showcase`;

    // 모듈에서 showcase 데이터 찾기
    const showcaseData = module[exportName] || module.default || module;

    if (showcaseData) {
      map[componentId] = showcaseData;
    }
  });

  return map;
}

const showcaseMap = createShowcaseMap();

/**
 * 컴포넌트 ID로 showcase 데이터 가져오기
 */
export function getShowcase(componentId) {
  return showcaseMap[componentId] || null;
}
```

**2. 컴포넌트에서 사용:**

```javascript
// src/components/studio/ComponentShowcase.jsx
import { getShowcase } from "@/components/ui/showcases";

function ComponentShowcase({ componentId }) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    // 정적 import된 showcase 데이터 가져오기
    const showcaseData = getShowcase(componentId);

    if (showcaseData) {
      const data =
        typeof showcaseData === "function" ? showcaseData() : showcaseData;
      setData(data);
    }
  }, [componentId]);

  // ... 렌더링
}
```

**3. showcase 파일 작성 규칙:**

```javascript
// src/components/ui/Button/Button.showcase.jsx

// export 이름 규칙: {componentId}Showcase (camelCase)
export const buttonShowcase = {
  title: "Button",
  description: "버튼 컴포넌트입니다.",
  variants: [
    // ...
  ],
};
```

**장점:**

- ✅ **자동 인식**: 새 showcase 파일 추가 시 자동으로 인식됨
- ✅ **빌드 시 포함**: 모든 파일이 빌드 시점에 번들에 포함됨
- ✅ **유지보수 용이**: `index.js` 수정 불필요
- ✅ **타입 안전**: 빌드 시점에 모든 파일 확인

**비교:**

| 방식                   | 장점                     | 단점                                   |
| ---------------------- | ------------------------ | -------------------------------------- |
| `import()` 동적 import | 코드 스플리팅 가능       | 빌드 시점에 파일 인식 안 됨 → 404 에러 |
| 정적 import            | 빌드 시 포함 보장        | 새 파일 추가 시마다 수동 등록 필요     |
| `import.meta.glob`     | 자동 인식 + 빌드 시 포함 | -                                      |

**참고:**

- `eager: true`: 빌드 시점에 모든 파일을 미리 로드 (즉시 사용 가능)
- `eager: false`: 런타임에 필요할 때만 로드 (코드 스플리팅)

---

## 📚 Vite import.meta.glob 가이드

### 개요

Vite의 `import.meta.glob`은 빌드 시점에 여러 파일을 자동으로 찾아서 번들에 포함시키는 기능입니다. 동적 import와 달리 빌드 시점에 모든 파일을 인식하므로 GitHub Pages 배포 시 404 에러를 방지할 수 있습니다.

### 기본 사용법

```javascript
// 모든 매칭되는 파일을 자동으로 로드
const modules = import.meta.glob("./dir/*.js");

// 사용 예시
Object.entries(modules).forEach(([path, module]) => {
  console.log(path); // "./dir/file1.js"
  console.log(module); // 모듈 객체
});
```

### 옵션

#### 1. `eager: true` (즉시 로드)

```javascript
// 빌드 시점에 모든 파일을 미리 로드
const modules = import.meta.glob("./dir/*.js", {
  eager: true,
});

// 즉시 사용 가능 (동기적)
const data = modules["./dir/file1.js"];
```

**사용 시기:**

- 파일이 항상 필요할 때
- 초기 로딩 성능이 중요하지 않을 때
- 모든 파일을 미리 로드해도 문제없을 때

#### 2. `eager: false` (지연 로드, 기본값)

```javascript
// 런타임에 필요할 때만 로드 (코드 스플리팅)
const modules = import.meta.glob("./dir/*.js");

// 비동기적으로 로드
const module = await modules["./dir/file1.js"]();
```

**사용 시기:**

- 파일이 많고 초기 로딩 성능이 중요할 때
- 필요할 때만 로드하고 싶을 때
- 코드 스플리팅이 필요할 때

### 실제 사용 예시

#### 예시 1: Showcase 파일 자동 로드

```javascript
// src/components/ui/showcases/index.js

// 모든 showcase 파일 자동 로드
const showcaseModules = import.meta.glob("../**/*.showcase.jsx", {
  eager: true,
});

// 컴포넌트 ID로 매핑
const showcaseMap = {};
Object.entries(showcaseModules).forEach(([path, module]) => {
  const componentId = extractComponentId(path);
  showcaseMap[componentId] = module.default || module;
});

export function getShowcase(componentId) {
  return showcaseMap[componentId] || null;
}
```

#### 예시 2: 라우트 자동 등록

```javascript
// src/routes/index.js

// 모든 페이지 파일 자동 로드
const pages = import.meta.glob("./pages/**/*.jsx", {
  eager: true,
});

// 라우트 자동 생성
const routes = Object.entries(pages).map(([path, module]) => {
  const routePath = path
    .replace("./pages", "")
    .replace(/\.jsx$/, "")
    .replace(/\/index$/, "");

  return {
    path: routePath || "/",
    component: module.default,
  };
});
```

#### 예시 3: 아이콘 자동 로드

```javascript
// src/icons/index.js

// 모든 SVG 아이콘 자동 로드
const icons = import.meta.glob("./*.svg", {
  eager: true,
  import: "default", // SVG를 문자열로 import
});

export function getIcon(name) {
  return icons[`./${name}.svg`] || null;
}
```

### 패턴 매칭

```javascript
// 모든 .js 파일
import.meta.glob("./dir/*.js");

// 재귀적으로 모든 .js 파일
import.meta.glob("./dir/**/*.js");

// 특정 패턴만
import.meta.glob("./dir/*.{js,jsx,ts,tsx}");

// 제외 패턴
import.meta.glob("./dir/**/*.js", {
  ignore: ["**/node_modules/**", "**/dist/**"],
});
```

### 주의사항

1. **경로는 상대 경로만 가능**

   ```javascript
   // ✅ 가능
   import.meta.glob("./dir/*.js");
   import.meta.glob("../dir/*.js");

   // ❌ 불가능
   import.meta.glob("/absolute/path/*.js");
   import.meta.glob("@/dir/*.js"); // alias는 작동 안 함
   ```

2. **빌드 시점에만 작동**

   - `import.meta.glob`은 빌드 시점에 처리됨
   - 런타임에 동적으로 경로를 생성할 수 없음

3. **타입 안전성**

   ```typescript
   // TypeScript에서 타입 추론
   const modules = import.meta.glob<{ default: Component }>("./dir/*.jsx");
   ```

### 성능 고려사항

| 방식           | 초기 로딩          | 런타임 성능        | 번들 크기 |
| -------------- | ------------------ | ------------------ | --------- |
| `eager: true`  | 느림 (모두 로드)   | 빠름 (이미 로드됨) | 큼        |
| `eager: false` | 빠름 (필요한 것만) | 느림 (로드 필요)   | 작음      |

**추천:**

- 파일이 적을 때 (< 10개): `eager: true`
- 파일이 많을 때 (> 10개): `eager: false`
- 초기 로딩이 중요할 때: `eager: false`

### 디버깅

```javascript
// 개발 환경에서 로드된 파일 확인
if (import.meta.env.DEV) {
  const modules = import.meta.glob("./dir/*.js", { eager: true });
  console.log("Loaded modules:", Object.keys(modules));
}
```

### 참고 자료

- [Vite - Glob Import](https://vitejs.dev/guide/features.html#glob-import)
- [Vite - Dynamic Import](https://vitejs.dev/guide/features.html#dynamic-import)

---

## 📚 Monorepo 배포 (복수 프로젝트)

우리 프로젝트처럼 여러 프레임워크를 함께 배포하는 경우:

### 폴더 구조

```
doakumize-kit/
├── index.html              # 메인 랜딩
├── vanillia/              # Vanilla (빌드 불필요)
├── react/                 # React (빌드 필요)
└── shared/                # 공통 리소스
```

### GitHub Actions 전략

```yaml
- name: Prepare deployment
  run: |
    mkdir -p deploy
    # 정적 파일 복사 (빌드 불필요)
    cp index.html deploy/
    cp -r shared deploy/
    cp -r vanillia deploy/

    # React 빌드 후 복사
    mkdir -p deploy/react
    cp -r react/dist/* deploy/react/

- name: Deploy
  uses: peaceiris/actions-gh-pages@v4
  with:
    publish_dir: ./deploy # 모든 것을 deploy에 모아서 배포
```

### 최종 URL 구조

```
https://username.github.io/repo-name/         # 메인
https://username.github.io/repo-name/vanillia/
https://username.github.io/repo-name/react/
```

---

## 🎯 빠른 시작 가이드 (Copy & Paste)

### Step 1: Vite 설정 (2분)

**`react/vite.config.js`** 생성:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/YOUR-REPO-NAME/react/" : "/",
  // ⚠️ YOUR-REPO-NAME을 실제 repo 이름으로 변경!
}));
```

### Step 2: GitHub Actions 설정 (3분)

**`.github/workflows/deploy.yml`** 생성:

```yaml
name: Deploy

on:
  push:
    branches: [main]

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: pnpm/action-setup@v2
        with:
          version: 10

      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: "pnpm"
          cache-dependency-path: "react/pnpm-lock.yaml"

      - name: Install & Build
        working-directory: ./react
        run: |
          pnpm install
          pnpm build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./react/dist
          publish_branch: gh-pages
```

### Step 3: GitHub 설정 (2분)

```
Settings → Actions → General
→ "Read and write permissions" ✅

Settings → Pages
→ Branch: gh-pages / (root) ✅
```

### Step 4: 배포! (1분)

```bash
git add .
git commit -m "feat: GitHub Pages 배포 설정"
git push
```

**끝! 🎉**

---

## 🧪 로컬 테스트 방법

배포 전에 **반드시** 로컬에서 테스트:

### 방법 1: pnpm preview (추천!)

```bash
cd react

# 1. 빌드
pnpm build

# 2. 미리보기 (배포 환경과 동일)
pnpm preview

# 3. 접속
# http://localhost:4173/your-repo-name/react/
# ⚠️ 경로 주의! /your-repo-name/react/로 접속해야 함
```

### 방법 2: 로컬 서버

```bash
# dist 폴더를 서빙
cd react/dist
python -m http.server 8000

# http://localhost:8000 접속
# (base 경로 테스트는 안 됨)
```

### ✅ 테스트 체크리스트

```
로컬 preview에서:
□ 페이지 정상 로드
□ CSS 스타일 적용
□ JavaScript 작동
□ 이미지/아이콘 표시
□ 콘솔 에러 없음

→ 전부 OK면 배포 진행!
```

---

## 🔍 디버깅 가이드

### 배포가 안 되면 순서대로 확인:

#### 1단계: 로컬 빌드 확인

```bash
cd react
pnpm build

# dist/ 폴더 생성되었는지 확인
ls dist/

# index.html 내용 확인
cat dist/index.html
# → <script src="/repo-name/react/assets/..." 있어야 함
```

#### 2단계: GitHub Actions 로그

```
GitHub repo → Actions 탭
→ 최근 워크플로우 클릭
→ 각 Step 클릭해서 로그 확인
```

**자주 나는 에러:**

- ❌ Node 버전: `node-version: 20`으로 변경
- ❌ 권한 에러: Settings → Actions → Write 권한
- ❌ pnpm 경로: `cache-dependency-path` 확인

#### 3단계: gh-pages 브랜치 확인

```
GitHub repo → Code 탭
→ 브랜치 드롭다운: "gh-pages" 선택
→ react/index.html 확인
```

**확인 사항:**

- ✅ 빌드된 파일 (`<script src="/repo/react/assets/...">`)
- ❌ 원본 파일 (`<script src="/src/main.jsx">`) → 잘못됨!

#### 4단계: GitHub Pages Settings

```
Settings → Pages
→ Branch: gh-pages ✅ 확인
→ main이면 ❌ 변경 필요!
```

#### 5단계: 브라우저 테스트

```
1. 시크릿 모드로 접속
2. F12 → Console 탭
3. 404 에러 확인
```

---

## 💡 Pro Tips

### 1. base 경로 결정 방법

```javascript
// ✅ 추천 (가장 간단)
const base = command === "build" ? "/repo/react/" : "/";

// ⚠️ 복잡한 방법 (비추천)
const env = loadEnv(mode, __dirname, "");
const base = env.VITE_GITHUB_PAGES ? "/repo/react/" : "/";
```

**간단한 게 최고야!**

### 2. 여러 환경 관리

```javascript
// .env.development
VITE_API_URL=http://localhost:3000

// .env.production
VITE_API_URL=https://api.example.com

// vite.config.js
export default defineConfig(({ command, mode }) => {
  const base = command === "build" ? "/repo/react/" : "/";

  return {
    base,
    define: {
      // 환경 변수를 코드에서 사용 가능
      __API_URL__: JSON.stringify(process.env.VITE_API_URL)
    }
  }
})
```

### 3. preview 경로 이슈

`pnpm preview`는 config의 `base`를 사용:

```bash
pnpm preview
# → http://localhost:4173/repo-name/react/ 로 접속해야 함!
```

**루트(/)로 접속하면 404!**

### 4. 자동 재배포

```bash
# 빈 커밋으로 재배포 트리거
git commit --allow-empty -m "chore: trigger deploy"
git push
```

### 5. 배포 브랜치 정리

```bash
# gh-pages 브랜치 삭제 후 재생성 (문제 해결용)
git push origin --delete gh-pages

# 다음 push 시 자동으로 재생성됨
```

---

## 🌐 배포 후 URL 구조

### 기본 구조

```
Repository: github.com/username/my-project
↓
GitHub Pages: https://username.github.io/my-project/
```

### 서브 경로

```
프로젝트 루트: /my-project/
React 앱: /my-project/react/
Vanilla: /my-project/vanillia/
```

### base 설정과의 관계

```javascript
// vite.config.js
base: "/my-project/react/"

// 빌드 결과
<script src="/my-project/react/assets/index-xxx.js">

// 배포 URL
https://username.github.io/my-project/react/
```

**모든 경로가 일치해야 함!**

---

## 📊 성능 최적화

### 1. 빌드 최적화

```javascript
// vite.config.js
export default defineConfig({
  build: {
    // Chunk 크기 제한
    chunkSizeWarningLimit: 1000,

    // 수동 chunk 분리
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
});
```

### 2. GitHub Actions 캐싱

**이미 적용됨:**

```yaml
- uses: actions/setup-node@v3
  with:
    cache: "pnpm" # ← 의존성 캐싱
```

**효과:**

- 첫 빌드: 2~3분
- 이후 빌드: 30초~1분

### 3. 조건부 빌드 (선택)

```yaml
# React 폴더 변경 시에만 빌드
on:
  push:
    branches: [main]
    paths:
      - "react/**" # React 폴더만 변경 시
      - ".github/workflows/deploy.yml"
```

---

## 🔐 보안 고려사항

### 1. Secrets 사용

API 키 등은 GitHub Secrets 사용:

```
Settings → Secrets and variables → Actions
→ New repository secret
→ Name: VITE_API_KEY
→ Value: your-api-key
```

**workflow에서 사용:**

```yaml
- name: Build
  env:
    VITE_API_KEY: ${{ secrets.VITE_API_KEY }}
  run: pnpm build
```

### 2. 민감한 정보 노출 방지

```javascript
// ❌ 하드코딩 금지
const API_KEY = "sk-1234567890abcdef";

// ✅ 환경 변수 사용
const API_KEY = import.meta.env.VITE_API_KEY;
```

---

## 🎨 커스텀 도메인 설정 (선택)

### 1. DNS 설정

```
CNAME 레코드:
Name: components (또는 원하는 서브도메인)
Value: username.github.io
```

### 2. GitHub Settings

```
Settings → Pages → Custom domain
→ components.example.com 입력
→ Save
```

### 3. vite.config.js 수정

```javascript
export default defineConfig(({ command }) => ({
  // 커스텀 도메인 사용 시 루트 경로
  base: command === "build" ? "/" : "/",
}));
```

---

## 📖 참고 자료

### 공식 문서

- [Vite - Static Deploy Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages 문서](https://docs.github.com/en/pages)
- [GitHub Actions 문서](https://docs.github.com/en/actions)

### Actions

- [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
- [pnpm/action-setup](https://github.com/pnpm/action-setup)
- [actions/setup-node](https://github.com/actions/setup-node)

### 커뮤니티

- [Vite Discord](https://chat.vitejs.dev/)
- [Stack Overflow - Vite Tag](https://stackoverflow.com/questions/tagged/vite)

---

## 🎓 체크리스트 요약

### 배포 전 확인

```
□ vite.config.js의 base 경로 정확한가?
□ .gitignore에 dist 포함되어 있나?
□ pnpm build 성공하나?
□ pnpm preview 정상 작동하나?
□ package.json 스크립트 올바른가?
```

### GitHub 설정 확인

```
□ .github/workflows/deploy.yml 존재하나?
□ Node 버전 20+로 설정했나?
□ Settings → Actions → Write 권한 있나?
□ Settings → Pages → gh-pages 선택했나?
```

### 배포 후 확인

```
□ Actions 탭에서 초록불(✅) 떴나?
□ gh-pages 브랜치에 빌드 파일 있나?
□ 사이트 접속 시 화면 정상인가?
□ F12 콘솔에 에러 없나?
```

---

## 🆘 긴급 문제 해결

### 모든 게 다 안 되면...

```bash
# 1. 캐시 클리어
rm -rf react/node_modules
rm -rf react/dist
pnpm install

# 2. 로컬 빌드 테스트
pnpm build
pnpm preview

# 3. gh-pages 브랜치 완전 삭제 후 재생성
git push origin --delete gh-pages
git push

# 4. GitHub Settings 초기화
Settings → Pages → Source: None 선택
→ 5분 기다리기
→ Source: gh-pages 선택
```

---

## 🎉 성공 확인

다음이 모두 OK면 성공:

1. ✅ `https://username.github.io/repo-name/react/` 접속 시 화면 표시
2. ✅ F12 콘솔에 404 에러 없음
3. ✅ 모든 기능 정상 작동
4. ✅ 코드 수정 → Push → 자동 재배포 작동

**축하합니다! 🎊**

---

**작성자:** 커시 & 악가
**최종 업데이트:** 2025-01-19 (동적 import 404 에러 해결 방법 및 import.meta.glob 가이드 추가)

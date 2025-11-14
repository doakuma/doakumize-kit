# Component Studio - 배포 전략 로드맵

> 📅 작성일: 2025-11-14  
> 🎯 전략: 하이브리드 접근 (웹 생성기 + npm 패키지)

## 📋 목차

1. [전략 개요](#전략-개요)
2. [Phase 1: Vanilla 완성](#phase-1-vanilla-완성)
3. [Phase 2: React 개발 & 웹 생성기](#phase-2-react-개발--웹-생성기)
4. [Phase 3: npm 패키지 배포](#phase-3-npm-패키지-배포)
5. [Phase 4: MUI & 고도화](#phase-4-mui--고도화)
6. [상세 작업 계획](#상세-작업-계획)

---

## 전략 개요

### 🎯 핵심 전략: 하이브리드 접근

**두 가지 사용 방식 병행 제공:**

1. **웹 생성기** (빠른 시작)
   - 초보자, 프로토타이핑 대상
   - 브라우저에서 선택 → 코드 생성 → 복사
   - 설치 없이 즉시 사용

2. **npm 패키지** (프로덕션)
   - 전문가, 실제 프로젝트 대상
   - `npm install` → import → 사용
   - 버전 관리, 자동 업데이트

### 왜 이 전략인가?

- ✅ **진입 장벽 낮춤**: 초보자는 웹 생성기
- ✅ **확장성 확보**: 전문가는 npm 패키지
- ✅ **사용자 선택권**: 상황에 맞게 선택
- ✅ **점진적 전환**: 프로토타입 → 프로덕션으로 자연스럽게

---

## Phase 1: Vanilla 완성

> 📅 기간: 2025-11 (현재)  
> 🎯 목표: Vanilla 버전 안정화 & 공통 리소스 분리

### 1.1 공통 리소스 분리

**작업 항목:**
- [ ] `shared/` 폴더 생성
- [ ] CSS Variables, normalize.css, animations.css 이동
- [ ] 이미지/아이콘 파일 이동
- [ ] 모든 경로 수정 (vanillia/ → ../shared/)
- [ ] 테스트 (모든 페이지 정상 작동 확인)

**완료 기준:**
- Vanilla 페이지가 shared 리소스로 정상 작동
- 경로 에러 없음

### 1.2 Vanilla 웹 생성기 개선

**현재 상태:**
- ✅ `generator.html` 존재 (Vanilla 전용)
- ✅ 컴포넌트 선택 기능
- ✅ ZIP 다운로드 기능

**개선 항목:**
- [ ] UI/UX 개선 (카드 방식으로 선택)
- [ ] 미리보기 기능 추가
- [ ] 코드 복사 버튼 추가
- [ ] 다크모드 지원

**완료 기준:**
- 사용자가 직관적으로 컴포넌트 선택 가능
- 생성된 코드를 바로 복사 가능

---

## Phase 2: React 개발 & 웹 생성기

> 📅 기간: 2025-12  
> 🎯 목표: React 컴포넌트 구현 & 웹 생성기 확장

### 2.1 React 개발 환경 구축

**작업 항목:**
- [ ] `react/` 폴더 구조 생성
- [ ] Vite 환경 설정
- [ ] shared 리소스 연동 확인
- [ ] 테스트 환경 구축 (Vitest)

**폴더 구조:**
```
react/
├── package.json
├── vite.config.js
├── index.html                  # React 데모 페이지
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.css
│   │   │   ├── Button.test.jsx
│   │   │   └── index.js
│   │   ├── Input/
│   │   └── index.js           # 모든 컴포넌트 export
│   │
│   ├── styles/
│   │   └── index.css          # shared/styles 참조
│   │
│   └── App.jsx                # 데모 앱
│
└── README.md
```

### 2.2 React 컴포넌트 구현

**우선순위 컴포넌트:**

#### 단계 1: 기초 (1주)
- [ ] Button (primary, secondary, disabled 등)
- [ ] Input (text, password, error state)
- [ ] Typography (heading, body, label)

#### 단계 2: 폼 컨트롤 (2주)
- [ ] Checkbox
- [ ] Radio
- [ ] Select/Dropdown
- [ ] Textarea
- [ ] Switch
- [ ] Slider

#### 단계 3: 데이터 표시 (1주)
- [ ] Table
- [ ] Badge
- [ ] Chip
- [ ] Tooltip
- [ ] File Card

#### 단계 4: 피드백 & 네비게이션 (1주)
- [ ] Modal
- [ ] Popover
- [ ] Tab
- [ ] Accordion

**컴포넌트 구현 원칙:**
- CSS Variables 100% 활용
- TypeScript 타입 정의 (선택)
- Props validation (PropTypes 또는 TypeScript)
- 접근성 고려 (ARIA 속성)

### 2.3 웹 생성기 확장 (React 지원)

**작업 항목:**
- [ ] generator.html에 프레임워크 선택 추가
- [ ] React 코드 생성 로직 구현
- [ ] JSX 문법으로 출력
- [ ] package.json 자동 생성
- [ ] 설치 가이드 포함

**생성기 UI:**
```
┌────────────────────────────────────┐
│  🎨 Component Studio Generator     │
└────────────────────────────────────┘

1️⃣ 프레임워크 선택:
   ( ) Vanilla JS  (•) React  ( ) MUI

2️⃣ 컴포넌트 선택:
   [✓] Button    [✓] Input     [ ] Modal
   [✓] Table     [ ] Dropdown  [ ] Tab

3️⃣ 다운로드 형식:
   (•) ZIP 파일  ( ) 코드 복사  ( ) GitHub Gist

4️⃣ 옵션:
   [✓] TypeScript 타입 포함
   [✓] 설치 가이드 포함
   [✓] 예제 코드 포함

   [Generate & Download]
```

**출력 예시 (React):**
```jsx
// Button.jsx
import React from 'react';
import './Button.css';

/**
 * Button Component
 * @param {string} variant - primary | secondary | default
 * @param {string} size - small | medium | large
 * @param {boolean} disabled - 비활성화 여부
 */
export const Button = ({ 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  children,
  ...props 
}) => {
  const className = `btn btn--${variant} btn--${size}`;
  
  return (
    <button 
      className={className} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
```

**완료 기준:**
- React 선택 시 JSX 코드 생성
- 생성된 코드가 바로 사용 가능
- 설치 가이드 자동 포함

---

## Phase 3: npm 패키지 배포

> 📅 기간: 2026-01  
> 🎯 목표: React 컴포넌트를 npm 패키지로 배포

### 3.1 npm 패키지 준비

**작업 항목:**
- [ ] Monorepo 구조로 전환 (선택)
- [ ] 빌드 설정 (Rollup 또는 Vite)
- [ ] package.json 최적화
- [ ] README 작성
- [ ] 라이선스 설정

**패키지 구조:**
```
packages/
├── react/                        # @doakumize-kit/react
│   ├── package.json
│   ├── README.md
│   ├── LICENSE
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   └── index.js             # 진입점
│   │
│   ├── dist/                     # 빌드 결과물
│   │   ├── index.js             # CommonJS
│   │   ├── index.esm.js         # ES Module
│   │   ├── index.umd.js         # UMD (CDN용)
│   │   └── styles.css
│   │
│   └── rollup.config.js
│
└── cli/                          # @doakumize-kit/cli (Phase 4)
```

**package.json 예시:**
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
    "dist",
    "README.md",
    "LICENSE"
  ],
  "keywords": [
    "react",
    "components",
    "ui",
    "design-system",
    "css-variables"
  ],
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/your/doakumize-kit.git"
  },
  "license": "MIT"
}
```

### 3.2 빌드 설정

**Rollup 설정:**
```javascript
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm'
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'DoakumizeKit',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    postcss({
      extract: true,
      minimize: true
    }),
    terser()
  ],
  external: ['react', 'react-dom']
};
```

### 3.3 npm 배포

**작업 항목:**
- [ ] npm 계정 생성
- [ ] 패키지 네임스페이스 확보 (@doakumize-kit)
- [ ] 버전 1.0.0 배포
- [ ] CDN 연동 확인 (unpkg.com)

**배포 명령:**
```bash
cd packages/react

# 빌드
npm run build

# 테스트
npm test

# 배포 (최초)
npm publish --access public

# 배포 (업데이트)
npm version patch  # 1.0.0 → 1.0.1
npm publish
```

### 3.4 문서 작성

**README.md 구성:**
```markdown
# @doakumize-kit/react

## 설치

npm install @doakumize-kit/react

## 사용법

import { Button, Input } from '@doakumize-kit/react';
import '@doakumize-kit/react/dist/styles.css';

## 컴포넌트 목록

- Button
- Input
- ...

## 커스터마이징

CSS Variables 수정...

## 예제

[CodeSandbox 링크]
```

**완료 기준:**
- `npm install @doakumize-kit/react` 작동
- 설치 후 바로 사용 가능
- 문서 완비

---

## Phase 4: MUI & 고도화

> 📅 기간: 2026-02~  
> 🎯 목표: MUI 버전 추가 & 생태계 확장

### 4.1 MUI 버전 개발

**작업 항목:**
- [ ] MUI 컴포넌트 구현 (React 패턴 재사용)
- [ ] Theme을 variables.css 기반으로 생성
- [ ] 웹 생성기에 MUI 추가
- [ ] npm 패키지 배포 (@doakumize-kit/mui)

**MUI Theme 생성:**
```javascript
// mui/src/theme.js
import { createTheme } from '@mui/material/styles';

// CSS Variables 읽기
const getCSSVariable = (name) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
};

export const theme = createTheme({
  palette: {
    primary: {
      main: getCSSVariable('--primary-500'),
      light: getCSSVariable('--primary-300'),
      dark: getCSSVariable('--primary-700'),
    },
    secondary: {
      main: getCSSVariable('--secondary-500'),
    },
    error: {
      main: getCSSVariable('--error-500'),
    },
    // ...
  },
  typography: {
    fontFamily: getCSSVariable('--font'),
    h1: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1.35,
    },
    // ...
  },
  spacing: 4, // --spacing-base
});
```

### 4.2 CLI 도구 개발 (선택)

**작업 항목:**
- [ ] CLI 프로젝트 생성
- [ ] 템플릿 시스템 구현
- [ ] Interactive 선택 UI
- [ ] npm 배포

**CLI 사용 예시:**
```bash
# npx로 실행
npx @doakumize-kit/cli create

? Which framework? (Use arrow keys)
  ❯ React
    MUI
    Vanilla

? Which components? (Space to select, Enter to confirm)
  ◉ Button
  ◉ Input
  ◯ Modal
  ◉ Table

? Where to create? 
  src/components/

✓ Created src/components/Button.jsx
✓ Created src/components/Input.jsx
✓ Created src/components/Table.jsx
✓ Updated src/styles/doakumize.css

Done! 🎉
```

### 4.3 Storybook 추가

**작업 항목:**
- [ ] Storybook 설정
- [ ] 모든 컴포넌트 Story 작성
- [ ] Storybook 배포 (GitHub Pages)

**완료 기준:**
- 온라인에서 컴포넌트 미리보기 가능
- 인터랙티브 테스트 가능

### 4.4 생태계 확장

**추가 패키지 (선택):**
- [ ] `@doakumize-kit/icons` - 아이콘 패키지
- [ ] `@doakumize-kit/hooks` - React Hooks 모음
- [ ] `@doakumize-kit/utils` - 유틸리티 함수
- [ ] `@doakumize-kit/templates` - 프로젝트 템플릿

---

## 상세 작업 계획

### 웹 생성기 개발 계획

#### 기능 명세

**1. 프레임워크 선택 탭**
```html
<div class="framework-tabs">
  <button class="tab active" data-framework="vanilla">Vanilla JS</button>
  <button class="tab" data-framework="react">React</button>
  <button class="tab" data-framework="mui">MUI</button>
</div>
```

**2. 컴포넌트 선택 (카드 방식)**
```html
<div class="component-grid">
  <div class="component-card" data-component="button">
    <div class="preview">
      <button class="btn btn--primary">Button</button>
    </div>
    <input type="checkbox" id="comp-button">
    <label for="comp-button">Button</label>
  </div>
  <!-- ... -->
</div>
```

**3. 코드 생성 로직**
```javascript
// generator-v2.js
class CodeGenerator {
  constructor(framework) {
    this.framework = framework;
    this.templates = {
      vanilla: VanillaTemplates,
      react: ReactTemplates,
      mui: MuiTemplates
    };
  }
  
  generateComponent(componentName) {
    const template = this.templates[this.framework];
    return template[componentName]();
  }
  
  generatePackage(components) {
    const files = {};
    
    components.forEach(comp => {
      files[`${comp}.jsx`] = this.generateComponent(comp);
    });
    
    files['package.json'] = this.generatePackageJson();
    files['README.md'] = this.generateReadme();
    
    return files;
  }
  
  downloadAsZip(files) {
    // JSZip 라이브러리 사용
  }
}
```

#### 구현 단계

**Phase 2.3.1: UI 개선**
- [ ] 프레임워크 선택 탭 UI
- [ ] 컴포넌트 카드 방식 레이아웃
- [ ] 선택 상태 시각화
- [ ] 반응형 디자인

**Phase 2.3.2: React 템플릿**
- [ ] React 컴포넌트 템플릿 작성
- [ ] JSX 문법 출력
- [ ] Props 타입 정의 포함
- [ ] 예제 코드 생성

**Phase 2.3.3: 코드 복사 기능**
- [ ] Clipboard API 사용
- [ ] 복사 완료 토스트 메시지
- [ ] 파일별 개별 복사 지원

**Phase 2.3.4: ZIP 다운로드**
- [ ] JSZip 라이브러리 통합
- [ ] 폴더 구조 생성
- [ ] package.json 자동 생성
- [ ] README.md 포함

---

### npm 패키지 개발 계획

#### 패키지 구조 설계

**Monorepo vs Multi-repo:**

**Option 1: Monorepo (추천)**
```
doakumize-kit/
├── packages/
│   ├── react/
│   ├── mui/
│   └── cli/
├── package.json           # 루트 package.json
├── lerna.json             # Lerna 설정
└── .github/workflows/     # CI/CD
```

**장점:**
- 한 번에 빌드/배포
- 코드 공유 쉬움
- 버전 관리 일관성

**Option 2: Multi-repo**
```
doakumize-kit-react/       # 별도 저장소
doakumize-kit-mui/         # 별도 저장소
doakumize-kit-cli/         # 별도 저장소
```

**단점:**
- 관리 복잡
- 버전 동기화 어려움

#### 빌드 전략

**번들링:**
- ESM (ES Module) - 주력
- CJS (CommonJS) - Node.js 호환
- UMD (Universal Module Definition) - CDN용

**최적화:**
- Tree-shaking 지원
- 사이드 이펙트 최소화
- 번들 사이즈 최적화

**CSS 처리:**
- PostCSS로 변환
- CSS Variables 유지
- 별도 파일로 추출

#### CI/CD 파이프라인

**GitHub Actions:**
```yaml
# .github/workflows/publish.yml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 우선순위 & 타임라인

### 🔴 High Priority (지금 바로)

- [ ] shared 폴더 구조 변경
- [ ] React 개발 환경 구축
- [ ] React Button 컴포넌트 (첫 컴포넌트)

### 🟡 Medium Priority (Phase 2)

- [ ] React 전체 컴포넌트 구현
- [ ] 웹 생성기 React 지원
- [ ] npm 패키지 준비

### 🟢 Low Priority (Phase 3~4)

- [ ] npm 배포
- [ ] MUI 버전
- [ ] CLI 도구
- [ ] Storybook

---

## 측정 지표

### 성공 기준

**Phase 1:**
- ✅ Vanilla 페이지 정상 작동
- ✅ shared 리소스 분리 완료

**Phase 2:**
- ✅ React 컴포넌트 22개 구현
- ✅ 웹 생성기에서 React 코드 생성 가능
- ✅ 생성된 코드가 즉시 사용 가능

**Phase 3:**
- ✅ npm install 작동
- ✅ 주간 다운로드 100회 이상
- ✅ GitHub Star 50개 이상

**Phase 4:**
- ✅ MUI 버전 배포
- ✅ Storybook 온라인 배포
- ✅ 사용 사례 3개 이상

---

## 참고 자료

### 유사 프로젝트

- [Chakra UI](https://chakra-ui.com/) - React 컴포넌트 + CSS-in-JS
- [shadcn/ui](https://ui.shadcn.com/) - 복사 & 붙여넣기 방식
- [Radix UI](https://www.radix-ui.com/) - Unstyled 컴포넌트
- [Headless UI](https://headlessui.com/) - Tailwind 팀 제작

### 도구

- **번들러**: Rollup, Vite
- **Monorepo**: Lerna, Turborepo, Nx
- **테스트**: Vitest, Jest, React Testing Library
- **문서**: Storybook, Docusaurus
- **CI/CD**: GitHub Actions, CircleCI

---

**Last Updated:** 2025-11-14  
**Next Review:** Phase 2 시작 시 (2025-12)


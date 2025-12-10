# 🎨 Vanillia Component System

Vanilla JavaScript 기반의 경량 UI 컴포넌트 라이브러리입니다.

**🎭 컴포넌트 스튜디오**: https://doakuma.github.io/doakumize-kit/vanillia/components.html

## 📌 개요

Vanillia는 외부 라이브러리 의존성 없이 순수 JavaScript로 구현된 UI 컴포넌트 시스템입니다.
CSS Variables 기반의 디자인 시스템과 함께 제공되어, 쉽게 커스터마이징할 수 있습니다.

### 🎯 두 가지 사용 방법

#### 1️⃣ 실제 프로젝트에서 사용 (Production)

**`core/` 폴더**를 사용하세요! 실제 프로젝트에 필요한 파일만 포함되어 있습니다.

```bash
# CLI 도구로 프로젝트에 복사
cd vanillia
npm run copy ../my-project/assets
```

📚 **상세 가이드**: [HOW_TO_USE_IN_PROJECT.md](docs/HOW_TO_USE_IN_PROJECT.md)  
📦 **core 폴더 README**: [core/README.md](core/README.md)

#### 2️⃣ 컴포넌트 스튜디오 (Development)

컴포넌트를 미리보고 개발하려면 Component Engine을 사용하세요.
JSON 데이터 기반으로 UI 컴포넌트를 자동 렌더링하는 시스템입니다.

📚 **개발 가이드**: [docs/HOW_TO_USE.md](docs/HOW_TO_USE.md)

## 🚀 주요 기능

- **Component Engine**: JSON 데이터 → HTML 자동 렌더링
- **독립 스크립트**: 13개 컴포넌트 스크립트 분리 완료 (통합 빌드 지원)
- **자동 캐싱**: 성능 최적화를 위한 렌더링 결과 캐싱
- **디자인 시스템**: CSS Variables 기반 일관된 UI (HSL 동적 컬러 시스템)
- **플러그인 구조**: 컴포넌트별 Renderer 확장 가능
- **Zero Dependencies**: jQuery, React 등 외부 라이브러리 불필요

## 📁 프로젝트 구조

```
vanillia/
├── 📁 core/                        # ⭐ 프로젝트 배포용 (Production)
│   ├── resources/                  # 🎯 프로젝트에 복사할 리소스 통합 폴더
│   │   ├── styles/                 # 빌드된 CSS 파일
│   │   │   ├── common.css          # Import 통합 허브
│   │   │   ├── components.css      # 컴포넌트 Import 허브 (자동 생성)
│   │   │   ├── items/              # 개별 컴포넌트 CSS
│   │   │   │   ├── button.css
│   │   │   │   ├── input.css
│   │   │   │   ├── modal.css
│   │   │   │   ├── dropdown.css
│   │   │   │   ├── icons.css
│   │   │   │   └── all-other-components.css
│   │   │   ├── base.css            # 기본 스타일
│   │   │   ├── animations.css      # 애니메이션
│   │   │   ├── scrollbar.css       # 스크롤바 (선택적)
│   │   │   ├── normalize.css       # CSS Reset
│   │   │   └── variables.css       # 디자인 토큰
│   │   ├── scripts/                # 빌드된 JavaScript 파일
│   │   │   └── components.js       # 통합 스크립트 (~90KB)
│   │   └── images/                 # 아이콘 이미지 (101개)
│   │       └── icons/
│   ├── viewer/                     # 컴포넌트 가이드 뷰어 (개발 확인용)
│   │   ├── index.html
│   │   ├── examples.js             # 컴포넌트 예제 데이터 (빌드 시 자동 생성)
│   │   ├── viewer.js
│   │   └── viewer.css
│   ├── README.md                   # 사용 가이드
│   └── FOLDER_STRUCTURE.md         # 폴더 구조 정책
│
├── 📁 components/                  # 🧩 컴포넌트 개발/관리
│   ├── component-engine.js         # 렌더링 엔진
│   ├── components-init.js          # 렌더러 등록
│   ├── data/                       # 컴포넌트 데이터 (23개)
│   ├── images/                     # 아이콘 이미지 (통합)
│   ├── renderers/                  # 렌더러 (5개)
│   ├── scripts/                    # 컴포넌트 스크립트 (13개)
│   └── styles/                     # 🎯 컴포넌트 스타일 (모듈화)
│       ├── common.css              # Import 통합 허브
│       ├── items/                  # 개별 컴포넌트 파일
│       │   ├── button.css
│       │   ├── input.css
│       │   ├── dropdown.css
│       │   ├── modal.css
│       │   ├── icons.css
│       │   └── all-other-components.css
│       ├── base.css, animations.css, scrollbar.css
│       ├── layout.css, lnb.css     # Studio 전용
│       ├── normalize.css, variables.css
│       └── ...
│
├── 📁 resources/                   # 🎨 Studio 전용 리소스
│   ├── js/                         # Studio 페이지 로직
│   └── styles/                     # Studio 스타일
│       ├── components.css          # 컴포넌트 Import 허브
│       ├── studio.css              # Studio 페이지 스타일
│       └── [외부 라이브러리]       # datatables, daterangepicker, select2
│
├── 📁 scripts/
│   ├── build-scripts.js            # 컴포넌트 빌드 (JS + examples.js 생성)
│   ├── build-styles.js             # Core 빌드 (CSS)
│   ├── clean-core.js               # Core 폴더 정리
│   └── copy-to-project.js          # CLI 복사 도구
│
├── 📁 docs/                        # 📚 문서
│   ├── HOW_TO_USE_IN_PROJECT.md    # 프로젝트 적용 가이드
│   ├── BUILD_SETUP_GUIDE.md        # 빌드 가이드
│   └── INDEX.md                    # 전체 문서 색인
│
├── components.html                 # 컴포넌트 데모 페이지
├── generator.html                  # 🆕 컴포넌트 Generator (ZIP 다운로드)
├── index.html                      # 메인 페이지
├── package.json                    # NPM 설정
└── README.md                       # 이 파일
```

## 🎯 빠른 시작

### 방법 1: 실제 프로젝트에서 사용 (추천)

#### Step 1: 파일 복사

```bash
cd vanillia
npm run copy ../my-project/assets
```

#### Step 2: HTML에 포함

```html
<!DOCTYPE html>
<html>
<head>
  <!-- 스타일 (common.css 하나면 충분!) -->
  <link rel="stylesheet" href="assets/styles/common.css">
</head>
<body>
  <!-- 컴포넌트 사용 -->
  <button class="btn btn--primary">Click me</button>
  
  <script src="assets/components.js"></script>
  <script>
    window.VanillaComponents.initAll();
  </script>
</body>
</html>
```

📚 **더 자세한 가이드**: [HOW_TO_USE_IN_PROJECT.md](docs/HOW_TO_USE_IN_PROJECT.md)

---

### 방법 2: 컴포넌트 스튜디오 (개발용)

#### Step 1: HTML에 스크립트 추가

```html
<!-- 디자인 시스템 -->
<link rel="stylesheet" href="resources/styles/common.css" />

<!-- Component Engine -->
<script src="components/component-engine.js"></script>
<script src="components/renderers/generic.renderer.js"></script>
<script src="components/components-init.js"></script>
```

#### Step 2: 컴포넌트 렌더링

```javascript
// JSON 데이터 기반 렌더링
await componentEngine.loadAndMount(
  "button",
  "components/data/button.data.js",
  "#targetElement"
);
```

📚 **개발 가이드**: [docs/HOW_TO_USE.md](docs/HOW_TO_USE.md)

## 🛠️ 새 컴포넌트 추가하기

### Step 1: JSON 데이터 작성

`components/data/my-component.data.js` 파일 생성:

```javascript
window.MyComponentData = {
  type: "my-component",
  id: "myComponent",
  title: "My Component",
  variants: [
    {
      title: "기본",
      items: [
        {
          preview: '<div class="my-component">Hello World</div>',
          label: "기본 예시",
        },
      ],
    },
  ],
};
```

### Step 2: 렌더러 등록

`components/components-init.js`에 추가:

```javascript
// Generic Renderer 사용 (권장)
componentEngine.registerRenderer("my-component", genericRenderer);

// 또는 전용 Renderer 생성 (복잡한 컴포넌트만)
// componentEngine.registerRenderer("my-component", myComponentRenderer);
```

### Step 3: 스타일 작성

`components/styles/items/my-component.css` 생성:

```css
.my-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  padding: var(--spacing-md);
}
```

그리고 `resources/styles/components.css`에 등록:

```css
@import url(../../components/styles/items/my-component.css);
```

## 🎨 디자인 시스템

### CSS Variables 사용

모든 스타일은 `variables.css`에 정의된 디자인 토큰을 사용합니다.

```css
/* 색상 */
--gray-50, --gray-100, ... --gray-900
--primary-100, --primary-600, --primary-700
--secondary-100, --secondary-600, --secondary-700

/* 타이포그래피 */
--h1, --h2, --h3, --h4, --h5
--body-md, --body-sm
--sub-sb-14, --sub-md-12

/* 시맨틱 컬러 */
--text-primary, --text-secondary, --text-tertiary
--bg-primary, --bg-secondary
--border-primary, --border-secondary
```

### 아이콘 시스템

`mask-image` 기반으로 색상 변경이 자유로운 아이콘:

```html
<!-- Small (16px) -->
<i class="icon icon--small icon--search"></i>

<!-- Medium (20px) - 기본 -->
<i class="icon icon--medium icon--search"></i>

<!-- Large (24px) -->
<i class="icon icon--large icon--search"></i>

<!-- XLarge (32px) -->
<i class="icon icon--xlarge icon--search"></i>
```

## 📖 컴포넌트 목록

### 1️⃣ Foundation (기초)

- ✅ **Typography**: 텍스트 스타일 및 타이포그래피 시스템
- ✅ **Icon**: 아이콘 세트 및 아이콘 사용 가이드
- 🚧 **Color**: 컬러 팔레트 및 시맨틱 컬러 (준비 중)
- 🚧 **Spacing**: 간격 시스템 및 레이아웃 유틸리티 (준비 중)
- 🚧 **Grid**: 그리드 시스템 (준비 중)

### 2️⃣ Form Controls (폼 컨트롤)

- ✅ **Button**: 다양한 크기, 스타일, 상태의 버튼
- ✅ **Input**: 텍스트 입력, 검색, 비밀번호 등
- ✅ **Checkbox**: 체크박스 및 인디케이터
- ✅ **Radio**: 라디오 버튼
- ✅ **Dropdown**: 드롭다운 선택 메뉴
- ✅ **Slider**: 범위 선택 슬라이더
- 🚧 **Switch**: 토글 스위치 (준비 중)
- 🚧 **Textarea**: 여러 줄 텍스트 입력 (준비 중)
- 🚧 **File Upload**: 파일 업로드 (준비 중)
- 🚧 **Date Picker**: 날짜 선택기 (준비 중)
- 🚧 **Search Input**: 검색 입력 필드 (준비 중)

### 3️⃣ Data Display (데이터 표시)

- ✅ **Chip**: 태그 및 칩 컴포넌트
- ✅ **Table**: 데이터 테이블 (DataTables 연동)
- ✅ **File Card**: 파일 카드 UI
- 🚧 **Badge**: 배지 및 레이블 (준비 중)
- 🚧 **Tooltip**: 툴팁 (준비 중)
- 🚧 **Card**: 카드 컨테이너 (준비 중)
- 🚧 **Avatar**: 사용자 아바타 (준비 중)
- 🚧 **Progress Bar**: 진행률 표시 (준비 중)
- 🚧 **List**: 리스트 컴포넌트 (준비 중)
- 🚧 **Skeleton**: 로딩 스켈레톤 (준비 중)
- 🚧 **Empty State**: 빈 상태 UI (준비 중)

### 4️⃣ Feedback (피드백)

- ✅ **Modal**: 모달 다이얼로그
- ✅ **Popover**: 팝오버 메뉴
- 🚧 **Toast**: 토스트 알림 (준비 중)
- 🚧 **Alert**: 경고 메시지 (준비 중)
- 🚧 **Dialog**: 다이얼로그 (준비 중)
- 🚧 **Loading Spinner**: 로딩 인디케이터 (준비 중)

### 5️⃣ Navigation (네비게이션)

- ✅ **Tab**: 탭 네비게이션
- ✅ **Accordion**: 펼침/접힘 컨테이너
- 🚧 **Breadcrumb**: 브레드크럼 네비게이션 (준비 중)
- 🚧 **Pagination**: 페이지네이션 (준비 중)
- 🚧 **Menu**: 메뉴 (준비 중)
- 🚧 **Stepper**: 단계 표시 (준비 중)

## 🔧 개발 가이드

### 디버깅 도구

브라우저 콘솔에서 사용 가능:

```javascript
// 캐시 상태 확인
showCacheStats();

// 컴포넌트 재로딩
reloadComponents();

// 등록된 렌더러 확인
componentEngine.getRegisteredRenderers();
```

### 캐시 비활성화 (개발 시)

```javascript
// 세 번째 인자를 false로 설정
await componentEngine.render(type, data, false);
```

## 📝 코딩 규칙

### DO ✅

- CSS Variables 사용
- JSDoc 주석 작성
- Generic Renderer 우선 사용
- BEM 네이밍 (`.btn--primary`, `.icon--small`)
- 사용자 입력 이스케이프 (`_escapeHtml()`)

### DON'T ❌

- 인라인 스타일 하드코딩
- ComponentEngine 직접 수정
- 전역 스코프 오염
- jQuery 등 외부 라이브러리 추가

## 📚 문서 및 리소스

### 📖 가이드

#### 사용 가이드
- **[HOW_TO_USE_IN_PROJECT.md](docs/HOW_TO_USE_IN_PROJECT.md)** - 실제 프로젝트 적용 가이드 ⭐
- **[core/README.md](core/README.md)** - Core 패키지 사용법
- **[HOW_TO_USE.md](docs/HOW_TO_USE.md)** - Component Engine 개발 가이드

#### 개발 가이드
- **[COMPONENT_SCRIPT_GUIDE.md](docs/COMPONENT_SCRIPT_GUIDE.md)** - 컴포넌트 스크립트 작성 가이드 (13개 구현 완료)
- **[COMPONENT_SCRIPTS_TODO.md](docs/COMPONENT_SCRIPTS_TODO.md)** - 컴포넌트 스크립트 작업 현황
- **[HELPER_API.md](docs/HELPER_API.md)** - Helper API 문서

#### 아키텍처 문서
- **[REFACTORING_PLAN.md](docs/REFACTORING_PLAN.md)** - 리팩토링 계획 및 전략
- **[STYLE_ARCHITECTURE_COMPARISON.md](docs/STYLE_ARCHITECTURE_COMPARISON.md)** - CSS 아키텍처 비교 분석
- **[BUILD_SETUP_GUIDE.md](docs/BUILD_SETUP_GUIDE.md)** - 빌드 환경 설정 가이드

#### 프로젝트 관리
- **[docs/INDEX.md](docs/INDEX.md)** - 📚 전체 문서 색인 및 가이드 ⭐
- **[TODO.md](TODO.md)** - 프로젝트 TODO 및 로드맵
- **[CHANGELOG.md](CHANGELOG.md)** - 변경 이력 및 릴리스 노트

### 🎭 데모 & 리소스

- **[컴포넌트 스튜디오](https://doakuma.github.io/doakumize-kit/vanillia/components.html)** - 모든 컴포넌트 라이브 데모
- **[components.html](components.html)** - 로컬 데모 페이지

### 🔧 개발 도구

```bash
# 컴포넌트 빌드 (JS 통합)
npm run build

# Core 스타일 빌드 (CSS: components/styles → core/styles)
npm run build:core
  - components/styles/items/ → core/styles/items/ 복사
  - core/styles/components.css 허브 자동 생성
  - 자동 정리(Clean) 기능 포함

# 프로젝트로 복사 (core → 외부 프로젝트)
npm run copy <destination>
```

### ⚡ Component Generator

필요한 컴포넌트만 선택하여 다운로드:

1. **[generator.html](generator.html)** 열기
2. 필요한 컴포넌트 선택
3. **Download Package (ZIP)** 클릭
4. 다운로드된 ZIP에 포함:
   - `examples.js` - 선택한 컴포넌트 예제
   - `styles/common.css` - 통합 허브 파일
   - `styles/components.css` - 컴포넌트 Import 허브
   - `styles/items/` - 개별 컴포넌트 CSS 파일
   - `styles/` 기타 - base.css, animations.css, variables.css 등
   - `README.txt` - 사용 가이드

💡 **Import 허브 방식:** 필요없는 컴포넌트는 `components.css`에서 주석 처리하면 용량 절감!

**온라인**: https://doakuma.github.io/doakumize-kit/vanillia/generator.html

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📊 프로젝트 현황

### 컴포넌트
- ✅ **완성**: 15개 (Foundation 2개, Form Controls 6개, Data Display 3개, Feedback 2개, Navigation 2개)
- ⏳ **준비 중**: 24개
- 📊 **총**: 39개

### 컴포넌트 스크립트
- ✅ **분리 완료**: 13개 (accordion, checkbox-group, chip, dropdown, file-card, file-upload, input, lnb, modal, popover, slider, tab, tooltip)
- 📦 **통합 파일**: `core/components.js` (프로덕션 사용)

### 문서
- 📖 **사용 가이드**: 2개
- 🛠️ **개발 가이드**: 3개
- 🏗️ **아키텍처 문서**: 3개
- 📋 **프로젝트 관리**: 3개 (INDEX, TODO, CHANGELOG)

---

**Akumize Design System v1.1.0**  
Built with ❤️ using Vanilla JavaScript

**Last Updated**: 2025-11-11

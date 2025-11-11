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
- **자동 캐싱**: 성능 최적화를 위한 렌더링 결과 캐싱
- **디자인 시스템**: CSS Variables 기반 일관된 UI
- **플러그인 구조**: 컴포넌트별 Renderer 확장 가능
- **Zero Dependencies**: jQuery, React 등 외부 라이브러리 불필요

## 📁 프로젝트 구조

```
vanillia/
├── core/                           # ⭐ 실제 프로젝트용 (Production)
│   ├── components.js               # 통합 스크립트 (~90KB)
│   ├── styles/                     # CSS 파일
│   │   ├── variables.css           # 디자인 토큰
│   │   ├── common.css              # 기본 스타일
│   │   ├── normalize.css           # CSS 리셋
│   │   └── components.css          # 컴포넌트 스타일 (~180KB)
│   ├── images/                     # 아이콘 (101개)
│   └── README.md                   # 사용 가이드
│
├── components/                     # 컴포넌트 스튜디오 (Development)
│   ├── component-engine.js         # 렌더링 엔진
│   ├── components-init.js          # 렌더러 등록
│   ├── data/                       # 쇼케이스 데이터
│   ├── renderers/                  # 렌더러
│   ├── scripts/                    # 원본 스크립트
│   └── styles/                     # 원본 스타일
│
├── resources/                      # 쇼케이스 리소스
│   ├── images/                     # 아이콘 이미지
│   ├── js/                         # 페이지 로직
│   └── styles/                     # 스타일
│
├── scripts/
│   ├── build-components.js         # 빌드 도구
│   └── copy-to-project.js          # CLI 복사 도구
│
├── docs/                           # 문서
│   ├── HOW_TO_USE_IN_PROJECT.md    # 실제 프로젝트 가이드
│   └── HOW_TO_USE.md               # 개발 가이드
│
├── components.html                 # 컴포넌트 데모 페이지
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
  <link rel="stylesheet" href="assets/styles/normalize.css">
  <link rel="stylesheet" href="assets/styles/variables.css">
  <link rel="stylesheet" href="assets/styles/common.css">
  <link rel="stylesheet" href="assets/styles/components.css">
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

`resources/styles/components.css`에 추가:

```css
.my-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  padding: var(--spacing-md);
}
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

- **[HOW_TO_USE_IN_PROJECT.md](docs/HOW_TO_USE_IN_PROJECT.md)** - 실제 프로젝트 적용 가이드 ⭐
- **[core/README.md](core/README.md)** - Core 패키지 사용법
- **[docs/HOW_TO_USE.md](docs/HOW_TO_USE.md)** - Component Engine 개발 가이드
- **[docs/HELPER_API.md](docs/HELPER_API.md)** - Helper API 문서

### 🎭 데모 & 리소스

- **[컴포넌트 스튜디오](https://doakuma.github.io/doakumize-kit/vanillia/components.html)** - 모든 컴포넌트 라이브 데모
- **[components.html](components.html)** - 로컬 데모 페이지

### 🔧 개발 도구

```bash
# 컴포넌트 빌드
npm run build

# 프로젝트로 복사
npm run copy <destination>
```

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

**Akumize Design System v1.0**
Built with ❤️ using Vanilla JavaScript

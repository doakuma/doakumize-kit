# Component Engine 사용 가이드

> 📅 최종 업데이트: 2025-10-21 (카테고리 시스템 및 LNB 네비게이션 추가)

## 📁 파일 구조

```
components/
  ├── component-engine.js          # 메인 렌더링 엔진 (캐싱, 렌더러 관리)
  ├── components-init.js           # 자동 마운트 및 초기화
  ├── data/                        # 컴포넌트 데이터 (.data.js)
  │   ├── typography.data.js       # 15개 컴포넌트 데이터
  │   ├── button.data.js
  │   ├── icon.data.js
  │   └── ...
  └── renderers/
      ├── generic.renderer.js      # 제네릭 렌더러 (대부분 처리)
      ├── modal.renderer.js        # 복잡한 컴포넌트용 전용 렌더러
      └── icon.renderer.js

resources/js/
  ├── components-config.js         # 컴포넌트 리스트 + 카테고리 관리
  ├── components-page.js           # LNB 네비게이션 + 컨텐츠 전환
  └── component-code-viewer.js     # 코드 보기/복사 기능
```

## 🎯 시스템 특징

- ✅ **카테고리 시스템**: 5개 카테고리로 체계적 분류 (Foundation, Form Controls, Data Display, Feedback, Navigation)
- ✅ **LNB 네비게이션**: 사이드바 기반 컴포넌트 탐색
- ✅ **컨텐츠 전환**: 탭 없이 부드러운 페이지 전환
- ✅ **로드맵 가시화**: 준비 중인 컴포넌트 표시 (24개 예정)
- ✅ **자동 마운트**: HTML에 `data-component` 속성만 추가하면 자동 렌더링
- ✅ **렌더러 통합**: 14개 렌더러 → 1개로 통합 (93% 감소)
- ✅ **데이터 파일**: `.data.js` 파일로 로컬 개발 지원
- ✅ **코드 분리**: 코드 보기 기능 독립 모듈화
- ✅ **자동 캐싱**: 성능 최적화를 위한 스마트 캐싱
- ✅ **검색 기능**: 실시간 컴포넌트 검색

## 🚀 사용 방법

### 1. HTML에서 컴포넌트 마운트 (가장 간단!)

HTML에 `data-component` 속성만 추가하면 자동으로 렌더링됩니다:

```html
<!-- Typography 컴포넌트 -->
<div data-component="typography"></div>

<!-- Button 컴포넌트 -->
<div data-component="button"></div>

<!-- Icon 컴포넌트 -->
<div data-component="icon"></div>

<!-- 다른 데이터 소스 사용 시 -->
<div data-component="button" data-source="button-variants"></div>
```

**끝!** 별도의 JavaScript 호출 불필요 ✨

### 2. JavaScript에서 동적으로 렌더링

```javascript
// 기본 방식
await componentEngine.loadAndMount(
  "typography", // 컴포넌트 타입
  "typography", // 데이터 소스
  "#targetElement" // 마운트할 요소
);
```

### 3. 브라우저 콘솔 명령어

```javascript
// 캐시 상태 확인
showCacheStats();

// 컴포넌트 재로딩 (개발 중 유용)
reloadComponents();

// 등록된 렌더러 확인
componentEngine.getRegisteredRenderers();

// 특정 타입 캐시 삭제
componentEngine.clearCache("typography");
```

## 📋 컴포넌트 관리 시스템

### 🗂️ 카테고리 구조

컴포넌트는 5개 카테고리로 분류되어 관리됩니다:

```javascript
const COMPONENT_CATEGORIES = {
  FOUNDATION: "Foundation", // 기초 (Typography, Icon, Color 등)
  FORM_CONTROLS: "Form Controls", // 폼 컨트롤 (Button, Input 등)
  DATA_DISPLAY: "Data Display", // 데이터 표시 (Table, Card 등)
  FEEDBACK: "Feedback", // 피드백 (Modal, Toast 등)
  NAVIGATION: "Navigation", // 네비게이션 (Tab, Breadcrumb 등)
};
```

### 📊 현재 컴포넌트 현황

**총 39개 컴포넌트**

- ✅ **완성**: 15개
- ⏳ **준비 중**: 24개

#### 1️⃣ Foundation (2/5)

- ✅ Typography, Icon
- ⏳ Color, Spacing, Grid

#### 2️⃣ Form Controls (6/11)

- ✅ Button, Input, Checkbox, Radio, Dropdown, Slider
- ⏳ Switch, Textarea, File Upload, Date Picker, Search Input

#### 3️⃣ Data Display (3/11)

- ✅ Chip, Table, File Card
- ⏳ Badge, Tooltip, Card, Avatar, Progress Bar, List, Skeleton, Empty State

#### 4️⃣ Feedback (2/6)

- ✅ Modal, Popover
- ⏳ Toast, Alert, Dialog, Loading Spinner

#### 5️⃣ Navigation (2/6)

- ✅ Tab, Accordion
- ⏳ Breadcrumb, Pagination, Menu, Stepper

### 🔧 컴포넌트 추가하기

`resources/js/components-config.js`의 `COMPONENT_LIST`에 추가:

```javascript
const COMPONENT_LIST = [
  // 카테고리별로 정리
  {
    id: "my-component",
    name: "My Component",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    order: 20,
    enabled: true, // 또는 false (준비 중)
  },
];
```

### ⚙️ 설정 옵션

```javascript
{
  id: "my-component",                           // 필수: 컴포넌트 ID
  name: "My Component",                         // 필수: 표시 이름
  category: COMPONENT_CATEGORIES.DATA_DISPLAY,  // 필수: 카테고리
  order: 20,                                    // 필수: 정렬 순서
  dataSource: "custom",                         // 선택: 데이터 소스
  enabled: true,                                // 선택: 활성화 여부 (기본: true)
}
```

### 🚧 준비 중 컴포넌트 표시

`enabled: false`로 설정하면 LNB에 "준비 중" 상태로 표시됩니다:

```javascript
{
  id: "toast",
  name: "Toast",
  category: COMPONENT_CATEGORIES.FEEDBACK,
  enabled: false,  // 공사 중 아이콘과 함께 표시, 클릭 불가
  order: 30,
}
```

LNB에서 표시:

- 🚧 아이콘 + 반투명 + "준비 중" 배지
- 클릭 이벤트 차단
- 카테고리별 진행률 표시 (예: 2/5)

### 🎯 자동 생성 시스템

`COMPONENT_LIST`를 수정하면 자동 처리:

1. ✅ **LNB 카테고리 네비게이션** - 카테고리별로 그룹핑되어 표시
2. ✅ **컴포넌트 전환** - 클릭 시 해당 컴포넌트만 렌더링
3. ✅ **진행률 표시** - Footer에 "15/39 Components" 표시
4. ✅ **검색 기능** - 실시간 필터링

별도의 HTML 수정이 필요하지 않습니다.

### 🔍 헬퍼 함수

브라우저 콘솔에서 사용 가능:

```javascript
// 카테고리별 컴포넌트 목록
ComponentConfig.getComponentsByCategory();

// 특정 카테고리의 컴포넌트만
ComponentConfig.getComponentsInCategory("Form Controls");

// 모든 카테고리 목록
ComponentConfig.getAllCategories();

// 활성화된 컴포넌트만
ComponentConfig.getEnabledComponents();

// 특정 컴포넌트 설정
ComponentConfig.getComponentConfig("button");

// 전체 리스트
ComponentConfig.COMPONENT_LIST;
```

### 🎨 LNB 사용법

#### 컴포넌트 선택

- LNB에서 컴포넌트 클릭 → 메인 영역에 해당 컴포넌트 표시
- Fade in/out 애니메이션 (0.2초)
- 제목과 설명 자동 업데이트

#### 검색

- LNB 상단 검색창에서 실시간 필터링
- 매칭되는 컴포넌트가 있는 카테고리만 표시
- 엔터키 없이 즉시 검색

#### 카테고리 접기/펼치기

- 카테고리 클릭 → 서브메뉴 토글
- 검색 시 매칭된 카테고리 자동 펼침

---

## 🔧 새로운 컴포넌트 추가하기

### ⚡ 간단한 방법 (4단계로 완료!)

#### 1. 컴포넌트 리스트 등록

먼저 `resources/js/components-config.js`에 추가하세요:

```javascript
const COMPONENT_LIST = [
  // 기존 컴포넌트들...
  { id: "my-component", name: "My Component", order: 16 },
];
```

#### 2. 데이터 파일 생성

`components/data/my-component.data.js` 파일 생성:

```javascript
// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// 컴포넌트 데이터 등록
window.ComponentData["my-component"] = {
  type: "my-component",
  id: "componentMyComponent",
  title: "My Component",
  variants: [
    {
      title: "기본 상태",
      items: [
        {
          preview: '<button class="btn">Click me</button>',
          label: "기본 버튼",
        },
      ],
    },
  ],
};
```

#### 3. components-init.js에 렌더러 등록

```javascript
// 제네릭 렌더러가 자동으로 처리
componentEngine.registerRenderer("my-component", genericRenderer);
```

#### 4. HTML에 추가

```html
<!-- HTML에서 data 파일 로드 -->
<script src="components/data/my-component.data.js"></script>

<!-- 컴포넌트 마운트 -->
<div data-component="my-component"></div>
```

**끝!** 자동으로 렌더링됨 ✨

---

### 🎨 고급 방법 (복잡한 컴포넌트)

Modal, Tab 같은 매우 복잡한 컴포넌트만 전용 렌더러를 만듭니다.

#### 1. 전용 렌더러 클래스 생성

`components/renderers/complex-component.renderer.js`

```javascript
class ComplexComponentRenderer {
  render(data) {
    // 특별한 렌더링 로직
    return "<div>...</div>";
  }

  getCacheKey(data) {
    return `complex-${data.id}`;
  }
}
```

#### 2. HTML에 스크립트 추가

```html
<script src="components/renderers/complex-component.renderer.js"></script>
```

#### 3. components-init.js에 등록

```javascript
componentEngine.registerRenderer("complex", new ComplexComponentRenderer());
```

## 📝 데이터 수정

`typography.data.js` 같은 데이터 파일을 직접 수정하여 컴포넌트 내용을 변경할 수 있습니다.
수정 후 브라우저를 새로고침하면 자동으로 반영됩니다.

개발 중에는 콘솔에서 `reloadComponents()`를 실행하여
새로고침 없이 변경사항을 확인할 수 있습니다.

### 왜 `.data.js` 파일인가요?

- ✅ **로컬 개발 지원**: `file://` 프로토콜에서도 작동
- ✅ **JSON fetch 불필요**: 서버 없이 바로 테스트 가능
- ✅ **타입 체크**: JavaScript 문법으로 IDE 지원
- ✅ **코멘트 가능**: 주석 추가 가능

## ⚡ 성능 최적화

- 첫 렌더링 후 결과가 자동으로 캐시됨
- 동일한 데이터는 다시 렌더링하지 않음
- 데이터 파일도 한 번 로드 후 캐시됨
- 개발 시에만 캐시를 끄려면:
  ```javascript
  componentEngine.render(type, data, false); // 세 번째 인자 false
  ```

## 💻 코드 보기 기능

컴포넌트 렌더링 시 자동으로 "코드 보기" 버튼이 추가됩니다.

### 기능

- ✅ **원본 소스 보존**: 라이브러리 적용 전 HTML 자동 저장
- ✅ **코드 토글**: 버튼 클릭으로 소스 코드 표시/숨김
- ✅ **포맷팅**: HTML이 자동으로 예쁘게 포맷팅됨
- ✅ **클립보드 복사**: 원클릭 코드 복사

### 전역 함수

```javascript
// 컴포넌트 소스 가져오기
const source = window.ComponentSource.get(previewElement);

// 클립보드에 복사
await window.ComponentSource.copy(previewElement);

// 소스 보존 초기화
window.initComponentSourcePreservation();

// 코드 보기 버튼 추가
window.addCodeToggleButtons();
```

## 🐛 디버깅 팁

### 1. 콘솔 로그 확인

상세한 로그가 자동으로 출력됩니다:

- `[Init]` - 초기화 및 마운트 관련
- `[ComponentEngine]` - 렌더링 엔진 동작
- `[ComponentCodeViewer]` - 코드 보기 기능
- `[Dev]` - 개발자 도구 명령어

### 2. 렌더링 오류 발생 시

1. 브라우저 콘솔에서 에러 메시지 확인
2. 데이터 파일의 JavaScript 문법 확인
3. `window.ComponentData` 객체 확인:
   ```javascript
   console.log(window.ComponentData);
   ```
4. 렌더러가 등록되었는지 확인:
   ```javascript
   componentEngine.getRegisteredRenderers();
   ```

### 3. 자동 마운트가 안 될 때

- `data-component` 속성이 올바른지 확인
- 데이터 파일이 HTML에서 로드되었는지 확인
- 콘솔에서 `Found X component(s) to mount` 메시지 확인

## ✅ 시스템 장점

- ✓ **초간단 사용법**: HTML에 `data-component` 속성만 추가
- ✓ **자동 마운트**: JavaScript 호출 불필요
- ✓ **로컬 개발**: 서버 없이 `file://` 프로토콜로 작동
- ✓ **모듈화**: 코드 보기 기능 독립 분리
- ✓ **성능**: 스마트 캐싱으로 빠른 렌더링
- ✓ **확장성**: 새 컴포넌트 추가가 매우 쉬움
- ✓ **재사용성**: 다른 프로젝트에서도 사용 가능
- ✓ **테스트 가능**: 각 모듈을 독립적으로 테스트

## 📚 다음 단계

### 완료된 작업 ✅

1. ✅ **제네릭 렌더러 시스템** - 1개 렌더러로 모든 컴포넌트 처리
2. ✅ **자동 마운트 시스템** - `data-component` 기반
3. ✅ **데이터 파일 시스템** - `.data.js` 로컬 개발 지원
4. ✅ **코드 보기 모듈** - 독립 분리 및 전역 함수 제공
5. ✅ **컴포넌트 리스트 관리** - `components-config.js` 중앙 관리
6. ✅ **카테고리 시스템** - 5개 카테고리로 체계적 분류
7. ✅ **LNB 네비게이션** - 사이드바 기반 탐색 시스템
8. ✅ **컨텐츠 전환 방식** - 탭 네비게이션 제거, 부드러운 전환
9. ✅ **검색 기능** - 실시간 컴포넌트 필터링
10. ✅ **로드맵 가시화** - 준비 중 컴포넌트 표시 (24개)
11. ✅ **15개 컴포넌트** - Typography, Button, Icon, Input, Checkbox, Radio, Dropdown, Slider, Chip, Table, File Card, Modal, Popover, Tab, Accordion

### 예정된 작업 ⏳

12. ⏳ **24개 컴포넌트 추가** - Badge, Tooltip, Card, Toast, Alert 등
13. 🔮 **다국어 지원 (i18n)**
14. 📘 **TypeScript 전환 고려**
15. 🎨 **다크 모드 지원**

---

## 🎉 시스템 개선 효과

### Before (초기 방식)

```
❌ 탭 네비게이션
  - 15개 탭 버튼 생성
  - 15개 패널 모두 DOM에 존재
  - LNB와 기능 중복

❌ 렌더러 시스템
  - components/renderers/
    ├── typography.renderer.js   (126 lines)
    ├── button.renderer.js       (~120 lines)
    ├── icon.renderer.js         (~100 lines)
    └── ... (14개 파일, 약 1,500+ lines)

❌ 사용법
  - 각 컴포넌트마다 전용 렌더러 작성 필요
  - JavaScript에서 수동으로 렌더링 호출
  - 코드 중복 많음
  - 컴포넌트 추가 시간 10분+
```

### After (현재 방식)

```
✅ LNB 네비게이션
  - 5개 카테고리로 체계적 분류
  - 현재 컴포넌트만 DOM에 존재 (성능 향상)
  - 검색 기능 + 진행률 표시
  - 부드러운 Fade 전환 (0.2초)

✅ 렌더러 시스템
  - components/
    ├── renderers/
    │   └── generic.renderer.js      (232 lines)
    └── components-init.js           (237 lines)
  - resources/js/
    ├── component-code-viewer.js     (285 lines)
    ├── components-config.js         (393 lines) - 카테고리 관리
    └── components-page.js           (567 lines) - LNB + 전환

✅ 사용법
  - HTML에 data-component 속성만 추가
  - LNB 클릭으로 자동 렌더링
  - 모듈화된 깔끔한 구조
  - 컴포넌트 추가 시간 2분
```

### 📊 개선 결과

#### 구조 개선

- 🎯 **렌더러 파일**: 14개 → 1개 (93% 감소)
- 📦 **UI 패턴**: 탭 네비게이션 → LNB 네비게이션 (중복 제거)
- 🗂️ **카테고리 시스템**: 5개 카테고리로 체계적 분류
- 📋 **로드맵**: 39개 컴포넌트 현황 가시화

#### 성능 개선

- ⚡ **DOM 최적화**: 15개 패널 → 1개 패널 (메모리 절감)
- 🚀 **렌더링 속도**: 캐싱으로 즉시 로드
- ✨ **애니메이션**: 부드러운 Fade 전환

#### 개발 경험

- 💻 **사용 편의성**: JavaScript 호출 → HTML 속성
- 🔍 **검색 기능**: 실시간 컴포넌트 필터링
- 📈 **진행률 표시**: 15/39 Components
- 🚧 **준비 중 표시**: 예정 컴포넌트 가시화
- ⏱️ **개발 속도**: 10분 → 2분 (80% 단축)

#### 사용자 경험

- 🎨 **직관적 UI**: 카테고리별 분류로 쉬운 탐색
- 🔎 **빠른 검색**: 컴포넌트 이름으로 즉시 찾기
- 📊 **진행 현황**: 완성도 한눈에 파악
- 🌊 **부드러운 전환**: 자연스러운 페이지 전환

**결과**: 더 적은 코드로 더 강력한 시스템! 🎊

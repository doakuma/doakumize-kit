# 📚 Component Viewer

프로젝트에서 사용하는 컴포넌트 가이드를 제공하는 경량 뷰어입니다.

## 🎯 용도

- **퍼블리셔/개발자**: 컴포넌트 사용법과 코드 확인
- **팀 협업**: 컴포넌트 스펙 공유
- **문서화**: 프로젝트별 컴포넌트 가이드

## 🚀 빠른 시작

### 1. 브라우저에서 열기

```
프로젝트/assets/doakumize/viewer/index.html
```

브라우저에서 바로 열면 끝입니다.

### 2. 컴포넌트 확인

- **Overview 섹션**: 첫 화면에 전체 컴포넌트 개요 표시
- **카테고리별 구성**: 왼쪽 사이드바에서 카테고리별로 컴포넌트 확인
  - Foundation (Typography, Icon)
  - Form Controls (Button, Input, Checkbox, Radio, Dropdown, Slider)
  - Data Display (Chip, Table, File Card)
  - Feedback (Modal, Popover)
  - Navigation (Tab, Accordion)
- **미리보기**: 각 컴포넌트의 다양한 변형 확인
- **코드 보기**: "View Code" 버튼으로 HTML 코드 확인
- **코드 복사**: "Copy" 버튼으로 코드 복사
- **모달 테스트**: 모달 컴포넌트는 자동으로 로드되어 바로 테스트 가능

## 📝 컴포넌트 추가/수정 방법

### 방법 1: 빌드 시 자동 생성 (권장) ⭐

**`examples.js`는 빌드 시 자동으로 생성됩니다!**

```bash
# 빌드 실행
cd vanillia
npm run build

# examples.js가 자동 생성됨
# → core/viewer/examples.js
```

**자동 생성 내용:**
- `components/data/*.data.js` 파일 파싱
- 카테고리 정보 포함 (`window.ComponentCategories`)
- 컴포넌트 예제 데이터 (`window.ComponentExamples`)
- 모달 HTML (`window.ModalHTMLs`)

💡 **참고**: 빌드 후 `index.html`을 새로고침하면 최신 컴포넌트가 표시됩니다.

---

### 방법 2: Generator 사용 (선택적)

필요한 컴포넌트만 선택하여 다운로드:

#### Step 1: Generator 열기
```
https://doakuma.github.io/doakumize-kit/vanillia/generator.html
```

#### Step 2: 컴포넌트 선택
- 사용하는 컴포넌트 체크
- 미리보기 확인
- "Download Package (ZIP)" 클릭

#### Step 3: 파일 교체
```
다운로드한 examples.js를 이 폴더에 붙여넣기
→ viewer/examples.js (덮어쓰기)
```

---

### 방법 3: 수동 편집

`examples.js` 파일을 직접 수정할 수도 있습니다 (권장하지 않음).

#### 새 컴포넌트 추가

```javascript
// examples.js
window.ComponentExamples = {
  // 기존 컴포넌트들...
  
  // 새 컴포넌트 추가
  modal: {
    title: "Modal",
    description: "모달 다이얼로그",
    items: [
      {
        label: "기본 모달",
        code: `<button data-modal-open="myModal">Open Modal</button>
<div id="myModal" class="modal">
  <div class="modal__content">
    <h2>Modal Title</h2>
  </div>
</div>`
      }
    ]
  }
};
```

#### 기존 컴포넌트 수정

```javascript
// examples.js
window.ComponentExamples = {
  button: {
    title: "Button",
    description: "프로젝트 전용 버튼 설명", // 수정
    items: [
      {
        label: "Primary Button",
        code: '<button class="btn btn--primary">Primary</button>'
      },
      // 새 예시 추가
      {
        label: "Custom Button",
        code: '<button class="btn btn--custom">Custom</button>'
      }
    ]
  }
};
```

## 📋 데이터 구조

### ComponentExamples 형식

```javascript
window.ComponentExamples = {
  [componentId]: {
    title: string,        // 컴포넌트 이름
    description: string,  // 설명 (선택사항)
    category: string,    // 카테고리 (Foundation, Form Controls, 등)
    order: number,       // 카테고리 내 순서
    items: [              // 예시 배열
      {
        label: string,    // 예시 제목
        code: string      // HTML 코드
      }
    ]
  }
};
```

### ComponentCategories 형식

```javascript
window.ComponentCategories = {
  "Foundation": "Foundation",
  "Form Controls": "Form Controls",
  "Data Display": "Data Display",
  "Feedback": "Feedback",
  "Navigation": "Navigation"
};
```

### ModalHTMLs 형식

```javascript
window.ModalHTMLs = [
  "<div class=\"modal\" id=\"myModal\">...</div>",
  "<div class=\"modal\" id=\"anotherModal\">...</div>"
];
```

### 예시

```javascript
window.ComponentExamples = {
  dropdown: {
    title: "Dropdown",
    description: "드롭다운 선택 메뉴",
    items: [
      {
        label: "기본 드롭다운",
        code: `<div class="dropdown" data-dropdown>
  <button class="dropdown__trigger">Select</button>
  <div class="dropdown__menu">
    <div class="dropdown__item">Option 1</div>
  </div>
</div>`
      },
      {
        label: "다중 선택",
        code: `<div class="dropdown" data-dropdown data-multiple>
  ...
</div>`
      }
    ]
  }
};
```

## 🎨 커스터마이징

### 제목/설명 변경

`index.html` 파일 수정:

```html
<div class="viewer-logo">
  <h1>우리 프로젝트 가이드</h1>  <!-- 변경 -->
  <p>컴포넌트 사용 가이드</p>      <!-- 변경 -->
</div>
```

### 스타일 변경

`viewer.css` 파일 수정 또는 별도 CSS 파일 추가:

```css
/* 커스텀 스타일 */
.viewer-sidebar {
  background: #f0f0f0; /* 배경색 변경 */
}

.viewer-nav-item.is-active {
  background: #your-brand-color; /* 브랜드 컬러 */
}
```

## 📁 파일 구조

```
viewer/
  ├── index.html      # 뷰어 페이지
  ├── viewer.js       # 뷰어 로직
  ├── viewer.css      # 뷰어 스타일
  ├── examples.js     # 컴포넌트 데이터 (여기만 수정!)
  └── README.md       # 이 파일
```

## 💡 팁

### 1. 팀원과 공유

```bash
# 프로젝트 저장소에 포함
git add core/viewer/examples.js
git commit -m "Update component examples"
git push

# 팀원들은 index.html을 열면 됩니다.
```

### 2. 로컬 서버로 열기

```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# VS Code Live Server 사용

→ http://localhost:8000/viewer/index.html
```

### 3. 프로젝트별 버전 관리

```javascript
// examples.js 상단에 버전 정보
/**
 * Project Component Guide
 * Version: 1.2.0
 * Updated: 2025-11-11
 * Components: 15
 */
```

### 4. 컴포넌트 검색

왼쪽 상단 검색창 사용:
- 실시간 필터링
- 부분 검색 가능

### 5. 코드 복사 단축키

- 코드 블록에서 Ctrl+C (자동 복사 버튼 대신)

## 🔄 업데이트 방법

### 빌드로 자동 업데이트 (권장) ⭐

새 컴포넌트가 추가되거나 수정되었을 때:

```bash
# 빌드 실행
cd vanillia
npm run build

# examples.js가 자동으로 최신 상태로 업데이트됨
# index.html을 새로고침하면 반영됩니다.
```

### Generator로 업데이트 (선택적)

1. Generator 열기
2. 기존 컴포넌트 + 새 컴포넌트 선택
3. Download
4. examples.js 교체

### 수동 업데이트 (권장하지 않음)

```javascript
// examples.js에 추가만
window.ComponentExamples.newComponent = { ... };
```

## ⚠️ 주의사항

### 할 것 ✅

- **빌드로 자동 생성** (가장 권장)
- Generator로 생성 (선택적)
- 프로젝트에서 실제 사용하는 것만 추가

### 하지 말 것 ❌

- **examples.js 직접 수정** (빌드 시 덮어쓰기됨)
- index.html, viewer.js, viewer.css 수정 (특별한 이유 없이)
- 사용 안 하는 컴포넌트 추가 (혼란)
- HTML 코드에 `<script>` 태그 포함 (보안)

💡 **중요**: `examples.js`는 빌드 스크립트가 자동 생성하므로 직접 수정하면 빌드 시 덮어쓰기됩니다.

## 🐛 문제 해결

### 컴포넌트가 보이지 않습니다

1. `examples.js` 문법 확인:
   ```javascript
   // 잘못된 예
   window.ComponentExamples = {
     button: { ... },  // 마지막 쉼표 확인
   }  // 세미콜론 확인
   ```

2. 브라우저 콘솔 확인 (F12)
   - JavaScript 에러 확인

### 스타일이 적용되지 않습니다

1. CSS 파일 경로 확인:
   ```html
   <link rel="stylesheet" href="../styles/components.css">
   ```

2. 상대 경로 확인:
   - viewer/ 폴더에서 ../styles/로 접근

### 인터랙티브 기능이 작동하지 않습니다

1. components.js 로드 확인:
   ```html
   <script src="../components.js"></script>
   ```

2. 자동 초기화 확인:
   ```javascript
   // viewer.js에서 자동 호출
   window.VanillaComponents.initAll();
   ```

## 📚 더 알아보기

- **Core Package**: [../README.md](../README.md)
- **Generator**: https://doakuma.github.io/doakumize-kit/vanillia/generator.html
- **Component Studio**: https://doakuma.github.io/doakumize-kit/vanillia/components.html
- **사용 가이드**: [../../docs/HOW_TO_USE_IN_PROJECT.md](../../docs/HOW_TO_USE_IN_PROJECT.md)

---

**편하게 사용하시기 바랍니다. 🎉**


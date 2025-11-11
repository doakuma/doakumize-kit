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

브라우저에서 바로 열면 끝!

### 2. 컴포넌트 확인

- 왼쪽 사이드바에서 컴포넌트 선택
- 미리보기 확인
- "View Code" 버튼으로 코드 보기
- "Copy" 버튼으로 코드 복사

## 📝 컴포넌트 추가/수정 방법

### 방법 1: Generator 사용 (추천) ⭐

가장 쉬운 방법이에요!

#### Step 1: Generator 열기
```
https://doakuma.github.io/doakumize-kit/vanillia/generator.html
```

#### Step 2: 컴포넌트 선택
- 사용하는 컴포넌트 체크
- 미리보기 확인
- "Download examples.js" 클릭

#### Step 3: 파일 교체
```
다운로드한 examples.js를 이 폴더에 붙여넣기
→ viewer/examples.js (덮어쓰기)
```

#### Step 4: 확인
```
index.html 새로고침 → 선택한 컴포넌트만 표시됨!
```

---

### 방법 2: 수동 편집

`examples.js` 파일을 직접 수정할 수도 있어요.

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
    items: [              // 예시 배열
      {
        label: string,    // 예시 제목
        code: string      // HTML 코드
      }
    ]
  }
};
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

# 팀원들은 그냥 index.html 열면 됨!
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

### Generator로 업데이트 (추천)

새 컴포넌트가 필요할 때:

1. Generator 열기
2. 기존 컴포넌트 + 새 컴포넌트 선택
3. Download
4. examples.js 교체

### 수동 업데이트

```javascript
// examples.js에 추가만
window.ComponentExamples.newComponent = { ... };
```

## ⚠️ 주의사항

### 할 것 ✅

- examples.js만 수정
- Generator로 생성 (편함)
- 프로젝트에서 실제 사용하는 것만 추가

### 하지 말 것 ❌

- index.html, viewer.js, viewer.css 수정 (특별한 이유 없이)
- 사용 안 하는 컴포넌트 추가 (혼란)
- HTML 코드에 `<script>` 태그 포함 (보안)

## 🐛 문제 해결

### 컴포넌트가 안 보여요

1. `examples.js` 문법 확인:
   ```javascript
   // 잘못된 예
   window.ComponentExamples = {
     button: { ... },  // 마지막 쉼표 확인
   }  // 세미콜론 확인
   ```

2. 브라우저 콘솔 확인 (F12)
   - JavaScript 에러 확인

### 스타일이 안 먹혀요

1. CSS 파일 경로 확인:
   ```html
   <link rel="stylesheet" href="../styles/components.css">
   ```

2. 상대 경로 확인:
   - viewer/ 폴더에서 ../styles/로 접근

### 인터랙티브 기능이 안 돼요

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

**편하게 사용하세요! 🎉**


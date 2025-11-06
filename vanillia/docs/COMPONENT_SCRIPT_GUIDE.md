# 컴포넌트 스크립트 작성 가이드

> 📅 최종 업데이트: 2025-11-06  
> 🎯 설계 사고 과정과 실제 구현 방법을 통합한 종합 가이드

## 📋 개요

이 문서는 **Vanilla Component System**에서 컴포넌트 스크립트를 **설계하고 구현**하는 방법을 설명합니다.

**"왜 이렇게 설계하는가 (Why)"**와 **"어떻게 작성하는가 (How)"**를 함께 다룹니다.

### 🎓 학습 목표

- 컴포넌트 스크립트 설계의 단계별 사고 과정 이해
- SOLID 원칙 적용 방법 학습
- 재사용 가능하고 유지보수하기 쉬운 코드 작성법 습득
- 실제 구현 시 필요한 기술적 방법 습득

## 🎯 컴포넌트 스크립트란?

컴포넌트 스크립트는 **HTML 컴포넌트에 인터랙티브 기능을 추가**하는 JavaScript 파일입니다.

**예시:**
- **Tooltip**: 호버 시 툴팁 표시
- **Modal**: 클릭 시 모달 열기/닫기
- **Dropdown**: 드롭다운 메뉴 토글
- **Tab**: 탭 전환 기능
- **File Upload**: 파일 선택, 미리보기, 삭제

이런 기능들은 **렌더러(Renderer)**가 아니라 **스크립트(Script)**로 구현됩니다.

## 📂 파일 구조

```
vanillia/
  ├── components/
  │   ├── scripts/              # 컴포넌트 스크립트
  │   │   ├── tooltip.js
  │   │   ├── modal.js
  │   │   ├── file-upload.js
  │   │   └── ...
  │   ├── data/                 # 컴포넌트 데이터
  │   └── renderers/            # 렌더러 (스타일/구조)
  │
  └── resources/
      └── js/
          └── common.js         # 공통 유틸리티
```

---

## 🎯 설계 사고 프로세스

컴포넌트 스크립트를 만들 때는 다음 순서로 **생각하고 설계**합니다:

```
1️⃣ 요구사항 분석 & 책임 정의
    ↓
2️⃣ 전체 구조 스케치 (Top-down)
    ↓
3️⃣ 핵심 로직 분리 (Single Responsibility)
    ↓
4️⃣ 이벤트 처리 설계 (Event Delegation)
    ↓
5️⃣ 유틸리티 함수 분리 (재사용성)
    ↓
6️⃣ 보안 고려 (XSS 방지)
    ↓
7️⃣ 접근성 & 사용자 경험 개선
```

### 1️⃣ 요구사항 분석 & 책임 정의

**무엇을 할 것인가?**

컴포넌트의 핵심 기능을 명확히 정의합니다.

#### 예시: File Upload

**요구사항:**
- 파일 선택 가능
- 미리보기 표시
- 개별 파일 삭제
- 동적 추가 지원

**책임 정의 (SRP):**
1. 파일 선택 처리 → `handleFileChange()`
2. 미리보기 렌더링 → `updateFilePreview()`
3. 파일 삭제 → `removeFile()`
4. 이벤트 통신 → 커스텀 이벤트 발생

**설계 질문:**
- [ ] 이 컴포넌트가 해야 할 핵심 기능은?
- [ ] 각 기능의 책임을 명확히 정의했는가?
- [ ] 동적 요소도 지원해야 하는가?

### 2️⃣ 전체 구조 스케치 (Top-down)

**큰 그림부터 그리기**

세부 구현 전에 전체 흐름을 먼저 설계합니다.

```javascript
function initFileUpload() {
  // 1. 이벤트 위임 설정 (한 번만)
  initFileUploadEventDelegation();
  
  // 2. 초기 상태 설정
  initFileUploads();
}
```

**왜 Top-down?**
- ✅ 전체 구조가 명확해짐
- ✅ 각 단계를 작은 함수로 분리
- ✅ 함수 이름만 봐도 역할 파악 가능

### 3️⃣ 핵심 로직 분리 (Single Responsibility)

**하나의 함수는 하나의 일만**

#### ❌ 나쁜 예: 모든 걸 한 함수에

```javascript
function handleFileChange(e) {
  // 50줄 이상의 코드
  // - 미리보기 제거
  // - 아이콘 결정
  // - 크기 포맷팅
  // - HTML 생성
  // ...
}
```

**문제점:**
- 함수가 너무 김
- 여러 책임을 가짐
- 재사용 불가능
- 테스트 어려움

#### ✅ 좋은 예: 책임별로 분리

```javascript
function handleFileChange(e) {
  const files = e.target.files;
  updateFilePreview(fileUpload, files); // 위임!
}

function updateFilePreview(fileUpload, files) {
  // 미리보기 업데이트만
}

function createFileItem(file, index) {
  const fileName = escapeHtml(file.name);    // 위임!
  const fileSize = formatFileSize(file.size); // 위임!
  const fileIcon = getFileIcon(file.name);    // 위임!
  // HTML 조립
}

function formatFileSize(bytes) {
  // 크기 포맷만
}

function escapeHtml(text) {
  // HTML 이스케이프만
}
```

**장점:**
- ✅ 각 함수가 5~15줄 이내
- ✅ 하나의 책임만
- ✅ 재사용 가능
- ✅ 테스트 쉬움

### 4️⃣ 이벤트 처리 설계 (Event Delegation)

**왜 Event Delegation?**

동적으로 추가된 요소에도 이벤트가 작동하도록!

#### ❌ 나쁜 예: 개별 등록

```javascript
function init() {
  document.querySelectorAll(".file-upload__input").forEach(input => {
    input.addEventListener("change", handler);
  });
}
// → 동적 요소에서 작동 안 함!
```

#### ✅ 좋은 예: 이벤트 위임

```javascript
function init() {
  // document에 한 번만 등록
  document.addEventListener("change", function(e) {
    if (e.target.classList.contains("file-upload__input")) {
      handleFileChange(e);
    }
  });
}
// → 동적 요소도 자동 작동! ✨
```

**장점:**
- ✅ 메모리 효율
- ✅ 동적 요소 지원
- ✅ 초기화 한 번만

### 5️⃣ 유틸리티 함수 분리

**공통 기능은 재사용 가능하게**

```javascript
/**
 * 순수 함수 (Pure Function)
 * 같은 입력 → 같은 출력
 */
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
```

### 6️⃣ 보안 고려 (XSS 방지)

**사용자 입력은 항상 이스케이프!**

```javascript
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text; // 자동 이스케이프
  return div.innerHTML;
}

// 사용
const fileName = escapeHtml(file.name); // ✅ 안전
fileItem.innerHTML = `<span>${fileName}</span>`;
```

### 7️⃣ 접근성 & 사용자 경험

**ARIA 속성, 키보드 지원, 포커스 관리**

```javascript
// ARIA 속성
toggle.setAttribute("aria-expanded", isExpanded.toString());

// 키보드 지원
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

// 포커스 관리
modal._lastFocus = document.activeElement;
focusableElement.focus();
```

---

## 🚀 작성 로드맵 (실제 구현)

### 1단계: 파일 생성

`components/scripts/[컴포넌트명].js` 생성

**파일명 규칙:**
- 소문자와 하이픈: `tooltip.js`, `file-upload.js`

### 2단계: IIFE 패턴 적용

**전역 네임스페이스 오염 방지**

```javascript
/**
 * [컴포넌트명] Component Script
 * [설명]
 *
 * 사용법:
 * <div class="component" data-...>
 * </div>
 */

(function () {
  "use strict";

  // ===== Private 변수/함수 =====
  let privateVar = "값";

  function privateFunction() {
    // 외부 접근 불가
  }

  // ===== Public 함수 =====
  function initComponent() {
    console.log("[Component] Initializing...");
    
    // 이벤트 위임 설정
    initEventDelegation();
    
    // 초기 상태 설정
    initDefaults();
  }

  // ===== 전역 등록 =====
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initComponent = initComponent;

})();
```

**왜 IIFE?**
- ✅ 전역 오염 방지
- ✅ 캡슐화 (private/public 구분)
- ✅ 변수명 충돌 방지
- ✅ 즉시 실행

**"use strict" 효과:**
- 엄격 모드 활성화
- 실수로 전역 변수 생성 방지
- 더 안전한 코드

### 3단계: 이벤트 위임 구현

```javascript
function initEventDelegation() {
  // 파일 선택 이벤트
  document.addEventListener("change", function(e) {
    if (e.target.classList.contains("file-upload__input")) {
      const input = e.target;
      const fileUpload = input.closest(".file-upload");
      if (!fileUpload) return;
      
      handleFileChange(input, fileUpload);
    }
  });

  // 삭제 버튼 클릭
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("file-upload__remove")) {
      handleFileRemove(e.target);
    }
  });
}
```

### 4단계: 데이터 속성 읽기

```javascript
function showTooltip(wrapper) {
  // data-* 속성 읽기 + 기본값
  const content = wrapper.getAttribute("data-tooltip-content");
  const position = wrapper.getAttribute("data-tooltip-position") || "tm";
  const offset = parseInt(wrapper.getAttribute("data-tooltip-offset")) || 8;
  const hasArrow = wrapper.getAttribute("data-tooltip-arrow") === "true";

  // 유효성 검사
  if (!content) {
    console.warn("[Tooltip] No content specified");
    return;
  }

  // 로직 실행
  renderTooltip(content, position, offset, hasArrow);
}
```

### 5단계: 보안 처리

```javascript
function renderContent(userInput) {
  // HTML 이스케이프 함수
  const escapeHtml = (text) => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };

  // 안전한 HTML 생성
  const safeContent = escapeHtml(userInput);
  element.innerHTML = `<span>${safeContent}</span>`;
}
```

### 6단계: 커스텀 이벤트 발생

```javascript
// 외부 통신용 커스텀 이벤트
fileUpload.dispatchEvent(
  new CustomEvent("fileUpload:change", {
    detail: {
      files: files,
      name: input.name,
    },
    bubbles: true, // 이벤트 버블링
  })
);

// 외부에서 사용
document.addEventListener("fileUpload:change", function(e) {
  console.log("파일 선택됨:", e.detail.files);
});
```

### 7단계: 전역 등록

```javascript
// 전역 네임스페이스에 등록
window.VanillaComponents = window.VanillaComponents || {};
window.VanillaComponents.initFileUpload = initFileUpload;

// HTML에서 호출
// <script>window.VanillaComponents.initFileUpload();</script>
```

---

## 🎨 설계 원칙 정리

### ✅ SOLID 원칙 적용

#### 1. **Single Responsibility Principle (SRP)**
- 각 함수는 하나의 책임만 가짐
- 예: `formatFileSize()`, `getFileIcon()`, `escapeHtml()`

#### 2. **Open/Closed Principle (OCP)**
- 확장에는 열려 있고, 수정에는 닫혀 있음
- 예: `iconMap` 객체 → 새 타입 추가 시 객체만 수정

```javascript
function getFileIcon(fileName) {
  const iconMap = {
    pdf: "icon--file-pdf",
    // ✅ 새 타입 추가 시 여기만 수정
    zip: "icon--file-zip",
  };
  return iconMap[extension] || "icon--file-default";
}
```

#### 3. **Dependency Inversion Principle (DIP)**
- 구체적 구현이 아닌 추상화에 의존
- 예: 커스텀 이벤트로 느슨한 결합

```javascript
// ✅ 느슨한 결합
fileUpload.dispatchEvent(new CustomEvent("fileUpload:change", {...}));

// 외부에서 이벤트 리스닝 (컴포넌트는 리스너 존재를 모름)
document.addEventListener("fileUpload:change", handler);
```

### 🎨 디자인 패턴

#### 1. **IIFE (즉시 실행 함수)**
- 전역 오염 방지
- 캡슐화

#### 2. **Event Delegation (이벤트 위임)**
- 동적 요소 지원
- 메모리 효율
- 성능 최적화

#### 3. **Module Pattern (모듈 패턴)**
- `window.VanillaComponents` 네임스페이스
- private/public 구분

---

## 📝 작성 체크리스트

### 1️⃣ 요구사항 & 설계
- [ ] 핵심 기능 명확히 정의
- [ ] 각 기능의 책임 정의 (SRP)
- [ ] 동적 요소 지원 필요 여부 확인

### 2️⃣ 구조
- [ ] 진입점이 명확한가? (하나의 초기화 함수)
- [ ] Top-down 방식으로 설계했는가?
- [ ] 함수 이름만 봐도 역할을 알 수 있는가?

### 3️⃣ 함수 설계
- [ ] 각 함수가 하나의 책임만 가지는가?
- [ ] 함수가 15줄 이내인가?
- [ ] 재사용 가능한 함수인가?
- [ ] 순수 함수로 작성했는가? (가능한 경우)

### 4️⃣ 이벤트 처리
- [ ] 이벤트 위임 패턴 사용
- [ ] document 레벨에서 한 번만 등록
- [ ] disabled, null 체크 등 조건 확인

### 5️⃣ 보안
- [ ] 사용자 입력 이스케이프
- [ ] innerHTML 사용 최소화
- [ ] data 속성 값 검증

### 6️⃣ 접근성
- [ ] ARIA 속성 추가
- [ ] 키보드 네비게이션 지원
- [ ] 포커스 관리
- [ ] 스크린 리더 고려

### 7️⃣ 성능
- [ ] 불필요한 DOM 조회 반복 방지
- [ ] 메모리 누수 방지 (timeout 정리)
- [ ] 이벤트 리스너 중복 등록 방지

### 8️⃣ 코드 품질
- [ ] IIFE 패턴 사용
- [ ] JSDoc 주석 작성
- [ ] 콘솔 로그에 `[ComponentName]` prefix
- [ ] 전역 네임스페이스 등록

---

## 🎨 코드 스타일 가이드

### 네이밍 컨벤션

- **함수명**: camelCase (예: `initTooltip`, `showTooltip`)
- **클래스명**: BEM 패턴 (예: `tooltip`, `tooltip--visible`, `tooltip__content`)
- **데이터 속성**: kebab-case (예: `data-tooltip-content`)
- **변수명**: camelCase (예: `currentWrapper`, `showTimeout`)

### 콘솔 로그 prefix

```javascript
console.log("[Tooltip] Initializing...");
console.warn("[Tooltip] No content specified");
console.error("[Tooltip] Failed:", error);
```

### 함수 구조

```javascript
/**
 * 함수 설명
 * @param {타입} 파라미터명 - 파라미터 설명
 * @returns {타입} 반환값 설명
 */
function functionName(parameter) {
  // 1. 유효성 검사
  if (!parameter) return;

  // 2. 주요 로직
  // ...

  // 3. 반환 또는 상태 변경
  return result;
}
```

---

## 🔍 실전 예시 비교

### File Upload vs Tooltip vs Modal

| 항목 | File Upload | Tooltip | Modal |
|------|-------------|---------|-------|
| **핵심 책임** | 파일 선택, 미리보기, 삭제 | 호버 시 툴팁 표시 | 모달 열기/닫기 |
| **이벤트 위임** | ✅ change, click | ✅ mouseover, mouseout | ✅ click |
| **상태 관리** | FileList | currentWrapper | _lastFocus |
| **ARIA 속성** | - | - | role="dialog" |
| **키보드 지원** | - | - | ESC로 닫기 |
| **재사용 함수** | formatFileSize, getFileIcon | positionTooltip, escapeHtml | focusable 요소 찾기 |

---

## 🔗 컴포넌트 스크립트 vs 렌더러

### 컴포넌트 스크립트 (`components/scripts/`)

- **역할**: 인터랙티브 기능 제공 (이벤트 처리, DOM 조작)
- **예시**: Tooltip 표시/숨김, Dropdown 토글, Modal 열기/닫기
- **특징**:
  - HTML에서 직접 로드
  - `window.VanillaComponents` 네임스페이스에 등록
  - 이벤트 위임으로 동적 요소 지원

### 렌더러 (`components/renderers/`)

- **역할**: 컴포넌트 HTML 구조 생성
- **예시**: GenericRenderer, ModalRenderer, IconRenderer
- **특징**:
  - ComponentEngine에서 호출
  - 데이터를 HTML로 변환
  - 캐싱 지원

---

## 🚨 주의사항

### 1. 전역 네임스페이스 오염 방지

```javascript
// ✅ 좋은 예: IIFE 사용
(function () {
  function initComponent() { /* ... */ }
  window.VanillaComponents.initComponent = initComponent;
})();

// ❌ 나쁜 예: 전역 함수
function initComponent() { /* ... */ }
```

### 2. 이벤트 리스너 정리

```javascript
// 필요시 정리
function cleanup() {
  document.removeEventListener("click", handleClick);
  clearTimeout(timeout);
}
```

### 3. 중복 초기화 방지

```javascript
function initComponent() {
  if (window.componentInitialized) return;
  
  // 초기화 로직
  window.componentInitialized = true;
}
```

### 4. 성능 고려

- 이벤트 위임 사용
- throttle/debounce 활용
- querySelector 캐싱

---

## 📚 관련 문서

- [Component Engine 사용 가이드](./HOW_TO_USE.md) - 시스템 전체 설명
- [테스트 가이드](./TEST_GUIDE.md) - 컴포넌트 테스트 방법
- [스타일 아키텍처 비교](./STYLE_ARCHITECTURE_COMPARISON.md) - CSS 구조

---

## ✅ 다음 단계

새로운 컴포넌트 스크립트 작성 시:

1. **설계 사고 프로세스** 따라 요구사항 분석
2. **체크리스트** 사용하여 자체 검토
3. **기존 컴포넌트** 참고하여 패턴 학습
4. **테스트 및 디버깅**
5. **문서 업데이트**

---

**작성자**: AI Assistant  
**최종 업데이트**: 2025-11-06

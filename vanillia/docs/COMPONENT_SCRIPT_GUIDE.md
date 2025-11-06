# 컴포넌트 스크립트 작성 가이드

> 📅 최종 업데이트: 2025-01-XX

## 📋 개요

이 문서는 Vanilla Component System에서 **컴포넌트 관련 스크립트**를 작성하는 방법을 설명합니다. `tooltip.js`를 예시로 사용하여 단계별 가이드를 제공합니다.

## 🎯 컴포넌트 스크립트란?

컴포넌트 스크립트는 **HTML 컴포넌트에 인터랙티브 기능을 추가**하는 JavaScript 파일입니다. 예를 들어:

- **Tooltip**: 호버 시 툴팁 표시
- **Modal**: 클릭 시 모달 열기/닫기
- **Dropdown**: 드롭다운 메뉴 토글
- **Tabs**: 탭 전환 기능

이런 기능들은 **렌더러(Renderer)**가 아니라 **스크립트(Script)**로 구현됩니다.

## 📂 파일 구조

```
vanillia/
  ├── components/
  │   ├── scripts/              # 컴포넌트 스크립트
  │   │   └── tooltip.js        # 툴팁 스크립트 예시
  │   ├── data/                 # 컴포넌트 데이터
  │   │   └── tooltip.data.js   # 툴팁 데이터
  │   └── renderers/            # 렌더러 (스타일/구조)
  │
  └── resources/
      └── js/
          └── common.js         # 일반적인 유틸리티 함수들
```

## 🚀 작성 로드맵

### 1단계: 컴포넌트 스크립트 파일 생성

`components/scripts/[컴포넌트명].js` 파일을 생성합니다.

**파일명 규칙:**
- 소문자와 하이픈 사용 (예: `tooltip.js`, `dropdown-menu.js`)
- 컴포넌트명과 일치하도록 작성

### 2단계: 기본 구조 작성

IIFE (Immediately Invoked Function Expression) 패턴을 사용하여 **전역 네임스페이스 오염을 방지**합니다.

```javascript
/**
 * [컴포넌트명] Component Script
 * [컴포넌트 설명]
 * 
 * 사용법:
 * <div class="[컴포넌트-wrapper-class]" 
 *      data-[컴포넌트]-[속성]="값">
 *   <!-- 내용 -->
 * </div>
 */

(function () {
  "use strict";

  /**
   * [컴포넌트명] 초기화 함수
   */
  function init[컴포넌트명]() {
    console.log("[컴포넌트명] Initializing...");

    // 초기화 로직 작성
  }

  // 전역 네임스페이스에 등록
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.init[컴포넌트명] = init[컴포넌트명];
})();
```

**예시 (tooltip.js 기준):**

```javascript
/**
 * Tooltip Component Script
 * 툴팁 컴포넌트: wrapper 내부 요소에 호버 시 툴팁 표시
 * 
 * 사용법:
 * <div class="tooltip-wrapper" 
 *      data-tooltip-content="툴팁 텍스트"
 *      data-tooltip-position="tm"
 *      data-tooltip-offset="8"
 *      data-tooltip-arrow="true">
 *   <button>트리거 버튼</button>
 * </div>
 */

(function () {
  "use strict";

  function initTooltip() {
    // 초기화 로직
  }

  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initTooltip = initTooltip;
})();
```

### 3단계: 초기화 함수 구현

**이벤트 위임(Event Delegation)**을 사용하여 **동적으로 추가되는 요소도 자동으로 작동**하도록 구현합니다.

#### ✅ 권장 방식: 이벤트 위임

```javascript
function init[컴포넌트명]() {
  console.log("[컴포넌트명] Initializing with event delegation...");

  // document 레벨에서 이벤트 리스너 등록
  document.addEventListener("click", function (e) {
    const wrapper = e.target.closest(".[컴포넌트]-wrapper");
    
    if (wrapper) {
      // 컴포넌트별 로직 실행
      handle[컴포넌트명]Action(wrapper, e);
    }
  });
}
```

#### ❌ 피해야 할 방식: 개별 요소에 이벤트 등록

```javascript
// 동적으로 추가된 요소에서 작동하지 않음!
function init[컴포넌트명]() {
  const elements = document.querySelectorAll(".[컴포넌트]-wrapper");
  
  elements.forEach(element => {
    element.addEventListener("click", function() {
      // ...
    });
  });
}
```

### 4단계: 데이터 속성 읽기

`data-*` 속성을 사용하여 컴포넌트 설정을 전달합니다.

```javascript
function showTooltip(wrapper) {
  // data 속성 읽기
  const content = wrapper.getAttribute("data-tooltip-content");
  const position = wrapper.getAttribute("data-tooltip-position") || "tm"; // 기본값
  const offset = parseInt(wrapper.getAttribute("data-tooltip-offset")) || 8;
  const hasArrow = wrapper.getAttribute("data-tooltip-arrow") === "true";

  // 유효성 검사
  if (!content) {
    console.warn("[Tooltip] No content specified");
    return;
  }

  // 로직 실행
}
```

### 5단계: DOM 조작 및 이벤트 처리

**상태 관리**와 **메모리 관리**를 고려하여 작성합니다.

```javascript
function initTooltip() {
  // 전역 요소 (재사용)
  let globalTooltip = document.getElementById("global-tooltip");
  if (!globalTooltip) {
    globalTooltip = document.createElement("div");
    globalTooltip.id = "global-tooltip";
    globalTooltip.className = "tooltip";
    document.body.appendChild(globalTooltip);
  }

  // 상태 관리 변수
  let showTimeout;
  let hideTimeout;
  let currentWrapper = null;

  // 이벤트 위임
  document.addEventListener("mouseenter", function (e) {
    const wrapper = e.target.closest(".tooltip-wrapper");
    
    if (wrapper) {
      // 중복 처리 방지
      if (currentWrapper === wrapper) {
        return;
      }

      clearTimeout(hideTimeout);
      currentWrapper = wrapper;

      // 딜레이 후 표시
      showTimeout = setTimeout(() => {
        showTooltip(wrapper);
      }, 100);
    }
  }, true); // 캡처링 단계에서 처리 (이벤트 버블링 전)
}
```

### 6단계: 보안 처리 (XSS 방지)

사용자 입력을 HTML에 삽입할 때는 **반드시 이스케이프**합니다.

```javascript
function renderTooltipContent(tooltip, content, hasArrow) {
  // HTML 이스케이프 함수
  const escapeHtml = (text) => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };

  let html = '<div class="tooltip__content">';
  html += escapeHtml(content); // 이스케이프 필수!
  html += "</div>";

  if (hasArrow) {
    html += '<div class="tooltip__arrow"></div>';
  }

  tooltip.innerHTML = html;
}
```

### 7단계: 전역 네임스페이스 등록

`window.VanillaComponents` 객체에 초기화 함수를 등록합니다.

```javascript
// 전역 네임스페이스에 등록
window.VanillaComponents = window.VanillaComponents || {};
window.VanillaComponents.initTooltip = initTooltip;
```

**등록 패턴:**
- 함수명: `init[컴포넌트명]` (예: `initTooltip`, `initDropdown`)
- 네임스페이스: `window.VanillaComponents.init[컴포넌트명]`

### 8단계: HTML에서 스크립트 로드 및 초기화

HTML 파일(`components.html` 등)에서 스크립트를 로드하고 초기화합니다.

```html
<!-- Component Scripts -->
<script src="components/scripts/tooltip.js"></script>

<!-- 초기화 (common.js 또는 components-init.js에서 호출) -->
<script>
  // DOMContentLoaded 후 또는 스크립트 로드 후
  if (window.VanillaComponents && window.VanillaComponents.initTooltip) {
    window.VanillaComponents.initTooltip();
  }
</script>
```

**또는 `common.js` 또는 `components-init.js`에서 통합 초기화:**

```javascript
// common.js 또는 components-init.js
document.addEventListener("DOMContentLoaded", function () {
  // 모든 컴포넌트 스크립트 초기화
  if (window.VanillaComponents) {
    Object.keys(window.VanillaComponents).forEach(key => {
      if (key.startsWith('init') && typeof window.VanillaComponents[key] === 'function') {
        window.VanillaComponents[key]();
      }
    });
  }
});
```

## 📝 작성 체크리스트

스크립트를 작성할 때 다음 항목들을 확인하세요:

- [ ] **IIFE 패턴 사용**: 전역 네임스페이스 오염 방지
- [ ] **이벤트 위임 사용**: 동적 요소 지원
- [ ] **콘솔 로그**: 디버깅을 위한 `[컴포넌트명]` prefix 로그
- [ ] **XSS 방지**: 사용자 입력 이스케이프
- [ ] **기본값 설정**: `data-*` 속성에 기본값 제공
- [ ] **에러 처리**: try-catch 및 경고 메시지
- [ ] **메모리 관리**: timeout 정리, 이벤트 리스너 정리
- [ ] **상태 관리**: 중복 처리 방지 로직
- [ ] **전역 네임스페이스 등록**: `window.VanillaComponents`에 등록
- [ ] **JSDoc 주석**: 함수에 설명 추가

## 🎨 코드 스타일 가이드

### 네이밍 컨벤션

- **함수명**: camelCase (예: `initTooltip`, `showTooltip`)
- **클래스명**: BEM 패턴 (예: `tooltip`, `tooltip--visible`, `tooltip__content`)
- **데이터 속성**: kebab-case (예: `data-tooltip-content`, `data-tooltip-position`)
- **변수명**: camelCase (예: `currentWrapper`, `showTimeout`)

### 콘솔 로그 prefix

모든 콘솔 로그에는 `[컴포넌트명]` prefix를 붙입니다:

```javascript
console.log("[Tooltip] Initializing...");
console.warn("[Tooltip] No content specified");
console.error("[Tooltip] Failed to initialize:", error);
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
  if (!parameter) {
    return;
  }

  // 2. 주요 로직
  // ...

  // 3. 반환 또는 상태 변경
  return result;
}
```

## 🔍 예시: Tooltip 스크립트 구조 분석

`tooltip.js`의 구조를 단계별로 분석합니다:

### 1. 파일 헤더 및 사용법

```1:13:vanillia/components/scripts/tooltip.js
/**
 * Tooltip Component Script
 * 툴팁 컴포넌트: wrapper 내부 요소에 호버 시 툴팁 표시
 * 
 * 사용법:
 * <div class="tooltip-wrapper" 
 *      data-tooltip-content="툴팁 텍스트"
 *      data-tooltip-position="tm"
 *      data-tooltip-offset="8"
 *      data-tooltip-arrow="true">
 *   <button>트리거 버튼</button>
 * </div>
 */
```

### 2. IIFE 패턴 및 네임스페이스

```15:21:vanillia/components/scripts/tooltip.js
(function () {
  "use strict";

  /**
   * Tooltip 초기화 함수
   */
  function initTooltip() {
```

### 3. 전역 요소 생성 및 상태 관리

```24:35:vanillia/components/scripts/tooltip.js
    // 전역 툴팁 popper 엘리먼트 생성 (하나만 재사용)
    let globalTooltip = document.getElementById("global-tooltip");
    if (!globalTooltip) {
      globalTooltip = document.createElement("div");
      globalTooltip.id = "global-tooltip";
      globalTooltip.className = "tooltip";
      document.body.appendChild(globalTooltip);
    }

    let showTimeout;
    let hideTimeout;
    let currentWrapper = null;
```

### 4. 이벤트 위임 구현

```244:262:vanillia/components/scripts/tooltip.js
    // 이벤트 위임: wrapper 내부 요소에 호버 시
    document.addEventListener("mouseenter", function (e) {
      const wrapper = e.target.closest(".tooltip-wrapper");

      if (wrapper) {
        // 이미 같은 wrapper에 대해 처리 중이면 무시
        if (currentWrapper === wrapper) {
          return;
        }

        clearTimeout(hideTimeout);
        currentWrapper = wrapper;

        // 약간의 딜레이 후 표시 (빠른 마우스 움직임 방지)
        showTimeout = setTimeout(() => {
          showTooltip(wrapper);
        }, 100);
      }
    }, true);
```

### 5. 데이터 속성 읽기 및 유효성 검사

```55:65:vanillia/components/scripts/tooltip.js
    function showTooltip(wrapper) {
      const content = wrapper.getAttribute("data-tooltip-content");
      const position = wrapper.getAttribute("data-tooltip-position") || "tm";
      const offset = parseInt(wrapper.getAttribute("data-tooltip-offset")) || 8;
      const hasArrow =
        wrapper.getAttribute("data-tooltip-arrow") === "true";

      if (!content) {
        console.warn("[Tooltip] No content specified for tooltip wrapper");
        return;
      }
```

### 6. XSS 방지 (HTML 이스케이프)

```98:115:vanillia/components/scripts/tooltip.js
    function renderTooltipContent(tooltip, content, hasArrow) {
      // HTML 이스케이프 (XSS 방지)
      const escapeHtml = (text) => {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      let html = '<div class="tooltip__content">';
      html += escapeHtml(content);
      html += "</div>";

      if (hasArrow) {
        html += '<div class="tooltip__arrow"></div>';
      }

      tooltip.innerHTML = html;
    }
```

### 7. 전역 네임스페이스 등록

```297:300:vanillia/components/scripts/tooltip.js
  // 전역 네임스페이스에 등록
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initTooltip = initTooltip;
})();
```

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

## 🚨 주의사항

### 1. 전역 네임스페이스 오염 방지

```javascript
// ✅ 좋은 예: IIFE 사용
(function () {
  function initComponent() {
    // ...
  }
  window.VanillaComponents.initComponent = initComponent;
})();

// ❌ 나쁜 예: 전역 변수 직접 선언
function initComponent() {
  // ...
}
```

### 2. 이벤트 리스너 정리

동적으로 추가된 이벤트 리스너는 **필요시 정리**해야 합니다:

```javascript
// 컴포넌트 제거 시 이벤트 리스너도 제거
function cleanup() {
  document.removeEventListener("click", handleClick);
}
```

### 3. 중복 초기화 방지

초기화 함수는 **idempotent**(멱등성)을 유지해야 합니다:

```javascript
function initComponent() {
  // 이미 초기화되었는지 확인
  if (window.componentInitialized) {
    return;
  }
  
  // 초기화 로직
  window.componentInitialized = true;
}
```

### 4. 성능 고려사항

- **이벤트 위임** 사용으로 성능 최적화
- **throttle/debounce** 사용으로 과도한 이벤트 처리 방지
- **querySelector** 캐싱으로 DOM 조회 최소화

## 📚 관련 문서

- [Component Engine 사용 가이드](./HOW_TO_USE.md) - 컴포넌트 시스템 전체 설명
- [스타일 아키텍처 비교](./STYLE_ARCHITECTURE_COMPARISON.md) - CSS 구조 설명
- [리팩토링 계획](./REFACTORING_PLAN.md) - 시스템 개선 계획

## ✅ 다음 단계

새로운 컴포넌트 스크립트를 작성할 때:

1. 이 가이드를 참고하여 `components/scripts/[컴포넌트].js` 작성
2. `window.VanillaComponents` 네임스페이스에 등록
3. HTML에서 스크립트 로드 및 초기화 함수 호출
4. 테스트 및 디버깅
5. 필요시 문서 업데이트

---

**작성자**: Doakuma  
**업데이트**: 2025-01-XX

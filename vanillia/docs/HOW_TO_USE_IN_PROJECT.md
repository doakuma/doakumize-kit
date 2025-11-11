# 🚀 실제 프로젝트에서 Doakumize Kit 사용하기

> 이 가이드는 Doakumize Kit의 컴포넌트들을 실제 프로젝트에 적용하는 방법을 단계별로 설명합니다.

## 📋 목차

1. [설치 방법](#설치-방법)
2. [기본 설정](#기본-설정)
3. [컴포넌트 사용](#컴포넌트-사용)
4. [커스터마이징](#커스터마이징)
5. [성능 최적화](#성능-최적화)
6. [프레임워크와 통합](#프레임워크와-통합)

---

## 설치 방법

### 옵션 1: CLI 도구 사용 (추천)

가장 간단한 방법이야!

```bash
# vanillia 폴더로 이동
cd vanillia

# 프로젝트로 복사
npm run copy ../my-project/assets
```

### 옵션 2: 수동 복사

```bash
# core 폴더 전체를 프로젝트로 복사
cp -r vanillia/core/* my-project/assets/doakumize/
```

### 옵션 3: Git Submodule (추천 - 업데이트 쉬움)

```bash
# 프로젝트 루트에서
git submodule add https://github.com/doakuma/doakumize-kit.git lib/doakumize-kit

# 사용 시
ln -s lib/doakumize-kit/vanillia/core assets/doakumize
```

---

## 기본 설정

### 1. HTML 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  
  <!-- Doakumize Kit CSS -->
  <link rel="stylesheet" href="assets/doakumize/styles/normalize.css">
  <link rel="stylesheet" href="assets/doakumize/styles/variables.css">
  <link rel="stylesheet" href="assets/doakumize/styles/common.css">
  <link rel="stylesheet" href="assets/doakumize/styles/components.css">
  
  <!-- 프로젝트 커스텀 CSS -->
  <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
  <!-- 컨텐츠 -->
  
  <!-- Doakumize Kit JS -->
  <script src="assets/doakumize/components.js"></script>
  
  <!-- 초기화 -->
  <script>
    // 모든 컴포넌트 자동 초기화
    window.VanillaComponents.initAll();
  </script>
  
  <!-- 프로젝트 JS -->
  <script src="assets/js/main.js"></script>
</body>
</html>
```

### 2. 개별 컴포넌트만 초기화

필요한 컴포넌트만 선택적으로 초기화할 수 있어:

```javascript
// 드롭다운만 초기화
if (window.VanillaComponents.Dropdown) {
  window.VanillaComponents.Dropdown.initAll();
}

// 모달만 초기화
if (window.VanillaComponents.Modal) {
  window.VanillaComponents.Modal.initAll();
}

// 특정 요소만 초기화
const myDropdown = document.querySelector('#myDropdown');
if (myDropdown && window.VanillaComponents.Dropdown) {
  window.VanillaComponents.Dropdown.init(myDropdown);
}
```

---

## 컴포넌트 사용

### 버튼 (Button)

```html
<!-- 기본 버튼 -->
<button class="btn btn--primary">Primary Button</button>
<button class="btn btn--secondary">Secondary Button</button>
<button class="btn btn--tertiary">Tertiary Button</button>

<!-- 크기 -->
<button class="btn btn--primary btn--small">Small</button>
<button class="btn btn--primary btn--medium">Medium</button>
<button class="btn btn--primary btn--large">Large</button>

<!-- 상태 -->
<button class="btn btn--primary" disabled>Disabled</button>
<button class="btn btn--primary is-loading">Loading...</button>

<!-- 아이콘 버튼 -->
<button class="btn btn--primary">
  <i class="icon icon--plus"></i>
  Add Item
</button>
```

### 인풋 (Input)

```html
<!-- 기본 인풋 -->
<div class="input">
  <label class="input__label">이름</label>
  <input type="text" class="input__field" placeholder="이름을 입력하세요">
</div>

<!-- 에러 상태 -->
<div class="input is-error">
  <label class="input__label">이메일</label>
  <input type="email" class="input__field" placeholder="email@example.com">
  <span class="input__error">올바른 이메일을 입력하세요</span>
</div>

<!-- 검색 인풋 -->
<div class="input input--search">
  <i class="icon icon--search input__icon"></i>
  <input type="text" class="input__field" placeholder="Search...">
</div>
```

### 드롭다운 (Dropdown)

```html
<div class="dropdown" data-dropdown>
  <button class="dropdown__trigger">
    <span>Select Option</span>
    <i class="icon icon--chevron-down"></i>
  </button>
  <div class="dropdown__menu">
    <div class="dropdown__item" data-value="1">Option 1</div>
    <div class="dropdown__item" data-value="2">Option 2</div>
    <div class="dropdown__item" data-value="3">Option 3</div>
  </div>
</div>

<script>
// JavaScript로 값 가져오기
const dropdown = document.querySelector('[data-dropdown]');
dropdown.addEventListener('change', (e) => {
  console.log('Selected value:', e.detail.value);
  console.log('Selected text:', e.detail.text);
});
</script>
```

### 모달 (Modal)

```html
<!-- 모달 트리거 -->
<button data-modal-open="confirmModal" class="btn btn--primary">
  Open Modal
</button>

<!-- 모달 -->
<div id="confirmModal" class="modal">
  <div class="modal__overlay"></div>
  <div class="modal__container">
    <div class="modal__header">
      <h2 class="modal__title">Confirm Action</h2>
      <button class="modal__close" data-modal-close>
        <i class="icon icon--close"></i>
      </button>
    </div>
    <div class="modal__body">
      <p>Are you sure you want to continue?</p>
    </div>
    <div class="modal__footer">
      <button class="btn btn--tertiary" data-modal-close>Cancel</button>
      <button class="btn btn--primary">Confirm</button>
    </div>
  </div>
</div>

<script>
// JavaScript로 모달 제어
window.VanillaComponents.Modal.open('confirmModal');
window.VanillaComponents.Modal.close('confirmModal');
</script>
```

### 탭 (Tab)

```html
<div class="tab" data-tab>
  <div class="tab__nav">
    <button class="tab__button is-active" data-tab-target="tab1">Tab 1</button>
    <button class="tab__button" data-tab-target="tab2">Tab 2</button>
    <button class="tab__button" data-tab-target="tab3">Tab 3</button>
  </div>
  <div class="tab__content">
    <div id="tab1" class="tab__panel is-active">Content 1</div>
    <div id="tab2" class="tab__panel">Content 2</div>
    <div id="tab3" class="tab__panel">Content 3</div>
  </div>
</div>
```

### 아코디언 (Accordion)

```html
<div class="accordion-group" data-allow-multiple="false">
  <div class="accordion">
    <div class="accordion__header">
      <button class="accordion__toggle">
        <span>Section 1</span>
        <i class="icon icon--chevron-down"></i>
      </button>
    </div>
    <div class="accordion__body">
      <div class="accordion__content">Content 1</div>
    </div>
  </div>
  
  <div class="accordion">
    <div class="accordion__header">
      <button class="accordion__toggle">
        <span>Section 2</span>
        <i class="icon icon--chevron-down"></i>
      </button>
    </div>
    <div class="accordion__body">
      <div class="accordion__content">Content 2</div>
    </div>
  </div>
</div>
```

---

## 커스터마이징

### 디자인 토큰 커스터마이징

프로젝트의 브랜드 컬러로 변경하려면:

```css
/* assets/css/custom-theme.css */

:root {
  /* 브랜드 컬러 */
  --primary-600: #0066cc;
  --primary-700: #0052a3;
  --primary-100: #e6f2ff;
  
  --secondary-600: #ff6b35;
  --secondary-700: #e85a2a;
  --secondary-100: #ffe8e0;
  
  /* 폰트 */
  --font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
  
  /* 타이포그래피 커스텀 */
  --h1: 700 32px/1.4 var(--font-family);
  --body-md: 400 16px/1.6 var(--font-family);
  
  /* 간격 조정 */
  --spacing-unit: 4px; /* 기본 단위 변경 가능 */
}

/* 다크 모드 */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2a2a2a;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --border-primary: #404040;
  }
}
```

### 컴포넌트 스타일 확장

```css
/* 버튼 커스텀 변형 */
.btn--gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
}

/* 카드형 드롭다운 */
.dropdown__menu--card {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  padding: 8px;
}

.dropdown__menu--card .dropdown__item {
  border-radius: 8px;
  padding: 12px 16px;
}
```

### JavaScript 이벤트 활용

```javascript
// 드롭다운 이벤트
document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
  dropdown.addEventListener('change', (e) => {
    console.log('Value changed:', e.detail);
    
    // 서버에 저장
    fetch('/api/preferences', {
      method: 'POST',
      body: JSON.stringify({ value: e.detail.value })
    });
  });
});

// 모달 이벤트
document.addEventListener('modalOpen', (e) => {
  console.log('Modal opened:', e.detail.modalId);
  
  // Analytics 트래킹
  gtag('event', 'modal_open', {
    modal_id: e.detail.modalId
  });
});

// 폼 검증과 통합
const form = document.querySelector('#myForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const inputs = form.querySelectorAll('.input');
  let isValid = true;
  
  inputs.forEach(input => {
    const field = input.querySelector('.input__field');
    if (!field.value) {
      input.classList.add('is-error');
      isValid = false;
    } else {
      input.classList.remove('is-error');
    }
  });
  
  if (isValid) {
    // 제출
    form.submit();
  }
});
```

---

## 성능 최적화

### 필요한 컴포넌트만 로드

모든 컴포넌트가 필요 없다면 개별 파일을 추출해서 사용:

```bash
# 원본 스크립트 파일만 사용
cp vanillia/components/scripts/dropdown.js my-project/assets/js/
cp vanillia/components/scripts/modal.js my-project/assets/js/
```

```html
<!-- 필요한 것만 로드 -->
<script src="assets/js/dropdown.js"></script>
<script src="assets/js/modal.js"></script>
```

### CSS 최적화

사용하지 않는 스타일 제거:

```bash
# PurgeCSS 사용
npm install -D purgecss

# 설정 파일 (purgecss.config.js)
module.exports = {
  content: ['./src/**/*.html', './src/**/*.js'],
  css: ['./assets/doakumize/styles/components.css'],
  output: './assets/css/components.min.css'
}
```

### Lazy Loading

페이지 로드 시 필요한 것만:

```javascript
// 초기 로드
window.VanillaComponents.Dropdown.initAll();
window.VanillaComponents.Input.initAll();

// 모달은 필요할 때만
document.querySelector('[data-modal-open]')?.addEventListener('click', () => {
  if (!window.VanillaComponents.Modal.initialized) {
    window.VanillaComponents.Modal.initAll();
  }
});
```

---

## 프레임워크와 통합

### React와 사용

```jsx
import { useEffect, useRef } from 'react';

function DropdownComponent({ options, onChange }) {
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    if (dropdownRef.current && window.VanillaComponents.Dropdown) {
      // 초기화
      window.VanillaComponents.Dropdown.init(dropdownRef.current);
      
      // 이벤트 리스너
      dropdownRef.current.addEventListener('change', (e) => {
        onChange(e.detail.value);
      });
      
      // 클린업
      return () => {
        window.VanillaComponents.Dropdown.destroy(dropdownRef.current);
      };
    }
  }, [onChange]);
  
  return (
    <div ref={dropdownRef} className="dropdown" data-dropdown>
      <button className="dropdown__trigger">
        <span>Select</span>
      </button>
      <div className="dropdown__menu">
        {options.map(opt => (
          <div key={opt.value} className="dropdown__item" data-value={opt.value}>
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Vue와 사용

```vue
<template>
  <div ref="dropdownEl" class="dropdown" data-dropdown>
    <button class="dropdown__trigger">
      <span>{{ selectedText || 'Select' }}</span>
    </button>
    <div class="dropdown__menu">
      <div 
        v-for="option in options" 
        :key="option.value"
        class="dropdown__item"
        :data-value="option.value"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['options'],
  data() {
    return {
      selectedText: ''
    };
  },
  mounted() {
    if (this.$refs.dropdownEl && window.VanillaComponents.Dropdown) {
      window.VanillaComponents.Dropdown.init(this.$refs.dropdownEl);
      
      this.$refs.dropdownEl.addEventListener('change', (e) => {
        this.selectedText = e.detail.text;
        this.$emit('change', e.detail.value);
      });
    }
  },
  beforeUnmount() {
    if (this.$refs.dropdownEl && window.VanillaComponents.Dropdown) {
      window.VanillaComponents.Dropdown.destroy(this.$refs.dropdownEl);
    }
  }
};
</script>
```

### Next.js와 사용

```jsx
// pages/_app.js
import { useEffect } from 'react';
import '../assets/doakumize/styles/normalize.css';
import '../assets/doakumize/styles/variables.css';
import '../assets/doakumize/styles/common.css';
import '../assets/doakumize/styles/components.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 클라이언트 사이드에서만 로드
    if (typeof window !== 'undefined') {
      import('../assets/doakumize/components.js').then(() => {
        window.VanillaComponents?.initAll();
      });
    }
  }, []);
  
  return <Component {...pageProps} />;
}

export default MyApp;
```

---

## 문제 해결

### 스타일이 적용 안 될 때

1. CSS 로드 순서 확인:
   ```html
   <!-- 반드시 이 순서로 -->
   <link rel="stylesheet" href="normalize.css">
   <link rel="stylesheet" href="variables.css">
   <link rel="stylesheet" href="common.css">
   <link rel="stylesheet" href="components.css">
   ```

2. 클래스 이름 확인:
   ```html
   <!-- 잘못된 예 -->
   <button class="btn primary">Button</button>
   
   <!-- 올바른 예 -->
   <button class="btn btn--primary">Button</button>
   ```

### JavaScript가 작동 안 할 때

1. 초기화 확인:
   ```javascript
   // DOM이 로드된 후 실행
   document.addEventListener('DOMContentLoaded', () => {
     window.VanillaComponents.initAll();
   });
   ```

2. data 속성 확인:
   ```html
   <!-- 드롭다운은 data-dropdown 필요 -->
   <div class="dropdown" data-dropdown>...</div>
   ```

3. 콘솔 에러 확인:
   ```javascript
   // 디버깅 모드
   window.VanillaComponents.debug = true;
   ```

---

## 추가 리소스

- **컴포넌트 스튜디오**: https://doakuma.github.io/doakumize-kit/vanillia/components.html
- **GitHub**: https://github.com/doakuma/doakumize-kit
- **이슈 리포트**: https://github.com/doakuma/doakumize-kit/issues

---

**Happy Coding! 🎉**


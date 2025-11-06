# 컴포넌트 스크립트 분리 테스트 가이드

> 📅 작성일: 2025-11-06
> 🎯 목적: 분리된 컴포넌트 스크립트 동작 확인

## ✅ 분리 완료된 컴포넌트

1. **Tooltip** - `components/scripts/tooltip.js`
2. **Popover** - `components/scripts/popover.js`
3. **Dropdown** - `components/scripts/dropdown.js`
4. **Modal** - `components/scripts/modal.js`
5. **Tab** - `components/scripts/tab.js`
6. **Accordion** - `components/scripts/accordion.js`
7. **Input** - `components/scripts/input.js`
8. **Chip** - `components/scripts/chip.js`
9. **Checkbox Group** - `components/scripts/checkbox-group.js`
10. **Slider** - `components/scripts/slider.js`

**총 10개 컴포넌트 분리 완료** ✅

## 🧪 테스트 방법

### 1. 브라우저 콘솔 확인

`components.html` 페이지를 열고 개발자 도구 콘솔에서 확인:

```javascript
// 1. 네임스페이스 확인
console.log(window.VanillaComponents);
// 예상 결과: { initAccordion: ƒ, initCheckboxGroup: ƒ, initChip: ƒ, initDropdown: ƒ, initInput: ƒ, initModal: ƒ, initPopover: ƒ, initSlider: ƒ, initTab: ƒ, initTooltip: ƒ }

// 2. 초기화 로그 확인
// 콘솔에서 다음 로그들이 순서대로 나타나야 함:
// [ScriptsInit] Initializing component scripts...
// [ScriptsInit] Found 10 init function(s): ["initAccordion", "initCheckboxGroup", "initChip", "initDropdown", "initInput", "initModal", "initPopover", "initSlider", "initTab", "initTooltip"]
// [ScriptsInit] Initializing: initAccordion...
// [Accordion] Initializing Accordion...
// ... (모든 컴포넌트 초기화 로그)
```

### 2. Tooltip 테스트

#### 테스트 방법:

1. `components.html` 페이지에서 "Tooltip" 컴포넌트 선택
2. 각 버튼에 마우스 호버
3. 툴팁이 올바른 위치에 표시되는지 확인

#### 체크리스트:

- [x] 12가지 position 모두 동작하는지 확인 (tl, tm, tr, rt, rm, rb, br, bm, bl, lb, lm, lt)
- [x] arrow 옵션이 있을 때 화살표가 표시되는지 확인
- [x] 호버 시 지연 없이 표시되는지 확인
- [x] 마우스가 벗어날 때 빠르게 사라지는지 확인
- [x] 콘솔에 에러가 없는지 확인

### 3. Popover 테스트

#### 테스트 방법:

1. `components.html` 페이지에서 "Popover" 컴포넌트 선택
2. 각 버튼에 마우스 호버
3. 팝오버가 올바른 위치에 표시되는지 확인

#### 체크리스트:

- [x] 기본 팝오버 (right-center) 동작 확인
- [x] 다양한 origin 위치 확인 (top-center, bottom-center, left-center 등)
- [x] 상세 정보 팝오버 (details 타입) 동작 확인
- [x] 팝오버 variant (compact, large) 스타일 확인
- [x] 팝오버 theme (dark) 스타일 확인
- [x] 닫기 버튼 동작 확인 (action="close"인 경우)
- [x] 마우스 호버 시 지연 표시 확인 (delay 속성)
- [x] 콘솔에 에러가 없는지 확인

#### 상세 정보 팝오버 테스트:

- Dropdown 항목에 호버 시 상세 정보가 표시되는지 확인
- JSON 파싱이 정상적으로 되는지 확인
- 여러 개의 detail 항목이 모두 표시되는지 확인

### 4. Dropdown 테스트

#### 테스트 방법:

1. `components.html` 페이지에서 "Dropdown" 컴포넌트 선택
2. 드롭다운 트리거 클릭
3. 옵션 선택 및 키보드 네비게이션 확인

#### 체크리스트:

- [x] 드롭다운 열기/닫기 동작 확인
- [x] 옵션 클릭 시 선택되는지 확인
- [x] 선택된 옵션이 트리거 텍스트에 반영되는지 확인
- [x] Close 버튼 클릭 시 초기화되는지 확인
- [x] 키보드 네비게이션 (ArrowUp/Down, Enter, Escape) 동작 확인
- [x] 외부 클릭 시 드롭다운이 닫히는지 확인
- [x] 여러 드롭다운이 있을 때 하나만 열리는지 확인
- [x] disabled/readonly 상태에서 열리지 않는지 확인
- [x] ARIA 속성이 올바르게 설정되는지 확인 (aria-expanded, aria-haspopup 등)
- [x] 콘솔에 에러가 없는지 확인

#### Chip Dropdown 테스트:

- [x] Chip 내부 드롭다운도 정상 동작하는지 확인
- [x] Chip Dropdown의 키보드 네비게이션 확인

### 5. 통합 파일 테스트

#### 확인 사항:

- [x] `resources/js/components.js` 파일이 최신인지 확인 (마지막 빌드 시간 확인)
- [x] 파일 크기가 적절한지 확인 (현재 약 32KB)
- [x] IIFE 래퍼가 제거되었는지 확인
- [x] 네임스페이스 초기화 코드가 포함되어 있는지 확인

### 6. 기존 기능과의 호환성 확인

#### 확인 사항:

- [x] Popover가 Dropdown 옵션 선택 시 자동으로 닫히는지 확인 (통합 확인)
- [x] 기존 `common.js`의 다른 기능들이 정상 동작하는지 확인
- [x] 동적으로 추가된 컴포넌트도 초기화되는지 확인

### 7. 빌드 스크립트 확인

```bash
# 빌드 스크립트 실행
cd vanillia
node scripts/build-components.js

# 예상 출력:
# 🚀 Building components.js...
# Found 3 file(s): dropdown.js, popover.js, tooltip.js
# ✓ Processing: dropdown.js
# ✓ Processing: popover.js
# ✓ Processing: tooltip.js
# ✅ Build completed successfully!
# Size: 32.33 KB
# Files: 3 file(s) bundled
```

## 🐛 문제 발생 시 확인 사항

### 스크립트가 로드되지 않는 경우:

1. `components.html`에서 스크립트 경로 확인
2. 브라우저 네트워크 탭에서 파일 로드 여부 확인
3. 콘솔에 404 에러가 없는지 확인

### 초기화가 되지 않는 경우:

1. 콘솔에서 `window.VanillaComponents` 확인
2. `components/scripts-init.js`가 제대로 로드되었는지 확인
3. DOMContentLoaded 이벤트 타이밍 확인

### 기능이 동작하지 않는 경우:

1. 브라우저 콘솔에서 에러 확인
2. `common.js`에서 해당 함수 호출이 주석 처리되었는지 확인
3. 새로운 스크립트 파일이 올바르게 로드되었는지 확인
4. 이벤트 위임이 제대로 작동하는지 확인

## 📝 테스트 완료 후

### 체크리스트:

- [x] 모든 컴포넌트가 정상 동작함
- [x] 콘솔에 에러 없음
- [x] 기존 기능과 호환됨
- [x] 빌드 스크립트가 정상 작동함
- [x] 통합 파일이 올바르게 생성됨

### 다음 단계:

테스트 완료 후 나머지 컴포넌트 분리 작업 진행:

- Modal
- Tab
- Accordion
- Input 관련
- Chip
- Checkbox Group
- Slider

---

## 🔍 빠른 테스트 스크립트

브라우저 콘솔에서 실행:

```javascript
// 모든 초기화 함수 확인
console.log("Available init functions:");
Object.keys(window.VanillaComponents).forEach((key) => {
  if (typeof window.VanillaComponents[key] === "function") {
    console.log(`  - ${key}`);
  }
});

// 초기화 함수 수동 실행 테스트
window.VanillaComponents.initTooltip();
window.VanillaComponents.initPopover();
window.VanillaComponents.initDropdown();
```

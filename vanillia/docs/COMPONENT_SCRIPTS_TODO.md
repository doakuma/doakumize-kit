# 컴포넌트 스크립트 작업 TODO

> 📅 작성일: 2025-11-06  
> 📅 최종 업데이트: 2025-11-11  
> 📊 진행 상태: ✅ 모든 작업 완료! (13개 컴포넌트 스크립트 분리 완료, 통합 빌드 완료)

## 📋 개요

`common.js`에 몰려있는 컴포넌트 로직을 `components/scripts/` 폴더로 분리하는 작업입니다.  
퍼블리셔 친화적인 구조로, 소스 파일은 분리하되 통합 파일로 제공합니다.

## 🎯 최종 목표

- ✅ `components/scripts/` 폴더에 컴포넌트별 스크립트 분리
- ✅ `resources/js/components.js` 통합 파일 자동 생성
- ✅ `common.js` 점진적 축소 및 정리
- ✅ 네임스페이스 기반 자동 초기화 시스템

---

## 📊 진행 상황

### ✅ 완료된 작업

- [x] `components/scripts/` 폴더 생성
- [x] 모든 컴포넌트 스크립트 분리 완료 (13개)
  - tooltip.js, popover.js, dropdown.js, modal.js, tab.js, accordion.js
  - input.js, chip.js, checkbox-group.js, slider.js
  - file-card.js, file-upload.js, lnb.js
- [x] 기본 구조 및 네임스페이스 등록 패턴 정립
- [x] Tooltip CSS 스타일 추가 완료
- [x] `components.html`에 모든 스크립트 추가 완료
- [x] 자동 초기화 시스템 구축 완료 (`components/scripts-init.js`)
- [x] 초기화 코드 통합 완료 (옵션 B 선택)
- [x] 통합 파일 생성 스크립트 작성 및 실행 완료
- [x] `common.js`에서 분리된 컴포넌트 호출 주석 처리 완료
- [x] File Upload 및 LNB 스크립트 추가 완료

### 🚧 진행 중인 작업

- 없음 (모든 작업 완료!)

### 📅 계획된 작업

- [x] 통합 파일 생성 스크립트 작성 ✅
- [x] 나머지 컴포넌트 스크립트 분리 ✅
- [ ] `common.js` 최종 정리 (레거시 함수 제거) - 선택적 작업

---

## 🚀 추천 진행 순서

### **1단계: Tooltip 즉시 테스트 (우선순위: 높음)**

**목적**: 스크립트 동작 확인 및 버그 수정

**작업 내용**:

- [x] `components.html`에 tooltip.js 스크립트 직접 추가
- [x] 간단한 테스트 HTML 생성 (tooltip.data.js 참고)
- [x] 브라우저에서 동작 확인
- [x] 문제점 발견 및 수정

**예상 소요 시간**: 30분~1시간

**파일 수정**:

```html
<!-- components.html -->
<script src="components/scripts/tooltip.js"></script>
<script>
  if (window.VanillaComponents && window.VanillaComponents.initTooltip) {
    window.VanillaComponents.initTooltip();
  }
</script>
```

**체크리스트**:

- [x] 스크립트 로드 확인 (콘솔 확인)
- [x] 기본 툴팁 표시/숨김 동작 확인
- [x] 12가지 position 테스트 (tooltip.data.js에 예시 포함)
- [x] arrow 옵션 테스트
- [x] offset 옵션 테스트

---

### **2단계: Tooltip CSS 스타일 추가 (우선순위: 높음)**

**목적**: 실제 UI 완성

**작업 내용**:

- [x] `resources/styles/components.css`에 툴팁 스타일 추가
- [x] 기본 스타일 (`.tooltip`, `.tooltip--visible`)
- [x] 컨텐츠 스타일 (`.tooltip__content`)
- [x] 화살표 스타일 (`.tooltip__arrow`)
- [x] 12가지 position별 화살표 위치 설정

**예상 소요 시간**: 1~2시간

**참고 파일**: `components.css`의 popover 스타일 (2628-2760줄)

**체크리스트**:

- [x] 기본 스타일 작성 (4763-4899줄)
- [x] 12가지 position 클래스 작성 (`.tooltip--tl` ~ `.tooltip--lt`)
- [x] 화살표 위치 계산 로직 확인
- [x] 디자인 시스템 변수 사용 확인 (`var(--gray-*)` 등)
- [x] 반응형 처리 (뷰포트 경계 체크 포함)
- [x] 애니메이션 추가 (transition 적용)

---

### **3단계: 초기화 코드 통합 (우선순위: 중간)**

**목적**: 자동 초기화 시스템 구축

**옵션 A: components-init.js에 추가 (간단)**

- [ ] `components/components-init.js` 끝부분에 초기화 코드 추가
- [ ] DOMContentLoaded 이벤트에 통합

**옵션 B: 자동 초기화 시스템 생성 (확장성 있음)** ✅ 선택 및 완료

- [x] `components/scripts-init.js` 새로 생성
- [x] 모든 `init*` 함수 자동 찾아서 실행하는 로직 작성
- [x] HTML에 스크립트 추가

**예상 소요 시간**: 30분~1시간

**추천**: 옵션 B (향후 컴포넌트 확장에 유리)

**체크리스트**:

- [x] 초기화 스크립트 작성 (`components/scripts-init.js`)
- [x] HTML에 추가 (`components.html`)
- [x] 자동 실행 확인
- [x] 다른 컴포넌트 추가 시에도 동작하는지 확인 (VanillaComponents 네임스페이스의 모든 `init*` 함수 자동 실행)

---

### **4단계: 통합 파일 생성 스크립트 작성 (우선순위: 중간)**

**목적**: 프로덕션 배포 준비

**작업 내용**:

- [x] `scripts/build-components.js` 파일 생성
- [x] `components/scripts/` 폴더의 모든 `.js` 파일 읽기
- [x] 하나의 `resources/js/components.js` 파일로 통합
- [x] IIFE 래퍼 제거 로직 구현
- [x] 초기화 코드 자동 추가 (네임스페이스 초기화)
- [x] 주석 및 헤더 추가

**예상 소요 시간**: 1~2시간

**사용법**:

```bash
node scripts/build-components.js
```

**체크리스트**:

- [x] 빌드 스크립트 작성 (`scripts/build-components.js`)
- [x] tooltip.js 통합 확인
- [x] IIFE 래퍼 제거 로직 구현 및 테스트 완료
- [x] 생성된 파일 테스트 (`resources/js/components.js`)
- [ ] README에 사용법 추가 (선택사항)

**주의사항**:

- IIFE 래퍼 제거 로직 필요
- 파일 순서 보장 (의존성 고려)
- 주석 처리 및 포맷팅

---

### **5단계: 나머지 컴포넌트 스크립트 분리 (우선순위: 낮음)**

**목적**: `common.js` 점진적 축소

**분리 대상 컴포넌트** (우선순위 순): ✅ 모두 완료 (13개)

1. **Popover** (Tooltip과 유사한 구조) ✅
2. **Dropdown** ✅
3. **Modal** ✅
4. **Tab** ✅
5. **Accordion** ✅
6. **Input 관련** ✅
7. **Chip** ✅
8. **Checkbox Group** ✅
9. **Slider** ✅
10. **File Card** ✅ (새로 추가)
11. **File Upload** ✅ (새로 추가)
12. **LNB** ✅ (새로 추가)
13. **Tooltip** ✅

**각 컴포넌트 작업 체크리스트**: ✅ 모두 완료

- [x] `components/scripts/[컴포넌트명].js` 생성 (13개 파일)
- [x] `common.js`에서 해당 로직 추출 및 주석 처리
- [x] 네임스페이스에 `init[컴포넌트명]` 등록
- [x] 기존 동작과 동일한지 테스트
- [x] 통합 파일 빌드 스크립트에 반영 (자동 알파벳 순 정렬)

---

### **6단계: common.js 정리 (우선순위: 낮음)**

**목적**: 최종 정리 및 레거시 코드 제거

**작업 내용**:

- [ ] 모든 컴포넌트 스크립트 분리 완료 확인
- [ ] `common.js`에서 관련 함수 제거
- [ ] 공통 유틸리티 함수만 남기기
- [ ] 주석 정리

**예상 소요 시간**: 1시간

**주의사항**:

- 하위 호환성 확인 필수
- 기존 코드에 영향 없는지 테스트
- 점진적 제거 권장

**체크리스트**:

- [ ] 모든 컴포넌트 분리 완료 확인
- [ ] `common.js` 리뷰
- [ ] 사용되지 않는 함수 제거
- [ ] 공통 유틸리티 함수 정리
- [ ] 최종 테스트

---

## 📝 각 작업별 상세 체크리스트

### Tooltip CSS 스타일 상세 작업

#### 기본 스타일

```css
/* Tooltip Base */
.tooltip {
  position: absolute;
  z-index: 10000;
  background-color: var(--gray-900);
  color: var(--gray-0);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 16px;
  pointer-events: none;

  /* 기본 숨김 상태 */
  opacity: 0;
  visibility: hidden;
  transform: scale(0.95);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip--visible {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}
```

#### 컨텐츠 스타일

```css
.tooltip__content {
  max-width: 200px;
  word-wrap: break-word;
}
```

#### 화살표 스타일

```css
.tooltip__arrow {
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
}

/* Position별 화살표 위치 */
.tooltip--arrow.tooltip--tl .tooltip__arrow {
  bottom: -12px;
  left: 12px;
  border-top-color: var(--gray-900);
}
/* ... 나머지 11개 position */
```

#### 12가지 Position 클래스 ✅ 완료

- [x] `.tooltip--tl` (top-left)
- [x] `.tooltip--tm` (top-middle)
- [x] `.tooltip--tr` (top-right)
- [x] `.tooltip--rt` (right-top)
- [x] `.tooltip--rm` (right-middle)
- [x] `.tooltip--rb` (right-bottom)
- [x] `.tooltip--br` (bottom-right)
- [x] `.tooltip--bm` (bottom-middle)
- [x] `.tooltip--bl` (bottom-left)
- [x] `.tooltip--lb` (left-bottom)
- [x] `.tooltip--lm` (left-middle)
- [x] `.tooltip--lt` (left-top)

---

### 통합 파일 생성 스크립트 상세

#### 기본 구조

```javascript
// scripts/build-components.js
const fs = require("fs");
const path = require("path");

const scriptsDir = path.join(__dirname, "../components/scripts");
const outputFile = path.join(__dirname, "../resources/js/components.js");

// 1. 모든 .js 파일 읽기
// 2. IIFE 래퍼 제거
// 3. 파일 내용 합치기
// 4. 초기화 코드 추가
// 5. 파일 쓰기
```

#### 체크리스트

- [ ] 파일 읽기 로직 작성
- [ ] 파일 순서 정렬 (알파벳순 또는 의존성 순)
- [ ] IIFE 래퍼 제거 로직
- [ ] 헤더 주석 추가
- [ ] 초기화 코드 자동 생성
- [ ] 에러 처리
- [ ] 생성 시간 표시

---

## 🔄 작업 플로우

```
1단계: 테스트
   ↓
2단계: CSS
   ↓
3단계: 초기화 통합
   ↓
4단계: 빌드 스크립트
   ↓
5단계: 다른 컴포넌트 분리
   ↓
6단계: common.js 정리
```

---

## 📌 참고 문서

- [컴포넌트 스크립트 작성 가이드](./COMPONENT_SCRIPT_GUIDE.md)
- [리팩토링 계획](./REFACTORING_PLAN.md)
- [Popover 스타일 참고](./components.css:2628-2760)

---

## 🎯 다음 작업

**즉시 시작할 작업**: 4단계 (통합 파일 생성 스크립트 작성)

1. `scripts/build-components.js` 파일 생성
2. `components/scripts/` 폴더의 모든 `.js` 파일 읽기
3. 하나의 `resources/js/components.js` 파일로 통합
4. 초기화 코드 자동 추가

**또는** 5단계부터 시작하여 다른 컴포넌트 스크립트 분리 작업 진행 가능

---

## ✅ 컴포넌트 스크립트 분리 완료 요약

### 분리된 컴포넌트 (13개)

1. **Accordion** - `components/scripts/accordion.js`
2. **Checkbox Group** - `components/scripts/checkbox-group.js`
3. **Chip** - `components/scripts/chip.js`
4. **Dropdown** - `components/scripts/dropdown.js`
5. **File Card** - `components/scripts/file-card.js`
6. **File Upload** - `components/scripts/file-upload.js`
7. **Input** - `components/scripts/input.js`
8. **LNB** - `components/scripts/lnb.js`
9. **Modal** - `components/scripts/modal.js`
10. **Popover** - `components/scripts/popover.js`
11. **Slider** - `components/scripts/slider.js`
12. **Tab** - `components/scripts/tab.js`
13. **Tooltip** - `components/scripts/tooltip.js`

### 통합 파일

- **빌드 결과**: `core/components.js` (프로덕션 사용)
- **통합 파일 수**: 13개
- **자동 초기화**: `components/scripts-init.js` ✅
- **빌드 스크립트**: `scripts/build-components.js` ✅

### 완료 상태

- ✅ 모든 핵심 컴포넌트 스크립트 분리 완료
- ✅ 통합 빌드 시스템 구축 완료
- ✅ 자동 초기화 시스템 구축 완료
- ✅ 프로덕션 배포 파일 (`core/`) 준비 완료

### 선택적 작업

- [ ] `common.js`에서 분리된 함수들 제거 (레거시 정리) - 하위 호환성 유지를 위해 선택적

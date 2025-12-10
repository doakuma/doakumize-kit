# 📚 Vanillia Component System - 문서 색인

> 📅 최종 업데이트: 2025-11-11  
> 📊 프로젝트 상태: 15개 컴포넌트 완성, 13개 스크립트 분리 완료  
> 🆕 CSS 모듈화 완료: 핵심 컴포넌트 5개 분리, 3단계 빌드 시스템 구축

## 🚀 빠른 시작

### 실제 프로젝트에 적용하기
**시작 가이드**: [HOW_TO_USE_IN_PROJECT.md](HOW_TO_USE_IN_PROJECT.md) ⭐

프로젝트에 Vanillia를 적용하는 방법을 단계별로 설명합니다:
- 설치 방법 (CLI 도구, 수동 복사, Git Submodule)
- 기본 설정 및 HTML 구조
- 컴포넌트 사용 예시
- 커스터마이징 방법
- 성능 최적화
- React/Vue/Next.js 통합

---

## 📖 사용 가이드

### [HOW_TO_USE.md](HOW_TO_USE.md)
**Component Engine 개발 가이드**

컴포넌트 스튜디오 시스템 사용법:
- 파일 구조 및 시스템 특징
- HTML에서 컴포넌트 마운트 방법
- JavaScript에서 동적 렌더링
- 카테고리 시스템 및 LNB 네비게이션
- 새로운 컴포넌트 추가하기
- 데이터 파일 수정
- 성능 최적화 및 디버깅

**주요 내용:**
- ✅ 15개 컴포넌트 완성
- ✅ 13개 컴포넌트 스크립트 분리 완료
- ✅ 카테고리 시스템 (5개 카테고리)
- ✅ LNB 네비게이션
- ✅ 24개 컴포넌트 로드맵

---

## 🛠️ 개발 가이드

### [COMPONENT_SCRIPT_GUIDE.md](COMPONENT_SCRIPT_GUIDE.md)
**컴포넌트 스크립트 작성 가이드**

설계 사고 과정과 실제 구현 방법을 통합한 종합 가이드:

**설계 프로세스:**
1. 요구사항 분석 & 책임 정의
2. 전체 구조 스케치 (Top-down)
3. 핵심 로직 분리 (Single Responsibility)
4. 이벤트 처리 설계 (Event Delegation)
5. 유틸리티 함수 분리 (재사용성)
6. 보안 고려 (XSS 방지)
7. 접근성 & 사용자 경험 개선

**구현 방법:**
- IIFE 패턴 적용
- 이벤트 위임 구현
- 데이터 속성 읽기
- 보안 처리 (HTML 이스케이프)
- 커스텀 이벤트 발생
- 전역 네임스페이스 등록

**현재 구현된 스크립트:**  
13개 - accordion, checkbox-group, chip, dropdown, file-card, file-upload, input, lnb, modal, popover, slider, tab, tooltip

---

### [COMPONENT_SCRIPTS_TODO.md](COMPONENT_SCRIPTS_TODO.md)
**컴포넌트 스크립트 작업 현황**

`common.js`에서 컴포넌트 로직을 분리하는 작업 상황:

**✅ 완료된 작업:**
- 13개 컴포넌트 스크립트 분리 완료
- 자동 초기화 시스템 구축 완료
- 통합 빌드 스크립트 작성 및 실행 완료
- CSS 스타일 추가 완료

**작업 단계:**
1. ✅ Tooltip 스크립트 분리 및 테스트
2. ✅ CSS 스타일 추가 (12가지 position)
3. ✅ 자동 초기화 시스템 구축
4. ✅ 통합 파일 생성 스크립트 작성
5. ✅ 나머지 컴포넌트 스크립트 분리 (13개)
6. 📅 `common.js` 최종 정리 (선택적)

---

### [HELPER_API.md](HELPER_API.md)
**Helper API 문서**

컴포넌트를 더 쉽게 사용할 수 있도록 도와주는 유틸리티 함수:

**우선순위:**
- 🔥 High Priority (5개): Dropdown, File Upload, Input, Modal, Slider
- 🟡 Medium Priority (6개): Tab, Checkbox Group, Chip, Accordion, Tooltip, Popover
- 🟢 Low Priority (1개): File Card

**구현 계획:**
- Phase 1: 핵심 폼 컨트롤 (Dropdown, Input, File Upload)
- Phase 2: 인터랙션 컴포넌트 (Modal, Tab, Slider)
- Phase 3: 보조 컴포넌트 (Checkbox Group, Chip, Accordion, Tooltip, Popover)
- Phase 4: 선택적 (File Card)

---

## 🏗️ 아키텍처 문서

### 🆕 CSS 모듈화 아키텍처 (2025-11-11)
**3단계 스타일 시스템**

Doakumize Kit은 역할별로 명확히 분리된 CSS 아키텍처를 사용합니다:

#### **📁 폴더 역할**

**1️⃣ components/styles/** - 컴포넌트 개발/관리
```
컴포넌트 스타일의 단일 소스 (Single Source of Truth)
├── icons.css          ✅ 분리 완료
├── button.css         ✅ 분리 완료
├── input.css          ✅ 분리 완료
├── dropdown.css       ✅ 분리 완료
├── modal.css          ✅ 분리 완료
└── all-other-components.css  💾 나머지 (순차 분리)
```

**2️⃣ resources/styles/** - Studio 전용
```
Studio 페이지와 데모 사이트에서만 사용
├── base.css           # 기본 스타일
├── animations.css     # 애니메이션
├── scrollbar.css      # 스크롤바
├── layout.css         # Studio 레이아웃
├── lnb.css            # Studio LNB
├── studio.css         # Studio 페이지 스타일
└── components.css     # 컴포넌트 Import 파일
```

**3️⃣ core/styles/** - 프로젝트 배포용
```
빌드 결과물 (npm run build:core로 자동 생성)
├── common.css         # Import 진입점 (자동 생성)
├── components.css     # Generator로 생성
├── base.css           # resources에서 복사
├── animations.css     # resources에서 복사
├── scrollbar.css      # resources에서 복사
├── normalize.css      # components에서 복사
└── variables.css      # components에서 복사
```

#### **🔄 빌드 워크플로우**

```
1. 개발
   resources/styles/base.css 수정
   ↓

2. 빌드
   npm run build:core
   ↓
   resources → core 자동 복사
   ↓

3. 배포
   A) Generator: 선택한 컴포넌트만 ZIP 다운로드
   B) CLI: npm run copy로 전체 복사
```

#### **⚡ Component Generator 통합**

사용자가 필요한 컴포넌트만 선택:
- Generator에서 Button, Input, Modal 선택
- Download Package (ZIP) 클릭
- `components.css`에 선택한 컴포넌트만 포함됨!

**장점:**
- ✅ 최적화: 불필요한 CSS 제거
- ✅ 자동화: 수동 작업 불필요
- ✅ 일관성: 단일 소스에서 관리

---

### [REFACTORING_PLAN.md](REFACTORING_PLAN.md)
**리팩토링 계획 및 전략**

`common.js` 리팩토링 전략과 일반적인 라이브러리 개발 패턴:

**핵심 전략:**
- 소스 분리 + 통합 파일 제공
- 컴포넌트별 모듈 분리
- 네임스페이스 기반 구조
- 퍼블리셔 친화적 접근

**구조:**
```
components/scripts/      # 소스 파일 (개발/수정용)
resources/js/           # 통합 파일 (자동 생성)
```

**마이그레이션 전략:**
- Phase 1: 구조 생성 (비파괴적)
- Phase 2: 점진적 마이그레이션
- Phase 3: 정리

---

### [STYLE_ARCHITECTURE_COMPARISON.md](STYLE_ARCHITECTURE_COMPARISON.md)
**CSS 아키텍처 비교 분석**

CSS 스타일 관리 방식 비교 및 권장사항:

**비교 방식:**
1. **단일 파일 관리** (과거) - 5,374줄
2. **컴포넌트별 파일 분리** (현재) - 모듈화 완료
3. **폴더 그룹화** (미래 계획)

**현재 구현 상태 (2025-11-11):**
- ✅ 핵심 컴포넌트 5개 분리 완료
- ✅ Import 기반 시스템 구축
- ✅ 3단계 폴더 구조 확립
- 📅 나머지 컴포넌트 순차 분리 예정

**결론:**
- 역할별 폴더 분리 완료 (개발/Studio/배포)
- Generator 통합으로 자동화 달성
- 빌드 시스템으로 중복 제거

---

### [BUILD_SETUP_GUIDE.md](BUILD_SETUP_GUIDE.md)
**빌드 환경 설정 가이드**

CSS 파일 번들링을 위한 빌드 환경 설정:

**✅ 현재 빌드 시스템:**
```bash
npm run build:core      # CSS 빌드 (resources → core)
npm run build           # JS 빌드 (scripts → core)
```

**추가 최적화 (선택적):**
- ⭐ **PostCSS + postcss-import** (CSS 번들링)
- Vite (최신 도구)

**결과:**
- 개발: 여러 파일로 작업 (유지보수 편함)
- 프로덕션: 하나의 파일로 배포 (성능 최적화)

---

## 📋 프로젝트 관리

### [../TODO.md](../TODO.md)
**프로젝트 TODO 및 로드맵**

향후 개선 및 확장 계획:

**📊 현재 상태:**
- ✅ 15개 컴포넌트 완성
- ✅ 13개 컴포넌트 스크립트 분리 완료
- ✅ HSL 기반 동적 컬러 시스템 구현
- ✅ Semantic 변수 기본 정의
- ✅ 빌드 시스템 구축 완료

**🎯 계획 중:**
1. **SCSS 자동화** (계획 단계)
   - SCSS 믹스인으로 컬러 스케일 자동 생성
   - 빌드 환경 구성 필요

2. **다크모드** (준비 단계)
   - Semantic 변수 확장
   - JavaScript 토글 구현
   - UI 컴포넌트 추가

**우선순위:**
- 🔥 High: 레거시 파일 통합, 다크모드 기본 구현
- 🟡 Medium: Semantic 변수 마이그레이션, 토글 버튼 UI
- 🟢 Low: SCSS 마이그레이션

---

## 🔍 문서 탐색 가이드

### 상황별 추천 문서

#### "실제 프로젝트에 적용하고 싶어요"
→ [HOW_TO_USE_IN_PROJECT.md](HOW_TO_USE_IN_PROJECT.md)

#### "컴포넌트 스튜디오를 개발하고 싶어요"
→ [HOW_TO_USE.md](HOW_TO_USE.md)

#### "새 컴포넌트 스크립트를 작성하고 싶어요"
→ [COMPONENT_SCRIPT_GUIDE.md](COMPONENT_SCRIPT_GUIDE.md)

#### "현재 작업 진행 상황이 궁금합니다"
→ [COMPONENT_SCRIPTS_TODO.md](COMPONENT_SCRIPTS_TODO.md)

#### "CSS 구조를 개선하고 싶어요"
→ [STYLE_ARCHITECTURE_COMPARISON.md](STYLE_ARCHITECTURE_COMPARISON.md)

#### "빌드 환경을 설정하고 싶어요"
→ [BUILD_SETUP_GUIDE.md](BUILD_SETUP_GUIDE.md)

#### "프로젝트 로드맵을 보고 싶어요"
→ [TODO.md](../TODO.md)

---

## 📊 프로젝트 통계

### 컴포넌트
- ✅ 완성: 15개
- ⏳ 준비 중: 24개
- 📊 총: 39개

### 컴포넌트 스크립트
- ✅ 분리 완료: 13개
- 📦 통합 파일: `core/components.js`

### 문서
- 📖 사용 가이드: 2개
- 🛠️ 개발 가이드: 3개
- 🏗️ 아키텍처 문서: 3개
- 📋 프로젝트 관리: 1개
- 📚 총: 9개

---

## 🔗 빠른 링크

### 외부 리소스
- 🎭 [컴포넌트 스튜디오](https://doakuma.github.io/doakumize-kit/vanillia/components.html)
- 📦 [GitHub Repository](https://github.com/doakuma/doakumize-kit)

### 핵심 파일
- `components/component-engine.js` - 렌더링 엔진
- `components/scripts/` - 컴포넌트 스크립트 (13개)
- `core/` - 프로덕션 배포 파일
- `scripts/build-components.js` - 빌드 스크립트

---

**📅 문서 버전**: v1.1.0 (2025-11-11)  
**👥 기여자**: Akumize Design System Team  
**📄 라이선스**: MIT


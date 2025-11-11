# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 계획 중
- SCSS 빌드 환경 구성
- 다크모드 구현
- 24개 추가 컴포넌트 개발

---

## [1.1.0] - 2025-11-11

### ✨ Added
- **13개 컴포넌트 스크립트 분리 완료**
  - accordion.js, checkbox-group.js, chip.js, dropdown.js
  - file-card.js, file-upload.js, input.js, lnb.js
  - modal.js, popover.js, slider.js, tab.js, tooltip.js
- **통합 빌드 시스템** (`scripts/build-components.js`)
  - 자동으로 개별 스크립트를 하나의 파일로 통합
  - IIFE 래퍼 자동 제거
  - 초기화 코드 자동 생성
- **자동 초기화 시스템** (`components/scripts-init.js`)
  - 네임스페이스 기반 자동 초기화
  - `init*` 함수 자동 탐색 및 실행
- **프로덕션 빌드 파일** (`core/components.js`)
  - 실제 프로젝트에서 사용 가능한 통합 파일
  - 13개 스크립트 통합

### 📝 Documentation
- **문서 전체 업데이트**
  - 모든 문서에 최신 상태 반영
  - 날짜 업데이트 (2025-11-11)
- **새로운 문서 추가**
  - `docs/INDEX.md` - 전체 문서 색인 및 가이드
  - `CHANGELOG.md` - 변경 이력 문서
- **업데이트된 문서**
  - `COMPONENT_SCRIPTS_TODO.md` - 13개 스크립트 완료 반영
  - `COMPONENT_SCRIPT_GUIDE.md` - 구현 현황 추가
  - `HOW_TO_USE.md` - 컴포넌트 스크립트 시스템 정보 추가
  - `TODO.md` - 프로젝트 현황 업데이트
  - `README.md` - 주요 기능 및 문서 목록 재구성

### 🎨 Improved
- **개발자 경험 향상**
  - 소스 파일 분리로 유지보수성 향상
  - 명확한 파일 구조 및 네이밍
  - 일관된 코딩 패턴 (IIFE, Event Delegation)
- **문서 구조 개선**
  - 체계적인 문서 분류 (사용/개발/아키텍처/관리)
  - 상황별 추천 문서 가이드
  - 프로젝트 통계 추가

---

## [1.0.0] - 2025-11-05

### ✨ Added
- **15개 컴포넌트 완성**
  - Foundation: Typography, Icon
  - Form Controls: Button, Input, Checkbox, Radio, Dropdown, Slider
  - Data Display: Chip, Table, File Card
  - Feedback: Modal, Popover
  - Navigation: Tab, Accordion
- **HSL 기반 동적 컬러 시스템**
  - CSS `calc()` 함수를 사용한 동적 스케일
  - 기준값만 변경하면 전체 스케일 자동 업데이트
  - 빌드 도구 없이 동작
- **Semantic 변수 정의**
  - `--text-primary`, `--text-secondary`, `--text-tertiary`
  - `--bg-primary`, `--bg-secondary`, `--bg-tertiary`
  - `--border-primary`, `--border-secondary`, `--border-focus`
- **Component Engine 시스템**
  - JSON 데이터 기반 자동 렌더링
  - Generic Renderer (14개 → 1개로 통합)
  - 자동 캐싱 시스템
- **카테고리 시스템**
  - 5개 카테고리로 체계적 분류
  - LNB 네비게이션
  - 검색 기능
  - 24개 컴포넌트 로드맵 가시화

### 📝 Documentation
- 프로젝트 문서 체계 구축
- HOW_TO_USE_IN_PROJECT.md (실제 프로젝트 적용 가이드)
- HOW_TO_USE.md (Component Engine 개발 가이드)
- COMPONENT_SCRIPT_GUIDE.md (스크립트 작성 가이드)
- COMPONENT_SCRIPTS_TODO.md (작업 현황)
- HELPER_API.md (Helper API 문서)
- REFACTORING_PLAN.md (리팩토링 계획)
- STYLE_ARCHITECTURE_COMPARISON.md (CSS 아키텍처 비교)
- BUILD_SETUP_GUIDE.md (빌드 환경 설정)
- TODO.md (프로젝트 TODO 및 로드맵)

---

## [0.9.0] - 2025-10-21

### ✨ Added
- **카테고리 시스템 및 LNB 네비게이션**
  - 5개 카테고리로 컴포넌트 분류
  - 사이드바 기반 탐색 시스템
  - 검색 기능
  - 부드러운 Fade 전환 (0.2초)
- **로드맵 가시화**
  - 준비 중 컴포넌트 표시 (🚧 아이콘)
  - 카테고리별 진행률 표시
  - 39개 컴포넌트 현황

### 🎨 Improved
- 탭 네비게이션 → LNB 네비게이션 (중복 제거)
- DOM 최적화 (15개 패널 → 1개 패널)
- 사용자 경험 향상

---

## [0.8.0] - 2025-10-15

### ✨ Added
- **Generic Renderer 시스템**
  - 14개 렌더러 → 1개로 통합 (93% 감소)
  - 일관된 렌더링 패턴
- **자동 마운트 시스템**
  - `data-component` 속성 기반
  - JavaScript 호출 불필요
- **데이터 파일 시스템**
  - `.data.js` 로컬 개발 지원
  - `file://` 프로토콜 지원
- **코드 보기 모듈**
  - 독립 분리 (`component-code-viewer.js`)
  - 클립보드 복사 기능
  - 포맷팅 지원

### 🎨 Improved
- 컴포넌트 추가 시간 10분 → 2분 (80% 단축)
- 렌더링 속도 향상 (캐싱)

---

## [0.7.0] - 2025-10-01

### ✨ Added
- 초기 컴포넌트 시스템 구축
- Component Engine 기본 구조
- 14개 개별 렌더러
- 탭 네비게이션 시스템

---

## Legend

### Types of changes
- ✨ `Added` - 새로운 기능 추가
- 🔧 `Changed` - 기존 기능 변경
- 🐛 `Fixed` - 버그 수정
- 🗑️ `Deprecated` - 곧 제거될 기능
- ❌ `Removed` - 제거된 기능
- 🔒 `Security` - 보안 관련 수정
- 📝 `Documentation` - 문서 업데이트
- 🎨 `Improved` - 성능 개선 또는 사용자 경험 향상

---

**Last Updated**: 2025-11-11


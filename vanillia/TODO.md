# Vanillia Component System - TODO

> 프로젝트 진행 상황 및 향후 계획

## 🔥 현재 작업 중 (2025-11-14)

- [x] Color/Typography 컴포넌트 데이터 정리 ✅
- [x] 다크모드 구현 완료 ✅
- [x] 멀티 프레임워크 구조 설계 ✅
  - 메인 index.html 랜딩 페이지 생성 (Vanilla/React/MUI 선택)
  - ARCHITECTURE.md 문서 작성
  - shared 폴더 구조 정의
- [ ] 공통 리소스 분리 작업
  - shared/ 폴더 생성 ✅
  - 파일 이동 (CSS Variables, images) - 다음 작업
  - 경로 수정 및 테스트
  - 자세한 계획: `/todo/PHASE1-TASKS.md` 참고

## 💭 최근 메모

- Semantic Token 시스템 완성 (140개 토큰)
- Component Engine 패턴 안정화
- "안녕" 워크플로우 룰 설정 완료
- **멀티 프레임워크 전략**: Vanilla → React → MUI 순차 개발
- **공통화 원칙**: 진짜 공통인 것만 shared로, 데이터는 나중에

---

## 📊 프로젝트 현황 요약

> 📌 **소스 오브 트루스**: `vanillia/resources/js/components-config.js`
> 컴포넌트 현황은 components-config.js의 COMPONENT_LIST 기준입니다.

### ✅ 완료된 항목 (enabled: true)

- **컴포넌트 구현**: 22개 컴포넌트 완료

  - Foundation (4개): Color, Spacing, Icon, Typography
  - Form Controls (9개): Button, Input, Checkbox, Radio, Dropdown, Slider, Switch, Textarea, File Upload, Date Picker
  - Data Display (5개): Chip, Table, File Card, Badge, Tooltip
  - Feedback (2개): Modal, Popover
  - Navigation (2개): Tab, Accordion

- **컴포넌트 스크립트**: 13개 독립 스크립트 분리 완료

  - accordion.js, checkbox-group.js, chip.js, dropdown.js
  - file-card.js, file-upload.js, input.js, lnb.js
  - modal.js, popover.js, slider.js, tab.js, tooltip.js

- **HSL 기반 동적 컬러 시스템**: 구현 완료

  - `components/styles/variables.css`에 HSL 기반 동적 스케일 시스템 구현
  - 기준값(`--primary-h`, `--primary-s`)만 변경하면 전체 스케일 자동 업데이트
  - CSS `calc()` 함수 활용으로 빌드 도구 없이 동작

- **Semantic 변수 시스템**: 대폭 확장 완료 (2025-11-12)

  - Semantic Color 스케일: Success, Error, Warning, Info, Essential 각 10단계
  - Surface/Elevation 시스템: 7개 Surface Layer + 7개 Shadow
  - Text Token 확장: 12개 (link, semantic colors 포함)
  - Border Token 확장: 10개 (subtle/default/strong + semantic)
  - Interactive Token 추가: 12개 (default/hover/active/disabled)
  - **총 ~140개 디자인 토큰** (기존 40개 → 3.5배 증가)

- **빌드 시스템**: 구축 완료
  - 통합 빌드 스크립트 (`scripts/build-components.js`)
  - 프로덕션 파일 자동 생성 (`core/components.js`)
  - 자동 초기화 시스템 (`components/scripts-init.js`)

### 🚧 진행 중 / 계획 중

- **멀티 프레임워크 확장**: 
  - Phase 1: Vanilla 완성 (현재)
  - Phase 2: React 개발 & 웹 생성기 (12월 예정)
  - Phase 3: npm 패키지 배포 (1월 예정)
  - Phase 4: MUI 버전 & 고도화 (2월 예정)
  - 자세한 로드맵: `/todo/ROADMAP.md` 참고
  - 아키텍처 가이드: `/ARCHITECTURE.md` 참고
- **공통 리소스 분리**: 
  - shared/ 폴더에 CSS Variables, images 이동
  - 모든 프레임워크가 동일한 디자인 토큰 사용
- **Semantic 변수 마이그레이션**: 일부 컴포넌트에서 하드코딩된 색상을 Semantic 변수로 교체 필요
- **접근성 검증**: WCAG 명도 대비 자동 검사 도구 추가 (선택적)
- **SCSS 마이그레이션**: Low Priority (현재 시스템 안정적)

---

## 🎨 1. SCSS 마이그레이션 (선택적)

**📊 진행 상태:** 계획 단계 (Low Priority)

### 📌 현재 상태

- ✅ HSL 기반 동적 시스템 완성 (`components/styles/variables.css`)
- ✅ CSS `calc()` 사용으로 빌드 도구 없이 작동 중
- ✅ package.json 존재, 빌드 스크립트 완성

### 🎯 목적

SCSS 믹스인으로 코드 간소화 (3줄로 전체 컬러 스케일 생성 가능)

### ⚖️ 판단

**현재 시스템이 잘 작동 중이므로 급하지 않음**

- 장점: 코드 간소화, 유지보수 용이
- 단점: 빌드 스텝 추가, 초기 설정 복잡도

### 📝 구현 시 단계

1. SCSS 패키지 설치 (`sass`, `postcss`)
2. 믹스인 작성 (`_color-system.scss`)
3. 빌드 스크립트 추가
4. 기존 CSS → SCSS 변환

---

## 🌓 2. 다크모드 구현

**📊 진행 상태:** ✅ 완료!

### 📌 완료 항목

- ✅ **Semantic Token 시스템 완성** (140개 토큰)
  - Surface/Elevation (7개 Layer + 7개 Shadow)
  - Text/Border/Interactive Token 완비
  - Semantic Color 스케일 (Success/Error/Warning/Info/Essential 각 10단계)
- ✅ **다크모드 구현 완료**
  - `[data-theme="dark"]` 방식으로 색상 정의 완료
  - ThemeManager 클래스 구현 (`components/scripts/theme-manager.js`)
  - 토글 기능 연동 완료 (layouts.js)
  - OS 설정 자동 감지 + 수동 토글 지원

### 🎯 구현 방식

**하이브리드 방식**: OS 설정 자동 감지 + 수동 토글 (완료)

### 📝 구현 완료

1. ✅ Semantic Variables 확장
2. ✅ `[data-theme="dark"]` 색상 정의
3. ✅ ThemeManager 클래스 작성
4. ✅ 토글 버튼 UI 추가
5. ⏳ 컴포넌트 CSS Semantic 변수 마이그레이션 (진행 중)
6. ⏳ 접근성 검증 (WCAG 명도 대비)

---

## 📋 우선순위

### 🔥 High Priority

- [ ] **컴포넌트 문서화**
  - [ ] components.html에 API 문서 추가
    - 각 컴포넌트별 사용법 (props, 옵션, 메서드)
    - 실시간 코드 예제
    - 인터랙티브 데모
  - [ ] 기존 문서 업데이트
    - 다크모드 사용법 추가 (HOW_TO_USE.md, HOW_TO_USE_IN_PROJECT.md)
    - ThemeManager API 설명
    - 최신 변경사항 반영

### 🟡 Medium Priority

- [ ] **Semantic 변수 마이그레이션**
  - 하드코딩 컬러 → Semantic 변수 교체
  - 다크모드 대비
- [ ] **컴포넌트 확장**
  - 추가 UI 패턴 구현 (아래 신규 컴포넌트 계획 참고)

### 🟢 Low Priority

- [ ] **SCSS 마이그레이션** (선택적)
  - 현재 시스템 안정적으로 작동 중

---

## 🎨 신규 컴포넌트 계획 (enabled: false → true 전환 예정)

> 📌 components-config.js의 `enabled: false` 컴포넌트 기준

### 📦 Form Controls (2개)

- [ ] **Autocomplete**

  - 자동완성 입력
  - 검색어 하이라이트
  - 키보드 네비게이션

- [ ] **Rating** ⭐
  - 별점 입력
  - 반쪽 별 지원
  - 읽기 전용 모드

### 📊 Data Display (8개)

- [ ] **Divider** ⭐⭐⭐

  - 수평/수직 구분선
  - 텍스트 포함 가능
  - 다양한 스타일 (solid/dashed/dotted)

- [ ] **Card**

  - 콘텐츠 카드
  - 이미지, 제목, 설명, 액션 영역
  - 호버 효과, 그림자

- [ ] **Avatar**

  - 프로필 이미지/초성
  - 크기: xs/small/medium/large/xl
  - 그룹 아바타 (중첩)
  - 상태 뱃지 (온라인/오프라인)

- [ ] **Progress Bar**

  - 진행률 표시
  - 타입: linear/circular
  - 상태: default/success/error/warning
  - 애니메이션 지원

- [ ] **List**

  - 리스트 항목 표시
  - 아이콘, 아바타 지원
  - 인터랙티브 항목

- [ ] **Skeleton**

  - 로딩 상태 표시
  - 다양한 형태 (text/circle/rect)
  - 애니메이션 효과

- [ ] **Empty State**

  - 빈 상태 UI
  - 아이콘, 메시지, 액션 버튼

- [ ] **Timeline** ⭐⭐

  - 시간순 이벤트 표시
  - 좌/우 정렬 모드
  - 아이콘, 색상 커스터마이징

- [ ] **Carousel (외부 라이브러리 사용)** ⭐⭐
  - 이미지/콘텐츠 슬라이더
  - 자동 재생, 인디케이터
  - 터치/스와이프 지원

### 💬 Feedback (4개)

- [ ] **Drawer** ⭐⭐⭐

  - 사이드 패널
  - 위치: left/right/top/bottom
  - 오버레이, 푸시 모드

- [ ] **Toast**

  - 임시 알림 메시지
  - 위치: top/bottom/top-right/bottom-left 등
  - 자동 사라짐 (duration 설정)
  - 액션 버튼 지원

- [ ] **Notification** ⭐⭐

  - 지속적 알림 (Toast보다 장시간)
  - 우상단 고정
  - 스택 관리, 닫기 버튼

- [ ] **Loading Spinner**
  - 로딩 인디케이터
  - 다양한 스타일 (circular/linear/dots)
  - 크기 옵션

> 💡 **Note**: Alert와 Dialog는 Modal 컴포넌트의 옵션/variant로 구현 (별도 컴포넌트 없음)

### 🧭 Navigation (4개)

- [ ] **Breadcrumb**

  - 경로 네비게이션
  - 구분자 커스터마이징
  - 현재 페이지 표시

- [ ] **Pagination**

  - 페이지 네비게이션
  - 페이지 번호, 이전/다음
  - 페이지당 아이템 수 선택

- [ ] **Menu**

  - 컨텍스트 메뉴
  - 다단계 서브메뉴
  - 키보드 네비게이션

- [ ] **Stepper**
  - 단계별 진행 표시
  - 수평/수직 레이아웃
  - 완료/진행중/대기 상태

---

### 📊 신규 컴포넌트 통계

- **총 18개** 추가 예정 (기존 13개 → 18개)
- **외부 라이브러리 필요**: 1개 (Carousel)
- **우선순위 높음** ⭐⭐⭐: Divider, Drawer
- **우선순위 중간** ⭐⭐: Rating, Timeline, Carousel, Notification

### 📝 추가 작업 항목

- ⚠️ File Upload 드래그앤드롭 기능 추가 필요

---

## 💡 향후 아이디어

### 디자인 시스템

- **컬러 테마 프리셋**: 다양한 색상 테마 제공 (ocean, sunset, forest 등)
- **실시간 컬러 에디터**: HSL 값 조정 시 전체 UI 변경 미리보기
- **접근성 검사 도구**: WCAG 명도 대비 자동 검사 및 추천

### 컴포넌트 문서화

- **인터랙티브 API 문서**: components.html에서 컴포넌트별 API 설명
  - Props/Options 테이블
  - 메서드 목록 및 사용 예제
  - 이벤트 리스너 가이드
  - 실시간 코드 에디터 & 미리보기
- **코드 복사 기능 개선**: 각 예제별 복사 버튼
- **검색 기능**: 컴포넌트/API 빠른 검색

---

## 📝 변경 이력

### 2025-11-14

- ✅ Color/Typography 컴포넌트 데이터 정리 완료
- ✅ 다크모드 구현 완료 확인 및 문서 업데이트
  - ThemeManager 클래스 완성
  - data-theme="dark" 방식으로 색상 정의 완료
  - 토글 기능 연동 완료

### 2025-11-13

- TODO.md 전면 개편 및 간소화 (659줄 → ~150줄)
- 현재 작업 섹션 추가 (work-session 통합)
- 불필요한 코드 예시 제거
- "안녕" 워크플로우 룰 설정 완료

### 2025-11-12

- Semantic Token 시스템 완성 (140개 토큰)
- variables.css 고도화 (Success/Error/Warning/Info/Essential 스케일)
- Surface/Elevation 시스템 추가
- WCAG 2.1 접근성 검증 완료

### 2025-11-11

- 컴포넌트 스크립트 시스템 완성 (13개 분리)
- 통합 빌드 시스템 구축
- 문서 전체 업데이트

---

> 💬 **Note**: 이 TODO는 현재 작업 상태를 반영하는 살아있는 문서입니다.

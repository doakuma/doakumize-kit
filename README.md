# Component Studio 📦

다양한 프레임워크와 라이브러리를 지원하는 **통합 디자인 시스템 & 컴포넌트 가이드** 프로젝트입니다.

## 🎯 프로젝트 개요

Component Studio은 하나의 디자인 시스템을 여러 기술 스택에서 일관되게 사용할 수 있도록 지원하는 컴포넌트 라이브러리 모음입니다. 각 기술 스택별로 독립적인 가이드를 제공하며, 동일한 디자인 토큰과 원칙을 공유합니다.

## 📚 지원 프레임워크

### ✅ 현재 지원

#### Vanilla (HTML + JavaScript)

- **경로**: `vanillia/`
- **상태**: ✅ 사용 가능
- **설명**: 순수 HTML, CSS, JavaScript 기반의 컴포넌트 시스템
- **특징**:
  - Component Engine 패턴 사용
  - JSON 기반 컴포넌트 렌더링
  - 프레임워크 의존성 없음
- **문서**: [vanillia/README.md](./vanillia/README.md)

### 🚧 예정

#### React

- **경로**: `react/` (예정)
- **상태**: 🚧 개발 예정
- **설명**: React 기반 컴포넌트 라이브러리

#### Material-UI (MUI)

- **경로**: `mui/` (예정)
- **상태**: 🚧 개발 예정
- **설명**: MUI 기반 컴포넌트 커스터마이징 가이드

## 🎨 디자인 시스템 원칙

모든 프레임워크 구현체는 다음 원칙을 공유합니다:

### 1. 디자인 토큰 (Design Tokens)

- **Color**: Primary, Secondary, Gray Scale, Semantic Colors
- **Typography**: Heading, Body, Sub 등 일관된 폰트 시스템
- **Spacing**: 8px 기반 간격 시스템
- **Border Radius**: 4px, 8px, 12px 등 일관된 라운드 처리

### 2. 컴포넌트 카테고리

- **기본 요소**: Button, Input, Checkbox, Radio 등
- **레이아웃**: Modal, Tab, Accordion 등
- **데이터 표시**: Table, Card, Typography 등
- **네비게이션**: Dropdown, Chip 등
- **피드백**: Popover, Toast 등

### 3. 접근성 (Accessibility)

- WCAG 2.1 AA 수준 준수
- 키보드 네비게이션 지원
- 스크린 리더 호환성

## 🚀 시작하기

각 프레임워크별 디렉토리의 README를 참고하세요:

```bash
# Vanilla 버전 사용
cd vanillia/
# vanillia/README.md 참고

# React 버전 사용 (예정)
cd react/
# react/README.md 참고

# MUI 버전 사용 (예정)
cd mui/
# mui/README.md 참고
```

## 📂 프로젝트 구조

```
doakumize-kit/
├── README.md                 # 이 파일
├── vanillia/                 # Vanilla JS 구현체
│   ├── components/
│   ├── resources/
│   └── README.md
├── react/                    # React 구현체 (예정)
│   ├── src/
│   └── README.md
└── mui/                      # MUI 구현체 (예정)
    ├── src/
    └── README.md
```

## 🤝 기여하기

새로운 프레임워크 지원이나 컴포넌트 추가를 원하시면 이슈를 등록해주세요.

### 개발 원칙

- **일관성**: 모든 구현체는 동일한 디자인 토큰 사용
- **독립성**: 각 프레임워크는 독립적으로 동작
- **확장성**: 새로운 프레임워크 추가가 용이한 구조
- **접근성**: 모든 컴포넌트는 접근성 가이드라인 준수

## 📄 라이선스

이 프로젝트는 [LICENSE](./LICENSE) 파일을 참고하세요.

---

**현재 버전**: 1.0.0 (Vanilla만 지원)
**마지막 업데이트**: 2025-10-21

# 🎨 Component Studio

> 동일한 디자인 시스템을 여러 프레임워크로 제공하는 UI 컴포넌트 라이브러리

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)]()

## 📖 소개

Component Studio는 **화면 뼈대 제작을 위한 UI 컴포넌트 라이브러리**입니다.  
같은 디자인을 Vanilla JS, React, MUI 등 여러 프레임워크로 제공하여 빠른 프로토타이핑과 일관된 사용자 경험을 지원합니다.

### ✨ 주요 특징

- 🎨 **일관된 디자인 토큰**: CSS Variables 기반 중앙 관리
- 🔄 **동일한 디자인**: 모든 프레임워크에서 같은 UI
- 📋 **복사 & 붙여넣기**: npm 설치 없이 즉시 사용
- ⚡ **빠른 프로토타이핑**: 화면 뼈대를 빠르게 구축
- 🧩 **풍부한 컴포넌트**: 22개 이상의 다양한 UI 컴포넌트

## 🚀 빠른 시작

### 1. 프레임워크 선택

프로젝트 루트의 `index.html`을 열어 사용할 프레임워크를 선택하세요:

- **Vanilla JavaScript** ✅ 사용 가능
- **React** 🚧 준비 중
- **MUI** 📅 계획 중

### 2. Vanilla JS 사용 예시

```html
<!-- 1. CSS Variables 로드 -->
<link rel="stylesheet" href="shared/styles/variables.css">
<link rel="stylesheet" href="vanillia/components/styles/components.css">

<!-- 2. HTML 컴포넌트 사용 -->
<button class="btn btn--primary btn--medium">
  Primary Button
</button>

<!-- 3. 인터랙티브 컴포넌트 스크립트 -->
<script src="vanillia/components/scripts/modal.js"></script>
```

### 3. 커스터마이징

CSS Variables만 수정하면 전체 디자인을 쉽게 변경할 수 있습니다:

```css
/* shared/styles/variables.css */
:root {
  --primary-h: 190;      /* Cyan → Orange로 변경 */
  --primary-s: 70%;
  /* 전체 primary 스케일이 자동으로 업데이트됩니다 */
}
```

## 📚 문서

### 아키텍처

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - 프로젝트 전체 구조 및 설계 철학
- **[vanillia/docs/INDEX.md](vanillia/docs/INDEX.md)** - Vanilla 버전 가이드
- **[vanillia/docs/COMPONENT_SCRIPT_GUIDE.md](vanillia/docs/COMPONENT_SCRIPT_GUIDE.md)** - 컴포넌트 스크립트 작성법

### 디자인 시스템

- **[shared/styles/variables.css](shared/styles/variables.css)** - 디자인 토큰 정의
  - 140개 이상의 Semantic Token
  - HSL 기반 동적 컬러 시스템
  - 다크모드 지원

### 작업 현황

- **[.work-session.md](.work-session.md)** - 현재 작업 세션 (단기)
- **[vanillia/TODO.md](vanillia/TODO.md)** - 프로젝트 전체 계획 (장기)

## 🗂️ 프로젝트 구조

```
component-studio/
├── index.html                   # 메인 랜딩 페이지
├── ARCHITECTURE.md              # 아키텍처 문서
│
├── shared/                      # 🌟 공통 리소스
│   ├── styles/
│   │   ├── variables.css        # 디자인 토큰
│   │   ├── normalize.css        # CSS Reset
│   │   └── animations.css       # 공통 애니메이션
│   └── images/                  # 공통 이미지
│
├── vanillia/                    # Vanilla JS 구현
│   ├── components.html          # 컴포넌트 카탈로그
│   ├── generator.html           # 컴포넌트 생성기
│   └── ...
│
├── react/                       # React 구현 (예정)
└── mui/                         # MUI 구현 (예정)
```

자세한 구조는 [ARCHITECTURE.md](ARCHITECTURE.md)를 참고하세요.

## 🧩 컴포넌트 목록

### Foundation (기초)
- Color, Spacing, Icon, Typography

### Form Controls (폼 컨트롤)
- Button, Input, Checkbox, Radio, Dropdown
- Slider, Switch, Textarea, File Upload, Date Picker

### Data Display (데이터 표시)
- Chip, Table, File Card, Badge, Tooltip

### Feedback (피드백)
- Modal, Popover

### Navigation (네비게이션)
- Tab, Accordion

> 📌 **소스 오브 트루스**: `shared/data/components-config.js`

## 🛠️ 개발 환경

### Vanilla JS

```bash
# 의존성 설치 (빌드 스크립트용)
cd vanillia
npm install

# 컴포넌트 빌드
npm run build

# 로컬 서버 실행 (선택)
npx http-server . -p 8080
```

### React (예정)

```bash
cd react
npm install
npm run dev
```

## 🎯 로드맵

### Phase 1: Vanilla 완성 (현재)
- ✅ 22개 컴포넌트 구현 완료
- 🚧 shared 폴더 구조 변경
- 🚧 경로 수정 및 테스트

### Phase 2: React 버전 (12월)
- React 컴포넌트 작성
- CSS Variables 활용
- Storybook 또는 독립 페이지

### Phase 3: 공통 구조 추출 (1월)
- Vanilla + React 비교 후 공통점 파악
- 메타데이터 추출 고려
- 자동화 도구 검토

### Phase 4: MUI 버전 (2월)
- MUI Theme을 variables.css 기반 생성
- 빠른 구현 (패턴 확립됨)

## 🤝 기여하기

현재 개발 중인 프로젝트입니다. 기여 가이드라인은 추후 추가될 예정입니다.

## 📄 라이선스

MIT License - 자유롭게 사용하세요!

## 👤 만든이

**Doakumize Kit Team**

- GitHub: [your-repo-link]
- Email: your-email@example.com

---

**Last Updated:** 2025-11-14  
**Version:** 1.0.0

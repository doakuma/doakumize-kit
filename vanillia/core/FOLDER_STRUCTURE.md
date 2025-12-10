# 📁 Core 폴더 구조 정책

**Core 폴더는 프로젝트 진행 시 사용할 Scaffolder 역할**을 수행합니다.  
빌드 시스템이 자동으로 생성하는 파일과 수동으로 관리하는 파일을 명확히 구분하는 정책입니다.

## 🎯 핵심 원칙

1. **빌드 결과물은 `resources/` 폴더로 통합**
   - 스크립트, 이미지, 스타일 모두 `resources/` 아래에 위치
   - 프로젝트에 복사할 때 `resources/` 폴더만 복사하면 됨

2. **컴포넌트 가이드 페이지는 `core/` 루트에 존재**
   - `viewer/` 폴더는 가이드 페이지용
   - 빌드 시 보존 (수동 관리 파일)

3. **빌드 시 자동 정리 vs 보존 파일 구분**

---

## 📂 폴더 구조 (2025-11-17)

```
core/
├── resources/              # 🟢 빌드 결과물 통합 폴더 (프로젝트에 복사할 리소스)
│   ├── styles/             # 🟢 빌드된 CSS 파일
│   │   ├── items/            # 🟢 개별 컴포넌트 CSS (빌드 시 보존)
│   │   │   ├── button.css
│   │   │   ├── input.css
│   │   │   └── ...
│   │   ├── components.css    # 🔴 자동 생성 (빌드 시 재생성)
│   │   ├── common.css        # 🔴 자동 생성 (빌드 시 재생성)
│   │   ├── normalize.css     # 🟢 빌드 결과물 (shared에서 복사)
│   │   ├── variables.css     # 🟢 빌드 결과물 (shared에서 복사)
│   │   ├── base.css          # 🟢 빌드 결과물 (shared에서 복사)
│   │   ├── animations.css    # 🟢 빌드 결과물 (shared에서 복사)
│   │   └── scrollbar.css     # 🟢 빌드 결과물 (shared에서 복사)
│   ├── scripts/            # 🟢 빌드된 JavaScript 파일
│   │   └── components.js     # 🟢 빌드 결과물 (빌드 시 재생성)
│   └── images/             # 🟢 빌드된 이미지 파일
│       └── icons/
│           └── *.png
│
├── viewer/                 # 🔵 수동 관리 (컴포넌트 가이드 페이지)
│   ├── index.html         # 🔵 가이드 페이지 HTML
│   ├── examples.js          # 🔴 빌드 결과물 (build-scripts.js로 자동 생성)
│   ├── viewer.js            # 🔵 뷰어 로직
│   ├── viewer.css           # 🔵 뷰어 스타일
│   └── README.md            # 🔵 뷰어 사용 가이드
│
├── README.md                # 🔵 사용 가이드 (프로젝트 적용 방법)
└── FOLDER_STRUCTURE.md      # 🔵 폴더 구조 정책 (이 파일)
```

### 색상 코드

- 🟢 **빌드 결과물**: 빌드 스크립트가 자동으로 생성/복사하는 파일
- 🔴 **자동 생성 허브**: 빌드 스크립트가 자동으로 생성하는 통합 파일
- 🔵 **수동 관리**: 개발자가 직접 작성/수정하는 파일 (빌드 시 보존)

---

## 🔄 빌드 정책

### 빌드 시 자동 정리 (Clean)

**build-styles.js**가 자동으로 정리하는 항목:

1. ✅ **`core/resources/styles/` 폴더의 CSS 파일** (단, `items/` 폴더 제외)
   - `components.css`, `common.css` 등 자동 생성 파일 삭제
   - `normalize.css`, `variables.css` 등 base 파일 삭제

2. ✅ **`core/resources/images/` 폴더 전체** (모든 파일 및 하위 폴더 삭제)

3. ❌ **`core/resources/styles/items/` 폴더는 보존**
   - 빌드 스크립트가 개별적으로 처리하므로 빌드 전 정리에서 제외

**build-scripts.js**가 생성하는 항목:

1. ✅ **`core/resources/scripts/components.js`** (빌드 시 재생성)
2. ✅ **`core/viewer/examples.js`** (빌드 시 재생성)
   - `components/data/*.data.js` 파일들을 파싱하여 컴포넌트 예제 데이터 생성
   - 카테고리 정보, 모달 HTML 등 포함

### 빌드 시 보존되는 항목

다음 항목들은 빌드 스크립트가 건드리지 않아:

- ✅ `core/viewer/` 폴더 (단, `examples.js`는 빌드 시 재생성됨)
- ✅ `core/viewer/index.html`, `viewer.js`, `viewer.css`, `README.md` (수동 관리 파일)
- ✅ `core/README.md` 파일
- ✅ `core/FOLDER_STRUCTURE.md` 파일

---

## 📋 폴더 역할 명확화

| 폴더/파일 | 역할 | 빌드 정책 | 관리 방식 | 프로젝트 복사 여부 |
|-----------|------|-----------|-----------|-------------------|
| `resources/styles/` | 빌드된 CSS 파일 | 빌드 시 정리 + 재생성 | 자동 | ✅ 복사 필요 |
| `resources/styles/items/` | 개별 컴포넌트 CSS | 빌드 시 복사 | 자동 | ✅ 복사 필요 |
| `resources/scripts/` | 빌드된 JS 파일 | 빌드 시 재생성 | 자동 | ✅ 복사 필요 |
| `resources/images/` | 아이콘 이미지 | 빌드 시 정리 + 복사 | 자동 | ✅ 복사 필요 |
| `viewer/` | 컴포넌트 가이드 페이지 | 빌드 시 보존 (단, examples.js는 재생성) | 수동/자동 | ❌ 선택적 |
| `viewer/examples.js` | 컴포넌트 예제 데이터 | 빌드 시 재생성 | 자동 | ❌ 선택적 |
| `README.md` | 사용 가이드 | 빌드 시 보존 | 수동 | ❌ 문서만 |

---

## 🚀 사용 시나리오

### 시나리오 1: 프로젝트에 복사 (일반 사용)

```bash
# core/resources/ 폴더를 프로젝트 assets/로 복사
cp -r core/resources/ my-project/assets/
```

**결과:**
```
my-project/assets/
├── styles/
│   ├── common.css
│   ├── components.css
│   └── ...
├── scripts/
│   └── components.js
└── images/
    └── icons/
```

### 시나리오 2: 컴포넌트 가이드 페이지 확인

```bash
# viewer/index.html 열기
open core/viewer/index.html
```

**참고:** viewer는 프로젝트에 복사하지 않고, 개발 중 컴포넌트 확인용으로 사용

---

## 📝 빌드 워크플로우

```
1️⃣ 개발
   shared/styles/ 수정
   components/scripts/ 수정
   ↓

2️⃣ 빌드
   npm run build
   ↓
   shared/styles → core/resources/styles/
   components/scripts → core/resources/scripts/
   shared/images → core/resources/images/
   ↓

3️⃣ 프로젝트 복사
   cp -r core/resources/ my-project/assets/
   또는
   node scripts/copy-to-project.js ../my-project/assets
```

---

## 💡 핵심 개념

### 1. Scaffolder 역할

**Core 폴더는 프로젝트 생성 시 복사할 파일들을 모아놓은 Scaffolder**입니다:
- `resources/` 폴더 전체를 프로젝트에 복사
- 빌드 스크립트가 최신 파일로 자동 업데이트
- 프로젝트에서 바로 사용 가능한 구조로 제공

### 2. Resources 통합

**모든 리소스(스타일, 스크립트, 이미지)를 `resources/` 아래로 통합:**
- 프로젝트 복사 시 한 폴더만 복사하면 됨
- 경로가 명확하고 단순함
- 구조가 직관적임

### 3. Viewer 분리

**컴포넌트 가이드 페이지(`viewer/`)는 별도 관리:**
- 프로젝트에 복사할 필요 없음
- 개발 중 컴포넌트 확인용으로만 사용
- 빌드 시 보존됨 (수동 관리 파일)

---

## 🛠️ 빌드 명령어

```bash
# CSS 빌드 (shared/styles → core/resources/styles)
npm run build:styles

# JavaScript 빌드 (components/scripts → core/resources/scripts + examples.js 생성)
npm run build

# 전체 빌드 (CSS + JavaScript)
npm run build:styles && npm run build

# Core 폴더 정리 (빌드 결과물 삭제, viewer/와 문서 파일 보존)
npm run clean:core

# Core 폴더 완전 정리 (모든 파일 삭제)
npm run clean:core -- --all
```

---

## 📖 참고 문서

- **사용 가이드**: [README.md](README.md)
- **빌드 스크립트**: `vanillia/scripts/build-styles.js`, `build-scripts.js`
- **소스**: `shared/styles/`, `components/scripts/`

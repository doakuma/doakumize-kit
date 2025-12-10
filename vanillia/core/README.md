# 🎨 Doakumize Kit - Core Package

**프로젝트 진행 시 사용할 Scaffolder 역할**을 하는 패키지입니다.  
실제 프로젝트에 복사해서 사용할 수 있는 핵심 파일들만 모아놓았습니다.

## 📦 포함된 파일

```
core/
  ├── resources/             # 🎯 프로젝트에 복사할 리소스 통합 폴더
  │   ├── styles/              # 빌드된 스타일 파일
  │   │   ├── common.css       # Import 통합 허브 (진입점)
  │   │   ├── components.css   # 컴포넌트 Import 허브 (자동 생성)
  │   │   ├── items/           # 개별 컴포넌트 CSS 파일
  │   │   │   ├── button.css
  │   │   │   ├── input.css
  │   │   │   ├── modal.css
  │   │   │   ├── dropdown.css
  │   │   │   ├── icons.css
  │   │   │   └── all-other-components.css
  │   │   ├── base.css         # 기본 스타일 (*, html, body)
  │   │   ├── animations.css   # 애니메이션 (steam, loading)
  │   │   ├── scrollbar.css    # 스크롤바 커스터마이징 (선택적)
  │   │   ├── normalize.css    # CSS Reset
  │   │   └── variables.css    # 디자인 토큰 (색상, 타이포그래피, 간격)
  │   ├── scripts/             # 빌드된 JavaScript 파일
  │   │   └── components.js    # 모든 컴포넌트 스크립트 통합 파일 (~90KB)
  │   └── images/              # 아이콘 이미지 (101개)
  │       └── icons/
  │           └── *.png
  │
  ├── viewer/                 # 📖 컴포넌트 가이드 뷰어 (개발 확인용)
  │   ├── index.html           # 뷰어 페이지
  │   ├── examples.js          # 컴포넌트 예제 데이터 (빌드 시 자동 생성)
  │   ├── viewer.js            # 뷰어 로직
  │   ├── viewer.css           # 뷰어 스타일
  │   └── README.md            # 뷰어 사용 가이드
  │
  ├── README.md                # 이 파일
  └── FOLDER_STRUCTURE.md      # 폴더 구조 정책 문서
```

## 🚀 빠른 시작

### 방법 1: Component Generator 사용 (선택적) 🆕

필요한 컴포넌트만 선택하여 다운로드:

1. **Generator 페이지** 열기
   - 온라인: https://doakuma.github.io/doakumize-kit/vanillia/generator.html
   - 로컬: `vanillia/generator.html`

2. **컴포넌트 선택**
   - Button, Input, Modal 등 필요한 것만 체크

3. **Download Package (ZIP)** 클릭

4. **압축 해제 후 복사**
   ```
   doakumize-components-[timestamp].zip
   ├── examples.js              → core/viewer/examples.js (선택적)
   └── styles/                  → core/resources/styles/
       ├── common.css           # 통합 허브
       ├── components.css       # 컴포넌트 허브 (선택한 것만)
       ├── items/               # 개별 컴포넌트 파일
       │   ├── button.css
       │   ├── input.css
       │   └── ...
       ├── base.css
       ├── animations.css
       └── ...
   ```

💡 **참고**: `examples.js`는 빌드 시 자동 생성되므로 Generator 사용은 선택적입니다.

### 방법 2: CLI 도구 사용 (전체 복사) ⭐ **권장**

**`core/resources/` 폴더를 프로젝트에 복사:**

```bash
# CLI 도구 사용 (core/resources/ → 프로젝트/assets/)
cd vanillia
npm run copy ../my-project/assets

# 또는 수동 복사
cp -r vanillia/core/resources/* my-project/assets/
```

**💡 참고:** `viewer/` 폴더는 프로젝트에 복사하지 않아도 됩니다. (개발 확인용)

### 2. HTML에 포함

```html
<!DOCTYPE html>
<html>
<head>
  <!-- 스타일 (common.css 하나면 충분!) -->
  <link rel="stylesheet" href="assets/styles/common.css">
</head>
<body>
  <!-- 컴포넌트 사용 -->
  <button class="btn btn--primary">Primary Button</button>
  
  <!-- 스크립트 -->
  <script src="assets/scripts/components.js"></script>
  <script>
    // 컴포넌트 초기화
    window.VanillaComponents.initAll();
  </script>
</body>
</html>
```

### 3. 사용하기

```html
<!-- 버튼 -->
<button class="btn btn--primary btn--medium">Click me</button>

<!-- 인풋 -->
<div class="input">
  <input type="text" class="input__field" placeholder="Enter text">
</div>

<!-- 드롭다운 -->
<div class="dropdown" data-dropdown>
  <button class="dropdown__trigger">Select</button>
  <div class="dropdown__menu">
    <div class="dropdown__item">Option 1</div>
    <div class="dropdown__item">Option 2</div>
  </div>
</div>

<!-- 모달 -->
<button data-modal-open="myModal">Open Modal</button>
<div id="myModal" class="modal">
  <div class="modal__content">
    <h2>Modal Title</h2>
    <p>Modal content here</p>
  </div>
</div>
```

## 🎨 디자인 토큰 사용

`variables.css`에 정의된 CSS 변수를 사용하여 커스터마이징이 쉽습니다:

```css
/* 색상 */
.my-component {
  background: var(--primary-600);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

/* 타이포그래피 */
.my-title {
  font: var(--h2);
  color: var(--text-primary);
}

/* 간격 */
.my-box {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}
```

### 주요 디자인 토큰 (총 ~140개)

**Primitive Colors (기본 색상 스케일)**
- `--gray-0` ~ `--gray-900` - 그레이스케일 (11단계)
- `--primary-50` ~ `--primary-900` - 메인 컬러 (10단계)
- `--secondary-50` ~ `--secondary-900` - 보조 컬러 (10단계)

**Semantic Colors (의미 색상 스케일)** 🆕
- `--success-50` ~ `--success-900` - 성공/완료 (Green, 10단계)
- `--error-50` ~ `--error-900` - 오류/위험 (Red, 10단계)
- `--warning-50` ~ `--warning-900` - 경고/주의 (Yellow, 10단계)
- `--info-50` ~ `--info-900` - 정보/안내 (Blue, 10단계)
- `--essential-50` ~ `--essential-900` - 브랜드 강조 (Pink, 10단계)

**Surface & Elevation** 🆕
- `--surface-page`, `--surface-base`, `--surface-raised`, `--surface-overlay`
- `--surface-hover`, `--surface-active`, `--surface-disabled`
- `--elevation-0` ~ `--elevation-4` - 그림자 (5단계)

**Text Colors**
- `--text-primary`, `--text-secondary`, `--text-tertiary` - 계층 구조
- `--text-link`, `--text-link-hover`, `--text-link-visited` - 링크 🆕
- `--text-success`, `--text-error`, `--text-warning`, `--text-info` - Semantic 🆕

**Border Colors**
- `--border-subtle`, `--border-default`, `--border-strong` - 계층 구조 🆕
- `--border-focus`, `--border-hover` - 상태 🆕
- `--border-success`, `--border-error`, `--border-warning`, `--border-info` - Semantic 🆕

**Interactive Colors** 🆕
- `--interactive-default`, `--interactive-hover`, `--interactive-active`
- `--interactive-bg-*`, `--interactive-text-*` - 상태별 세트

**타이포그래피**
- `--h1` ~ `--h5` - 제목
- `--body-lg`, `--body-md`, `--body-sm` - 본문
- `--sub-sb-*`, `--sub-md-*` - 서브 텍스트

**간격**
- `--spacing-xs` (4px), `--spacing-sm` (8px), `--spacing-md` (16px)
- `--spacing-lg` (24px), `--spacing-xl` (32px)
- `--spacing-0` ~ `--spacing-15` - 세밀한 조정 가능

## 📚 사용 가능한 컴포넌트

### ✅ 완성된 컴포넌트 (15개)

**Foundation**
- Typography - 타이포그래피 시스템
- Icon - 아이콘 세트

**Form Controls**
- Button - 버튼
- Input - 텍스트 입력
- Checkbox - 체크박스
- Radio - 라디오 버튼
- Dropdown - 드롭다운
- Slider - 슬라이더

**Data Display**
- Chip - 태그/칩
- Table - 데이터 테이블
- File Card - 파일 카드

**Feedback**
- Modal - 모달
- Popover - 팝오버

**Navigation**
- Tab - 탭
- Accordion - 아코디언

### 📖 상세 가이드

각 컴포넌트의 사용법은 [컴포넌트 스튜디오](https://doakuma.github.io/doakumize-kit/vanillia/components.html)에서 확인할 수 있습니다.

## 🛠️ 커스터마이징

### 1. 디자인 토큰 변경

`variables.css`를 수정하거나 덮어쓰기:

```css
/* 프로젝트 스타일 */
:root {
  /* 브랜드 컬러로 변경 */
  --primary-600: #0066cc;
  --primary-700: #0052a3;
  
  /* 폰트 변경 */
  --font-family: 'Noto Sans KR', sans-serif;
}
```

### 2. 컴포넌트 선택적 로드

`components.css`에서 필요없는 컴포넌트를 주석 처리:

```css
/* components.css */
@import url(items/button.css);
@import url(items/input.css);
/* @import url(items/modal.css); */  ← 모달 사용 안 하면 주석!
@import url(items/dropdown.css);
@import url(items/icons.css);
```

**장점:** 사용하지 않는 CSS가 로드되지 않아 용량을 절감할 수 있습니다.

### 3. 개별 컴포넌트 스타일 수정

`items/` 폴더의 개별 파일을 직접 수정:

```css
/* items/button.css 수정 */
.btn--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
}
```

**또는** 별도 CSS로 덮어쓰기:

```html
<link rel="stylesheet" href="assets/styles/common.css">
<link rel="stylesheet" href="assets/custom.css">  <!-- 커스텀 스타일 -->
```

## 📁 파일 크기

- `resources/scripts/components.js` - ~90KB (압축 전)
- `resources/styles/items/` - ~120KB (6개 컴포넌트 파일)
- `resources/styles/components.css` - ~1KB (Import 허브)
- `resources/styles/variables.css` - ~9KB (디자인 토큰)
- `resources/styles/common.css` - ~1KB (통합 허브)
- `resources/styles/` 기타 - ~9KB (base, animations, scrollbar, normalize)
- `resources/images/` - ~500KB (101개 아이콘)

**전체**: ~730KB (압축 전), gzip 후 약 ~180KB

💡 **용량 최적화:** `components.css`에서 미사용 컴포넌트를 주석 처리하면 실제 로드 용량 감소!

## 🔄 업데이트 방법

새 버전이 나오면:

1. 기존 core 폴더 백업
2. 새 core 폴더로 교체
3. 커스터마이징한 부분 다시 적용

## 💡 핵심 개념: Import 허브 방식

이 패키지는 **Import 허브 방식**을 사용하여 유연함과 성능을 동시에 제공합니다:

**common.css** (통합 허브)
```css
@import url(normalize.css);
@import url(variables.css);
@import url(base.css);
@import url(animations.css);
@import url(components.css);  ← 이게 포인트!
```

**components.css** (컴포넌트 허브)
```css
@import url(items/button.css);
@import url(items/input.css);
@import url(items/modal.css);
/* ... */
```

**장점:**
- ✅ HTML에서 하나만 로드: `<link rel="stylesheet" href="common.css">`
- ✅ 필요한 것만 선택 가능: components.css에서 주석 처리
- ✅ 개별 수정 쉬움: items/ 폴더의 파일만 수정
- ✅ 브라우저 캐싱 효율적: 파일별로 캐시됨

## ⚠️ 주의사항

- `resources/` 폴더 내 파일들은 자동 생성 파일이므로 직접 수정하지 마세요
- 수정이 필요하면 원본 소스(`shared/styles/`, `components/scripts/`)를 수정하고 다시 빌드하세요
- 아이콘은 mask-image 방식이라 `background-color`로 색상 변경이 가능합니다
- `components.css`는 `build-styles.js` 또는 Generator로 자동 생성됩니다
- **`viewer/examples.js`는 빌드 시 자동 생성**되므로 직접 수정하지 마세요
- **`viewer/` 폴더의 나머지 파일들**(`index.html`, `viewer.js`, `viewer.css`)은 수동 관리 파일이므로 빌드 시 보존됩니다

## 📋 폴더 구조 정책

자세한 폴더 구조 정책은 [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md)를 참고하세요!

**핵심 원칙:**
- 🎯 **`resources/` 폴더**: 프로젝트에 복사할 빌드 결과물 통합
- 📖 **`viewer/` 폴더**: 컴포넌트 가이드 페이지 (개발 확인용, 프로젝트 복사 불필요)

## 💡 도움말

- **컴포넌트 예시**: [Demo Page](https://doakuma.github.io/doakumize-kit/vanillia/components.html)
- **상세 가이드**: [HOW_TO_USE.md](../docs/HOW_TO_USE.md)
- **이슈 리포트**: [GitHub Issues](https://github.com/doakuma/doakumize-kit/issues)

---

**Zero Dependencies** | **Vanilla JavaScript** | **CSS Variables**

Made with ❤️ by Doakuma


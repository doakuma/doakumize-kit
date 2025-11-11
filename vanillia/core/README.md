# 🎨 Doakumize Kit - Core Package

실제 프로젝트에서 사용할 수 있는 핵심 파일들만 모아놓은 패키지야!

## 📦 포함된 파일

```
core/
  ├── components.js          # 모든 컴포넌트 스크립트 통합 파일
  ├── styles/
  │   ├── variables.css      # 디자인 토큰 (색상, 타이포그래피)
  │   ├── common.css         # 공통 기본 스타일
  │   ├── normalize.css      # CSS 리셋
  │   └── components.css     # 모든 컴포넌트 스타일
  └── images/                # 아이콘 이미지 (101개)
      └── *.png
```

## 🚀 빠른 시작

### 1. 파일 복사

이 폴더를 통째로 프로젝트에 복사해:

```bash
# CLI 도구 사용 (추천)
npx doakumize-kit copy

# 또는 수동 복사
cp -r vanillia/core/* my-project/assets/
```

### 2. HTML에 포함

```html
<!DOCTYPE html>
<html>
<head>
  <!-- 스타일 -->
  <link rel="stylesheet" href="assets/styles/normalize.css">
  <link rel="stylesheet" href="assets/styles/variables.css">
  <link rel="stylesheet" href="assets/styles/common.css">
  <link rel="stylesheet" href="assets/styles/components.css">
</head>
<body>
  <!-- 컴포넌트 사용 -->
  <button class="btn btn--primary">Primary Button</button>
  
  <!-- 스크립트 -->
  <script src="assets/components.js"></script>
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

`variables.css`에 정의된 CSS 변수를 사용해서 커스터마이징이 쉬워:

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

### 주요 디자인 토큰

**색상**
- `--primary-600`, `--primary-700` - 메인 컬러
- `--secondary-600`, `--secondary-700` - 보조 컬러
- `--gray-50` ~ `--gray-900` - 그레이스케일
- `--text-primary`, `--text-secondary` - 텍스트 색상
- `--bg-primary`, `--bg-secondary` - 배경 색상
- `--border-primary`, `--border-secondary` - 테두리 색상

**타이포그래피**
- `--h1` ~ `--h5` - 제목
- `--body-lg`, `--body-md`, `--body-sm` - 본문
- `--sub-sb-14`, `--sub-md-12` - 서브 텍스트

**간격**
- `--spacing-xs` (4px), `--spacing-sm` (8px), `--spacing-md` (16px)
- `--spacing-lg` (24px), `--spacing-xl` (32px)

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

각 컴포넌트의 사용법은 [컴포넌트 스튜디오](https://doakuma.github.io/doakumize-kit/vanillia/components.html)에서 확인할 수 있어!

## 🛠️ 커스터마이징

### 디자인 토큰 변경

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

### 개별 컴포넌트 스타일 수정

`components.css`를 직접 수정하거나, 별도 CSS로 덮어쓰기:

```css
/* 버튼 커스텀 */
.btn--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
}
```

## 📁 파일 크기

- `components.js` - ~90KB (압축 전)
- `components.css` - ~180KB (압축 전)
- `variables.css` - ~10KB
- `common.css` - ~5KB
- `images/` - ~500KB (101개 아이콘)

**전체**: ~785KB (압축 전), gzip 후 약 ~200KB

## 🔄 업데이트 방법

새 버전이 나오면:

1. 기존 core 폴더 백업
2. 새 core 폴더로 교체
3. 커스터마이징한 부분 다시 적용

## ⚠️ 주의사항

- `components.js`는 자동 생성 파일이므로 직접 수정하지 마세요
- 수정이 필요하면 원본 소스(`components/scripts/`)를 수정하고 다시 빌드하세요
- 아이콘은 mask-image 방식이라 `background-color`로 색상 변경 가능해요

## 💡 도움말

- **컴포넌트 예시**: [Demo Page](https://doakuma.github.io/doakumize-kit/vanillia/components.html)
- **상세 가이드**: [HOW_TO_USE.md](../docs/HOW_TO_USE.md)
- **이슈 리포트**: [GitHub Issues](https://github.com/doakuma/doakumize-kit/issues)

---

**Zero Dependencies** | **Vanilla JavaScript** | **CSS Variables**

Made with ❤️ by Doakuma


# Phase 1: 상세 작업 계획

> 📅 기간: 2025-11 (현재)  
> 🎯 목표: Vanilla 완성 & 공통 리소스 분리

## 📋 체크리스트

### 1️⃣ 공통 리소스 분리

#### 1.1 폴더 구조 생성
- [ ] `shared/` 폴더 생성
- [ ] `shared/styles/` 폴더 생성
- [ ] `shared/images/` 폴더 생성
- [ ] `shared/images/icons/` 폴더 생성

#### 1.2 파일 이동

**CSS 파일:**
- [ ] `vanillia/components/styles/variables.css` → `shared/styles/variables.css`
- [ ] `vanillia/components/styles/normalize.css` → `shared/styles/normalize.css`
- [ ] `vanillia/components/styles/animations.css` → `shared/styles/animations.css`

**이미지 파일:**
- [ ] `vanillia/components/images/*.png` → `shared/images/icons/*.png` (101개 파일)
- [ ] 로고 파일 확인 및 이동 (있는 경우)

**백업:**
- [ ] 원본 파일 백업 (필요 시 복구용)

#### 1.3 경로 수정

**메인 페이지:**
- [ ] `index.html` - CSS 경로 수정
- [ ] `index.css` - 이미지 경로 수정 (있는 경우)

**Vanilla 페이지:**
- [ ] `vanillia/index.html` - CSS 경로 수정
- [ ] `vanillia/components.html` - CSS 경로 수정
- [ ] `vanillia/generator.html` - CSS 경로 수정

**Vanilla CSS 파일:**
- [ ] `vanillia/components/styles/base.css` - @import 경로 수정
- [ ] `vanillia/components/styles/common.css` - @import 경로 수정
- [ ] `vanillia/components/styles/layout.css` - 배경 이미지 경로 수정 (있는 경우)
- [ ] `vanillia/components/styles/items/*.css` - 아이콘 경로 수정

**Vanilla 데이터 파일:**
- [ ] `vanillia/components/data/icon.data.js` - 아이콘 경로 확인
- [ ] 기타 이미지 참조하는 데이터 파일 확인

#### 1.4 테스트

**페이지 로딩 테스트:**
- [ ] `index.html` 열기 → CSS 정상 로드 확인
- [ ] `vanillia/index.html` 열기 → 스타일 정상 표시 확인
- [ ] `vanillia/components.html` 열기 → 모든 컴포넌트 정상 표시
- [ ] `vanillia/generator.html` 열기 → 기능 정상 작동

**아이콘 표시 테스트:**
- [ ] 버튼 아이콘 정상 표시
- [ ] 네비게이션 아이콘 정상 표시
- [ ] 모든 컴포넌트 아이콘 정상 표시

**다크모드 테스트:**
- [ ] 다크모드 토글 → CSS Variables 정상 작동
- [ ] 색상 변경 정상 반영

**브라우저 콘솔 확인:**
- [ ] 404 에러 없음
- [ ] CSS 로딩 에러 없음
- [ ] 이미지 로딩 에러 없음

#### 1.5 정리

- [ ] 원본 파일 삭제 (백업 확인 후)
- [ ] 사용하지 않는 import 제거
- [ ] Git commit (변경사항 저장)

---

### 2️⃣ 문서 업데이트

- [x] `ARCHITECTURE.md` 생성
- [x] `README.md` 생성
- [x] `.work-session.md` 업데이트
- [x] `vanillia/TODO.md` 업데이트
- [ ] `vanillia/docs/INDEX.md` 업데이트 (shared 경로 반영)
- [ ] `vanillia/docs/HOW_TO_USE.md` 업데이트 (shared 경로 반영)

---

### 3️⃣ Generator 개선 (선택)

현재 `vanillia/generator.html`의 개선 사항:

#### UI/UX 개선
- [ ] 컴포넌트 선택 UI를 카드 방식으로 변경
- [ ] 미리보기 이미지 추가
- [ ] 선택 상태 시각화 개선
- [ ] 반응형 레이아웃 적용

#### 기능 추가
- [ ] 코드 복사 버튼 추가 (Clipboard API)
- [ ] 다운로드 전 미리보기 기능
- [ ] 선택한 컴포넌트 목록 표시
- [ ] 다크모드 지원

#### 코드 품질
- [ ] 코드 리팩토링 (generator.js 모듈화)
- [ ] 에러 핸들링 강화
- [ ] 로딩 상태 표시

---

## 🚀 실행 순서

### Step 1: 백업 및 준비
```bash
# Git 상태 확인
git status

# 현재 상태 커밋 (안전장치)
git add .
git commit -m "Phase 1 시작 전 백업"

# 새 브랜치 생성 (선택)
git checkout -b feature/shared-resources
```

### Step 2: 폴더 생성
```bash
mkdir shared
mkdir shared/styles
mkdir shared/images
mkdir shared/images/icons
```

### Step 3: 파일 복사 (삭제 전 안전하게)
```bash
# CSS 파일 복사
cp vanillia/components/styles/variables.css shared/styles/
cp vanillia/components/styles/normalize.css shared/styles/
cp vanillia/components/styles/animations.css shared/styles/

# 이미지 파일 복사
cp vanillia/components/images/*.png shared/images/icons/
```

### Step 4: 경로 수정
- 각 파일에서 경로 수정 (1.3 항목 참고)
- 정규식으로 일괄 변경 가능:
  - `vanillia/components/styles/variables.css` → `../shared/styles/variables.css`
  - `../images/` → `../../shared/images/icons/`

### Step 5: 테스트
- 브라우저에서 각 페이지 열어보기
- 콘솔 에러 확인
- 시각적 확인

### Step 6: 원본 삭제 (테스트 완료 후)
```bash
# CSS 파일 삭제
rm vanillia/components/styles/variables.css
rm vanillia/components/styles/normalize.css
rm vanillia/components/styles/animations.css

# 이미지 파일 삭제
rm vanillia/components/images/*.png
```

### Step 7: Commit
```bash
git add .
git commit -m "feat: shared 폴더로 공통 리소스 분리

- CSS Variables, normalize, animations를 shared/styles로 이동
- 아이콘 이미지를 shared/images/icons로 이동
- 모든 경로 수정 및 테스트 완료
"
```

---

## ⚠️ 주의사항

### 경로 변경 패턴

**AS-IS:**
```html
<!-- vanillia/components.html -->
<link rel="stylesheet" href="components/styles/variables.css">
```

**TO-BE:**
```html
<!-- vanillia/components.html -->
<link rel="stylesheet" href="../shared/styles/variables.css">
```

### 상대 경로 계산

| 파일 위치 | shared/styles까지 | shared/images까지 |
|----------|------------------|------------------|
| `index.html` | `shared/styles/` | `shared/images/` |
| `vanillia/index.html` | `../shared/styles/` | `../shared/images/` |
| `vanillia/components.html` | `../shared/styles/` | `../shared/images/` |
| `vanillia/components/styles/*.css` | `../../../shared/styles/` | `../../../shared/images/` |

### CSS에서 이미지 참조

**AS-IS:**
```css
.icon--plus {
  mask-image: url(../images/icon_plus.png);
}
```

**TO-BE:**
```css
.icon--plus {
  mask-image: url(../../../shared/images/icons/icon_plus.png);
}
```

### 잊지 말아야 할 것

1. **@import 경로** - CSS 파일 내부 import도 수정
2. **background-image** - 배경 이미지 경로
3. **mask-image** - 아이콘 마스크 이미지
4. **JS 내 경로** - data.js 파일에서 이미지 경로 참조 시
5. **상대 경로 깊이** - 파일 위치에 따라 `../` 개수 조정

---

## 📊 완료 기준

### Phase 1 완료 체크리스트

- [ ] ✅ shared 폴더 구조 완성
- [ ] ✅ CSS Variables 정상 로드
- [ ] ✅ 모든 아이콘 정상 표시
- [ ] ✅ Vanilla 페이지 모두 정상 작동
- [ ] ✅ 브라우저 콘솔 에러 없음
- [ ] ✅ 다크모드 정상 작동
- [ ] ✅ Git commit 완료
- [ ] ✅ 문서 업데이트 완료

---

## 🆘 트러블슈팅

### 자주 발생하는 문제

**Q1: CSS Variables가 로드되지 않음**
```
A: variables.css 경로 확인
   1. 상대 경로 깊이 확인 (../ 개수)
   2. 파일명 오타 확인
   3. 브라우저 콘솔에서 404 에러 확인
```

**Q2: 아이콘이 표시되지 않음**
```
A: mask-image 경로 확인
   1. CSS 파일 위치 확인
   2. 상대 경로 계산
   3. 파일명 대소문자 확인 (icon_plus vs Icon_Plus)
```

**Q3: 스타일이 깨짐**
```
A: CSS 로딩 순서 확인
   1. variables.css가 가장 먼저 로드되어야 함
   2. normalize.css 다음
   3. 컴포넌트 스타일 마지막
```

**Q4: Git 충돌**
```
A: 파일 이동이라 충돌 가능성 높음
   1. git status로 상태 확인
   2. git mv 사용 고려 (Git이 이동 추적)
   3. 충돌 발생 시 수동 해결
```

---

**Last Updated:** 2025-11-14  
**Next Phase:** Phase 2 (React 개발) - 2025-12


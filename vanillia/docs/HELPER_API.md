# Helper API 문서

컴포넌트 Helper API는 실제 개발에서 컴포넌트를 더 쉽게 사용할 수 있도록 도와주는 유틸리티 함수들입니다.

## 📊 전체 컴포넌트 Helper API 필요성 분석

| 우선순위 | 컴포넌트           | 필요성     | 주요 기능                           | Phase   |
| -------- | ------------------ | ---------- | ----------------------------------- | ------- |
| 1        | **Dropdown**       | ⭐⭐⭐⭐⭐ | 데이터 바인딩, 단일/멀티 선택, 검색 | Phase 1 |
| 2        | **File Upload**    | ⭐⭐⭐⭐⭐ | 파일 관리, 유효성 검사, 미리보기    | Phase 1 |
| 3        | **Input**          | ⭐⭐⭐⭐⭐ | 유효성 검사, 에러 처리, 값 관리     | Phase 1 |
| 4        | **Modal**          | ⭐⭐⭐⭐⭐ | 동적 콘텐츠, show/hide, 버튼 관리   | Phase 2 |
| 5        | **Tab**            | ⭐⭐⭐⭐   | 동적 탭 관리, 전환, 추가/제거       | Phase 2 |
| 6        | **Slider**         | ⭐⭐⭐⭐   | 값 범위 설정, 포맷팅, 단위 관리     | Phase 2 |
| 7        | **Checkbox Group** | ⭐⭐⭐     | 그룹 선택/해제, 값 수집             | Phase 3 |
| 8        | **Chip**           | ⭐⭐⭐     | 동적 생성/제거, 태그 관리           | Phase 3 |
| 9        | **Accordion**      | ⭐⭐⭐     | 펼침/접힘 제어, 그룹 관리           | Phase 3 |
| 10       | **Tooltip**        | ⭐⭐⭐     | 위치 제어, 동적 내용 변경           | Phase 3 |
| 11       | **Popover**        | ⭐⭐⭐     | 위치 조정, 동적 내용 변경           | Phase 3 |
| 12       | **File Card**      | ⭐⭐       | 진행률, 상태 관리                   | Phase 4 |
| -        | **Foundation**     | ❌         | 디자인 토큰 (Helper 불필요)         | -       |
| -        | **Button**         | ❌         | HTML 기본 기능으로 충분             | -       |
| -        | **Badge**          | ❌         | 단순 표시                           | -       |
| -        | **Radio**          | ❌         | 기본 이벤트로 충분                  | -       |
| -        | **Switch**         | ❌         | 기본 이벤트로 충분                  | -       |
| -        | **Datepicker**     | ❌         | 외부 라이브러리 (자체 API)          | -       |
| -        | **Table**          | ❌         | 현재 스크립트 없음                  | -       |

---

## 📋 구현 우선순위 및 필요성 분석

### 🔥 높음 (필수 - 자주 사용, 복잡한 데이터 다룸)

#### 1️⃣ Dropdown Helper API

**필요성:** ⭐⭐⭐⭐⭐ (최우선)

- 단일/멀티 선택 값 관리
- 데이터 바인딩 (AJAX 응답 처리)
- 검색 기능 제어

**기본 함수:**

- `getValue(dropdown)` - 단일 선택된 값 가져오기
- `getValues(dropdown)` - 멀티 선택된 값들 가져오기 (배열)
- `getText(dropdown)` - 선택된 항목의 텍스트 가져오기
- `setValue(dropdown, value)` - 프로그래밍으로 값 설정
- `setValues(dropdown, values)` - 멀티 선택 값들 설정 (배열)
- `clearSelection(dropdown)` - 선택 초기화

**데이터 바인딩:**

- `setItems(dropdown, items)` - 드롭다운 아이템 동적 생성
  ```javascript
  DropdownHelper.setItems(dropdown, [
    { value: "kr", text: "대한민국" },
    { value: "us", text: "미국" },
    { value: "jp", text: "일본", disabled: true },
  ]);
  ```
- `addItem(dropdown, item)` - 아이템 추가
- `removeItem(dropdown, value)` - 아이템 제거
- `updateItem(dropdown, value, item)` - 아이템 수정
- `getItems(dropdown)` - 모든 아이템 데이터 가져오기

**상태 관리:**

- `disable(dropdown)` - 드롭다운 비활성화
- `enable(dropdown)` - 드롭다운 활성화
- `isDisabled(dropdown)` - 비활성화 상태 확인
- `open(dropdown)` - 드롭다운 열기
- `close(dropdown)` - 드롭다운 닫기
- `isOpen(dropdown)` - 열림 상태 확인

**검색 기능:**

- `search(dropdown, query)` - 프로그래밍으로 검색 실행
- `clearSearch(dropdown)` - 검색어 초기화

---

#### 2️⃣ File Upload Helper API

**필요성:** ⭐⭐⭐⭐⭐

- 파일 관리 복잡
- 유효성 검사 필수
- 미리보기 처리

**기본 함수:**

- `getFiles(fileUpload)` - 선택된 파일들 가져오기
- `clearFiles(fileUpload)` - 파일 초기화
- `getFileCount(fileUpload)` - 파일 개수

**유효성 검사:**

- `validateSize(fileUpload, maxSize)` - 파일 크기 검증
- `validateType(fileUpload, allowedTypes)` - 파일 타입 검증
- `setError(fileUpload, message)` - 에러 표시
- `clearError(fileUpload)` - 에러 제거

**미리보기 관리:**

- `updatePreview(fileUpload)` - 미리보기 갱신
- `removeFile(fileUpload, index)` - 특정 파일 제거

---

#### 3️⃣ Input Helper API

**필요성:** ⭐⭐⭐⭐⭐

- 폼 유효성 검사
- 에러 처리
- 동적 값 관리

**기본 함수:**

- `getValue(input)` - 입력값 가져오기
- `setValue(input, value)` - 값 설정
- `clear(input)` - 입력값 초기화
- `disable(input)` - 비활성화
- `enable(input)` - 활성화

**유효성 검사:**

- `validate(input, rules)` - 유효성 검사
- `setError(input, message)` - 에러 표시
- `clearError(input)` - 에러 제거
- `isValid(input)` - 유효 상태 확인

**Textarea 전용:**

- `getCharCount(textarea)` - 현재 글자 수
- `getRemaining(textarea)` - 남은 글자 수

---

#### 4️⃣ Modal Helper API

**필요성:** ⭐⭐⭐⭐⭐

- 동적 콘텐츠 변경
- 프로그래밍 제어

**기본 함수:**

- `show(modal)` - 모달 열기
- `hide(modal)` - 모달 닫기
- `isVisible(modal)` - 표시 상태 확인
- `toggle(modal)` - 토글

**콘텐츠 관리:**

- `setTitle(modal, title)` - 제목 변경
- `setContent(modal, content)` - 내용 변경
- `setFooter(modal, footer)` - 푸터 변경

**버튼 관리:**

- `setButtons(modal, buttons)` - 버튼 동적 생성
- `hideCloseButton(modal)` - 닫기 버튼 숨김
- `showCloseButton(modal)` - 닫기 버튼 표시

---

#### 5️⃣ Slider Helper API

**필요성:** ⭐⭐⭐⭐

- 값 범위 설정
- 단위/포맷 관리

**기본 함수:**

- `getValue(slider)` - 현재 값
- `setValue(slider, value)` - 값 설정
- `getMin(slider)` - 최소값
- `getMax(slider)` - 최대값
- `setRange(slider, min, max)` - 범위 설정

**표시 관리:**

- `setUnit(slider, unit)` - 단위 설정
- `setFormatter(slider, formatter)` - 포맷 함수 설정
- `updateDisplay(slider)` - 표시 갱신

---

#### 6️⃣ Tab Helper API

**필요성:** ⭐⭐⭐⭐

- 동적 탭 추가/제거
- 프로그래밍 전환

**기본 함수:**

- `getActiveTab(tabGroup)` - 활성 탭 ID
- `setActiveTab(tabGroup, tabId)` - 탭 전환
- `getTabCount(tabGroup)` - 탭 개수

**동적 관리:**

- `addTab(tabGroup, tab)` - 탭 추가
- `removeTab(tabGroup, tabId)` - 탭 제거
- `updateTab(tabGroup, tabId, data)` - 탭 수정
- `disableTab(tabGroup, tabId)` - 탭 비활성화
- `enableTab(tabGroup, tabId)` - 탭 활성화

---

### 🟡 중간 (유용 - 상태 관리 필요)

#### 7️⃣ Checkbox Group Helper API

**필요성:** ⭐⭐⭐

- 그룹 선택/해제
- 값 수집

**기본 함수:**

- `getValues(checkboxGroup)` - 체크된 값들 (배열)
- `setValues(checkboxGroup, values)` - 값들 설정
- `checkAll(checkboxGroup)` - 전체 선택
- `uncheckAll(checkboxGroup)` - 전체 해제
- `toggleAll(checkboxGroup)` - 전체 토글

---

#### 8️⃣ Chip Helper API

**필요성:** ⭐⭐⭐

- 동적 생성/제거
- 태그 관리

**기본 함수:**

- `addChip(container, text, value)` - Chip 추가
- `removeChip(container, value)` - Chip 제거
- `getChips(container)` - 모든 Chip 데이터
- `clearChips(container)` - 전체 삭제
- `setChips(container, chips)` - Chip 목록 설정

---

#### 9️⃣ Accordion Helper API

**필요성:** ⭐⭐⭐

- 프로그래밍 제어

**기본 함수:**

- `expand(accordion)` - 펼치기
- `collapse(accordion)` - 접기
- `toggle(accordion)` - 토글
- `isExpanded(accordion)` - 펼침 상태 확인
- `expandAll(accordionGroup)` - 그룹 전체 펼치기
- `collapseAll(accordionGroup)` - 그룹 전체 접기

---

#### 🔟 Tooltip Helper API

**필요성:** ⭐⭐⭐

- 위치 제어
- 동적 내용 변경

**기본 함수:**

- `show(element)` - 툴팁 표시
- `hide(element)` - 툴팁 숨김
- `updateContent(element, content)` - 내용 변경
- `setPosition(element, position)` - 위치 변경 (top/bottom/left/right)

---

#### 1️⃣1️⃣ Popover Helper API

**필요성:** ⭐⭐⭐

- 위치 제어
- 동적 내용

**기본 함수:**

- `show(trigger, content)` - Popover 표시
- `hide(popover)` - Popover 숨김
- `updateContent(popover, content)` - 내용 변경
- `setPosition(popover, position)` - 위치 조정

---

### 🟢 낮음 (선택적 - 단순 표시용)

#### 1️⃣2️⃣ File Card Helper API

**필요성:** ⭐⭐

- 동적 생성 시 유용

**기본 함수:**

- `create(data)` - 파일 카드 생성
- `updateProgress(fileCard, percent)` - 진행률 업데이트
- `setError(fileCard, message)` - 에러 표시
- `remove(fileCard)` - 제거

---

### ❌ 불필요 (UI 표시만)

#### Foundation 컴포넌트들

- **Color, Spacing, Icon, Typography** - Helper 불필요 (디자인 토큰)
- **Button** - Helper 불필요 (HTML 기본 기능으로 충분)
- **Badge** - Helper 불필요 (단순 표시)
- **Radio, Switch** - Helper 불필요 (기본 이벤트로 충분)
- **Datepicker** - 외부 라이브러리 사용 (자체 API 있음)

---

## 🎯 사용 예시

### Dropdown Helper 사용 예시 (구현 후)

```javascript
// 드롭다운 초기화 및 아이템 바인딩
const dropdown = document.querySelector("#countryDropdown");

// 데이터로 아이템 생성
const countries = [
  { value: "kr", text: "대한민국 (Korea)" },
  { value: "us", text: "미국 (United States)" },
  { value: "jp", text: "일본 (Japan)" },
  { value: "cn", text: "중국 (China)", disabled: true },
];
VanillaComponents.DropdownHelper.setItems(dropdown, countries);

// 값 설정
VanillaComponents.DropdownHelper.setValue(dropdown, "kr");

// 값 가져오기
const selected = VanillaComponents.DropdownHelper.getValue(dropdown);
console.log(selected); // 'kr'

// 멀티 선택 (Searchable Multi-Select)
const multiDropdown = document.querySelector("#languageDropdown");
VanillaComponents.DropdownHelper.setValues(multiDropdown, [
  "javascript",
  "python",
]);

// 선택된 값들 가져오기
const languages = VanillaComponents.DropdownHelper.getValues(multiDropdown);
console.log(languages); // ['javascript', 'python']

// 아이템 동적 추가
VanillaComponents.DropdownHelper.addItem(multiDropdown, {
  value: "rust",
  text: "Rust",
});

// 검색 실행
VanillaComponents.DropdownHelper.search(multiDropdown, "java");
```

---

## 📌 구현 원칙

1. **순수 함수**: 부작용 최소화
2. **에러 처리**: 잘못된 입력에 대한 방어 코드
3. **타입 체크**: 파라미터 유효성 검사
4. **JSDoc 주석**: 모든 함수에 상세 주석
5. **이벤트 발생**: 프로그래밍 변경도 커스텀 이벤트 발생
6. **체이닝 지원**: 가능한 경우 메서드 체이닝

---

## 🚀 구현 우선순위

### Phase 1: 핵심 폼 컨트롤 (높음)

1. **Dropdown Helper** - 데이터 바인딩, 값 관리, 검색
2. **Input Helper** - 유효성 검사, 에러 처리
3. **File Upload Helper** - 파일 관리, 유효성 검사

### Phase 2: 인터랙션 컴포넌트 (높음)

4. **Modal Helper** - 동적 콘텐츠, show/hide
5. **Tab Helper** - 동적 탭 관리, 전환
6. **Slider Helper** - 값 범위, 포맷팅

### Phase 3: 보조 컴포넌트 (중간)

7. **Checkbox Group Helper** - 그룹 선택 관리
8. **Chip Helper** - 동적 생성/제거
9. **Accordion Helper** - 펼침/접힘 제어
10. **Tooltip Helper** - 위치, 내용 변경
11. **Popover Helper** - 위치, 내용 변경

### Phase 4: 선택적 (낮음)

12. **File Card Helper** - 진행률, 상태 관리

### 불필요

- Foundation 컴포넌트들 (Color, Spacing, Icon, Typography)
- Button (기본 HTML로 충분)
- Badge (단순 표시)
- Radio, Switch (기본 이벤트로 충분)
- Datepicker (외부 라이브러리 자체 API)

---

## 📝 참고사항

- Helper API는 `window.VanillaComponents.*Helper` 네임스페이스 사용
- 각 컴포넌트의 기본 기능(이벤트 등)은 그대로 유지
- Helper는 편의성 제공이 목적
- 컴포넌트 스크립트 파일에 함께 구현

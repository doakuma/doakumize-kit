/**
 * Dropdown Component Data
 * 드롭다운 컴포넌트 데이터
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Dropdown 데이터 등록
window.ComponentData.dropdown = {
  type: "dropdown",
  id: "componentDropdown",
  title: "Dropdown Components",
  variants: [
    {
      title: "Dropdown States",
      items: [
        {
          preview: `<div class="dropdown dropdown--medium">
  <button class="dropdown__trigger" type="button">
    <span class="dropdown__text dropdown__text--placeholder">카테고리 선택</span>
    <span class="dropdown__arrow"></span>
  </button>
  <div class="dropdown__menu">
    <div class="dropdown__item" data-value="design">
      디자인
    </div>
    <div class="dropdown__item" data-value="development">
      개발
    </div>
    <div class="dropdown__item" data-value="marketing">
      마케팅
    </div>
  </div>
</div>`,
          label: "입력 전 (default)",
        },
        {
          preview: `<div class="dropdown dropdown--medium">
  <button class="dropdown__trigger" type="button">
    <span class="dropdown__text dropdown__text--placeholder">우선순위 설정</span>
    <span class="dropdown__arrow"></span>
  </button>
  <div class="dropdown__menu">
    <div class="dropdown__item" data-value="urgent">
      긴급
    </div>
    <div class="dropdown__item" data-value="high">
      높음
    </div>
    <div class="dropdown__item" data-value="normal">
      보통
    </div>
    <div class="dropdown__item" data-value="low">
      낮음
    </div>
  </div>
</div>`,
          label: "활성화 (focus)",
        },
        {
          preview: `<div class="dropdown dropdown--medium dropdown--filled">
  <button class="dropdown__trigger" type="button">
    <span class="dropdown__text">서울특별시</span>
    <span class="dropdown__arrow"></span>
  </button>
  <div class="dropdown__menu">
    <div class="dropdown__item dropdown__item--selected" data-value="seoul">
      서울특별시
    </div>
    <div class="dropdown__item" data-value="busan">
      부산광역시
    </div>
    <div class="dropdown__item" data-value="incheon">
      인천광역시
    </div>
  </div>
</div>`,
          label: "입력 후 (filled)",
        },
        {
          preview: `<div class="dropdown dropdown--medium dropdown--error">
  <button class="dropdown__trigger" type="button">
    <span class="dropdown__text">잘못된 선택</span>
    <span class="dropdown__arrow"></span>
  </button>
  <div class="dropdown__menu">
    <div class="dropdown__item" data-value="valid1">
      유효한 옵션 1
    </div>
    <div class="dropdown__item" data-value="valid2">
      유효한 옵션 2
    </div>
  </div>
</div>`,
          label: "에러 (error)",
        },
        {
          preview: `<div class="dropdown dropdown--medium dropdown--disabled">
  <button class="dropdown__trigger" type="button" disabled>
    <span class="dropdown__text dropdown__text--placeholder">접근 불가</span>
    <span class="dropdown__arrow"></span>
  </button>
  <div class="dropdown__menu">
    <div class="dropdown__item" data-value="restricted">
      제한된 옵션
    </div>
  </div>
</div>`,
          label: "비활성화 (disabled)",
        },
        {
          preview: `<div class="dropdown dropdown--medium dropdown--readonly">
  <button class="dropdown__trigger" type="button">
    <span class="dropdown__text">관리자</span>
    <span class="dropdown__arrow"></span>
  </button>
  <div class="dropdown__menu">
    <div class="dropdown__item dropdown__item--selected" data-value="admin">
      관리자
    </div>
  </div>
</div>`,
          label: "읽기전용 (readonly)",
        },
      ],
    },
    {
      title: "Dropdown Sizes",
      items: [
        {
          preview: `<div class="dropdown dropdown--small">
  <button class="dropdown__trigger" type="button">
    <span class="dropdown__text dropdown__text--placeholder">언어 선택</span>
    <span class="dropdown__arrow"></span>
  </button>
  <div class="dropdown__menu">
    <div class="dropdown__item" data-value="korean">
      한국어
    </div>
    <div class="dropdown__item" data-value="english">
      English
    </div>
  </div>
</div>`,
          label: "small",
        },
        {
          preview: `<div class="dropdown dropdown--medium">
  <button class="dropdown__trigger" type="button">
    <span class="dropdown__text dropdown__text--placeholder">상태 선택</span>
    <span class="dropdown__arrow"></span>
  </button>
  <div class="dropdown__menu">
    <div class="dropdown__item" data-value="active">
      활성
    </div>
    <div class="dropdown__item" data-value="inactive">
      비활성
    </div>
  </div>
</div>`,
          label: "medium (기본)",
        },
        {
          preview: `<div class="dropdown dropdown--large">
  <button class="dropdown__trigger" type="button">
    <span class="dropdown__text dropdown__text--placeholder">부서 선택</span>
    <span class="dropdown__arrow"></span>
  </button>
  <div class="dropdown__menu">
    <div class="dropdown__item" data-value="engineering">
      개발팀
    </div>
    <div class="dropdown__item" data-value="design">
      디자인팀
    </div>
  </div>
</div>`,
          label: "large",
        },
      ],
    },
    {
      title: "With select2",
      items: [
        {
          preview: `<div class="drop-down-select">
  <select name="state" class="drop-down-select">
    <option value="value1">value1</option>
    <option value="value2">value2</option>
    <option value="value3">value3</option>
    <option value="value4">value4</option>
    <option value="value5">value5</option>
  </select>
</div>`,
          label: "default",
        },
        {
          preview: `<div class="drop-down-select">
  <select name="state" class="drop-down-select" disabled>
    <option value="value1">value1</option>
    <option value="value2">value2</option>
    <option value="value3">value3</option>
    <option value="value4">value4</option>
    <option value="value5">value5</option>
  </select>
</div>`,
          label: "disabled",
        },
      ],
    },
    {
      title: "With select2 - Sizes",
      items: [
        {
          preview: `<div class="drop-down-select drop-down-select__large">
  <select name="state" class="drop-down-select">
    <option value="value1">value1</option>
    <option value="value2">value2</option>
    <option value="value3">value3</option>
    <option value="value4">value4</option>
    <option value="value5">value5</option>
  </select>
</div>`,
          label: "Large",
        },
        {
          preview: `<div class="drop-down-select drop-down-select__small">
  <select name="state" class="drop-down-select">
    <option value="value1">value1</option>
    <option value="value2">value2</option>
    <option value="value3">value3</option>
    <option value="value4">value4</option>
    <option value="value5">value5</option>
  </select>
</div>`,
          label: "Small",
        },
      ],
    },
    {
      title: "With select2 - Multiple",
      items: [
        {
          preview: `<div class="drop-down-select drop-down-select__multi">
  <select name="state" class="drop-down-select" multiple="multiple">
    <option value="value1" selected>value1</option>
    <option value="value2">value2</option>
    <option value="value3">value3</option>
    <option value="value4">value4</option>
    <option value="value5">value5</option>
  </select>
</div>`,
          label: "Multiple",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Dropdown data registered");

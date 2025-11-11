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
    {
      title: "Searchable Dropdown (자동완성)",
      items: [
        {
          preview: `<div class="dropdown dropdown--medium dropdown--searchable">
  <button class="dropdown__trigger" type="button">
    <span class="dropdown__text dropdown__text--placeholder">국가 선택</span>
    <span class="dropdown__arrow"></span>
  </button>
  <div class="dropdown__menu">
    <div class="dropdown__search-wrapper">
      <i class="icon icon--small icon--search"></i>
      <input type="text" class="dropdown__search" placeholder="국가 검색..." />
    </div>
    <div class="dropdown__items">
      <div class="dropdown__item" data-value="kr">대한민국 (Korea)</div>
      <div class="dropdown__item" data-value="us">미국 (United States)</div>
      <div class="dropdown__item" data-value="jp">일본 (Japan)</div>
      <div class="dropdown__item" data-value="cn">중국 (China)</div>
      <div class="dropdown__item" data-value="uk">영국 (United Kingdom)</div>
      <div class="dropdown__item" data-value="fr">프랑스 (France)</div>
      <div class="dropdown__item" data-value="de">독일 (Germany)</div>
      <div class="dropdown__item" data-value="ca">캐나다 (Canada)</div>
      <div class="dropdown__item" data-value="au">호주 (Australia)</div>
      <div class="dropdown__item" data-value="sg">싱가포르 (Singapore)</div>
    </div>
    <div class="dropdown__no-results">검색 결과가 없습니다.</div>
  </div>
</div>`,
          label: "기본 검색 가능 드롭다운",
        },
        {
          preview: `<div class="dropdown dropdown--small dropdown--searchable">
  <button class="dropdown__trigger" type="button">
    <span class="dropdown__text dropdown__text--placeholder">도시 선택</span>
    <span class="dropdown__arrow"></span>
  </button>
  <div class="dropdown__menu">
    <div class="dropdown__search-wrapper">
      <i class="icon icon--small icon--search"></i>
      <input type="text" class="dropdown__search" placeholder="도시 검색..." />
    </div>
    <div class="dropdown__items">
      <div class="dropdown__item" data-value="seoul">서울</div>
      <div class="dropdown__item" data-value="busan">부산</div>
      <div class="dropdown__item" data-value="incheon">인천</div>
      <div class="dropdown__item" data-value="daegu">대구</div>
      <div class="dropdown__item" data-value="daejeon">대전</div>
      <div class="dropdown__item" data-value="gwangju">광주</div>
      <div class="dropdown__item" data-value="ulsan">울산</div>
      <div class="dropdown__item" data-value="sejong">세종</div>
    </div>
    <div class="dropdown__no-results">검색 결과가 없습니다.</div>
  </div>
</div>`,
          label: "Small 검색 가능 드롭다운",
        },
        {
          preview: `<div class="dropdown dropdown--large dropdown--searchable">
  <button class="dropdown__trigger" type="button">
    <span class="dropdown__text dropdown__text--placeholder">프로그래밍 언어 선택</span>
    <span class="dropdown__arrow"></span>
  </button>
  <div class="dropdown__menu">
    <div class="dropdown__search-wrapper">
      <i class="icon icon--small icon--search"></i>
      <input type="text" class="dropdown__search" placeholder="언어 검색..." />
    </div>
    <div class="dropdown__items">
      <div class="dropdown__item" data-value="javascript">JavaScript</div>
      <div class="dropdown__item" data-value="typescript">TypeScript</div>
      <div class="dropdown__item" data-value="python">Python</div>
      <div class="dropdown__item" data-value="java">Java</div>
      <div class="dropdown__item" data-value="csharp">C#</div>
      <div class="dropdown__item" data-value="cpp">C++</div>
      <div class="dropdown__item" data-value="go">Go</div>
      <div class="dropdown__item" data-value="rust">Rust</div>
      <div class="dropdown__item" data-value="ruby">Ruby</div>
      <div class="dropdown__item" data-value="php">PHP</div>
      <div class="dropdown__item" data-value="swift">Swift</div>
      <div class="dropdown__item" data-value="kotlin">Kotlin</div>
    </div>
    <div class="dropdown__no-results">검색 결과가 없습니다.</div>
  </div>
</div>`,
          label: "Large 검색 가능 드롭다운",
        },
        {
          preview: `<div class="dropdown dropdown--medium dropdown--searchable dropdown--filled">
  <button class="dropdown__trigger" type="button">
    <span class="dropdown__text">대한민국 (Korea)</span>
    <span class="dropdown__arrow"></span>
  </button>
  <div class="dropdown__menu">
    <div class="dropdown__search-wrapper">
      <i class="icon icon--small icon--search"></i>
      <input type="text" class="dropdown__search" placeholder="국가 검색..." />
    </div>
    <div class="dropdown__items">
      <div class="dropdown__item dropdown__item--selected" data-value="kr">대한민국 (Korea)</div>
      <div class="dropdown__item" data-value="us">미국 (United States)</div>
      <div class="dropdown__item" data-value="jp">일본 (Japan)</div>
      <div class="dropdown__item" data-value="cn">중국 (China)</div>
      <div class="dropdown__item" data-value="uk">영국 (United Kingdom)</div>
    </div>
    <div class="dropdown__no-results">검색 결과가 없습니다.</div>
  </div>
</div>`,
          label: "선택된 상태",
        },
      ],
    },
    {
      title: "Searchable Multi-Select Dropdown",
      items: [
        {
          preview: `<div class="dropdown dropdown--medium dropdown--searchable dropdown--multi">
  <div class="dropdown__trigger">
    <span class="dropdown__text dropdown__text--placeholder">국가 선택 (다중)</span>
    <span class="dropdown__arrow"></span>
  </div>
  <div class="dropdown__menu">
    <div class="dropdown__search-wrapper">
      <i class="icon icon--small icon--search"></i>
      <input type="text" class="dropdown__search" placeholder="국가 검색..." />
    </div>
    <div class="dropdown__items">
      <div class="dropdown__item" data-value="kr">대한민국 (Korea)</div>
      <div class="dropdown__item" data-value="us">미국 (United States)</div>
      <div class="dropdown__item" data-value="jp">일본 (Japan)</div>
      <div class="dropdown__item" data-value="cn">중국 (China)</div>
      <div class="dropdown__item" data-value="uk">영국 (United Kingdom)</div>
      <div class="dropdown__item" data-value="fr">프랑스 (France)</div>
      <div class="dropdown__item" data-value="de">독일 (Germany)</div>
      <div class="dropdown__item" data-value="ca">캐나다 (Canada)</div>
      <div class="dropdown__item" data-value="au">호주 (Australia)</div>
      <div class="dropdown__item" data-value="sg">싱가포르 (Singapore)</div>
    </div>
    <div class="dropdown__no-results">검색 결과가 없습니다.</div>
  </div>
</div>`,
          label: "기본 (선택 전)",
        },
        {
          preview: `<div class="dropdown dropdown--medium dropdown--searchable dropdown--multi dropdown--filled">
  <div class="dropdown__trigger">
    <div class="dropdown__chips">
      <span class="chip chip--rounded chip--selected" data-value="kr">
        <span class="chip__text">대한민국 (Korea)</span>
        <button type="button" class="chip__remove"></button>
      </span>
      <span class="chip chip--rounded chip--selected" data-value="us">
        <span class="chip__text">미국 (United States)</span>
        <button type="button" class="chip__remove"></button>
      </span>
      <span class="chip chip--rounded chip--selected" data-value="jp">
        <span class="chip__text">일본 (Japan)</span>
        <button type="button" class="chip__remove"></button>
      </span>
    </div>
    <span class="dropdown__arrow"></span>
  </div>
  <div class="dropdown__menu">
    <div class="dropdown__search-wrapper">
      <i class="icon icon--small icon--search"></i>
      <input type="text" class="dropdown__search" placeholder="국가 검색..." />
    </div>
    <div class="dropdown__items">
      <div class="dropdown__item dropdown__item--selected" data-value="kr">대한민국 (Korea)</div>
      <div class="dropdown__item dropdown__item--selected" data-value="us">미국 (United States)</div>
      <div class="dropdown__item dropdown__item--selected" data-value="jp">일본 (Japan)</div>
      <div class="dropdown__item" data-value="cn">중국 (China)</div>
      <div class="dropdown__item" data-value="uk">영국 (United Kingdom)</div>
      <div class="dropdown__item" data-value="fr">프랑스 (France)</div>
      <div class="dropdown__item" data-value="de">독일 (Germany)</div>
      <div class="dropdown__item" data-value="ca">캐나다 (Canada)</div>
      <div class="dropdown__item" data-value="au">호주 (Australia)</div>
      <div class="dropdown__item" data-value="sg">싱가포르 (Singapore)</div>
    </div>
    <div class="dropdown__no-results">검색 결과가 없습니다.</div>
  </div>
</div>`,
          label: "선택된 상태 (3개)",
        },
        {
          preview: `<div class="dropdown dropdown--small dropdown--searchable dropdown--multi dropdown--filled">
  <div class="dropdown__trigger">
    <div class="dropdown__chips">
      <span class="chip chip--rounded chip--selected" data-value="react">
        <span class="chip__text">React</span>
        <button type="button" class="chip__remove"></button>
      </span>
      <span class="chip chip--rounded chip--selected" data-value="vue">
        <span class="chip__text">Vue</span>
        <button type="button" class="chip__remove"></button>
      </span>
    </div>
    <span class="dropdown__arrow"></span>
  </div>
  <div class="dropdown__menu">
    <div class="dropdown__search-wrapper">
      <i class="icon icon--small icon--search"></i>
      <input type="text" class="dropdown__search" placeholder="검색..." />
    </div>
    <div class="dropdown__items">
      <div class="dropdown__item dropdown__item--selected" data-value="react">React</div>
      <div class="dropdown__item dropdown__item--selected" data-value="vue">Vue</div>
      <div class="dropdown__item" data-value="angular">Angular</div>
      <div class="dropdown__item" data-value="svelte">Svelte</div>
      <div class="dropdown__item" data-value="nextjs">Next.js</div>
      <div class="dropdown__item" data-value="nuxtjs">Nuxt.js</div>
    </div>
    <div class="dropdown__no-results">검색 결과가 없습니다.</div>
  </div>
</div>`,
          label: "Small 멀티 선택",
        },
        {
          preview: `<div class="dropdown dropdown--large dropdown--searchable dropdown--multi dropdown--filled">
  <div class="dropdown__trigger">
    <div class="dropdown__chips">
      <span class="chip chip--rounded chip--selected" data-value="javascript">
        <span class="chip__text">JavaScript</span>
        <button type="button" class="chip__remove"></button>
      </span>
      <span class="chip chip--rounded chip--selected" data-value="typescript">
        <span class="chip__text">TypeScript</span>
        <button type="button" class="chip__remove"></button>
      </span>
      <span class="chip chip--rounded chip--selected" data-value="python">
        <span class="chip__text">Python</span>
        <button type="button" class="chip__remove"></button>
      </span>
      <span class="chip chip--rounded chip--selected" data-value="java">
        <span class="chip__text">Java</span>
        <button type="button" class="chip__remove"></button>
      </span>
    </div>
    <span class="dropdown__arrow"></span>
  </div>
  <div class="dropdown__menu">
    <div class="dropdown__search-wrapper">
      <i class="icon icon--small icon--search"></i>
      <input type="text" class="dropdown__search" placeholder="언어 검색..." />
    </div>
    <div class="dropdown__items">
      <div class="dropdown__item dropdown__item--selected" data-value="javascript">JavaScript</div>
      <div class="dropdown__item dropdown__item--selected" data-value="typescript">TypeScript</div>
      <div class="dropdown__item dropdown__item--selected" data-value="python">Python</div>
      <div class="dropdown__item dropdown__item--selected" data-value="java">Java</div>
      <div class="dropdown__item" data-value="csharp">C#</div>
      <div class="dropdown__item" data-value="cpp">C++</div>
      <div class="dropdown__item" data-value="go">Go</div>
      <div class="dropdown__item" data-value="rust">Rust</div>
    </div>
    <div class="dropdown__no-results">검색 결과가 없습니다.</div>
  </div>
</div>`,
          label: "Large 멀티 선택 (4개)",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Dropdown data registered");

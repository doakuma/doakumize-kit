/**
 * Tab Component Data
 * 탭 컴포넌트 데이터
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Tab 데이터 등록
window.ComponentData.tab = {
  type: "tab",
  id: "componentTab",
  title: "Tab Components",
  variants: [
    {
      title: "Page Tab (Large)",
      description:
        "페이지 레벨에서 사용되는 큰 탭 컴포넌트입니다. Default와 Active 상태를 지원합니다.",
      items: [
        {
          preview: `<!-- tab-group -->
<div class="tab-group">
  <button class="tab tab--page tab--active">
    <span class="tab__text">Page Tab</span>
  </button>
  <i class="tab__divider"></i>
  <button class="tab tab--page">
    <span class="tab__text">Page Tab</span>
  </button>
</div>
<!--// tab-group -->
<div class="tab__area">div.tab</div>`,
          label: "Tab Group",
        },
      ],
    },
    {
      title: "Medium Tab",
      description:
        "중간 크기의 탭 컴포넌트입니다. 아이콘 유무와 Select/Default 상태를 지원합니다.",
      items: [
        {
          preview: `<div class="tab-group tab--medium">
  <button class="tab tab--active">
    <span class="tab__text">Medium Tab</span>
  </button>
  <button class="tab">
    <span class="tab__text">Medium Tab</span>
  </button>
</div>`,
          label: "Tab Group",
        },
        {
          preview: `<div class="tab-group tab--medium">
  <button class="tab tab--active">
    <i class="icon icon--small icon--eye"></i>
    <span class="tab__text">Medium Tab</span>
  </button>
  <button class="tab">
    <i class="icon icon--small icon--eye"></i>
    <span class="tab__text">Medium Tab</span>
  </button>
</div>`,
          label: "Tab Group with Icons",
        },
      ],
    },
    {
      title: "Small Tab",
      description:
        "작은 크기의 탭 컴포넌트입니다. Underlined과 Text-only 스타일을 지원합니다.",
      items: [
        {
          preview: `<div class="tab-group tab--small">
  <button class="tab tab--active">
    <span class="tab__text">Small Tab</span>
  </button>
  <button class="tab">
    <span class="tab__text">Small Tab</span>
  </button>
  <button class="tab">
    <span class="tab__text">Small Tab</span>
  </button>
</div>`,
          label: "Tab List (Navigation)",
        },
      ],
    },
    {
      title: "Tab with Content Control",
      description: "탭 클릭 시 관련 콘텐츠를 제어하는 기능을 보여줍니다.",
      items: [
        {
          preview: `<div class="tab-group tab--medium" data-tab-group="demo-tabs">
  <button class="tab tab--active" data-tab-content="tab-content-1">
    <span class="tab__text">Overview</span>
  </button>
  <button class="tab" data-tab-content="tab-content-2">
    <span class="tab__text">Settings</span>
  </button>
  <button class="tab" data-tab-content="tab-content-3">
    <span class="tab__text">Analytics</span>
  </button>
</div>

<div class="tab-content-container" data-tab-content="demo-tabs">
  <div id="tab-content-1" class="tab-content-panel tab-content-panel--active">
    <h5>Overview</h5>
    <p>
      This is the overview content. Here you can see
      general information about your project.
    </p>
  </div>
  <div id="tab-content-2" class="tab-content-panel">
    <h5>Settings</h5>
    <p>
      This is the settings content. Configure your
      preferences here.
    </p>
  </div>
  <div id="tab-content-3" class="tab-content-panel">
    <h5>Analytics</h5>
    <p>
      This is the analytics content. View your data and
      insights here.
    </p>
  </div>
</div>`,
          label: "Interactive Tab with Content",
        },
      ],
    },
    {
      title: "Default Active Tab",
      description:
        "활성화된 탭이 없을 경우 자동으로 첫 번째 탭이 활성화되거나, data-default-active 속성으로 기본 활성 탭을 지정할 수 있습니다.",
      items: [
        {
          preview: `<div class="tab-group tab--medium" data-tab-group="auto-default-tabs">
  <button class="tab" data-tab-content="auto-tab-1">
    <span class="tab__text">Tab 1</span>
  </button>
  <button class="tab" data-tab-content="auto-tab-2">
    <span class="tab__text">Tab 2</span>
  </button>
  <button class="tab" data-tab-content="auto-tab-3">
    <span class="tab__text">Tab 3</span>
  </button>
</div>

<div
  class="tab-content-container"
  data-tab-content="auto-default-tabs"
  style="
    margin-top: 16px;
    padding: 16px;
    border: 1px solid var(--gray-300);
    border-radius: 4px;
    background-color: var(--gray-50);
    min-height: 80px;
  ">
  <div id="auto-tab-1" class="tab-content-panel">
    <p style="margin: 0; color: var(--success-700)">
      ✅ 첫 번째 탭이 자동으로 활성화됩니다.<br />
      <small style="color: var(--gray-600)"
        >HTML에 tab--active 클래스 없음, JavaScript가
        자동 처리</small
      >
    </p>
  </div>
  <div id="auto-tab-2" class="tab-content-panel">
    <p style="margin: 0">두 번째 탭 콘텐츠</p>
  </div>
  <div id="auto-tab-3" class="tab-content-panel">
    <p style="margin: 0">세 번째 탭 콘텐츠</p>
  </div>
</div>`,
          label: "Auto Default (첫 번째 탭)",
        },
        {
          preview: `<div
  class="tab-group tab--medium"
  data-tab-group="custom-default-tabs"
  data-default-active="1">
  <button class="tab" data-tab-content="custom-tab-1">
    <span class="tab__text">Tab 1</span>
  </button>
  <button class="tab" data-tab-content="custom-tab-2">
    <span class="tab__text">Tab 2</span>
  </button>
  <button class="tab" data-tab-content="custom-tab-3">
    <span class="tab__text">Tab 3</span>
  </button>
</div>

<div
  class="tab-content-container"
  data-tab-content="custom-default-tabs"
  style="
    margin-top: 16px;
    padding: 16px;
    border: 1px solid var(--gray-300);
    border-radius: 4px;
    background-color: var(--gray-50);
    min-height: 80px;
  ">
  <div id="custom-tab-1" class="tab-content-panel">
    <p style="margin: 0">첫 번째 탭 콘텐츠</p>
  </div>
  <div id="custom-tab-2" class="tab-content-panel">
    <p style="margin: 0; color: var(--success-700)">
      ✅ 두 번째 탭이 기본 활성화됩니다.<br />
      <small style="color: var(--gray-600)"
        >data-default-active="1" 속성 사용, 탭과 패널
        자동 동기화</small
      >
    </p>
  </div>
  <div id="custom-tab-3" class="tab-content-panel">
    <p style="margin: 0">세 번째 탭 콘텐츠</p>
  </div>
</div>`,
          label: 'Custom Default (두 번째 탭, data-default-active="1")',
        },
      ],
    },
  ],
};

console.log("[ComponentData] Tab data registered");

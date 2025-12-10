/**
 * Tree Menu Component Data
 * 트리 메뉴 컴포넌트 데이터
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Tree Menu 데이터 등록
window.ComponentData["tree-menu"] = {
  type: "tree-menu",
  id: "componentTreeMenu",
  title: "Tree Menu Components",
  variants: [
    {
      title: "Basic Tree Menu",
      description:
        "기본 트리 메뉴 컴포넌트입니다. 계층적 구조의 메뉴를 표시하며, 펼치기/접기 기능을 지원합니다.",
      items: [
        {
          preview: `<!-- tree-menu -->
<nav class="tree-menu" role="tree" aria-label="Navigation">
  <ul>
    <li class="tree-menu-item" role="treeitem">
      <a href="#" class="tree-menu-item__link">
        <span class="tree-menu-item__text">Foundation</span>
      </a>
      <button class="tree-menu-item__toggle" type="button" aria-expanded="false" aria-label="Toggle Foundation menu">
        <i class="icon icon--medium icon--chevron-down"></i>
      </button>
      <ul class="tree-menu-item__submenu" role="group">
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Color</span>
          </a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Typography</span>
          </a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Spacing</span>
          </a>
        </li>
      </ul>
    </li>

    <li class="tree-menu-item" role="treeitem">
      <a href="#" class="tree-menu-item__link">
        <span class="tree-menu-item__text">Form Controls</span>
      </a>
      <button class="tree-menu-item__toggle" type="button" aria-expanded="false" aria-label="Toggle Form Controls menu">
        <i class="icon icon--medium icon--chevron-down"></i>
      </button>
      <ul class="tree-menu-item__submenu" role="group">
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Button</span>
          </a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Input</span>
          </a>
        </li>
      </ul>
    </li>

    <li class="tree-menu-item" role="treeitem">
      <a href="#" class="tree-menu-item__link">
        <span class="tree-menu-item__text">Navigation</span>
      </a>
      <button class="tree-menu-item__toggle" type="button" aria-expanded="false" aria-label="Toggle Navigation menu">
        <i class="icon icon--medium icon--chevron-down"></i>
      </button>
      <ul class="tree-menu-item__submenu" role="group">
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Tab</span>
          </a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Accordion</span>
          </a>
        </li>
      </ul>
    </li>
  </ul>
</nav>
<!--// tree-menu -->`,
          label: "Basic Tree Menu (Collapsed)",
        },
        {
          preview: `<!-- tree-menu -->
<nav class="tree-menu" role="tree" aria-label="Navigation">
  <ul>
    <li class="tree-menu-item tree-menu-item--expanded" role="treeitem">
      <a href="#" class="tree-menu-item__link">
        <span class="tree-menu-item__text">Foundation</span>
      </a>
      <button class="tree-menu-item__toggle" type="button" aria-expanded="true" aria-label="Toggle Foundation menu">
        <i class="icon icon--medium icon--chevron-down"></i>
      </button>
      <ul class="tree-menu-item__submenu" role="group">
        <li role="treeitem">
          <a href="#" class="tree-submenu__link tree-submenu__link--active">
            <i class="icon icon--small icon--component"></i>
            <span>Color</span>
          </a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Typography</span>
          </a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Spacing</span>
          </a>
        </li>
      </ul>
    </li>

    <li class="tree-menu-item" role="treeitem">
      <a href="#" class="tree-menu-item__link">
        <span class="tree-menu-item__text">Form Controls</span>
      </a>
      <button class="tree-menu-item__toggle" type="button" aria-expanded="false" aria-label="Toggle Form Controls menu">
        <i class="icon icon--medium icon--chevron-down"></i>
      </button>
      <ul class="tree-menu-item__submenu" role="group">
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Button</span>
          </a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Input</span>
          </a>
        </li>
      </ul>
    </li>

    <li class="tree-menu-item" role="treeitem">
      <a href="#" class="tree-menu-item__link">
        <span class="tree-menu-item__text">Navigation</span>
      </a>
      <button class="tree-menu-item__toggle" type="button" aria-expanded="false" aria-label="Toggle Navigation menu">
        <i class="icon icon--medium icon--chevron-down"></i>
      </button>
      <ul class="tree-menu-item__submenu" role="group">
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Tab</span>
          </a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Accordion</span>
          </a>
        </li>
      </ul>
    </li>
  </ul>
</nav>
<!--// tree-menu -->`,
          label: "Basic Tree Menu (Expanded with Active)",
        },
      ],
    },
    {
      title: "Tree Menu with Badge",
      description:
        "배지(Badge)나 칩(Chip)을 포함한 트리 메뉴입니다. 알림 개수나 상태를 표시할 수 있습니다.",
      items: [
        {
          preview: `<!-- tree-menu -->
<nav class="tree-menu" role="tree" aria-label="Navigation">
  <ul>
    <li class="tree-menu-item tree-menu-item--expanded" role="treeitem">
      <a href="#" class="tree-menu-item__link">
        <span class="tree-menu-item__text">Projects</span>
        <span class="chip chip--small chip--default">3</span>
      </a>
      <button class="tree-menu-item__toggle" type="button" aria-expanded="true" aria-label="Toggle Projects menu">
        <i class="icon icon--medium icon--chevron-down"></i>
      </button>
      <ul class="tree-menu-item__submenu" role="group">
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Project Alpha</span>
            <span class="chip chip--small chip--premium">New</span>
          </a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Project Beta</span>
          </a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Project Gamma</span>
          </a>
        </li>
      </ul>
    </li>

    <li class="tree-menu-item" role="treeitem">
      <a href="#" class="tree-menu-item__link">
        <span class="tree-menu-item__text">Settings</span>
        <span class="chip chip--small chip--standard">Updated</span>
      </a>
      <button class="tree-menu-item__toggle" type="button" aria-expanded="false" aria-label="Toggle Settings menu">
        <i class="icon icon--medium icon--chevron-down"></i>
      </button>
      <ul class="tree-menu-item__submenu" role="group">
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>General</span>
          </a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Security</span>
          </a>
        </li>
      </ul>
    </li>
  </ul>
</nav>
<!--// tree-menu -->`,
          label: "Tree Menu with Badge",
        },
      ],
    },
    {
      title: "Tree Menu Modes",
      description:
        "트리 메뉴의 동작 모드를 설정할 수 있습니다. Accordion 모드(하나만 열림)와 Multi-expand 모드(여러 개 동시 열림)를 지원합니다.",
      items: [
        {
          preview: `<!-- tree-menu (Accordion Mode - 하나만 열림) -->
<nav class="tree-menu" data-tree-mode="accordion" role="tree" aria-label="Navigation">
  <ul>
    <li class="tree-menu-item tree-menu-item--expanded" role="treeitem">
      <a href="#" class="tree-menu-item__link">
        <span class="tree-menu-item__text">Foundation</span>
      </a>
      <button class="tree-menu-item__toggle" type="button" aria-expanded="true" aria-label="Toggle Foundation menu">
        <i class="icon icon--medium icon--chevron-down"></i>
      </button>
      <ul class="tree-menu-item__submenu" role="group">
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">Color</a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">Typography</a>
        </li>
      </ul>
    </li>

    <li class="tree-menu-item" role="treeitem">
      <a href="#" class="tree-menu-item__link">
        <span class="tree-menu-item__text">Form Controls</span>
      </a>
      <button class="tree-menu-item__toggle" type="button" aria-expanded="false" aria-label="Toggle Form Controls menu">
        <i class="icon icon--medium icon--chevron-down"></i>
      </button>
      <ul class="tree-menu-item__submenu" role="group">
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">Button</a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">Input</a>
        </li>
      </ul>
    </li>
  </ul>
</nav>
<!--// tree-menu -->`,
          label: "Accordion Mode (하나만 열림)",
        },
        {
          preview: `<!-- tree-menu (Multi-expand Mode - 여러 개 동시 열림) -->
<nav class="tree-menu" data-tree-mode="multi-expand" role="tree" aria-label="Navigation">
  <ul>
    <li class="tree-menu-item tree-menu-item--expanded" role="treeitem">
      <a href="#" class="tree-menu-item__link">
        <span class="tree-menu-item__text">Foundation</span>
      </a>
      <button class="tree-menu-item__toggle" type="button" aria-expanded="true" aria-label="Toggle Foundation menu">
        <i class="icon icon--medium icon--chevron-down"></i>
      </button>
      <ul class="tree-menu-item__submenu" role="group">
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">Color</a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">Typography</a>
        </li>
      </ul>
    </li>

    <li class="tree-menu-item tree-menu-item--expanded" role="treeitem">
      <a href="#" class="tree-menu-item__link">
        <span class="tree-menu-item__text">Form Controls</span>
      </a>
      <button class="tree-menu-item__toggle" type="button" aria-expanded="true" aria-label="Toggle Form Controls menu">
        <i class="icon icon--medium icon--chevron-down"></i>
      </button>
      <ul class="tree-menu-item__submenu" role="group">
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">Button</a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">Input</a>
        </li>
      </ul>
    </li>
  </ul>
</nav>
<!--// tree-menu -->`,
          label: "Multi-expand Mode (여러 개 동시 열림)",
        },
      ],
    },
    {
      title: "Tree Menu without Toggle (Leaf Node)",
      description:
        "하위 메뉴가 없는 경우 토글 버튼 없이 단순 링크로 표시할 수 있습니다.",
      items: [
        {
          preview: `<!-- tree-menu -->
<nav class="tree-menu" role="tree" aria-label="Navigation">
  <ul>
    <li class="tree-menu-item" role="treeitem">
      <a href="#" class="tree-menu-item__link">
        <span class="tree-menu-item__text">Dashboard</span>
      </a>
    </li>

    <li class="tree-menu-item tree-menu-item--expanded" role="treeitem">
      <a href="#" class="tree-menu-item__link">
        <span class="tree-menu-item__text">Components</span>
      </a>
      <button class="tree-menu-item__toggle" type="button" aria-expanded="true" aria-label="Toggle Components menu">
        <i class="icon icon--medium icon--chevron-down"></i>
      </button>
      <ul class="tree-menu-item__submenu" role="group">
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Button</span>
          </a>
        </li>
        <li role="treeitem">
          <a href="#" class="tree-submenu__link">
            <i class="icon icon--small icon--component"></i>
            <span>Input</span>
          </a>
        </li>
      </ul>
    </li>

    <li class="tree-menu-item" role="treeitem">
      <a href="#" class="tree-menu-item__link">
        <span class="tree-menu-item__text">Settings</span>
      </a>
    </li>
  </ul>
</nav>
<!--// tree-menu -->`,
          label: "Mixed Tree Menu (Leaf + Branch Nodes)",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Tree Menu data registered");


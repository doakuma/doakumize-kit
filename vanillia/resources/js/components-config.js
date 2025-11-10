/**
 * Components Configuration
 * 컴포넌트 리스트 및 네비게이션 구성 관리
 *
 * 새 컴포넌트 추가 시 이 파일의 COMPONENT_LIST에만 추가하면
 * 탭 네비게이션과 컨텐츠 패널이 자동으로 생성됩니다.
 */

/**
 * 컴포넌트 카테고리
 */
const COMPONENT_CATEGORIES = {
  FOUNDATION: "Foundation",
  FORM_CONTROLS: "Form Controls",
  DATA_DISPLAY: "Data Display",
  FEEDBACK: "Feedback",
  NAVIGATION: "Navigation",
};

/**
 * 컴포넌트 설정 객체
 * @typedef {Object} ComponentConfig
 * @property {string} id - 컴포넌트 ID (data-component 값)
 * @property {string} name - 탭에 표시될 이름
 * @property {string} category - 컴포넌트 카테고리
 * @property {string} [dataSource] - 데이터 소스 (없으면 id 사용)
 * @property {boolean} [enabled] - 활성화 여부 (기본: true)
 * @property {number} [order] - 정렬 순서 (낮을수록 앞에 표시)
 */

/**
 * 컴포넌트 리스트
 * 카테고리별로 그룹핑되어 있으며, 순서대로 탭이 생성됩니다.
 */
const COMPONENT_LIST = [
  // ========================================
  // 1️⃣ Foundation (기초)
  // ========================================
  {
    id: "color",
    name: "Color",
    category: COMPONENT_CATEGORIES.FOUNDATION,
    enabled: true,
    order: 1,
  },
  {
    id: "spacing",
    name: "Spacing",
    category: COMPONENT_CATEGORIES.FOUNDATION,
    enabled: true,
    order: 2,
  },
  {
    id: "icon",
    name: "Icon",
    category: COMPONENT_CATEGORIES.FOUNDATION,
    enabled: true,
    order: 2,
  },
  {
    id: "typography",
    name: "Typography",
    category: COMPONENT_CATEGORIES.FOUNDATION,
    enabled: true,
    order: 3,
  },

  // ========================================
  // 2️⃣ Form Controls (폼 컨트롤)
  // ========================================
  {
    id: "button",
    name: "Button",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: true,
    order: 6,
  },
  {
    id: "input",
    name: "Input",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: true,
    order: 7,
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: true,
    order: 8,
  },
  {
    id: "radio",
    name: "Radio",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: true,
    order: 9,
  },
  {
    id: "dropdown",
    name: "Dropdown",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: true,
    order: 10,
  },
  {
    id: "slider",
    name: "Slider",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: true,
    order: 11,
  },
  {
    id: "switch",
    name: "Switch",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: true,
    order: 12,
  },
  {
    id: "textarea",
    name: "Textarea",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: true,
    order: 13,
  },
  {
    id: "file-upload",
    name: "File Upload",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: true,
    order: 14,
  },
  {
    id: "datepicker",
    name: "Date Picker",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: true,
    order: 15,
  },
  {
    id: "search-input",
    name: "Search Input",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: false,
    order: 16,
  },

  // ========================================
  // 3️⃣ Data Display (데이터 표시)
  // ========================================
  {
    id: "chip",
    name: "Chip",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: true,
    order: 17,
  },
  {
    id: "table",
    name: "Table",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: true,
    order: 18,
  },
  {
    id: "file-card",
    name: "File Card",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: true,
    order: 19,
  },
  // TODO: 추가 예정 컴포넌트 (우선순위 순)
  {
    id: "badge",
    name: "Badge",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: true,
    order: 20,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: true,
    order: 21,
  },
  {
    id: "card",
    name: "Card",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: false,
    order: 22,
  },
  {
    id: "avatar",
    name: "Avatar",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: false,
    order: 23,
  },
  {
    id: "progress-bar",
    name: "Progress Bar",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: false,
    order: 24,
  },
  {
    id: "list",
    name: "List",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: false,
    order: 25,
  },
  {
    id: "skeleton",
    name: "Skeleton",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: false,
    order: 26,
  },
  {
    id: "empty-state",
    name: "Empty State",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: false,
    order: 27,
  },

  // ========================================
  // 4️⃣ Feedback (피드백)
  // ========================================
  {
    id: "modal",
    name: "Modal",
    category: COMPONENT_CATEGORIES.FEEDBACK,
    enabled: true,
    order: 28,
  },
  {
    id: "popover",
    name: "Popover",
    category: COMPONENT_CATEGORIES.FEEDBACK,
    enabled: true,
    order: 29,
  },
  // TODO: 추가 예정 컴포넌트 (우선순위 순)
  {
    id: "toast",
    name: "Toast",
    category: COMPONENT_CATEGORIES.FEEDBACK,
    enabled: false,
    order: 30,
  },
  {
    id: "alert",
    name: "Alert",
    category: COMPONENT_CATEGORIES.FEEDBACK,
    enabled: false,
    order: 31,
  },
  {
    id: "dialog",
    name: "Dialog",
    category: COMPONENT_CATEGORIES.FEEDBACK,
    enabled: false,
    order: 32,
  },
  {
    id: "loading-spinner",
    name: "Loading Spinner",
    category: COMPONENT_CATEGORIES.FEEDBACK,
    enabled: false,
    order: 33,
  },

  // ========================================
  // 5️⃣ Navigation (네비게이션)
  // ========================================
  {
    id: "tab",
    name: "Tab",
    category: COMPONENT_CATEGORIES.NAVIGATION,
    enabled: true,
    order: 34,
  },
  {
    id: "accordion",
    name: "Accordion",
    category: COMPONENT_CATEGORIES.NAVIGATION,
    enabled: true,
    order: 35,
  },
  // TODO: 추가 예정 컴포넌트 (우선순위 순)
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    category: COMPONENT_CATEGORIES.NAVIGATION,
    enabled: false,
    order: 36,
  },
  {
    id: "pagination",
    name: "Pagination",
    category: COMPONENT_CATEGORIES.NAVIGATION,
    enabled: false,
    order: 37,
  },
  {
    id: "menu",
    name: "Menu",
    category: COMPONENT_CATEGORIES.NAVIGATION,
    enabled: false,
    order: 38,
  },
  {
    id: "stepper",
    name: "Stepper",
    category: COMPONENT_CATEGORIES.NAVIGATION,
    enabled: false,
    order: 39,
  },
];

/**
 * 활성화된 컴포넌트 리스트 반환
 * @returns {ComponentConfig[]} 활성화된 컴포넌트 배열
 */
function getEnabledComponents() {
  return COMPONENT_LIST.filter((comp) => comp.enabled !== false).sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );
}

/**
 * 컴포넌트 ID로 설정 가져오기
 * @param {string} id - 컴포넌트 ID
 * @returns {ComponentConfig|null} 컴포넌트 설정 또는 null
 */
function getComponentConfig(id) {
  return COMPONENT_LIST.find((comp) => comp.id === id) || null;
}

/**
 * 카테고리별로 그룹핑된 컴포넌트 리스트 반환
 * @returns {Object.<string, ComponentConfig[]>} 카테고리를 키로 하는 컴포넌트 배열
 */
function getComponentsByCategory() {
  const grouped = {};

  getEnabledComponents().forEach((comp) => {
    const category = comp.category || "Uncategorized";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(comp);
  });

  return grouped;
}

/**
 * 특정 카테고리의 컴포넌트 리스트 반환
 * @param {string} category - 카테고리명
 * @returns {ComponentConfig[]} 해당 카테고리의 컴포넌트 배열
 */
function getComponentsInCategory(category) {
  return getEnabledComponents().filter((comp) => comp.category === category);
}

/**
 * 모든 카테고리 리스트 반환
 * @returns {string[]} 카테고리명 배열
 */
function getAllCategories() {
  return [...new Set(COMPONENT_LIST.map((comp) => comp.category))].filter(
    Boolean
  );
}

// 전역 노출
window.ComponentConfig = {
  COMPONENT_LIST,
  COMPONENT_CATEGORIES,
  getEnabledComponents,
  getComponentConfig,
  getComponentsByCategory,
  getComponentsInCategory,
  getAllCategories,
};

console.log("[ComponentConfig] Loaded successfully");
console.log(
  `[ComponentConfig] ${COMPONENT_LIST.length} components in ${
    getAllCategories().length
  } categories`
);

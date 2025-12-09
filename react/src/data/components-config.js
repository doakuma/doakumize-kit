/**
 * Components Configuration (React용)
 * shared/data/components-config.js를 ES Module 형태로 재export
 *
 * ⚠️ 이 파일은 자동 생성됩니다. 수동으로 수정하지 마세요!
 * 원본: shared/data/components-config.js
 * 생성 스크립트: scripts/sync-components-config.js
 */

/**
 * Components Configuration
 * 컴포넌트 리스트 및 네비게이션 구성 관리
 *
 * 모든 프레임워크(Vanilla, React, MUI)가 공유하는 컴포넌트 설정 파일입니다.
 *
 * 새 컴포넌트 추가 시 이 파일의 COMPONENT_LIST에만 추가하면
 * 모든 프레임워크의 네비게이션과 컨텐츠 패널이 자동으로 생성됩니다.
 *
 * enabled 필드는 프레임워크별 구현 상태를 나타냅니다:
 * - enabled: { vanilla: true, react: false, mui: false }
 *   → Vanilla만 구현됨, React/MUI는 아직 미구현
 */

/**
 * 컴포넌트 카테고리
 */
export const COMPONENT_CATEGORIES = {
  OVERVIEW: "Overview",
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
 * @property {Object|boolean} enabled - 프레임워크별 활성화 여부
 *   - Object 형태: { vanilla: boolean, react: boolean, mui: boolean }
 *   - boolean 형태: 모든 프레임워크에 동일하게 적용 (하위 호환)
 * @property {number} [order] - 정렬 순서 (낮을수록 앞에 표시)
 * @property {boolean} [hasChildren] - 하위 메뉴(카테고리) 여부 (기본: true)
 */

/**
 * enabled 값을 정규화 (boolean → 객체로 변환)
 * @param {Object|boolean} enabled - enabled 값
 * @returns {Object} 정규화된 enabled 객체
 */
export function normalizeEnabled(enabled) {
  if (typeof enabled === "boolean") {
    // 하위 호환: boolean이면 모든 프레임워크에 동일하게 적용
    return {
      vanilla: enabled,
      react: enabled,
      mui: enabled,
    };
  }
  // 이미 객체 형태면 그대로 반환
  return {
    vanilla: enabled?.vanilla ?? false,
    react: enabled?.react ?? false,
    mui: enabled?.mui ?? false,
  };
}

/**
 * 컴포넌트 리스트
 * 카테고리별로 그룹핑되어 있으며, 순서대로 탭이 생성됩니다.
 */
export const COMPONENT_LIST = [
  // ========================================
  // 1️⃣ Foundation (기초)
  // ========================================
  {
    id: "overview",
    name: "Overview",
    category: COMPONENT_CATEGORIES.OVERVIEW,
    enabled: { vanilla: true, react: false, mui: false },
    order: 0,
    hasChildren: false, // 단독 링크 (서브메뉴 없음)
  },
  {
    id: "color",
    name: "Color",
    category: COMPONENT_CATEGORIES.FOUNDATION,
    enabled: { vanilla: true, react: false, mui: false },
    order: 1,
  },
  {
    id: "spacing",
    name: "Spacing",
    category: COMPONENT_CATEGORIES.FOUNDATION,
    enabled: { vanilla: true, react: false, mui: false },
    order: 2,
  },
  {
    id: "icon",
    name: "Icon",
    category: COMPONENT_CATEGORIES.FOUNDATION,
    enabled: { vanilla: true, react: true, mui: false },
    order: 2,
  },
  {
    id: "typography",
    name: "Typography",
    category: COMPONENT_CATEGORIES.FOUNDATION,
    enabled: { vanilla: true, react: false, mui: false },
    order: 3,
  },

  // ========================================
  // 2️⃣ Form Controls (폼 컨트롤)
  // ========================================
  {
    id: "button",
    name: "Button",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: { vanilla: true, react: true, mui: false },
    order: 6,
  },
  {
    id: "input",
    name: "Input",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: { vanilla: true, react: true, mui: false },
    order: 7,
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: { vanilla: true, react: true, mui: false },
    order: 8,
  },
  {
    id: "radio",
    name: "Radio",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: { vanilla: true, react: true, mui: false },
    order: 9,
  },
  {
    id: "dropdown",
    name: "Dropdown",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: { vanilla: true, react: false, mui: false },
    order: 10,
  },
  {
    id: "slider",
    name: "Slider",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: { vanilla: true, react: false, mui: false },
    order: 11,
  },
  {
    id: "switch",
    name: "Switch",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: { vanilla: true, react: false, mui: false },
    order: 12,
  },
  {
    id: "textarea",
    name: "Textarea",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: { vanilla: true, react: false, mui: false },
    order: 13,
  },
  {
    id: "file-upload",
    name: "File Upload",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: { vanilla: true, react: false, mui: false },
    order: 14,
  },
  {
    id: "datepicker",
    name: "Date Picker",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: { vanilla: true, react: false, mui: false },
    order: 15,
  },
  {
    id: "autocomplete",
    name: "Autocomplete",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: { vanilla: false, react: false, mui: false },
    order: 16,
  },
  {
    id: "rating",
    name: "Rating",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: { vanilla: false, react: false, mui: false },
    order: 17,
  },

  // ========================================
  // 3️⃣ Data Display (데이터 표시)
  // ========================================
  {
    id: "chip",
    name: "Chip",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: { vanilla: true, react: true, mui: false },
    order: 18,
  },
  {
    id: "table",
    name: "Table",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: { vanilla: true, react: false, mui: false },
    order: 19,
  },
  {
    id: "file-card",
    name: "File Card",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: { vanilla: true, react: false, mui: false },
    order: 20,
  },
  {
    id: "badge",
    name: "Badge",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: { vanilla: true, react: false, mui: false },
    order: 21,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: { vanilla: true, react: false, mui: false },
    order: 22,
  },
  {
    id: "divider",
    name: "Divider",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: { vanilla: false, react: false, mui: false },
    order: 23,
  },
  {
    id: "card",
    name: "Card",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: { vanilla: false, react: false, mui: false },
    order: 24,
  },
  {
    id: "avatar",
    name: "Avatar",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: { vanilla: false, react: false, mui: false },
    order: 25,
  },
  {
    id: "progress-bar",
    name: "Progress Bar",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: { vanilla: false, react: false, mui: false },
    order: 26,
  },
  {
    id: "list",
    name: "List",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: { vanilla: false, react: false, mui: false },
    order: 27,
  },
  {
    id: "skeleton",
    name: "Skeleton",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: { vanilla: false, react: false, mui: false },
    order: 28,
  },
  {
    id: "empty-state",
    name: "Empty State",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: { vanilla: false, react: false, mui: false },
    order: 29,
  },
  {
    id: "timeline",
    name: "Timeline",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: { vanilla: false, react: false, mui: false },
    order: 30,
  },
  {
    id: "carousel",
    name: "Carousel (외부 라이브러리 사용)",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: { vanilla: false, react: false, mui: false },
    order: 31,
  },

  // ========================================
  // 4️⃣ Feedback (피드백)
  // ========================================
  {
    id: "modal",
    name: "Modal",
    category: COMPONENT_CATEGORIES.FEEDBACK,
    enabled: { vanilla: true, react: false, mui: false },
    order: 28,
  },
  {
    id: "popover",
    name: "Popover",
    category: COMPONENT_CATEGORIES.FEEDBACK,
    enabled: { vanilla: true, react: false, mui: false },
    order: 29,
  },
  {
    id: "drawer",
    name: "Drawer",
    category: COMPONENT_CATEGORIES.FEEDBACK,
    enabled: { vanilla: false, react: false, mui: false },
    order: 30,
  },
  {
    id: "toast",
    name: "Toast",
    category: COMPONENT_CATEGORIES.FEEDBACK,
    enabled: { vanilla: false, react: false, mui: false },
    order: 31,
  },
  {
    id: "notification",
    name: "Notification",
    category: COMPONENT_CATEGORIES.FEEDBACK,
    enabled: { vanilla: false, react: false, mui: false },
    order: 32,
  },
  {
    id: "loading-spinner",
    name: "Loading Spinner",
    category: COMPONENT_CATEGORIES.FEEDBACK,
    enabled: { vanilla: false, react: false, mui: false },
    order: 33,
  },
  // Note: Alert와 Dialog는 Modal 옵션으로 구현 (별도 컴포넌트 없음)

  // ========================================
  // 5️⃣ Navigation (네비게이션)
  // ========================================
  {
    id: "tab",
    name: "Tab",
    category: COMPONENT_CATEGORIES.NAVIGATION,
    enabled: { vanilla: true, react: false, mui: false },
    order: 35,
  },
  {
    id: "accordion",
    name: "Accordion",
    category: COMPONENT_CATEGORIES.NAVIGATION,
    enabled: { vanilla: true, react: false, mui: false },
    order: 36,
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    category: COMPONENT_CATEGORIES.NAVIGATION,
    enabled: { vanilla: false, react: false, mui: false },
    order: 37,
  },
  {
    id: "pagination",
    name: "Pagination",
    category: COMPONENT_CATEGORIES.NAVIGATION,
    enabled: { vanilla: false, react: false, mui: false },
    order: 38,
  },
  {
    id: "menu",
    name: "Menu",
    category: COMPONENT_CATEGORIES.NAVIGATION,
    enabled: { vanilla: false, react: false, mui: false },
    order: 39,
  },
  {
    id: "stepper",
    name: "Stepper",
    category: COMPONENT_CATEGORIES.NAVIGATION,
    enabled: { vanilla: false, react: false, mui: false },
    order: 40,
  },
  {
    id: "tree-menu",
    name: "Tree Menu",
    category: COMPONENT_CATEGORIES.NAVIGATION,
    enabled: { vanilla: true, react: false, mui: false },
    order: 41,
  },
];

/**
 * 프레임워크별 활성화된 컴포넌트 리스트 반환
 * @param {string} framework - 프레임워크 이름 ('vanilla', 'react', 'mui')
 * @returns {ComponentConfig[]} 활성화된 컴포넌트 배열
 */
export function getEnabledComponents(framework = "react") {
  return COMPONENT_LIST.filter((comp) => {
    const enabled = normalizeEnabled(comp.enabled);
    return enabled[framework] === true;
  }).sort((a, b) => (a.order || 0) - (b.order || 0));
}

/**
 * 컴포넌트 ID로 설정 가져오기
 * @param {string} id - 컴포넌트 ID
 * @returns {ComponentConfig|null} 컴포넌트 설정 또는 null
 */
export function getComponentConfig(id) {
  return COMPONENT_LIST.find((comp) => comp.id === id) || null;
}

/**
 * 프레임워크별 카테고리별로 그룹핑된 컴포넌트 리스트 반환
 * @param {string} framework - 프레임워크 이름 ('vanilla', 'react', 'mui')
 * @returns {Object.<string, ComponentConfig[]>} 카테고리를 키로 하는 컴포넌트 배열
 */
export function getComponentsByCategory(framework = "react") {
  const grouped = {};

  getEnabledComponents(framework).forEach((comp) => {
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
 * @param {string} framework - 프레임워크 이름 ('vanilla', 'react', 'mui')
 * @returns {ComponentConfig[]} 해당 카테고리의 컴포넌트 배열
 */
export function getComponentsInCategory(category, framework = "react") {
  return getEnabledComponents(framework).filter(
    (comp) => comp.category === category
  );
}

/**
 * 모든 카테고리 리스트 반환
 * @returns {string[]} 카테고리명 배열
 */
export function getAllCategories() {
  return [...new Set(COMPONENT_LIST.map((comp) => comp.category))].filter(
    Boolean
  );
}

/**
 * 컴포넌트가 특정 프레임워크에서 활성화되어 있는지 확인
 * @param {ComponentConfig} comp - 컴포넌트 설정
 * @param {string} framework - 프레임워크 이름 ('vanilla', 'react', 'mui')
 * @returns {boolean} 활성화 여부
 */
export function isComponentEnabled(comp, framework = "react") {
  const enabled = normalizeEnabled(comp.enabled);
  return enabled[framework] === true;
}

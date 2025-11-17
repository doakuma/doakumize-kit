/**
 * Components Configuration (React용)
 * shared/data/components-config.js를 ES Module 형태로 재export
 * 
 * Vite에서 직접 import할 수 있도록 별도 파일로 관리
 */

// shared 폴더의 config를 import (Vite alias 사용)
// @shared/data/components-config.js는 브라우저에서 직접 실행 불가하므로
// 빌드 시점에 복사하거나, 여기서 수동으로 동기화 필요

// TODO: 빌드 스크립트로 shared/data/components-config.js를 자동 복사하도록 개선

// 임시: shared/data/components-config.js의 내용을 여기에 복사
// 또는 fetch로 동적 로드 (개발 환경에서만)

export const COMPONENT_CATEGORIES = {
  OVERVIEW: "Overview",
  FOUNDATION: "Foundation",
  FORM_CONTROLS: "Form Controls",
  DATA_DISPLAY: "Data Display",
  FEEDBACK: "Feedback",
  NAVIGATION: "Navigation",
};

// enabled를 정규화하는 헬퍼 함수
export function normalizeEnabled(enabled) {
  if (typeof enabled === "boolean") {
    return {
      vanilla: enabled,
      react: enabled,
      mui: enabled,
    };
  }
  return {
    vanilla: enabled?.vanilla ?? false,
    react: enabled?.react ?? false,
    mui: enabled?.mui ?? false,
  };
}

// 컴포넌트가 특정 프레임워크에서 활성화되어 있는지 확인
export function isComponentEnabled(comp, framework = "react") {
  const enabled = normalizeEnabled(comp.enabled);
  return enabled[framework] === true;
}

// shared/data/components-config.js의 COMPONENT_LIST를 여기에 복사
// TODO: 빌드 스크립트로 자동 동기화
export const COMPONENT_LIST = [
  {
    id: "overview",
    name: "Overview",
    category: COMPONENT_CATEGORIES.OVERVIEW,
    enabled: { vanilla: true, react: false, mui: false },
    order: 0,
    hasChildren: false,
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
    enabled: { vanilla: true, react: false, mui: false },
    order: 2,
  },
  {
    id: "typography",
    name: "Typography",
    category: COMPONENT_CATEGORIES.FOUNDATION,
    enabled: { vanilla: true, react: false, mui: false },
    order: 3,
  },
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
    enabled: { vanilla: true, react: false, mui: false },
    order: 7,
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: { vanilla: true, react: false, mui: false },
    order: 8,
  },
  {
    id: "radio",
    name: "Radio",
    category: COMPONENT_CATEGORIES.FORM_CONTROLS,
    enabled: { vanilla: true, react: false, mui: false },
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
  {
    id: "chip",
    name: "Chip",
    category: COMPONENT_CATEGORIES.DATA_DISPLAY,
    enabled: { vanilla: true, react: false, mui: false },
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

// 프레임워크별 활성화된 컴포넌트 리스트 반환
export function getEnabledComponents(framework = "react") {
  return COMPONENT_LIST.filter((comp) => isComponentEnabled(comp, framework))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}


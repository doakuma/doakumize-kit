/**
 * Showcase 파일 자동 로드 (Vite import.meta.glob 사용)
 *
 * Vite의 import.meta.glob을 사용하여 모든 showcase 파일을
 * 자동으로 찾아서 빌드 시 번들에 포함시킵니다.
 *
 * 새로운 showcase 파일 추가 시:
 * 1. showcase 파일 생성 (예: Button.showcase.jsx)
 * 2. export 이름 규칙: {componentId}Showcase (camelCase)
 *    예: "button" -> "buttonShowcase"
 * 3. 끝! 자동으로 인식됨 ✨
 *
 * 파일 경로 규칙:
 * - src/components/ui/{ComponentName}/{ComponentName}.showcase.jsx
 * - 예: src/components/ui/Button/Button.showcase.jsx
 */

/**
 * 모든 showcase 파일을 자동으로 로드
 *
 * import.meta.glob은 빌드 시점에 모든 매칭되는 파일을 찾아서
 * 번들에 포함시키고, 런타임에 동적으로 로드할 수 있게 해줍니다.
 *
 * eager: true 옵션으로 빌드 시점에 모든 파일을 미리 로드합니다.
 */
const showcaseModules = import.meta.glob("../**/*.showcase.jsx", {
  eager: true,
});

/**
 * showcase 맵 생성
 *
 * 모든 showcase 파일에서 export된 데이터를 컴포넌트 ID로 매핑합니다.
 */
function createShowcaseMap() {
  const map = {};

  // 모든 showcase 모듈 순회
  Object.entries(showcaseModules).forEach(([path, module]) => {
    // 경로에서 컴포넌트 이름 추출
    // 예: "../Button/Button.showcase.jsx" -> "Button"
    const match = path.match(/\/([^/]+)\/\1\.showcase\.jsx$/);
    if (!match) {
      console.warn(`[Showcase] Invalid showcase path: ${path}`);
      return;
    }

    const componentName = match[1]; // "Button"
    const componentId = componentName
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace(/^-/, ""); // "Button" -> "button"

    // export 이름 규칙: {componentId}Showcase (camelCase)
    const exportName = `${componentId}Showcase`;

    // 모듈에서 showcase 데이터 찾기
    const showcaseData = module[exportName] || module.default || module;

    if (showcaseData) {
      map[componentId] = showcaseData;
    } else {
      console.warn(
        `[Showcase] Export "${exportName}" not found in ${path}. Available exports:`,
        Object.keys(module)
      );
    }
  });

  return map;
}

// showcase 맵 생성 (한 번만 실행)
const showcaseMap = createShowcaseMap();

/**
 * 컴포넌트 ID로 showcase 데이터 가져오기
 * @param {string} componentId - 컴포넌트 ID (예: "button")
 * @returns {object|null} showcase 데이터 또는 null
 */
export function getShowcase(componentId) {
  return showcaseMap[componentId] || null;
}

/**
 * 등록된 모든 showcase 컴포넌트 ID 목록 반환
 * @returns {string[]} 컴포넌트 ID 배열
 */
export function getShowcaseIds() {
  return Object.keys(showcaseMap);
}

// 디버깅용 (개발 환경에서만)
if (import.meta.env.DEV) {
  console.log("[Showcase] Loaded showcases:", getShowcaseIds());
}

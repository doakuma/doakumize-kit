/**
 * Components Initialization Script
 * 컴포넌트 엔진 초기화 및 렌더러 등록
 */

// 전역 컴포넌트 엔진 인스턴스
const componentEngine = new ComponentEngine();

/**
 * 컴포넌트 엔진 초기화
 */
async function initializeComponents() {
  console.log("[Init] Initializing component engine...");

  try {
    // 1. 제네릭 렌더러 등록 (대부분의 컴포넌트 처리)
    const genericRenderer = new GenericComponentRenderer();
    componentEngine.registerRenderer("typography", genericRenderer);
    componentEngine.registerRenderer("button", genericRenderer);
    componentEngine.registerRenderer("icon", genericRenderer);
    componentEngine.registerRenderer("generic", genericRenderer);

    // 향후 복잡한 컴포넌트용 전용 렌더러
    // componentEngine.registerRenderer('modal', new ModalRenderer());
    // componentEngine.registerRenderer('tab', new TabRenderer());

    console.log(
      "[Init] Registered renderers:",
      componentEngine.getRegisteredRenderers()
    );

    // 2. Typography 컴포넌트 렌더링
    await renderTypographyComponent();

    console.log("[Init] Component engine initialized successfully");
    console.log("[Init] Cache stats:", componentEngine.getCacheStats());
  } catch (error) {
    console.error("[Init] Failed to initialize components:", error);
  }
}

/**
 * Typography 컴포넌트 렌더링
 */
async function renderTypographyComponent() {
  const targetElement = document.getElementById("componentTypography");

  if (!targetElement) {
    console.warn("[Init] Typography target element not found");
    return;
  }

  console.log("[Init] Rendering Typography component...");

  try {
    await componentEngine.loadAndMount(
      "typography",
      "components/data/typography.json",
      targetElement
    );
    console.log("[Init] Typography component rendered successfully");
  } catch (error) {
    console.error("[Init] Failed to render Typography component:", error);
    targetElement.innerHTML =
      '<div class="error">Typography 컴포넌트를 불러오는데 실패했습니다.</div>';
  }
}

/**
 * 개발자 도구 - 캐시 초기화 및 재렌더링
 */
function reloadComponents() {
  console.log("[Dev] Reloading components...");
  componentEngine.clearCache();
  componentEngine.dataCache.clear();
  initializeComponents();
}

/**
 * 개발자 도구 - 캐시 상태 확인
 */
function showCacheStats() {
  const stats = componentEngine.getCacheStats();
  console.table(stats);
  return stats;
}

// DOM이 로드되면 초기화
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeComponents);
} else {
  // DOM이 이미 로드된 경우
  initializeComponents();
}

// 개발자 도구용 전역 함수 노출
window.componentEngine = componentEngine;
window.reloadComponents = reloadComponents;
window.showCacheStats = showCacheStats;

console.log(
  "[Init] Component system loaded. Use reloadComponents() or showCacheStats() in console."
);

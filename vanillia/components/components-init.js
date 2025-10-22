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
    // 1. 제네릭 렌더러 생성
    const genericRenderer = new GenericComponentRenderer();

    // 2. window.ComponentData에 등록된 모든 컴포넌트를 자동으로 등록
    if (window.ComponentData) {
      const registeredTypes = Object.keys(window.ComponentData);
      console.log(
        `[Init] Auto-registering ${registeredTypes.length} component type(s):`,
        registeredTypes
      );

      registeredTypes.forEach((type) => {
        componentEngine.registerRenderer(type, genericRenderer);
      });
    }

    // 3. 기본 제네릭 렌더러 등록 (fallback)
    componentEngine.registerRenderer("generic", genericRenderer);

    // 4. 복잡한 컴포넌트용 전용 렌더러
    // Modal 컴포넌트: 모달 렌더링 및 팩토리 함수 제공
    const modalRenderer = new ModalRenderer();
    componentEngine.registerRenderer("modal", modalRenderer);
    console.log("[Init] ✓ ModalRenderer registered for 'modal' component");

    // Icon 컴포넌트: 카테고리별 아이콘 렌더링 및 클릭 인터랙션
    const iconRenderer = new IconRenderer();
    componentEngine.registerRenderer("icon", iconRenderer);
    console.log("[Init] ✓ IconRenderer registered for 'icon' component");

    // 추가 전용 렌더러 (필요시 추가)
    // componentEngine.registerRenderer('tab', new TabRenderer());

    console.log(
      "[Init] Registered renderers:",
      componentEngine.getRegisteredRenderers()
    );

    // 5. data 속성이 있는 모든 컴포넌트 자동 렌더링
    await autoMountComponents();

    // 6. Modal HTML을 body 끝에 자동 추가
    renderModals();

    console.log("[Init] Component engine initialized successfully");
    console.log("[Init] Cache stats:", componentEngine.getCacheStats());
  } catch (error) {
    console.error("[Init] Failed to initialize components:", error);
  }
}

/**
 * 로딩 상태 HTML 생성
 * @param {string} componentType - 컴포넌트 타입
 * @param {string} customText - 커스텀 로딩 텍스트 (선택)
 * @returns {string} 로딩 HTML
 */
function createLoadingHTML(componentType, customText) {
  const text = customText || `${componentType} 컴포넌트를 불러오는 중...`;
  return `
    <div class="component-loading" style="padding: 40px; text-align: center; color: var(--gray-500);">
      <p class="text-body-lg">${text}</p>
    </div>
  `;
}

/**
 * data-component 속성을 가진 모든 요소를 자동으로 마운트
 *
 * 사용법:
 * <div data-component="typography" data-source="typography"></div>
 *
 * data-source가 없으면 data-component 값을 그대로 사용
 * <div data-component="typography"></div>
 *
 * 로딩 메시지 커스터마이징:
 * <div data-component="typography" data-loading-text="로딩 중..."></div>
 */
async function autoMountComponents() {
  const elements = document.querySelectorAll("[data-component]");

  if (elements.length === 0) {
    console.log("[Init] No components to mount");
    return;
  }

  console.log(`[Init] Found ${elements.length} component(s) to mount`);

  const mountPromises = Array.from(elements).map(async (element) => {
    const componentType = element.dataset.component;
    const dataSource = element.dataset.source || componentType; // data-source 없으면 componentType 사용
    const loadingText = element.dataset.loadingText; // 커스텀 로딩 텍스트

    if (!componentType) {
      console.warn(
        "[Init] Skipping element - missing data-component:",
        element
      );
      return;
    }

    // 로딩 상태 표시
    const loadingHTML = createLoadingHTML(componentType, loadingText);
    element.insertAdjacentHTML("afterend", loadingHTML);
    const loadingElement = element.nextElementSibling;

    try {
      console.log(
        `[Init] Mounting ${componentType} component from ${dataSource}...`
      );
      await componentEngine.loadAndMount(componentType, dataSource, element);
      console.log(`[Init] ✓ ${componentType} component mounted successfully`);

      // 로딩 메시지 제거
      if (
        loadingElement &&
        loadingElement.classList.contains("component-loading")
      ) {
        loadingElement.remove();
      }

      // 컴포넌트 마운트 후 코드 보기 버튼 추가
      if (typeof window.addCodeToggleButtons === "function") {
        window.addCodeToggleButtons(element);
      }

      // 동적으로 추가된 컴포넌트의 초기 상태 설정
      // (이벤트는 이미 위임으로 처리되므로 초기 상태만 설정)
      if (typeof window.initDynamicComponents === "function") {
        window.initDynamicComponents();
      }
    } catch (error) {
      console.error(
        `[Init] Failed to mount ${componentType} component:`,
        error
      );

      // 로딩 메시지 제거
      if (
        loadingElement &&
        loadingElement.classList.contains("component-loading")
      ) {
        loadingElement.remove();
      }

      // 에러 메시지 표시
      element.innerHTML = `<div class="error">${componentType} 컴포넌트를 불러오는데 실패했습니다.</div>`;
    }
  });

  await Promise.all(mountPromises);
}

/**
 * Modal HTML을 body 끝에 자동 렌더링
 * modal.data.js의 modals 배열을 읽어서 동적으로 추가
 */
function renderModals() {
  if (!window.ComponentData || !window.ComponentData.modal) {
    console.log("[Init] No modal data found, skipping modal rendering");
    return;
  }

  const modalData = window.ComponentData.modal;
  if (!modalData.modals || modalData.modals.length === 0) {
    console.log("[Init] No modals to render");
    return;
  }

  console.log(`[Init] Rendering ${modalData.modals.length} modal(s)...`);

  // 기존 modal-container가 있으면 제거 (재로딩 시)
  const existingContainer = document.getElementById("modal-container");
  if (existingContainer) {
    existingContainer.remove();
  }

  // 새 modal-container 생성
  const modalContainer = document.createElement("div");
  modalContainer.id = "modal-container";

  // 모든 Modal HTML 추가
  modalData.modals.forEach((modal) => {
    modalContainer.innerHTML += modal.html;
    console.log(`[Init] ✓ Modal rendered: ${modal.id} (${modal.type})`);
  });

  // body 끝에 추가
  document.body.appendChild(modalContainer);
  console.log("[Init] All modals rendered successfully");
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

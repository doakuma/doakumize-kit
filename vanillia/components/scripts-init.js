/**
 * Components Scripts Initialization
 * 컴포넌트 스크립트 자동 초기화 시스템
 *
 * 모든 VanillaComponents 네임스페이스의 init* 함수를 자동으로 찾아서 실행합니다.
 */

(function () {
  "use strict";

  /**
   * 컴포넌트 스크립트 초기화
   * VanillaComponents 네임스페이스의 모든 init* 함수를 자동 실행
   */
  function initializeComponentScripts() {
    console.log("[ScriptsInit] Initializing component scripts...");

    // VanillaComponents 네임스페이스가 없으면 종료
    if (
      !window.VanillaComponents ||
      typeof window.VanillaComponents !== "object"
    ) {
      console.warn("[ScriptsInit] VanillaComponents namespace not found");
      return;
    }

    const initFunctions = [];
    const namespace = window.VanillaComponents;

    // init* 패턴으로 시작하는 모든 함수 찾기
    for (const key in namespace) {
      if (
        typeof namespace[key] === "function" &&
        key.startsWith("init") &&
        key.length > 4 // "init"보다 긴 경우만
      ) {
        initFunctions.push({
          name: key,
          fn: namespace[key],
        });
      }
    }

    if (initFunctions.length === 0) {
      console.log("[ScriptsInit] No init functions found");
      return;
    }

    console.log(
      `[ScriptsInit] Found ${initFunctions.length} init function(s):`,
      initFunctions.map((f) => f.name)
    );

    // 모든 초기화 함수 실행
    initFunctions.forEach(({ name, fn }) => {
      try {
        console.log(`[ScriptsInit] Initializing: ${name}...`);
        fn();
        console.log(`[ScriptsInit] ✓ ${name} initialized successfully`);
      } catch (error) {
        console.error(`[ScriptsInit] Failed to initialize ${name}:`, error);
      }
    });

    console.log("[ScriptsInit] All component scripts initialized");
  }

  // DOM이 로드되면 초기화
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeComponentScripts);
  } else {
    // DOM이 이미 로드된 경우 즉시 실행
    initializeComponentScripts();
  }
})();

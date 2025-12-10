/**
 * Index Page Script
 * shared/data/components-config.js 데이터를 기반으로 동적으로 컴포넌트 리스트 생성
 */

(function () {
  "use strict";

  /**
   * 카테고리별 컴포넌트 카드 생성
   */
  function renderCategoryCards() {
    const categoriesGrid = document.getElementById("categoriesGrid");
    if (!categoriesGrid) {
      console.warn("[Index] categoriesGrid element not found");
      return;
    }

    // shared/data/components-config.js에서 데이터 가져오기
    if (
      !window.ComponentConfig ||
      !window.ComponentConfig.COMPONENT_CATEGORIES
    ) {
      console.error("[Index] ComponentConfig not loaded");
      return;
    }

    const { COMPONENT_LIST, COMPONENT_CATEGORIES } = window.ComponentConfig;

    // 카테고리별로 그룹핑
    const categoryGroups = {};
    Object.values(COMPONENT_CATEGORIES).forEach((category) => {
      categoryGroups[category] = {
        completed: [],
        pending: [],
      };
    });

    // 컴포넌트 분류 (Vanilla 기준)
    COMPONENT_LIST.forEach((comp) => {
      const category = comp.category;
      if (!categoryGroups[category]) return;

      const isCompleted = window.ComponentConfig.isComponentEnabled(
        comp,
        "vanilla"
      );

      if (isCompleted) {
        categoryGroups[category].completed.push(comp);
      } else {
        categoryGroups[category].pending.push(comp);
      }
    });

    // 카테고리 순서 정의
    const categoryOrder = [
      COMPONENT_CATEGORIES.FOUNDATION,
      COMPONENT_CATEGORIES.FORM_CONTROLS,
      COMPONENT_CATEGORIES.DATA_DISPLAY,
      COMPONENT_CATEGORIES.FEEDBACK,
      COMPONENT_CATEGORIES.NAVIGATION,
    ];

    // 카테고리 카드 HTML 생성
    const cardsHTML = categoryOrder
      .map((category) => {
        const group = categoryGroups[category];
        const completedCount = group.completed.length;
        const totalCount = group.completed.length + group.pending.length;

        // 완성된 컴포넌트 (order 순서로 정렬)
        const completedItems = group.completed
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map(
            (comp) =>
              `<span class="component-item component-item--completed">${comp.name} ✅</span>`
          )
          .join("\n                  ");

        // 미완성 컴포넌트 (order 순서로 정렬)
        const pendingItems = group.pending
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map(
            (comp) =>
              `<span class="component-item component-item--pending">${comp.name} 🚧</span>`
          )
          .join("\n                  ");

        return `
              <!-- Category: ${category} -->
              <div class="category-card">
                <h3 class="category-title">
                  ${category}
                  <span class="category-count">(${completedCount}/${totalCount} 완성)</span>
                </h3>
                <div class="component-list">
                  ${completedItems}
                  ${pendingItems}
                </div>
              </div>`;
      })
      .join("\n");

    categoriesGrid.innerHTML = cardsHTML;
    console.log("[Index] Category cards rendered");
  }

  /**
   * 진행률 섹션 생성
   */
  function renderProgressSection() {
    const progressSection = document.getElementById("progressSection");
    if (!progressSection) {
      console.warn("[Index] progressSection element not found");
      return;
    }

    if (!window.ComponentConfig || !window.ComponentConfig.COMPONENT_LIST) {
      console.error("[Index] ComponentConfig not loaded");
      return;
    }

    const { COMPONENT_LIST } = window.ComponentConfig;

    // 완성/전체 개수 계산 (Vanilla 기준)
    const completedCount = COMPONENT_LIST.filter((comp) =>
      window.ComponentConfig.isComponentEnabled(comp, "vanilla")
    ).length;
    const totalCount = COMPONENT_LIST.length;
    const percentage = Math.round((completedCount / totalCount) * 100);

    const progressHTML = `
              <p class="progress-text">
                진행률: <strong>${completedCount}/${totalCount} Components (${percentage}%)</strong>
              </p>
              <div class="progress-bar-track">
                <div class="progress-bar-fill" style="width: ${percentage}%"></div>
              </div>`;

    progressSection.innerHTML = progressHTML;
    console.log(
      `[Index] Progress rendered: ${completedCount}/${totalCount} (${percentage}%)`
    );
  }

  /**
   * 페이지 초기화
   */
  function init() {
    console.log("[Index] Initializing...");

    // DOM이 준비되면 렌더링
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        renderCategoryCards();
        renderProgressSection();
      });
    } else {
      renderCategoryCards();
      renderProgressSection();
    }
  }

  // 초기화 실행
  init();
})();

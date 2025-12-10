/**
 * Tab Component Script
 * 탭 컴포넌트: 탭 전환, 키보드 네비게이션, 콘텐츠 패널 제어
 *
 * 사용법:
 * <div class="tab-group" data-tab-group="myTabs">
 *   <button class="tab" data-tab-content="panel1">탭 1</button>
 *   <button class="tab" data-tab-content="panel2">탭 2</button>
 * </div>
 * <div data-tab-content="myTabs">
 *   <div id="panel1" class="tab-content-panel">콘텐츠 1</div>
 *   <div id="panel2" class="tab-content-panel">콘텐츠 2</div>
 * </div>
 */

(function () {
  "use strict";

  /**
   * Tab 초기화 함수
   */
  function initTab() {
    console.log("[Tab] Initializing Tab...");

    // 이벤트 위임 방식 (한 번만 등록, 모든 동적 요소 지원)
    initTabEventDelegation();

    // 초기 상태 설정
    initTabs();

    console.log("[Tab] Tab initialized successfully");
  }

  /**
   * 탭 컴포넌트 초기화
   * 이벤트는 이벤트 위임으로 처리되므로, 여기서는 초기 상태만 설정
   */
  function initTabs() {
    const tabGroups = document.querySelectorAll(
      ".tab-group:not([data-tab-initialized])"
    );

    tabGroups.forEach((group) => {
      const tabs = group.querySelectorAll(".tab");

      // 기본 활성 탭 설정
      setDefaultActiveTab(group, tabs);

      // 초기화 완료 표시
      group.setAttribute("data-tab-initialized", "true");
    });

    console.log(`[Tab] Initialized ${tabGroups.length} tab group(s)`);
  }

  /**
   * 기본 활성 탭 설정
   * @param {HTMLElement} tabGroup - 탭 그룹 요소
   * @param {NodeList} tabs - 탭 요소 목록
   */
  function setDefaultActiveTab(tabGroup, tabs) {
    // 활성화된 탭들 찾기
    const activeTabs = Array.from(tabs).filter((tab) =>
      tab.classList.contains("tab--active")
    );

    if (activeTabs.length === 0 && tabs.length > 0) {
      // 활성 탭이 없는 경우: data-default-active 속성으로 기본 활성 탭 인덱스 지정 가능 (0부터 시작)
      const defaultIndex = parseInt(
        tabGroup.getAttribute("data-default-active")
      );
      const targetIndex =
        !isNaN(defaultIndex) && defaultIndex >= 0 && defaultIndex < tabs.length
          ? defaultIndex
          : 0;

      const defaultTab = tabs[targetIndex];

      // 첫 번째(또는 지정된) 탭을 활성화
      defaultTab.classList.add("tab--active");
      defaultTab.setAttribute("aria-selected", "true");
      defaultTab.setAttribute("tabindex", "0");

      // 나머지 탭들 비활성화 상태로 설정
      tabs.forEach((tab, index) => {
        if (index !== targetIndex) {
          tab.classList.remove("tab--active");
          tab.setAttribute("aria-selected", "false");
          tab.setAttribute("tabindex", "-1");
        }
      });

      // 탭 콘텐츠 제어
      const tabGroupId = tabGroup.getAttribute("data-tab-group");
      if (tabGroupId) {
        updateTabContent(tabGroupId, defaultTab);
      }
    } else if (activeTabs.length > 0) {
      // 이미 활성화된 탭이 있는 경우
      const activeTab = activeTabs[0]; // 첫 번째 활성 탭 사용
      const tabGroupId = tabGroup.getAttribute("data-tab-group");

      // 중복 활성 탭이 있으면 첫 번째만 유지하고 나머지 정리
      if (activeTabs.length > 1) {
        console.warn(
          `[Tab] 여러 개의 활성 탭이 발견되었습니다. 첫 번째 탭만 활성화합니다.`,
          activeTabs
        );
      }

      // 모든 탭의 상태를 명확하게 설정
      tabs.forEach((tab) => {
        if (tab === activeTab) {
          tab.classList.add("tab--active");
          tab.setAttribute("aria-selected", "true");
          tab.setAttribute("tabindex", "0");
        } else {
          tab.classList.remove("tab--active");
          tab.setAttribute("aria-selected", "false");
          tab.setAttribute("tabindex", "-1");
        }
      });

      // 콘텐츠 패널이 활성 탭과 동기화되어 있는지 확인
      if (activeTab && tabGroupId) {
        initializeTabContentPanels(tabGroupId, activeTab);
      }
    }
  }

  /**
   * 탭 콘텐츠 패널 초기화
   * @param {string} tabGroupId - 탭 그룹 ID
   * @param {HTMLElement} activeTab - 활성화된 탭 요소
   */
  function initializeTabContentPanels(tabGroupId, activeTab) {
    const contentContainer = document.querySelector(
      `[data-tab-content="${CSS.escape(tabGroupId)}"]`
    );
    const tabContentId = activeTab.getAttribute("data-tab-content");

    if (contentContainer && tabContentId) {
      const contentPanels =
        contentContainer.querySelectorAll(".tab-content-panel");

      // 모든 콘텐츠 패널 초기화
      contentPanels.forEach((panel) => {
        if (panel.id === tabContentId) {
          // 활성 탭에 해당하는 패널 활성화
          panel.classList.add("tab-content-panel--active");
          panel.setAttribute("aria-hidden", "false");
        } else {
          // 나머지 패널 비활성화
          panel.classList.remove("tab-content-panel--active");
          panel.setAttribute("aria-hidden", "true");
        }
      });
    }
  }

  /**
   * 탭 선택 처리
   * @param {HTMLElement} tabGroup - 탭 그룹 요소
   * @param {HTMLElement} selectedTab - 선택된 탭 요소
   */
  function selectTab(tabGroup, selectedTab) {
    const tabs = tabGroup.querySelectorAll(".tab");
    const tabGroupId = tabGroup.getAttribute("data-tab-group");

    // 모든 탭에서 active 클래스 제거
    tabs.forEach((tab) => {
      tab.classList.remove("tab--active");
      tab.setAttribute("aria-selected", "false");
      tab.setAttribute("tabindex", "-1");
    });

    // 선택된 탭에 active 클래스 추가
    selectedTab.classList.add("tab--active");
    selectedTab.setAttribute("aria-selected", "true");
    selectedTab.setAttribute("tabindex", "0");

    // 탭 콘텐츠 제어
    if (tabGroupId) {
      updateTabContent(tabGroupId, selectedTab);
    }

    // 커스텀 이벤트 발생
    const event = new CustomEvent("tab:change", {
      detail: {
        tabGroup: tabGroup,
        selectedTab: selectedTab,
        tabGroupId: tabGroupId,
      },
    });

    document.dispatchEvent(event);
  }

  /**
   * 탭 콘텐츠 업데이트
   * @param {string} tabGroupId - 탭 그룹 ID
   * @param {HTMLElement} selectedTab - 선택된 탭 요소
   */
  function updateTabContent(tabGroupId, selectedTab) {
    const contentContainer = document.querySelector(
      `[data-tab-content="${CSS.escape(tabGroupId)}"]`
    );
    const tabContentId = selectedTab.getAttribute("data-tab-content");

    if (contentContainer && tabContentId) {
      const contentPanels =
        contentContainer.querySelectorAll(".tab-content-panel");

      // 모든 콘텐츠 패널 숨기기
      contentPanels.forEach((panel) => {
        panel.classList.remove("tab-content-panel--active");
        panel.setAttribute("aria-hidden", "true");
      });

      // 선택된 콘텐츠 패널 표시
      const activePanel = contentContainer.querySelector(
        `#${CSS.escape(tabContentId)}`
      );
      if (activePanel) {
        activePanel.classList.add("tab-content-panel--active");
        activePanel.setAttribute("aria-hidden", "false");
      }
    }
  }

  /**
   * 화살표 키로 탭 간 이동
   * @param {HTMLElement} tabGroup - 탭 그룹 요소
   * @param {HTMLElement} currentTab - 현재 포커스된 탭
   * @param {string} direction - 이동 방향 ('ArrowLeft' 또는 'ArrowRight')
   */
  function navigateTabs(tabGroup, currentTab, direction) {
    const tabs = Array.from(tabGroup.querySelectorAll(".tab"));
    const currentIndex = tabs.indexOf(currentTab);

    let nextIndex;
    if (direction === "ArrowLeft") {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    } else {
      nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    }

    const nextTab = tabs[nextIndex];
    nextTab.focus();
  }

  /**
   * 탭 클릭 이벤트 위임 (동적으로 추가된 탭에도 적용)
   */
  function initTabEventDelegation() {
    // 탭 클릭 이벤트
    document.addEventListener("click", function (e) {
      const tab = e.target.closest(".tab");
      if (tab) {
        const tabGroup = tab.closest(".tab-group");
        if (tabGroup) {
          e.preventDefault();
          selectTab(tabGroup, tab);
        }
      }
    });

    // 탭 키보드 접근성
    document.addEventListener("keydown", function (e) {
      const tab = e.target.closest(".tab");
      if (tab) {
        const tabGroup = tab.closest(".tab-group");
        if (tabGroup) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            selectTab(tabGroup, tab);
          }

          // 화살표 키로 탭 간 이동
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            navigateTabs(tabGroup, tab, e.key);
          }
        }
      }
    });
  }

  // 전역 네임스페이스에 등록
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initTab = initTab;
})();

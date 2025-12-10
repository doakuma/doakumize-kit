/**
 * Tree Menu Component Script
 * 트리 메뉴 컴포넌트 기능을 제공합니다.
 *
 * 기능:
 * - 메뉴 아이템 펼치기/접기
 * - Accordion 모드 (하나만 열림) / Multi-expand 모드 (여러 개 동시 열림)
 * - Active 상태 관리
 * - 키보드 접근성 지원
 */

(function () {
  "use strict";

  /**
   * Tree Menu 기능 초기화
   * @param {HTMLElement} treeMenu - 트리 메뉴 컨테이너 요소
   */
  function initTreeMenu(treeMenu) {
    if (!treeMenu) return;

    const mode = treeMenu.dataset.treeMode || "accordion"; // 기본값: accordion

    // 토글 버튼 클릭 이벤트
    treeMenu.addEventListener("click", function (e) {
      // 토글 버튼 클릭
      if (e.target.closest(".tree-menu-item__toggle")) {
        e.preventDefault();
        e.stopPropagation();

        const toggleBtn = e.target.closest(".tree-menu-item__toggle");
        const menuItem = toggleBtn.closest(".tree-menu-item");

        if (menuItem) {
          const isExpanded = menuItem.classList.contains(
            "tree-menu-item--expanded"
          );

          // Accordion 모드: 다른 메뉴 아이템들 닫기
          if (mode === "accordion" && !isExpanded) {
            const allMenuItems = treeMenu.querySelectorAll(".tree-menu-item");
            allMenuItems.forEach((item) => {
              if (item !== menuItem) {
                item.classList.remove("tree-menu-item--expanded");
                const toggle = item.querySelector(".tree-menu-item__toggle");
                if (toggle) {
                  toggle.setAttribute("aria-expanded", "false");
                }
              }
            });
          }

          // 현재 메뉴 아이템 토글
          menuItem.classList.toggle("tree-menu-item--expanded");
          toggleBtn.setAttribute(
            "aria-expanded",
            menuItem.classList.contains("tree-menu-item--expanded")
              ? "true"
              : "false"
          );
        }
      }

      // 메뉴 아이템 링크 클릭
      if (e.target.closest(".tree-menu-item__link")) {
        const link = e.target.closest(".tree-menu-item__link");
        const menuItem = link.closest(".tree-menu-item");

        if (menuItem) {
          // 하위 메뉴가 있는 경우 토글 기능 추가
          const submenu = menuItem.querySelector(".tree-menu-item__submenu");
          const toggleBtn = menuItem.querySelector(".tree-menu-item__toggle");

          if (submenu && toggleBtn) {
            // 하위 메뉴가 있으면 토글
            const isExpanded = menuItem.classList.contains(
              "tree-menu-item--expanded"
            );

            // Accordion 모드: 다른 메뉴 아이템들 닫기
            if (mode === "accordion" && !isExpanded) {
              const allMenuItems = treeMenu.querySelectorAll(".tree-menu-item");
              allMenuItems.forEach((item) => {
                if (item !== menuItem) {
                  item.classList.remove("tree-menu-item--expanded");
                  const toggle = item.querySelector(".tree-menu-item__toggle");
                  if (toggle) {
                    toggle.setAttribute("aria-expanded", "false");
                  }
                }
              });
            }

            // 현재 메뉴 아이템 토글
            menuItem.classList.toggle("tree-menu-item--expanded");
            toggleBtn.setAttribute(
              "aria-expanded",
              menuItem.classList.contains("tree-menu-item--expanded")
                ? "true"
                : "false"
            );
          } else {
            // 토글이 없는 경우 (leaf node): 다른 모든 트리 메뉴 닫기
            const allMenuItems = treeMenu.querySelectorAll(".tree-menu-item");
            allMenuItems.forEach((item) => {
              item.classList.remove("tree-menu-item--expanded");
              const toggle = item.querySelector(".tree-menu-item__toggle");
              if (toggle) {
                toggle.setAttribute("aria-expanded", "false");
              }
            });
          }

          // 모든 메뉴 아이템에서 active 클래스 제거
          const allMenuItems = treeMenu.querySelectorAll(".tree-menu-item");
          allMenuItems.forEach((item) => {
            item.classList.remove("tree-menu-item--active");
          });

          // 현재 메뉴 아이템에 active 클래스 추가
          menuItem.classList.add("tree-menu-item--active");

          // 링크가 href="#"이면 기본 동작 방지
          if (link.getAttribute("href") === "#") {
            e.preventDefault();
          }
        }
      }

      // 서브메뉴 링크 클릭
      if (e.target.closest(".tree-submenu__link")) {
        const submenuLink = e.target.closest(".tree-submenu__link");
        const menuItem = submenuLink.closest(".tree-menu-item");

        if (menuItem && submenuLink) {
          // 모든 서브메뉴 링크에서 active 클래스 제거
          const allSubmenuLinks = treeMenu.querySelectorAll(
            ".tree-submenu__link"
          );
          allSubmenuLinks.forEach((link) => {
            link.classList.remove("tree-submenu__link--active");
          });

          // 현재 서브메뉴 링크에 active 클래스 추가
          submenuLink.classList.add("tree-submenu__link--active");

          // 부모 메뉴 아이템도 active로 표시하고 expanded 상태 유지
          if (menuItem) {
            const allMenuItems = treeMenu.querySelectorAll(".tree-menu-item");
            allMenuItems.forEach((item) => {
              item.classList.remove("tree-menu-item--active");
            });
            menuItem.classList.add("tree-menu-item--active");

            // 부모 메뉴가 expanded 상태가 아니면 expanded 상태로 만들기
            if (!menuItem.classList.contains("tree-menu-item--expanded")) {
              menuItem.classList.add("tree-menu-item--expanded");
              const toggleBtn = menuItem.querySelector(
                ".tree-menu-item__toggle"
              );
              if (toggleBtn) {
                toggleBtn.setAttribute("aria-expanded", "true");
              }
            }
          }

          // 링크가 href="#"이면 기본 동작 방지
          if (submenuLink.getAttribute("href") === "#") {
            e.preventDefault();
          }
        }
      }
    });

    // 키보드 접근성 지원
    treeMenu.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        const activeElement = document.activeElement;

        if (activeElement.closest(".tree-menu-item__toggle")) {
          e.preventDefault();
          activeElement.click();
        } else if (activeElement.closest(".tree-menu-item__link")) {
          e.preventDefault();
          activeElement.click();
        } else if (activeElement.closest(".tree-submenu__link")) {
          e.preventDefault();
          activeElement.click();
        }
      }
    });

    console.log(`[TreeMenu] Tree menu initialized (mode: ${mode})`);
  }

  /**
   * 모든 Tree Menu 컴포넌트 초기화
   */
  function initAllTreeMenus() {
    const treeMenus = document.querySelectorAll(".tree-menu");
    treeMenus.forEach((treeMenu) => {
      initTreeMenu(treeMenu);
    });

    if (treeMenus.length > 0) {
      console.log(`[TreeMenu] ${treeMenus.length} tree menu(s) initialized`);
    }
  }

  /**
   * 동적으로 추가된 Tree Menu 초기화
   * MutationObserver를 사용하여 DOM 변경 감지
   */
  function observeTreeMenus() {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            // Element node
            if (node.classList && node.classList.contains("tree-menu")) {
              initTreeMenu(node);
            } else {
              // 자식 요소 중 tree-menu 찾기
              const treeMenu = node.querySelector
                ? node.querySelector(".tree-menu")
                : null;
              if (treeMenu) {
                initTreeMenu(treeMenu);
              }
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  /**
   * Tree Menu 컴포넌트 초기화 (scripts-init.js에서 자동 호출)
   */
  function initTreeMenuComponent() {
    console.log("[TreeMenu] Initializing Tree Menu component...");
    initAllTreeMenus();
    observeTreeMenus();
    console.log("[TreeMenu] Tree Menu component initialized successfully");
  }

  // VanillaComponents 네임스페이스 초기화
  if (!window.VanillaComponents) {
    window.VanillaComponents = {};
  }

  // 초기화 함수 등록
  window.VanillaComponents.initTreeMenu = initTreeMenuComponent;
  window.VanillaComponents.initAllTreeMenus = initAllTreeMenus;

  console.log("[TreeMenu] Tree Menu script loaded");
})();

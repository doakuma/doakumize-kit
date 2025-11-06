/**
 * LNB (Left Navigation Bar) Component Script
 * LNB 메뉴 기능 및 토글 기능을 제공합니다.
 *
 * 기능:
 * - 1depth 메뉴 아이템 펼치기/접기
 * - 1depth 프로젝트 이름 클릭 시 대시보드 이동
 * - 2depth 서브메뉴 클릭 시 메뉴 이동
 * - LNB 전체 접기/펼치기 토글
 */

(function () {
  "use strict";

  /**
   * LNB Menu 기능 초기화
   * 1depth 화살표 클릭 시 collapsible
   * 1depth 프로젝트 이름 클릭 시 대시보드 이동
   * 2depth 메뉴 클릭 시 메뉴 이동
   */
  function initLnbMenu() {
    document.addEventListener("click", function (e) {
      // 1depth 토글 버튼 클릭
      if (e.target.closest(".lnb-menu-item__toggle")) {
        e.preventDefault();
        e.stopPropagation();

        const toggleBtn = e.target.closest(".lnb-menu-item__toggle");
        const menuItem = toggleBtn.closest(".lnb-menu-item");

        if (menuItem) {
          // 다른 메뉴 아이템들 닫기
          const allMenuItems = document.querySelectorAll(".lnb-menu-item");
          allMenuItems.forEach((item) => {
            if (item !== menuItem) {
              item.classList.remove("lnb-menu-item--expanded");
            }
          });

          // 현재 메뉴 아이템 토글
          menuItem.classList.toggle("lnb-menu-item--expanded");
        }
      }

      // 1depth 프로젝트 이름 클릭 (대시보드 이동)
      if (e.target.closest(".lnb-menu-item__link")) {
        e.preventDefault();
        e.stopPropagation();

        const link = e.target.closest(".lnb-menu-item__link");
        const menuItem = link.closest(".lnb-menu-item");

        if (menuItem) {
          // 모든 메뉴 아이템에서 active 클래스 제거
          const allMenuItems = document.querySelectorAll(".lnb-menu-item");
          allMenuItems.forEach((item) => {
            item.classList.remove("lnb-menu-item--active");
          });

          // 현재 메뉴 아이템에 active 클래스 추가
          menuItem.classList.add("lnb-menu-item--active");

          // 대시보드로 이동 (실제 구현에서는 라우팅 로직 추가)
          console.log(
            "[LNB] 대시보드로 이동:",
            menuItem.querySelector(".lnb-menu-item__text").textContent
          );
        }
      }

      // 2depth 메뉴 클릭
      if (e.target.closest(".lnb-submenu__link")) {
        e.preventDefault();
        e.stopPropagation();

        const submenuLink = e.target.closest(".lnb-submenu__link");
        const menuItem = submenuLink.closest(".lnb-menu-item");

        if (menuItem && submenuLink) {
          // 모든 서브메뉴 링크에서 active 클래스 제거
          const allSubmenuLinks =
            document.querySelectorAll(".lnb-submenu__link");
          allSubmenuLinks.forEach((link) => {
            link.classList.remove("lnb-submenu__link--active");
          });

          // 현재 서브메뉴 링크에 active 클래스 추가
          submenuLink.classList.add("lnb-submenu__link--active");

          // 메뉴 이동 (실제 구현에서는 라우팅 로직 추가)
          const menuText = submenuLink.querySelector("span").textContent;
          console.log("[LNB] 메뉴 이동:", menuText);
        }
      }
    });

    // 키보드 접근성 지원
    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        const activeElement = document.activeElement;

        if (activeElement.closest(".lnb-menu-item__toggle")) {
          e.preventDefault();
          activeElement.click();
        } else if (activeElement.closest(".lnb-menu-item__link")) {
          e.preventDefault();
          activeElement.click();
        } else if (activeElement.closest(".lnb-submenu__link")) {
          e.preventDefault();
          activeElement.click();
        }
      }
    });

    console.log("[LNB] LNB Menu initialized");
  }

  /**
   * LNB 토글 기능 초기화
   * data-lnb-fold, data-lnb-expand 속성이 있는 버튼 클릭 시 .lnb에 .isShrink 클래스를 토글합니다.
   */
  function initLnbToggle() {
    document.addEventListener("click", function (e) {
      const lnb = document.querySelector(".lnb");
      if (e.target.closest("[data-lnb-fold]")) {
        if (lnb) {
          console.debug("[LNB] Folding LNB", e.target.closest("[data-lnb-fold]"));
          lnb.classList.add("isShrink");
        }
      }
      if (e.target.closest("[data-lnb-expand]")) {
        if (lnb) {
          console.debug("[LNB] Expanding LNB", e.target.closest("[data-lnb-expand]"));
          lnb.classList.remove("isShrink");
        }
      }
    });

    console.log("[LNB] LNB Toggle initialized");
  }

  /**
   * LNB 컴포넌트 초기화
   */
  function initLnb() {
    console.log("[LNB] Initializing LNB component...");
    initLnbMenu();
    initLnbToggle();
    console.log("[LNB] LNB component initialized successfully");
  }

  // VanillaComponents 네임스페이스 초기화
  if (!window.VanillaComponents) {
    window.VanillaComponents = {};
  }

  // 초기화 함수 등록
  window.VanillaComponents.initLnb = initLnb;
})();


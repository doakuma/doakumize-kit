/**
 * Accordion Component Script
 * 아코디언 컴포넌트: 접기/펼치기, ARIA 속성 관리, 단일/다중 모드 지원
 *
 * 사용법:
 * <div class="accordion-group" data-allow-multiple="false">
 *   <div class="accordion">
 *     <div class="accordion__header">
 *       <button class="accordion__toggle">제목</button>
 *     </div>
 *     <div class="accordion__body">내용</div>
 *   </div>
 * </div>
 */

(function () {
  "use strict";

  /**
   * Accordion 초기화 함수
   */
  function initAccordion() {
    console.log("[Accordion] Initializing Accordion...");

    // 이벤트 위임 방식
    initAccordions();

    // 초기 상태 설정
    initAccordionDefaults();

    console.log("[Accordion] Accordion initialized successfully");
  }

  /**
   * Accordion 기능
   * 아코디언 토글 버튼 클릭 시에만 펼치기/접기 토글
   */
  function initAccordions() {
    document.addEventListener("click", function (e) {
      // 아코디언 토글 버튼 또는 헤더 콘텐츠 클릭 시 동작
      const toggle = e.target.closest(".accordion__toggle");
      const headerContent = e.target.closest(".accordion__header-content");

      if (toggle || headerContent) {
        const accordion = (toggle || headerContent).closest(".accordion");

        if (accordion && !accordion.classList.contains("accordion--disabled")) {
          e.preventDefault();

          // 다른 아코디언들과의 상호작용 설정
          const accordionGroup = accordion.closest(".accordion-group");
          const allowMultiple =
            accordionGroup &&
            accordionGroup.getAttribute("data-allow-multiple") === "true";

          // 단일 아코디언 모드인 경우 다른 아코디언들 닫기
          if (!allowMultiple && accordionGroup) {
            accordionGroup
              .querySelectorAll(".accordion")
              .forEach((otherAccordion) => {
                if (otherAccordion !== accordion) {
                  otherAccordion.classList.remove("accordion--expanded");
                  updateAccordionAria(otherAccordion, false);
                }
              });
          }

          // 현재 아코디언 토글
          const isExpanded = accordion.classList.contains(
            "accordion--expanded"
          );
          accordion.classList.toggle("accordion--expanded");

          // ARIA 속성 업데이트
          updateAccordionAria(accordion, !isExpanded);

          // 커스텀 이벤트 발생
          const eventType = !isExpanded ? "accordion:open" : "accordion:close";
          accordion.dispatchEvent(
            new CustomEvent(eventType, {
              detail: {
                accordion: accordion,
                isExpanded: !isExpanded,
              },
            })
          );
        }
      }
    });

    // 키보드 접근성 지원 (토글 버튼에 포커스가 있을 때만)
    document.addEventListener("keydown", function (e) {
      if (e.target.closest(".accordion__toggle")) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.target.closest(".accordion__toggle").click();
        }
      }
    });
  }

  /**
   * 아코디언 ARIA 속성 업데이트
   * @param {HTMLElement} accordion - 아코디언 요소
   * @param {boolean} isExpanded - 펼침 상태
   */
  function updateAccordionAria(accordion, isExpanded) {
    const header = accordion.querySelector(".accordion__header");
    const body = accordion.querySelector(".accordion__body");
    const toggle = accordion.querySelector(".accordion__toggle");

    if (header) {
      header.setAttribute("aria-expanded", isExpanded.toString());
    }

    if (body) {
      body.setAttribute("aria-hidden", (!isExpanded).toString());
    }

    if (toggle) {
      toggle.setAttribute("aria-expanded", isExpanded.toString());
    }
  }

  /**
   * 아코디언 초기화
   * 모든 아코디언에 기본 속성을 설정합니다.
   */
  function initAccordionDefaults() {
    document.querySelectorAll(".accordion").forEach((accordion) => {
      const header = accordion.querySelector(".accordion__header");
      const body = accordion.querySelector(".accordion__body");
      const toggle = accordion.querySelector(".accordion__toggle");
      const isExpanded = accordion.classList.contains("accordion--expanded");

      // ARIA 속성 설정
      if (header) {
        header.setAttribute("role", "button");
        header.setAttribute("aria-expanded", isExpanded.toString());
        header.setAttribute("tabindex", "0");

        // 고유 ID 생성
        if (!header.id) {
          header.id = `accordion-header-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;
        }
      }

      if (body) {
        body.setAttribute("role", "region");
        body.setAttribute("aria-labelledby", header ? header.id : "");
        body.setAttribute("aria-hidden", (!isExpanded).toString());
      }

      if (toggle) {
        toggle.setAttribute("aria-label", isExpanded ? "접기" : "펼치기");
        toggle.setAttribute("aria-expanded", isExpanded.toString());
      }
    });
  }

  // 전역 네임스페이스에 등록
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initAccordion = initAccordion;
})();

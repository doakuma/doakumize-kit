/**
 * Modal Component Script
 * 모달(다이얼로그) 컴포넌트: 모달 열기/닫기, 포커스 관리, 스크롤 잠금 등
 *
 * 사용법:
 * <button data-modal-open="#myModal">모달 열기</button>
 * <div class="modal" id="myModal">
 *   <div class="modal__overlay"></div>
 *   <div class="modal__container">
 *     <button data-modal-close>닫기</button>
 *   </div>
 * </div>
 */

(function () {
  "use strict";

  /**
   * Modal 초기화 함수
   */
  function initModal() {
    console.log("[Modal] Initializing Modal...");

    /**
     * 모달 열기
     */
    function openModal(modal) {
      if (!modal) return;
      modal.classList.add("modal--open");
      document.body.classList.add("modal-open");

      // 포커스 관리: 이전 포커스 요소 저장 후 닫기 시 복원
      const active = document.activeElement;
      if (active) {
        modal.setAttribute(
          "data-last-focus",
          active instanceof HTMLElement ? active.tagName : ""
        );
        modal._lastFocus = active; // 내부 참조(비표준)
      }

      // 대화상자 내 첫 포커스 가능한 요소에 포커스
      const focusable = modal.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.focus) {
        focusable.focus();
      }

      // 커스텀 이벤트 발생
      modal.dispatchEvent(
        new CustomEvent("modal:open", {
          detail: { modal },
        })
      );
    }

    /**
     * 모달 닫기
     */
    function closeModal(modal) {
      if (!modal) return;
      modal.classList.remove("modal--open");
      const anyOpen = document.querySelector(".modal.modal--open");
      if (!anyOpen) {
        document.body.classList.remove("modal-open");
      }

      // 포커스 복원
      if (modal._lastFocus && modal._lastFocus.focus) {
        modal._lastFocus.focus();
      }

      // 커스텀 이벤트 발생
      modal.dispatchEvent(
        new CustomEvent("modal:close", {
          detail: { modal },
        })
      );
    }

    // 열기: data-modal-open="#id"
    document.addEventListener("click", function (e) {
      const openTrigger = e.target.closest("[data-modal-open]");
      if (openTrigger) {
        e.preventDefault();
        const target = openTrigger.getAttribute("data-modal-open");
        const modal = target ? document.querySelector(target) : null;
        if (modal) {
          openModal(modal);
        }
      }
    });

    // 닫기 버튼
    document.addEventListener("click", function (e) {
      const closeTrigger = e.target.closest("[data-modal-close]");
      if (closeTrigger) {
        e.preventDefault();
        const modal = closeTrigger.closest(".modal");
        closeModal(modal);
      }
    });

    // 오버레이 클릭
    document.addEventListener("mousedown", function (e) {
      const overlay = e.target.closest(".modal__overlay");
      if (overlay) {
        const modal = overlay.closest(".modal");
        closeModal(modal);
      }
    });

    // ESC 닫기
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        const open = document.querySelector(".modal.modal--open");
        if (open) {
          e.preventDefault();
          closeModal(open);
        }
      }
    });

    console.log("[Modal] Modal initialized successfully");
  }

  // 전역 네임스페이스에 등록
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initModal = initModal;
})();

/**
 * File Card Component Script
 * File Card 클릭 이벤트를 처리합니다.
 *
 * 기능:
 * - File Card 영역 클릭 시 체크박스 토글
 * - File Card 선택 상태 시각적 표시
 */

(function () {
  "use strict";

  /**
   * File Card 클릭 이벤트 초기화
   * .file-card--selectable 영역 클릭 시 내부 체크박스를 토글합니다.
   */
  function initFileCardClickEvent() {
    document.addEventListener("click", function (e) {
      const fileCard = e.target.closest(".file-card--selectable");

      if (!fileCard) {
        return;
      }

      // 체크박스나 label, 버튼을 직접 클릭한 경우는 기본 동작 허용
      if (
        e.target.closest(".chk") ||
        e.target.closest(".btn") ||
        e.target.closest("button")
      ) {
        return;
      }

      // 체크박스 찾기
      const checkbox = fileCard.querySelector(".chk__input");

      if (!checkbox) {
        console.warn(
          "[FileCard] file-card--selectable에서 .chk__input을 찾을 수 없습니다.",
          fileCard
        );
        return;
      }

      // 체크박스 토글
      checkbox.checked = !checkbox.checked;

      // file-card--selected 클래스 토글
      if (checkbox.checked) {
        fileCard.classList.add("file-card--selected");
      } else {
        fileCard.classList.remove("file-card--selected");
      }

      // change 이벤트 발생 (다른 핸들러가 있을 경우를 위해)
      checkbox.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // 체크박스 자체의 change 이벤트도 처리 (직접 클릭한 경우)
    document.addEventListener("change", function (e) {
      if (e.target.classList.contains("chk__input")) {
        const fileCard = e.target.closest(".file-card--selectable");
        if (fileCard) {
          if (e.target.checked) {
            fileCard.classList.add("file-card--selected");
          } else {
            fileCard.classList.remove("file-card--selected");
          }
        }
      }
    });

    console.log("[FileCard] File Card click event initialized");
  }

  /**
   * File Card 컴포넌트 초기화
   */
  function initFileCard() {
    console.log("[FileCard] Initializing File Card component...");
    initFileCardClickEvent();
    console.log("[FileCard] File Card component initialized successfully");
  }

  // VanillaComponents 네임스페이스 초기화
  if (!window.VanillaComponents) {
    window.VanillaComponents = {};
  }

  // 초기화 함수 등록
  window.VanillaComponents.initFileCard = initFileCard;
})();


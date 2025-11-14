/**
 * Input Component Script
 * 입력 필드 관련 기능: 닫기 버튼, 문자 카운터, 포커스 상태 관리
 *
 * 사용법:
 * <div class="input-field input-field--with-close">
 *   <input class="input" type="text" />
 *   <button class="input-addon--close">X</button>
 * </div>
 *
 * <div class="input-field input-field--with-counter">
 *   <input class="input" type="text" maxlength="500" />
 *   <span class="input-counter">0/500</span>
 * </div>
 */

(function () {
  "use strict";

  /**
   * Input 초기화 함수
   */
  function initInput() {
    console.log("[Input] Initializing Input...");

    // 이벤트 위임 방식 (한 번만 등록, 모든 동적 요소 지원)
    initInputCloseButtons();
    initInputCounterEventDelegation();

    // 초기 상태 설정
    initInputCounters();

    console.log("[Input] Input initialized successfully");
  }

  /**
   * Input Close Button 기능
   * X 버튼 클릭 시 input 값을 삭제하고 포커스를 이동합니다.
   */
  function initInputCloseButtons() {
    document.addEventListener("click", function (e) {
      // 기존 구조와 새로운 구조 모두 지원
      if (
        (e.target.classList.contains("input-close-btn") ||
          e.target.classList.contains("input-addon--close")) &&
        !e.target.disabled
      ) {
        // 기존 구조와 새로운 구조에서 컨테이너 찾기
        const inputContainer =
          e.target.closest(".input-with-close") ||
          e.target.closest(".input-field--with-close");

        if (inputContainer) {
          const input = inputContainer.querySelector(".input");
          if (input && !input.disabled && !input.readOnly) {
            input.value = "";
            input.focus();

            // change 이벤트 발생 (다른 핸들러가 있을 경우를 위해)
            input.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }
      }
    });
  }

  /**
   * Input Counter 기능
   * 문자 수 카운터가 있는 입력 필드의 실시간 카운팅과 포커스 상태를 관리합니다.
   */
  function initInputCounters() {
    // 초기 카운터 값 설정
    const inputsWithCounters = document.querySelectorAll(
      ".input-field--with-counter:not([data-counter-initialized]) .input, .input-field--with-counter:not([data-counter-initialized]) textarea"
    );

    inputsWithCounters.forEach((input) => {
      const inputField = input.closest(".input-field--with-counter");
      if (!inputField) return;

      const counter = inputField.querySelector(".input-counter");
      const maxLength = input.getAttribute("maxlength") || 500;

      if (!counter) return;

      // 초기 카운터 설정
      const currentLength = input.value.length;
      counter.textContent = `${currentLength}/${maxLength}`;

      // 초기화 완료 표시
      inputField.setAttribute("data-counter-initialized", "true");
    });

    console.log(
      `[Input] Initialized ${inputsWithCounters.length} input counter(s)`
    );
  }

  /**
   * Input Counter 이벤트 위임 (동적으로 추가된 input에도 적용)
   */
  function initInputCounterEventDelegation() {
    // input 이벤트
    document.addEventListener("input", function (e) {
      const input = e.target;
      if (input.classList.contains("input") || input.tagName === "TEXTAREA") {
        const inputField = input.closest(".input-field--with-counter");
        if (inputField) {
          const counter = inputField.querySelector(".input-counter");
          const maxLength = input.getAttribute("maxlength") || 500;

          if (counter) {
            const currentLength = input.value.length;
            counter.textContent = `${currentLength}/${maxLength}`;
          }
        }
      }
    });

    // focus 이벤트
    document.addEventListener(
      "focus",
      function (e) {
        const input = e.target;
        if (input.classList.contains("input") || input.tagName === "TEXTAREA") {
          const inputField = input.closest(".input-field--with-counter");
          if (inputField) {
            inputField.classList.add("input-field--focused");
          }
        }
      },
      true
    ); // capture phase

    // blur 이벤트
    document.addEventListener(
      "blur",
      function (e) {
        const input = e.target;
        if (input.classList.contains("input") || input.tagName === "TEXTAREA") {
          const inputField = input.closest(".input-field--with-counter");
          if (inputField) {
            inputField.classList.remove("input-field--focused");
          }
        }
      },
      true
    ); // capture phase
  }

  // 전역 네임스페이스에 등록
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initInput = initInput;
})();

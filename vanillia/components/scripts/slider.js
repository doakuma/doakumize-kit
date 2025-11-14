/**
 * Slider Component Script
 * 슬라이더 컴포넌트: 실시간 값 업데이트, 포맷팅, 트랙 오버레이 업데이트 등
 *
 * 사용법:
 * <div class="slider-container">
 *   <input class="slider-input" type="range" min="0" max="100" value="50" />
 *   <div class="slider-current-value">50</div>
 *   <div class="slider-unit-text">진행률</div>
 *   <div class="slider-track-overlay"></div>
 * </div>
 */

(function () {
  "use strict";

  /**
   * Slider 초기화 함수
   */
  function initSlider() {
    console.log("[Slider] Initializing Slider...");

    // 이벤트 위임 방식 (한 번만 등록, 모든 동적 요소 지원)
    initSliderEventDelegation();

    // 초기 상태 설정
    initSliders();

    console.log("[Slider] Slider initialized successfully");
  }

  /**
   * Slider Component 기능
   * 슬라이더의 실시간 값 업데이트, 포맷팅, 트랙 오버레이 업데이트 등을 처리합니다.
   * 이벤트 위임 방식으로 동적으로 추가된 슬라이더도 자동 지원
   */
  function initSliders() {
    // 초기 값 설정
    const sliders = document.querySelectorAll(
      ".slider-container:not([data-slider-initialized])"
    );

    sliders.forEach((container) => {
      const slider = container.querySelector(".slider-input");
      const valueDisplay = container.querySelector(".slider-current-value");
      const trackOverlay = container.querySelector(".slider-track-overlay");
      const unitText = container.querySelector(".slider-unit-text");

      if (!slider || !valueDisplay) return;

      // 초기 값 설정
      updateSliderDisplay(slider, valueDisplay, trackOverlay, unitText);

      // 초기화 완료 표시
      container.setAttribute("data-slider-initialized", "true");
    });

    console.log(`[Slider] Initialized ${sliders.length} slider(s)`);
  }

  /**
   * Slider 이벤트 위임 (동적으로 추가된 슬라이더에도 적용)
   */
  function initSliderEventDelegation() {
    // input 이벤트 (드래그 중 실시간 업데이트) - 이벤트 위임
    document.addEventListener("input", function (e) {
      if (e.target.classList.contains("slider-input")) {
        const slider = e.target;
        const container = slider.closest(".slider-container");
        if (!container) return;

        const valueDisplay = container.querySelector(".slider-current-value");
        const trackOverlay = container.querySelector(".slider-track-overlay");
        const unitText = container.querySelector(".slider-unit-text");

        if (!valueDisplay) return;

        updateSliderDisplay(slider, valueDisplay, trackOverlay, unitText);

        // 커스텀 이벤트 발생
        container.dispatchEvent(
          new CustomEvent("slider:input", {
            detail: {
              container,
              slider: slider,
              value: parseFloat(slider.value), // 소수점 지원
              formattedValue: valueDisplay.textContent,
            },
          })
        );
      }
    });

    // change 이벤트 (값 변경 완료) - 이벤트 위임
    document.addEventListener("change", function (e) {
      if (e.target.classList.contains("slider-input")) {
        const slider = e.target;
        const container = slider.closest(".slider-container");
        if (!container) return;

        const valueDisplay = container.querySelector(".slider-current-value");
        const trackOverlay = container.querySelector(".slider-track-overlay");
        const unitText = container.querySelector(".slider-unit-text");

        if (!valueDisplay) return;

        updateSliderDisplay(slider, valueDisplay, trackOverlay, unitText);

        // 커스텀 이벤트 발생
        container.dispatchEvent(
          new CustomEvent("slider:change", {
            detail: {
              container,
              slider: slider,
              value: parseFloat(slider.value), // 소수점 지원
              formattedValue: valueDisplay.textContent,
            },
          })
        );
      }
    });
  }

  /**
   * 슬라이더 디스플레이 업데이트
   * @param {HTMLInputElement} slider - 슬라이더 input 요소
   * @param {HTMLElement} valueDisplay - 값 표시 요소
   * @param {HTMLElement} trackOverlay - 트랙 오버레이 요소
   * @param {HTMLElement} unitText - 단위 텍스트 요소
   */
  function updateSliderDisplay(slider, valueDisplay, trackOverlay, unitText) {
    const value = parseFloat(slider.value); // 소수점 지원
    const max = parseFloat(slider.max);
    const min = parseFloat(slider.min);

    // 값 포맷팅
    const formattedValue = formatSliderValue(value, unitText?.textContent);
    valueDisplay.textContent = formattedValue;

    // 트랙 오버레이 업데이트
    if (trackOverlay) {
      const percentage = ((value - min) / (max - min)) * 100;
      trackOverlay.style.background = `linear-gradient(to right, #ffa033 ${percentage}%, var(--gray-200) ${percentage}%)`;
    }
  }

  /**
   * 슬라이더 값 포맷팅
   * @param {number|string} value - 원시 값 (문자열도 허용)
   * @param {string} unit - 단위 텍스트
   * @returns {string} 포맷팅된 값
   */
  function formatSliderValue(value, unit) {
    // 안전하게 number로 변환
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(numValue)) return "0";
    if (!unit) return numValue.toString();

    // 단위별 포맷팅
    switch (unit.toLowerCase()) {
      case "tokens/minute":
        if (numValue >= 1000) {
          const formatted = numValue / 1000;
          // 소수점이 0인 경우 정수로 표시, 아니면 소수점 1자리까지
          return formatted % 1 === 0
            ? formatted + "K"
            : formatted.toFixed(1) + "K";
        }
        return numValue.toString();

      case "파일 크기":
        // 소수점이 있는 경우 소수점 1자리까지 표시
        return numValue % 1 === 0
          ? numValue + "MB"
          : numValue.toFixed(1) + "MB";

      case "진행률":
        // 소수점이 있는 경우 소수점 1자리까지 표시
        return numValue % 1 === 0 ? numValue + "%" : numValue.toFixed(1) + "%";

      default:
        // 기본적으로 소수점이 있으면 1자리까지 표시
        return numValue % 1 === 0 ? numValue.toString() : numValue.toFixed(1);
    }
  }

  // 전역 네임스페이스에 등록
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initSlider = initSlider;
})();

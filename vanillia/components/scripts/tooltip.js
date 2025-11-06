/**
 * Tooltip Component Script
 * 툴팁 컴포넌트: wrapper 내부 요소에 호버 시 툴팁 표시
 *
 * 사용법:
 * <div class="tooltip-wrapper"
 *      data-tooltip-content="툴팁 텍스트"
 *      data-tooltip-position="tm"
 *      data-tooltip-offset="8"
 *      data-tooltip-arrow="true">
 *   <button>트리거 버튼</button>
 * </div>
 */

(function () {
  "use strict";

  /**
   * Tooltip 초기화 함수
   */
  function initTooltip() {
    console.log("[Tooltip] Initializing Tooltip with event delegation...");

    // 전역 툴팁 popper 엘리먼트 생성 (하나만 재사용)
    let globalTooltip = document.getElementById("global-tooltip");
    if (!globalTooltip) {
      globalTooltip = document.createElement("div");
      globalTooltip.id = "global-tooltip";
      globalTooltip.className = "tooltip";
      document.body.appendChild(globalTooltip);
    }

    let showTimeout;
    let hideTimeout;
    let currentWrapper = null;

    /**
     * 툴팁 상태 초기화
     */
    function clearTooltipState() {
      currentWrapper = null;
    }

    /**
     * 툴팁 숨기기
     */
    function hideTooltip() {
      globalTooltip.classList.remove("tooltip--visible");
      clearTooltipState();
    }

    /**
     * 툴팁 표시
     */
    function showTooltip(wrapper) {
      const content = wrapper.getAttribute("data-tooltip-content");
      const position = wrapper.getAttribute("data-tooltip-position") || "tm";
      const offset = parseInt(wrapper.getAttribute("data-tooltip-offset")) || 8;
      const hasArrow = wrapper.getAttribute("data-tooltip-arrow") === "true";

      if (!content) {
        console.warn("[Tooltip] No content specified for tooltip wrapper");
        return;
      }

      // 기존 클래스 제거
      globalTooltip.className = "tooltip";

      // position 클래스 추가
      globalTooltip.classList.add(`tooltip--${position}`);

      // arrow 옵션에 따라 클래스 추가/제거
      if (hasArrow) {
        globalTooltip.classList.add("tooltip--arrow");
      }

      // 컨텐츠 렌더링
      renderTooltipContent(globalTooltip, content, hasArrow);

      // 위치 계산 (wrapper 기준)
      positionTooltip(wrapper, globalTooltip, position, offset);

      // 표시
      globalTooltip.classList.add("tooltip--visible");

      // 커스텀 이벤트 발생
      globalTooltip.dispatchEvent(
        new CustomEvent("tooltip:show", {
          detail: { wrapper, tooltip: globalTooltip },
        })
      );
    }

    /**
     * 툴팁 컨텐츠 렌더링
     */
    function renderTooltipContent(tooltip, content, hasArrow) {
      // HTML 이스케이프 (XSS 방지)
      const escapeHtml = (text) => {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      let html = '<div class="tooltip__content">';
      html += escapeHtml(content);
      html += "</div>";

      if (hasArrow) {
        html += '<div class="tooltip__arrow"></div>';
      }

      tooltip.innerHTML = html;
    }

    /**
     * 툴팁 위치 계산
     * position: tl | tm | tr | rt | rm | rb | br | bm | bl | lb | lm | lt
     */
    function positionTooltip(wrapper, tooltip, position, offset) {
      const wrapperRect = wrapper.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      let top, left;

      // position을 실제 위치로 변환
      switch (position) {
        // Top positions
        case "tl": // top-left
          top = wrapperRect.top + scrollTop - tooltipRect.height - offset;
          left = wrapperRect.left + scrollLeft;
          break;
        case "tm": // top-middle
          top = wrapperRect.top + scrollTop - tooltipRect.height - offset;
          left =
            wrapperRect.left +
            scrollLeft +
            wrapperRect.width / 2 -
            tooltipRect.width / 2;
          break;
        case "tr": // top-right
          top = wrapperRect.top + scrollTop - tooltipRect.height - offset;
          left = wrapperRect.right + scrollLeft - tooltipRect.width;
          break;

        // Right positions
        case "rt": // right-top
          top = wrapperRect.top + scrollTop;
          left = wrapperRect.right + scrollLeft + offset;
          break;
        case "rm": // right-middle
          top =
            wrapperRect.top +
            scrollTop +
            wrapperRect.height / 2 -
            tooltipRect.height / 2;
          left = wrapperRect.right + scrollLeft + offset;
          break;
        case "rb": // right-bottom
          top = wrapperRect.bottom + scrollTop - tooltipRect.height;
          left = wrapperRect.right + scrollLeft + offset;
          break;

        // Bottom positions
        case "br": // bottom-right
          top = wrapperRect.bottom + scrollTop + offset;
          left = wrapperRect.right + scrollLeft - tooltipRect.width;
          break;
        case "bm": // bottom-middle
          top = wrapperRect.bottom + scrollTop + offset;
          left =
            wrapperRect.left +
            scrollLeft +
            wrapperRect.width / 2 -
            tooltipRect.width / 2;
          break;
        case "bl": // bottom-left
          top = wrapperRect.bottom + scrollTop + offset;
          left = wrapperRect.left + scrollLeft;
          break;

        // Left positions
        case "lb": // left-bottom
          top = wrapperRect.bottom + scrollTop - tooltipRect.height;
          left = wrapperRect.left + scrollLeft - tooltipRect.width - offset;
          break;
        case "lm": // left-middle
          top =
            wrapperRect.top +
            scrollTop +
            wrapperRect.height / 2 -
            tooltipRect.height / 2;
          left = wrapperRect.left + scrollLeft - tooltipRect.width - offset;
          break;
        case "lt": // left-top
          top = wrapperRect.top + scrollTop;
          left = wrapperRect.left + scrollLeft - tooltipRect.width - offset;
          break;

        default:
          // 기본값: top-middle
          top = wrapperRect.top + scrollTop - tooltipRect.height - offset;
          left =
            wrapperRect.left +
            scrollLeft +
            wrapperRect.width / 2 -
            tooltipRect.width / 2;
          break;
      }

      // 뷰포트 경계 체크 및 조정
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // 오른쪽 경계
      if (left + tooltipRect.width > scrollLeft + viewportWidth) {
        left = scrollLeft + viewportWidth - tooltipRect.width - 16;
      }

      // 왼쪽 경계
      if (left < scrollLeft) {
        left = scrollLeft + 16;
      }

      // 아래쪽 경계
      if (top + tooltipRect.height > scrollTop + viewportHeight) {
        top = scrollTop + viewportHeight - tooltipRect.height - 16;
      }

      // 위쪽 경계
      if (top < scrollTop) {
        top = scrollTop + 16;
      }

      tooltip.style.top = top + "px";
      tooltip.style.left = left + "px";
    }

    // 이벤트 위임: wrapper 내부 요소에 호버 시
    // mouseover/mouseout을 사용하여 버블링되는 이벤트로 처리
    document.addEventListener("mouseover", function (e) {
      const wrapper = e.target.closest(".tooltip-wrapper");

      if (wrapper) {
        // relatedTarget이 wrapper 내부 요소면 무시 (자식 요소로 이동한 경우)
        if (e.relatedTarget && wrapper.contains(e.relatedTarget)) {
          return;
        }

        // 이미 같은 wrapper에 대해 처리 중이면 무시
        if (currentWrapper === wrapper) {
          return;
        }

        clearTimeout(hideTimeout);
        currentWrapper = wrapper;

        // 약간의 딜레이 후 표시 (빠른 마우스 움직임 방지)
        showTimeout = setTimeout(() => {
          showTooltip(wrapper);
        }, 100);
      }
    });

    // wrapper에서 마우스가 벗어날 때
    document.addEventListener("mouseout", function (e) {
      const wrapper = e.target.closest(".tooltip-wrapper");

      if (wrapper) {
        // relatedTarget이 wrapper 내부 요소면 무시 (자식 요소로 이동한 경우)
        if (e.relatedTarget && wrapper.contains(e.relatedTarget)) {
          return;
        }

        // relatedTarget이 툴팁 자체면 무시
        if (
          e.relatedTarget &&
          (e.relatedTarget === globalTooltip ||
            globalTooltip.contains(e.relatedTarget))
        ) {
          return;
        }

        clearTimeout(showTimeout);

        hideTimeout = setTimeout(() => {
          hideTooltip();
        }, 100);
      }
    });

    // 툴팁에 마우스 오버 시 유지
    globalTooltip.addEventListener("mouseenter", function () {
      clearTimeout(hideTimeout);
    });

    // 툴팁에서 마우스 떠나면 숨김
    globalTooltip.addEventListener("mouseleave", function () {
      hideTimeout = setTimeout(() => {
        hideTooltip();
      }, 100);
    });

    console.log("[Tooltip] Event delegation initialized");
  }

  // 전역 네임스페이스에 등록
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initTooltip = initTooltip;
})();

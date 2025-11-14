/**
 * Popover Component Script
 * 팝오버 컴포넌트: 타겟 엘리먼트에 마우스 오버 시 팝오버 표시
 *
 * 사용법:
 * <div data-popover="simple"
 *      data-popover-title="제목"
 *      data-popover-body="내용"
 *      data-popover-origin="right-center"
 *      data-popover-offset="12"
 *      data-popover-action="close">
 *   트리거 요소
 * </div>
 */

(function () {
  "use strict";

  /**
   * Popover 초기화 함수
   */
  function initPopover() {
    console.log("[Popover] Initializing Popover with event delegation...");

    // 전역 팝오버 엘리먼트 생성 (하나만 재사용)
    let globalPopover = document.getElementById("global-popover");
    if (!globalPopover) {
      globalPopover = document.createElement("div");
      globalPopover.id = "global-popover";
      globalPopover.className = "popover";
      document.body.appendChild(globalPopover);
    }

    let showTimeout;
    let hideTimeout;
    let currentTrigger = null;
    let currentAction = null;

    /**
     * 팝오버 상태 변수 초기화
     */
    function clearPopoverState() {
      currentTrigger = null;
      currentAction = null;
    }

    /**
     * 팝오버 닫기 (UI 숨김 + 상태 초기화)
     */
    function closePopover() {
      hidePopover(globalPopover);
      clearPopoverState();
    }

    // 이벤트 위임: document에서 mouseover/mouseout으로 처리
    document.addEventListener("mouseover", function (e) {
      const trigger = e.target.closest("[data-popover]");

      if (trigger) {
        // 이미 같은 트리거에 대해 처리 중이면 무시
        if (currentTrigger === trigger) {
          return;
        }

        clearTimeout(hideTimeout);
        currentTrigger = trigger;
        currentAction = trigger.getAttribute("data-popover-action");

        const delay =
          parseInt(trigger.getAttribute("data-popover-delay")) || 200;

        showTimeout = setTimeout(() => {
          showPopover(trigger, globalPopover);
        }, delay);
      }
    });

    document.addEventListener("mouseout", function (e) {
      const trigger = e.target.closest("[data-popover]");

      if (trigger) {
        // relatedTarget이 트리거 내부 요소면 무시 (자식 요소로 이동한 경우)
        if (trigger.contains(e.relatedTarget)) {
          return;
        }

        clearTimeout(showTimeout);

        // action이 "close"인 경우 자동으로 닫히지 않음
        if (currentAction !== "close") {
          hideTimeout = setTimeout(() => {
            closePopover();
          }, 100);
        }
      }
    });

    // 팝오버에 마우스 오버 시 유지
    globalPopover.addEventListener("mouseenter", function () {
      clearTimeout(hideTimeout);
    });

    // 팝오버에서 마우스 떠나면 숨김
    globalPopover.addEventListener("mouseleave", function () {
      // action이 "close"인 경우 자동으로 닫히지 않음
      if (currentAction !== "close") {
        hideTimeout = setTimeout(() => {
          closePopover();
        }, 100);
      }
    });

    // 닫기 버튼 클릭 시 팝오버 닫기 (이벤트 위임)
    globalPopover.addEventListener("click", function (e) {
      const closeBtn = e.target.closest(".popover__close-btn");
      if (closeBtn) {
        clearTimeout(showTimeout);
        clearTimeout(hideTimeout);
        closePopover();
      }
    });

    console.log("[Popover] Popover event delegation initialized");
  }

  /**
   * 팝오버 표시
   */
  function showPopover(trigger, popover) {
    const origin =
      trigger.getAttribute("data-popover-origin") || "right-center";
    const offset = parseInt(trigger.getAttribute("data-popover-offset")) || 12;
    const variant = trigger.getAttribute("data-popover-variant") || "";
    const theme = trigger.getAttribute("data-popover-theme") || "";

    // 기존 클래스 제거
    popover.className = "popover";

    // origin 클래스 추가
    popover.classList.add(`popover--origin-${origin}`);

    // variant 클래스 추가
    if (variant) {
      popover.classList.add(`popover--${variant}`);
    }

    // theme 클래스 추가
    if (theme) {
      popover.classList.add(`popover--${theme}`);
    }

    // 컨텐츠 렌더링
    renderPopoverContent(trigger, popover);

    // 위치 계산
    positionPopover(trigger, popover, origin, offset);

    // 표시
    popover.classList.add("popover--visible");

    // 커스텀 이벤트 발생
    popover.dispatchEvent(
      new CustomEvent("popover:show", {
        detail: { trigger, popover },
      })
    );
  }

  /**
   * 팝오버 숨김
   */
  function hidePopover(popover) {
    popover.classList.remove("popover--visible");

    // 커스텀 이벤트 발생
    popover.dispatchEvent(
      new CustomEvent("popover:hide", {
        detail: { popover },
      })
    );
  }

  /**
   * 팝오버 컨텐츠 렌더링
   */
  function renderPopoverContent(trigger, popover) {
    const contentType = trigger.getAttribute("data-popover") || "simple";
    const title = trigger.getAttribute("data-popover-title");
    const titleIcon = trigger.getAttribute("data-popover-title-icon");
    const action = trigger.getAttribute("data-popover-action");
    const body = trigger.getAttribute("data-popover-body");
    const detailsData = trigger.getAttribute("data-popover-details");

    let html = "";

    if (contentType === "details" && detailsData) {
      // 상세 정보 타입 (JSON 파싱)
      try {
        const details = JSON.parse(detailsData);
        html = '<div class="popover__details">';
        details.forEach((detail) => {
          html += `
            <div class="popover__detail-item">
              <span class="popover__detail-label">${escapeHtml(
                detail.label
              )}</span>
              <span class="popover__detail-value">${escapeHtml(
                detail.value
              )}</span>
            </div>
          `;
        });
        html += "</div>";
      } catch (e) {
        console.error("Failed to parse popover details:", e);
        html = '<div class="popover__body">데이터 파싱 오류</div>';
      }
    } else {
      // 일반 컨텐츠 타입
      html = '<div class="popover__content">';
      if (title) {
        // escape 문자 처리: \n을 <br>로 변환
        const formattedTitle = escapeHtml(title).replace(/\\n/g, "<br>");
        html += `<div class="popover__title">
        ${
          titleIcon
            ? `<i class="icon icon--medium icon--${escapeHtml(titleIcon)}"></i>`
            : ""
        }
        ${formattedTitle}
        ${
          action === "close"
            ? `<button class="btn btn--small btn--icon-only popover__close-btn">
          <i class="icon icon--medium icon--close"></i>
        </button>`
            : ""
        }
        </div>`;
      }
      if (body) {
        // escape 문자 처리: \n을 <br>로 변환
        const formattedBody = escapeHtml(body).replace(/\\n/g, "<br>");
        html += `<div class="popover__body">${formattedBody}</div>`;
      }
      html += "</div>";
    }

    popover.innerHTML = html;
  }

  /**
   * HTML 이스케이프 (XSS 방지)
   */
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Popover 위치 계산
   */
  function positionPopover(trigger, popover, origin, offset) {
    const triggerRect = trigger.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    let top, left;

    // origin에 따라 위치 계산
    switch (origin) {
      // Top origins
      case "top-left":
        top = triggerRect.top + scrollTop - popoverRect.height - offset;
        left = triggerRect.left + scrollLeft;
        break;
      case "top-center":
        top = triggerRect.top + scrollTop - popoverRect.height - offset;
        left =
          triggerRect.left +
          scrollLeft +
          triggerRect.width / 2 -
          popoverRect.width / 2;
        break;
      case "top-right":
        top = triggerRect.top + scrollTop - popoverRect.height - offset;
        left = triggerRect.right + scrollLeft - popoverRect.width;
        break;

      // Bottom origins
      case "bottom-left":
        top = triggerRect.bottom + scrollTop + offset;
        left = triggerRect.left + scrollLeft;
        break;
      case "bottom-center":
        top = triggerRect.bottom + scrollTop + offset;
        left =
          triggerRect.left +
          scrollLeft +
          triggerRect.width / 2 -
          popoverRect.width / 2;
        break;
      case "bottom-right":
        top = triggerRect.bottom + scrollTop + offset;
        left = triggerRect.right + scrollLeft - popoverRect.width;
        break;

      // Left origins
      case "left-top":
        top = triggerRect.top + scrollTop;
        left = triggerRect.left + scrollLeft - popoverRect.width - offset;
        break;
      case "left-center":
        top =
          triggerRect.top +
          scrollTop +
          triggerRect.height / 2 -
          popoverRect.height / 2;
        left = triggerRect.left + scrollLeft - popoverRect.width - offset;
        break;
      case "left-bottom":
        top = triggerRect.bottom + scrollTop - popoverRect.height;
        left = triggerRect.left + scrollLeft - popoverRect.width - offset;
        break;

      // Right origins (기본값)
      case "right-top":
        top = triggerRect.top + scrollTop;
        left = triggerRect.right + scrollLeft + offset;
        break;
      case "right-center":
      default:
        top =
          triggerRect.top +
          scrollTop +
          triggerRect.height / 2 -
          popoverRect.height / 2;
        left = triggerRect.right + scrollLeft + offset;
        break;
      case "right-bottom":
        top = triggerRect.bottom + scrollTop - popoverRect.height;
        left = triggerRect.right + scrollLeft + offset;
        break;
    }

    // 뷰포트 경계 체크 및 조정
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 오른쪽 경계
    if (left + popoverRect.width > scrollLeft + viewportWidth) {
      left = scrollLeft + viewportWidth - popoverRect.width - 16;
    }

    // 왼쪽 경계
    if (left < scrollLeft) {
      left = scrollLeft + 16;
    }

    // 아래쪽 경계
    if (top + popoverRect.height > scrollTop + viewportHeight) {
      top = scrollTop + viewportHeight - popoverRect.height - 16;
    }

    // 위쪽 경계
    if (top < scrollTop) {
      top = scrollTop + 16;
    }

    // 위치 적용
    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
  }

  // 전역 네임스페이스에 등록
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initPopover = initPopover;
})();

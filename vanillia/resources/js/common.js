// common.js
(function () {
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
          }
        }
      }
    });
  }

  /**
   * Chip Remove Button 기능
   * Chip의 X 버튼 클릭 시 해당 chip을 제거합니다.
   */
  function initChipRemoveButtons() {
    document.addEventListener("click", function (e) {
      // 새로운 통합된 chip 제거 기능
      if (e.target.classList.contains("chip__remove")) {
        const chip = e.target.closest(".chip");

        if (chip && !chip.classList.contains("chip--disabled")) {
          const inputContainer = e.target.closest(".input-field--with-chips");
          const chipGroup = e.target.closest(".chip-group");

          // chip 제거
          chip.remove();

          // Input 내부 chip인 경우 input에 포커스 이동
          if (inputContainer) {
            const input = inputContainer.querySelector(".input");
            if (input && !input.disabled && !input.readOnly) {
              input.focus();
            }

            // 커스텀 이벤트 발생
            inputContainer.dispatchEvent(
              new CustomEvent("chipRemoved", {
                detail: { removedChip: chip },
              })
            );
          }

          // 독립적인 chip group인 경우
          if (chipGroup && !inputContainer) {
            chipGroup.dispatchEvent(
              new CustomEvent("chipRemoved", {
                detail: { removedChip: chip },
              })
            );
          }
        }
      }
    });
  }

  /**
   * Chip Input Enter Key 기능
   * Enter 키 입력 시 새로운 chip을 추가할 수 있도록 지원합니다.
   */
  function initChipInputHandlers() {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.classList.contains("input")) {
        const inputContainer = e.target.closest(".input-field--with-chips");

        if (inputContainer && e.target.value.trim()) {
          // 커스텀 이벤트 발생 (외부에서 새 chip 추가 처리)
          inputContainer.dispatchEvent(
            new CustomEvent("chipAdd", {
              detail: {
                value: e.target.value.trim(),
                input: e.target,
              },
            })
          );
        }
      }
    });
  }

  /**
   * Dropdown 기능
   * 드롭다운 메뉴의 열기/닫기, 옵션 선택 등을 처리합니다.
   */
  function initDropdownHandlers() {
    // 드롭다운 외부 클릭으로 모든 드롭다운 닫기
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".dropdown")) {
        document.querySelectorAll(".dropdown--open").forEach((dropdown) => {
          dropdown.classList.remove("dropdown--open");
        });
      }
    });

    // 드롭다운 트리거 클릭 이벤트
    document.addEventListener("click", function (e) {
      // 트리거 버튼 클릭 시
      if (e.target.closest(".dropdown__trigger")) {
        const trigger = e.target.closest(".dropdown__trigger");
        const dropdown = trigger.closest(".dropdown");

        // disabled나 readonly 상태면 무시
        if (
          dropdown.classList.contains("dropdown--disabled") ||
          dropdown.classList.contains("dropdown--readonly") ||
          trigger.disabled
        ) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        // 다른 모든 드롭다운 닫기
        document
          .querySelectorAll(".dropdown--open")
          .forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove("dropdown--open");
            }
          });

        // 현재 드롭다운 토글
        dropdown.classList.toggle("dropdown--open");

        // 커스텀 이벤트 발생
        const eventType = dropdown.classList.contains("dropdown--open")
          ? "dropdown:open"
          : "dropdown:close";
        dropdown.dispatchEvent(
          new CustomEvent(eventType, {
            detail: { dropdown, trigger },
          })
        );
      }
    });

    // 드롭다운 옵션 클릭 이벤트
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("dropdown__item")) {
        const item = e.target;
        const dropdown = item.closest(".dropdown");
        const trigger = dropdown.querySelector(".dropdown__trigger");
        const textElement = trigger.querySelector(".dropdown__text");

        // disabled 아이템이면 무시
        if (item.classList.contains("dropdown__item--disabled")) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        // 기존 선택 해제
        dropdown
          .querySelectorAll(".dropdown__item--selected")
          .forEach((selectedItem) => {
            selectedItem.classList.remove("dropdown__item--selected");
          });

        // 새 아이템 선택
        item.classList.add("dropdown__item--selected");

        // 텍스트 업데이트
        textElement.textContent = item.textContent.trim();
        textElement.classList.remove("dropdown__text--placeholder");

        // 드롭다운 상태 업데이트
        dropdown.classList.add("dropdown--filled");
        dropdown.classList.remove("dropdown--open");

        // popover 숨기기
        const globalPopover = document.getElementById("global-popover");
        if (globalPopover) {
          globalPopover.classList.remove("popover--visible");
        }

        // 커스텀 이벤트 발생
        dropdown.dispatchEvent(
          new CustomEvent("dropdown:select", {
            detail: {
              dropdown,
              item,
              value: item.getAttribute("data-value") || item.textContent.trim(),
              text: item.textContent.trim(),
            },
          })
        );
      }
    });

    // 키보드 네비게이션
    document.addEventListener("keydown", function (e) {
      const dropdown = e.target.closest(".dropdown");
      if (!dropdown || !dropdown.classList.contains("dropdown--open")) {
        return;
      }

      const items = dropdown.querySelectorAll(
        ".dropdown__item:not(.dropdown__item--disabled)"
      );
      const currentSelected = dropdown.querySelector(
        ".dropdown__item--selected"
      );
      let currentIndex = Array.from(items).indexOf(currentSelected);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          currentIndex = Math.min(currentIndex + 1, items.length - 1);
          focusItem(items[currentIndex]);
          break;
        case "ArrowUp":
          e.preventDefault();
          currentIndex = Math.max(currentIndex - 1, 0);
          focusItem(items[currentIndex]);
          break;
        case "Enter":
          e.preventDefault();
          if (currentSelected) {
            currentSelected.click();
          }
          break;
        case "Escape":
          e.preventDefault();
          dropdown.classList.remove("dropdown--open");
          dropdown.querySelector(".dropdown__trigger").focus();
          break;
      }
    });

    // 아이템에 포커스 주기
    function focusItem(item) {
      if (item) {
        // 기존 선택 해제
        item
          .closest(".dropdown")
          .querySelectorAll(".dropdown__item--selected")
          .forEach((selected) => {
            selected.classList.remove("dropdown__item--selected");
          });
        // 새 아이템 선택
        item.classList.add("dropdown__item--selected");
        item.focus();
      }
    }
  }

  /**
   * Modal (Dialog) 기능
   * - [data-modal-open]로 열기, [data-modal-close]로 닫기
   * - 오버레이 클릭 및 ESC 닫기
   * - body 스크롤 잠금, 포커스 반환
   */
  function initModals() {
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
    }

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
  }

  /**
   * Dropdown Close Button 기능
   * Close 버튼 클릭 시 선택된 값을 초기화합니다.
   */
  function initDropdownCloseButtons() {
    document.addEventListener("click", function (e) {
      if (
        e.target.classList.contains("dropdown__close") &&
        !e.target.disabled
      ) {
        const dropdown = e.target.closest(".dropdown");
        const trigger = dropdown.querySelector(".dropdown__trigger");
        const textElement = trigger.querySelector(".dropdown__text");

        e.preventDefault();
        e.stopPropagation();

        // 선택 초기화
        dropdown
          .querySelectorAll(".dropdown__item--selected")
          .forEach((item) => {
            item.classList.remove("dropdown__item--selected");
          });

        // 텍스트 초기화 (placeholder로 복원)
        const originalPlaceholder =
          dropdown.getAttribute("data-placeholder") || "선택하세요";
        textElement.textContent = originalPlaceholder;
        textElement.classList.add("dropdown__text--placeholder");

        // 상태 초기화
        dropdown.classList.remove("dropdown--filled");
        dropdown.classList.remove("dropdown--open");

        // 커스텀 이벤트 발생
        dropdown.dispatchEvent(
          new CustomEvent("dropdown:clear", {
            detail: { dropdown },
          })
        );
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
      `[Common] Initialized ${inputsWithCounters.length} input counter(s)`
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

  /**
   * Chip Dropdown 기능
   * Chip 내부의 드롭다운 메뉴 열기/닫기, 옵션 선택 등을 처리합니다.
   */
  function initChipDropdownHandlers() {
    // chip dropdown 외부 클릭으로 모든 chip dropdown 닫기
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".chip__dropdown")) {
        document
          .querySelectorAll(".chip__dropdown--open")
          .forEach((dropdown) => {
            dropdown.classList.remove("chip__dropdown--open");
          });
      }
    });

    // chip dropdown 트리거 클릭 이벤트
    document.addEventListener("click", function (e) {
      // 트리거 버튼 클릭 시
      if (
        e.target.closest(".chip__dropdown-item") &&
        e.target.closest(".chip__dropdown")
      ) {
        const trigger = e.target.closest(".chip__dropdown-item");
        const dropdown = trigger.closest(".chip__dropdown");

        // disabled 상태면 무시
        if (dropdown.closest(".chip--disabled")) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        // 다른 모든 chip dropdown 닫기
        document
          .querySelectorAll(".chip__dropdown--open")
          .forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove("chip__dropdown--open");
            }
          });

        // 현재 chip dropdown 토글
        dropdown.classList.toggle("chip__dropdown--open");

        // 커스텀 이벤트 발생
        const eventType = dropdown.classList.contains("chip__dropdown--open")
          ? "chipDropdown:open"
          : "chipDropdown:close";
        dropdown.dispatchEvent(
          new CustomEvent(eventType, {
            detail: { dropdown, trigger },
          })
        );
      }
    });

    // chip dropdown 옵션 클릭 이벤트
    document.addEventListener("click", function (e) {
      if (e.target.closest(".chip__dropdown-menu .chip__dropdown-item")) {
        const item = e.target.closest(".chip__dropdown-item");
        const dropdown = item.closest(".chip__dropdown");
        const trigger = dropdown.querySelector(".chip__dropdown-item");
        const triggerText = trigger.querySelector(".chip__dropdown-item-text");

        e.preventDefault();
        e.stopPropagation();

        // 기존 선택 해제
        dropdown
          .querySelectorAll(
            ".chip__dropdown-menu .chip__dropdown-item--selected"
          )
          .forEach((selectedItem) => {
            selectedItem.classList.remove("chip__dropdown-item--selected");
          });

        // 새 아이템 선택
        item.classList.add("chip__dropdown-item--selected");

        // 트리거 텍스트 업데이트
        const selectedText = item.querySelector(".chip__dropdown-item-text");
        if (selectedText && triggerText) {
          triggerText.textContent = selectedText.textContent;
        }

        // chip dropdown 닫기
        dropdown.classList.remove("chip__dropdown--open");

        // 커스텀 이벤트 발생
        dropdown.dispatchEvent(
          new CustomEvent("chipDropdown:select", {
            detail: {
              dropdown,
              item,
              value: item.getAttribute("data-value") || item.textContent.trim(),
              text: item.textContent.trim(),
            },
          })
        );
      }
    });

    // 키보드 네비게이션
    document.addEventListener("keydown", function (e) {
      const dropdown = e.target.closest(".chip__dropdown");
      if (!dropdown || !dropdown.classList.contains("chip__dropdown--open")) {
        return;
      }

      const items = dropdown.querySelectorAll(
        ".chip__dropdown-menu .chip__dropdown-item"
      );
      const currentSelected = dropdown.querySelector(
        ".chip__dropdown-menu .chip__dropdown-item--selected"
      );
      let currentIndex = Array.from(items).indexOf(currentSelected);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          currentIndex = Math.min(currentIndex + 1, items.length - 1);
          focusChipDropdownItem(items[currentIndex]);
          break;
        case "ArrowUp":
          e.preventDefault();
          currentIndex = Math.max(currentIndex - 1, 0);
          focusChipDropdownItem(items[currentIndex]);
          break;
        case "Enter":
          e.preventDefault();
          if (currentSelected) {
            currentSelected.click();
          }
          break;
        case "Escape":
          e.preventDefault();
          dropdown.classList.remove("chip__dropdown--open");
          dropdown.querySelector(".chip__dropdown-item").focus();
          break;
      }
    });

    // chip dropdown 아이템에 포커스 주기
    function focusChipDropdownItem(item) {
      if (item) {
        // 기존 선택 해제
        item
          .closest(".chip__dropdown")
          .querySelectorAll(
            ".chip__dropdown-menu .chip__dropdown-item--selected"
          )
          .forEach((selected) => {
            selected.classList.remove("chip__dropdown-item--selected");
          });
        // 새 아이템 선택
        item.classList.add("chip__dropdown-item--selected");
        item.focus();
      }
    }
  }

  /**
   * Checkbox Group 기능
   * 전체 선택/해제, indeterminate 상태 관리
   */
  function initCheckboxGroups() {
    // 초기 상태 설정
    const groups = document.querySelectorAll(
      ".chk-group:not([data-chkgroup-initialized])"
    );

    groups.forEach((group) => {
      const selectAll = group.querySelector(".chk-group__all");
      const items = group.querySelectorAll(".chk-group__item");

      if (!selectAll || items.length === 0) return;

      // 초기 상태 설정
      updateSelectAllState(selectAll, items);

      // 초기화 완료 표시
      group.setAttribute("data-chkgroup-initialized", "true");
    });

    console.log(`[Common] Initialized ${groups.length} checkbox group(s)`);
  }

  /**
   * Checkbox Group 이벤트 위임 (동적으로 추가된 체크박스에도 적용)
   */
  function initCheckboxGroupEventDelegation() {
    // change 이벤트 위임
    document.addEventListener("change", function (e) {
      // 전체 선택 체크박스
      if (e.target.classList.contains("chk-group__all")) {
        const selectAll = e.target;
        const group = selectAll.closest(".chk-group");
        if (!group) return;

        const items = group.querySelectorAll(".chk-group__item");

        // 모든 아이템 체크 상태 동기화
        items.forEach((item) => {
          if (!item.disabled) {
            item.checked = selectAll.checked;
          }
        });

        updateSelectAllState(selectAll, items);

        // 커스텀 이벤트 발생
        group.dispatchEvent(
          new CustomEvent("checkboxGroup:change", {
            detail: {
              selectAll: selectAll.checked,
              values: Array.from(items)
                .filter((item) => item.checked)
                .map((item) => item.value),
            },
          })
        );
      }

      // 개별 체크박스
      if (e.target.classList.contains("chk-group__item")) {
        const item = e.target;
        const group = item.closest(".chk-group");
        if (!group) return;

        const selectAll = group.querySelector(".chk-group__all");
        const items = group.querySelectorAll(".chk-group__item");

        if (selectAll && items.length > 0) {
          updateSelectAllState(selectAll, items);

          // 커스텀 이벤트 발생
          group.dispatchEvent(
            new CustomEvent("checkboxGroup:change", {
              detail: {
                selectAll: selectAll.checked && !selectAll.indeterminate,
                values: Array.from(items)
                  .filter((item) => item.checked)
                  .map((item) => item.value),
              },
            })
          );
        }
      }
    });
  }

  /**
   * 전체 선택 상태 업데이트 함수
   */
  function updateSelectAllState(selectAll, items) {
    const enabledItems = Array.from(items).filter((item) => !item.disabled);
    const checkedCount = enabledItems.filter((item) => item.checked).length;
    const totalCount = enabledItems.length;

    if (checkedCount === 0) {
      selectAll.checked = false;
      selectAll.indeterminate = false;
    } else if (checkedCount === totalCount) {
      selectAll.checked = true;
      selectAll.indeterminate = false;
    } else {
      selectAll.checked = false;
      selectAll.indeterminate = true;
    }
  }

  /**
   * Popover 기능
   * 타겟 엘리먼트에 마우스 오버 시 팝오버를 표시합니다.
   * 하나의 전역 팝오버를 재사용하여 data 속성으로 컨텐츠를 동적 렌더링
   * 이벤트 위임 방식으로 동적으로 추가된 요소도 자동 지원
   */
  function initPopovers() {
    console.log("[Common] Initializing Popover with event delegation...");

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

    console.log("[Common] Popover event delegation initialized");
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
              <span class="popover__detail-label">${detail.label}</span>
              <span class="popover__detail-value">${detail.value}</span>
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
        const formattedTitle = title.replace(/\\n/g, "<br>");
        html += `<div class="popover__title">
        ${
          titleIcon
            ? `<i class="icon icon--medium icon--${titleIcon}"></i>`
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
        const formattedBody = body.replace(/\\n/g, "<br>");
        html += `<div class="popover__body">${formattedBody}</div>`;
      }
      html += "</div>";
    }

    popover.innerHTML = html;
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

  /**
   * Dropdown 초기화
   * 모든 드롭다운에 기본 속성을 설정합니다.
   */
  function initDropdowns() {
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      const trigger = dropdown.querySelector(".dropdown__trigger");
      const textElement = dropdown.querySelector(".dropdown__text");

      // placeholder 값 저장
      if (
        textElement &&
        textElement.classList.contains("dropdown__text--placeholder")
      ) {
        dropdown.setAttribute(
          "data-placeholder",
          textElement.textContent.trim()
        );
      }

      // 접근성 속성 추가
      if (trigger) {
        trigger.setAttribute("aria-haspopup", "listbox");
        trigger.setAttribute("aria-expanded", "false");
      }

      // 메뉴 아이템에 role 추가
      dropdown.querySelectorAll(".dropdown__item").forEach((item, index) => {
        item.setAttribute("role", "option");
        item.setAttribute("tabindex", "-1");
        if (!item.hasAttribute("data-value")) {
          item.setAttribute("data-value", `option-${index}`);
        }
      });
    });

    // chip dropdown 초기화
    document.querySelectorAll(".chip__dropdown").forEach((dropdown) => {
      const trigger = dropdown.querySelector(".chip__dropdown-item");
      const menu = dropdown.querySelector(".chip__dropdown-menu");

      // 접근성 속성 추가
      if (trigger) {
        trigger.setAttribute("aria-haspopup", "listbox");
        trigger.setAttribute("aria-expanded", "false");
      }

      // 메뉴 아이템에 role 추가
      dropdown
        .querySelectorAll(".chip__dropdown-menu .chip__dropdown-item")
        .forEach((item, index) => {
          item.setAttribute("role", "option");
          item.setAttribute("tabindex", "-1");
          if (!item.hasAttribute("data-value")) {
            item.setAttribute("data-value", `chip-option-${index}`);
          }
        });
    });

    // dropdown 상태 변경 시 aria-expanded 업데이트
    document.addEventListener("dropdown:open", function (e) {
      const trigger = e.detail.dropdown.querySelector(".dropdown__trigger");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "true");
      }
    });

    document.addEventListener("dropdown:close", function (e) {
      const trigger = e.detail.dropdown.querySelector(".dropdown__trigger");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    });

    // chip dropdown 상태 변경 시 aria-expanded 업데이트
    document.addEventListener("chipDropdown:open", function (e) {
      const trigger = e.detail.dropdown.querySelector(".chip__dropdown-item");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "true");
      }
    });

    document.addEventListener("chipDropdown:close", function (e) {
      const trigger = e.detail.dropdown.querySelector(".chip__dropdown-item");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /**
   * ========================================
   * Tab Components
   * ========================================
   */

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

    console.log(`[Common] Initialized ${tabGroups.length} tab group(s)`);
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
   * 탭 그룹 생성 헬퍼 함수
   * @param {Object} options - 탭 그룹 옵션
   * @returns {HTMLElement} 생성된 탭 그룹 요소
   */
  function createTabGroup(options = {}) {
    const {
      id = `tab-group-${Date.now()}`,
      tabs = [],
      size = "medium",
      className = "",
    } = options;

    const tabGroup = document.createElement("div");
    tabGroup.className = `tab-group tab--${size} ${className}`.trim();
    tabGroup.setAttribute("data-tab-group", id);
    tabGroup.setAttribute("role", "tablist");

    tabs.forEach((tab, index) => {
      const tabButton = document.createElement("button");
      tabButton.className = `tab ${tab.active ? "tab--active" : ""}`;
      tabButton.setAttribute("role", "tab");
      tabButton.setAttribute("aria-selected", tab.active ? "true" : "false");
      tabButton.setAttribute("tabindex", tab.active ? "0" : "-1");

      if (tab.contentId) {
        tabButton.setAttribute("data-tab-content", tab.contentId);
      }

      tabButton.innerHTML = `
        <span class="tab__text">${tab.text}</span>
      `;

      tabGroup.appendChild(tabButton);

      // 첫 번째 탭이 활성화되어 있지 않으면 첫 번째 탭을 활성화
      if (index === 0 && !tab.active) {
        tabButton.classList.add("tab--active");
        tabButton.setAttribute("aria-selected", "true");
        tabButton.setAttribute("tabindex", "0");
      }
    });

    initTabGroup(tabGroup);
    return tabGroup;
  }

  /**
   * LNB Menu 기능
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
            "대시보드로 이동:",
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
          console.log("메뉴 이동:", menuText);
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
  }

  /**
   * LNB 토글 기능
   * data-lnb-toggle 속성이 있는 버튼 클릭 시 .lnb에 .isShrink 클래스를 토글합니다.
   */
  function initLnbToggle() {
    document.addEventListener("click", function (e) {
      // data-lnb-toggle 속성이 있는 버튼이 클릭되었는지 확인
      const lnb = document.querySelector(".lnb");
      if (e.target.closest("[data-lnb-fold]")) {
        if (lnb) {
          console.debug("lnb", e.target.closest("[data-lnb-fold]"));
          lnb.classList.add("isShrink");
        }
      }
      if (e.target.closest("[data-lnb-expand]")) {
        if (lnb) {
          lnb.classList.remove("isShrink");
        }
      }
    });
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

    console.log(`[Common] Initialized ${sliders.length} slider(s)`);
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

  /**
   * file card click event
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
          "file-card--selectable에서 .chk__input을 찾을 수 없습니다.",
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

  // DOM이 준비되면 모든 기능들을 초기화
  document.addEventListener("DOMContentLoaded", function () {
    console.log("[Common] Initializing all components...");

    // 이벤트 위임 방식 (한 번만 등록, 모든 동적 요소 지원)
    initInputCloseButtons();
    initChipRemoveButtons();
    initChipInputHandlers();
    initInputCounterEventDelegation();
    initDropdownHandlers();
    initDropdownCloseButtons();
    initChipDropdownHandlers();
    initCheckboxGroupEventDelegation();
    initPopovers();
    initModals();
    initTabEventDelegation();
    initSliderEventDelegation();
    initLnbMenu();
    initLnbToggle();
    initAccordions();
    initFileCardClickEvent();

    // 초기 상태 설정 (기존 요소들)
    initInputCounters();
    initDropdowns();
    initCheckboxGroups();
    initTabs();
    initAccordionDefaults();
    initSliders();

    console.log("[Common] All components initialized successfully");
  });

  /**
   * 동적으로 추가된 컴포넌트 초기화
   * 이벤트는 이미 위임으로 처리되므로, 초기 상태만 설정
   */
  window.initDynamicComponents = function () {
    console.log("[Common] Initializing dynamic components...");

    // 초기 상태 설정 (이벤트는 위임으로 이미 처리됨)
    initTabs(); // 기본 활성 탭 설정
    initSliders(); // 슬라이더 초기 값 설정
    initInputCounters(); // 입력 필드 카운터 초기 값 설정
    initCheckboxGroups(); // 체크박스 그룹 초기 상태 설정

    // 아래는 이미 이벤트 위임으로 처리되어 추가 작업 불필요:
    // - Popover, Dropdown, Modal, Accordion, etc.

    console.log("[Common] Dynamic components initialized");
  };
})();

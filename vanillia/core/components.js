/**
 * Vanilla Components Scripts Bundle
 * 컴포넌트 스크립트 통합 파일 (자동 생성)
 *
 * 이 파일은 scripts/build-scripts.js에 의해 자동으로 생성되었습니다.
 * 수동으로 수정하지 마세요. 수정사항은 다음 빌드 시 덮어씁니다.
 *
 * 생성일: 2025-11-17 오전 9:45:48 KST
 * 통합 파일 수: 14
 * 
 * 통합된 컴포넌트:
 *   - accordion.js
 *   - checkbox-group.js
 *   - chip.js
 *   - dropdown.js
 *   - file-card.js
 *   - file-upload.js
 *   - input.js
 *   - lnb.js
 *   - modal.js
 *   - popover.js
 *   - slider.js
 *   - tab.js
 *   - theme-manager.js
 *   - tooltip.js
 */

// 전역 네임스페이스 초기화
window.VanillaComponents = window.VanillaComponents || {};



// ========================================
// accordion.js
// ========================================

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



// ========================================
// checkbox-group.js
// ========================================

/**
 * Checkbox Group Component Script
 * 체크박스 그룹 컴포넌트: 전체 선택/해제, indeterminate 상태 관리
 *
 * 사용법:
 * <div class="chk-group">
 *   <label class="chk chk-group__all">
 *     <input type="checkbox" />
 *     전체 선택
 *   </label>
 *   <label class="chk chk-group__item">
 *     <input type="checkbox" value="1" />
 *     항목 1
 *   </label>
 * </div>
 */

  /**
   * Checkbox Group 초기화 함수
   */
  function initCheckboxGroup() {
    console.log("[CheckboxGroup] Initializing Checkbox Group...");

    // 이벤트 위임 방식 (한 번만 등록, 모든 동적 요소 지원)
    initCheckboxGroupEventDelegation();

    // 초기 상태 설정
    initCheckboxGroups();

    console.log("[CheckboxGroup] Checkbox Group initialized successfully");
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

    console.log(
      `[CheckboxGroup] Initialized ${groups.length} checkbox group(s)`
    );
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

  // 전역 네임스페이스에 등록
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initCheckboxGroup = initCheckboxGroup;



// ========================================
// chip.js
// ========================================

/**
 * Chip Component Script
 * Chip 컴포넌트: Chip 제거, Chip Input Enter 키 처리, Chip Dropdown 등
 *
 * 사용법:
 * <div class="chip-group">
 *   <span class="chip">
 *     Chip 텍스트
 *     <button class="chip__remove">X</button>
 *   </span>
 * </div>
 *
 * <div class="input-field input-field--with-chips">
 *   <input class="input" type="text" />
 * </div>
 */

  /**
   * Chip 초기화 함수
   */
  function initChip() {
    console.log("[Chip] Initializing Chip...");

    // 이벤트 위임 방식
    initChipRemoveButtons();
    initChipInputHandlers();
    initChipDropdownHandlers();

    console.log("[Chip] Chip initialized successfully");
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

  // 전역 네임스페이스에 등록
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initChip = initChip;



// ========================================
// dropdown.js
// ========================================

/**
 * Dropdown Component Script
 * 드롭다운 컴포넌트: 드롭다운 메뉴의 열기/닫기, 옵션 선택 등을 처리합니다.
 *
 * 사용법:
 * <div class="dropdown">
 *   <button class="dropdown__trigger">
 *     <span class="dropdown__text dropdown__text--placeholder">선택하세요</span>
 *   </button>
 *   <ul class="dropdown__menu">
 *     <li class="dropdown__item" data-value="option1">옵션 1</li>
 *     <li class="dropdown__item" data-value="option2">옵션 2</li>
 *   </ul>
 * </div>
 */

  /**
   * Dropdown 초기화 함수
   */
  function initDropdown() {
    console.log("[Dropdown] Initializing Dropdown...");

    // 이벤트 위임 방식 (한 번만 등록, 모든 동적 요소 지원)
    initDropdownHandlers();
    initDropdownCloseButtons();
    initSearchableDropdowns();
    initDropdowns();

    console.log("[Dropdown] Dropdown initialized successfully");
  }

  /**
   * Dropdown 핸들러 (열기/닫기, 옵션 선택)
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

        // 멀티 선택 드롭다운인지 확인
        if (dropdown.classList.contains("dropdown--multi")) {
          handleMultiSelect(dropdown, item);
          // 멀티 선택에서는 드롭다운을 닫지 않음
          return;
        }

        // 단일 선택 드롭다운
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

        // popover 숨기기 (Popover 컴포넌트와의 통합)
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

      // 키보드 포커스는 항상 focused 클래스 사용
      const currentFocused = dropdown.querySelector(".dropdown__item--focused");
      let currentIndex = Array.from(items).indexOf(currentFocused);

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
          if (currentFocused) {
            currentFocused.click();
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
        const dropdown = item.closest(".dropdown");

        // 키보드 포커스는 단일/멀티 모두 focused 클래스 사용
        dropdown
          .querySelectorAll(".dropdown__item--focused")
          .forEach((focused) => {
            focused.classList.remove("dropdown__item--focused");
          });
        item.classList.add("dropdown__item--focused");
        item.focus();

        // 스크롤 자동 이동 (아이템이 보이도록)
        item.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }
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
   * 멀티 선택 처리
   * @param {HTMLElement} dropdown - 드롭다운 컨테이너
   * @param {HTMLElement} item - 선택된 아이템
   */
  function handleMultiSelect(dropdown, item) {
    const value = item.getAttribute("data-value") || item.textContent.trim();
    const text = item.textContent.trim();

    // 이미 선택되어 있으면 선택 해제
    if (item.classList.contains("dropdown__item--selected")) {
      item.classList.remove("dropdown__item--selected");
      removeChip(dropdown, value);

      // 커스텀 이벤트 발생 (선택 해제)
      dropdown.dispatchEvent(
        new CustomEvent("dropdown:deselect", {
          detail: { dropdown, item, value, text },
        })
      );
    } else {
      // 선택
      item.classList.add("dropdown__item--selected");
      addChip(dropdown, value, text);

      // 커스텀 이벤트 발생 (선택)
      dropdown.dispatchEvent(
        new CustomEvent("dropdown:select", {
          detail: { dropdown, item, value, text },
        })
      );
    }

    // filled 상태 업데이트
    updateMultiDropdownState(dropdown);
  }

  /**
   * Chip 추가
   * @param {HTMLElement} dropdown - 드롭다운 컨테이너
   * @param {string} value - 값
   * @param {string} text - 표시 텍스트
   */
  function addChip(dropdown, value, text) {
    let chipsContainer = dropdown.querySelector(".dropdown__chips");

    // chips 컨테이너가 없으면 생성
    if (!chipsContainer) {
      const trigger = dropdown.querySelector(".dropdown__trigger");
      chipsContainer = document.createElement("div");
      chipsContainer.className = "dropdown__chips";

      // placeholder 텍스트 앞에 삽입
      const placeholder = trigger.querySelector(".dropdown__text--placeholder");
      if (placeholder) {
        trigger.insertBefore(chipsContainer, placeholder);
      } else {
        trigger.insertBefore(chipsContainer, trigger.firstChild);
      }
    }

    // 이미 존재하는지 확인
    const existingChip = chipsContainer.querySelector(
      `[data-value="${value}"]`
    );
    if (existingChip) {
      return;
    }

    // Chip 생성 (기존 chip 컴포넌트 재사용)
    const chip = document.createElement("span");
    chip.className = "chip chip--rounded chip--selected";
    chip.setAttribute("data-value", value);
    chip.innerHTML = `
      <span class="chip__text">${text}</span>
      <button type="button" class="chip__remove" aria-label="Remove ${text}"></button>
    `;

    chipsContainer.appendChild(chip);
  }

  /**
   * Chip 제거
   * @param {HTMLElement} dropdown - 드롭다운 컨테이너
   * @param {string} value - 제거할 값
   */
  function removeChip(dropdown, value) {
    const chipsContainer = dropdown.querySelector(".dropdown__chips");
    if (!chipsContainer) {
      return;
    }

    const chip = chipsContainer.querySelector(`.chip[data-value="${value}"]`);
    if (chip) {
      chip.remove();
    }
  }

  /**
   * 멀티 드롭다운 상태 업데이트
   * @param {HTMLElement} dropdown - 드롭다운 컨테이너
   */
  function updateMultiDropdownState(dropdown) {
    const chipsContainer = dropdown.querySelector(".dropdown__chips");
    const hasChips = chipsContainer && chipsContainer.children.length > 0;

    if (hasChips) {
      dropdown.classList.add("dropdown--filled");
    } else {
      dropdown.classList.remove("dropdown--filled");
    }
  }

  /**
   * Chip 제거 버튼 클릭 이벤트 (이벤트 위임)
   * dropdown 내부의 chip__remove만 처리
   */
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("chip__remove")) {
      const dropdown = e.target.closest(".dropdown");

      // dropdown 내부의 chip만 처리 (input-field와 구분)
      if (!dropdown) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const chip = e.target.closest(".chip");

      if (!chip) {
        return;
      }

      const value = chip.getAttribute("data-value");

      // 해당 아이템의 선택 상태 해제
      const item = dropdown.querySelector(
        `.dropdown__item[data-value="${value}"]`
      );
      if (item) {
        item.classList.remove("dropdown__item--selected");
      }

      // Chip 제거
      chip.remove();

      // 상태 업데이트
      updateMultiDropdownState(dropdown);

      // 커스텀 이벤트 발생
      dropdown.dispatchEvent(
        new CustomEvent("dropdown:deselect", {
          detail: { dropdown, value },
        })
      );
    }
  });

  /**
   * Searchable Dropdown 초기화
   * 검색 가능한 드롭다운의 필터링 기능을 설정합니다.
   */
  function initSearchableDropdowns() {
    // 검색 입력 이벤트 (이벤트 위임)
    document.addEventListener("input", function (e) {
      if (e.target.classList.contains("dropdown__search")) {
        const searchInput = e.target;
        const dropdown = searchInput.closest(".dropdown");

        if (!dropdown || !dropdown.classList.contains("dropdown--searchable")) {
          return;
        }

        handleDropdownSearch(searchInput, dropdown);
      }
    });

    // 검색 입력창에 포커스 시 전체 아이템 표시
    document.addEventListener(
      "focus",
      function (e) {
        if (e.target.classList.contains("dropdown__search")) {
          const searchInput = e.target;
          const dropdown = searchInput.closest(".dropdown");

          if (
            !dropdown ||
            !dropdown.classList.contains("dropdown--searchable")
          ) {
            return;
          }

          // 검색어가 비어있으면 전체 표시
          if (!searchInput.value.trim()) {
            showAllDropdownItems(dropdown);
          }
        }
      },
      true
    );

    // 드롭다운이 열릴 때 검색창 초기화 및 포커스
    document.addEventListener("dropdown:open", function (e) {
      const dropdown = e.detail.dropdown;

      if (dropdown.classList.contains("dropdown--searchable")) {
        const searchInput = dropdown.querySelector(".dropdown__search");
        if (searchInput) {
          // 검색어 초기화
          searchInput.value = "";
          // 모든 아이템 표시
          showAllDropdownItems(dropdown);
          // 검색창에 포커스
          setTimeout(() => searchInput.focus(), 100);
        }
      }
    });

    // 키보드 네비게이션 확장 (검색창에서 아래 화살표 누르면 아이템으로 이동)
    document.addEventListener("keydown", function (e) {
      if (e.target.classList.contains("dropdown__search")) {
        const dropdown = e.target.closest(".dropdown");

        if (!dropdown || !dropdown.classList.contains("dropdown--open")) {
          return;
        }

        if (e.key === "ArrowDown") {
          e.preventDefault();
          const firstVisibleItem = dropdown.querySelector(
            '.dropdown__item:not([style*="display: none"])'
          );
          if (firstVisibleItem) {
            // 단일/멀티 모두 focused 클래스 사용
            dropdown
              .querySelectorAll(".dropdown__item--focused")
              .forEach((item) =>
                item.classList.remove("dropdown__item--focused")
              );
            firstVisibleItem.classList.add("dropdown__item--focused");
            firstVisibleItem.focus();
          }
        } else if (e.key === "Escape") {
          e.preventDefault();
          dropdown.classList.remove("dropdown--open");
          dropdown.querySelector(".dropdown__trigger").focus();
        } else if (e.key === "Enter") {
          e.preventDefault();
          const firstVisibleItem = dropdown.querySelector(
            '.dropdown__item:not([style*="display: none"])'
          );
          if (firstVisibleItem) {
            firstVisibleItem.click();
          }
        }
      }
    });
  }

  /**
   * 드롭다운 아이템 필터링
   * @param {HTMLInputElement} searchInput - 검색 입력 필드
   * @param {HTMLElement} dropdown - 드롭다운 컨테이너
   */
  function handleDropdownSearch(searchInput, dropdown) {
    const query = searchInput.value.toLowerCase().trim();
    const items = dropdown.querySelectorAll(".dropdown__item");
    const noResults = dropdown.querySelector(".dropdown__no-results");
    let visibleCount = 0;

    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      const matches = text.includes(query);

      item.style.display = matches ? "" : "none";

      // 숨겨진 아이템의 focused 클래스 제거
      if (!matches) {
        item.classList.remove("dropdown__item--focused");
      }

      if (matches) {
        visibleCount++;
      }
    });

    // No results 표시/숨김
    if (noResults) {
      if (visibleCount === 0 && query) {
        noResults.classList.add("show");
      } else {
        noResults.classList.remove("show");
      }
    }
  }

  /**
   * 모든 드롭다운 아이템 표시
   * @param {HTMLElement} dropdown - 드롭다운 컨테이너
   */
  function showAllDropdownItems(dropdown) {
    const items = dropdown.querySelectorAll(".dropdown__item");
    const noResults = dropdown.querySelector(".dropdown__no-results");

    items.forEach((item) => {
      item.style.display = "";
    });

    if (noResults) {
      noResults.classList.remove("show");
    }
  }

  // 전역 네임스페이스에 등록
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initDropdown = initDropdown;



// ========================================
// file-card.js
// ========================================

/**
 * File Card Component Script
 * File Card 클릭 이벤트를 처리합니다.
 *
 * 기능:
 * - File Card 영역 클릭 시 체크박스 토글
 * - File Card 선택 상태 시각적 표시
 */

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



// ========================================
// file-upload.js
// ========================================

/**
 * File Upload Component Script
 * 파일 업로드 컴포넌트: 파일 선택, 미리보기, 삭제 기능
 *
 * 사용법:
 * <div class="file-upload" data-name="fileUpload">
 *   <input type="file" id="fileUpload" class="file-upload__input" name="fileUpload">
 *   <label for="fileUpload" class="file-upload__label">
 *     <i class="icon icon--medium icon--upload"></i>
 *     <span class="file-upload__label-text">파일 선택</span>
 *   </label>
 *   <div class="file-upload__preview"></div>
 * </div>
 */

  /**
   * File Upload 초기화 함수
   */
  function initFileUpload() {
    console.log("[FileUpload] Initializing File Upload...");

    // 이벤트 위임 방식 (한 번만 등록, 모든 동적 요소 지원)
    initFileUploadEventDelegation();

    // 초기 상태 설정
    initFileUploads();

    console.log("[FileUpload] File Upload initialized successfully");
  }

  /**
   * File Upload 초기 상태 설정
   */
  function initFileUploads() {
    const fileUploads = document.querySelectorAll(
      ".file-upload:not([data-fileupload-initialized])"
    );

    fileUploads.forEach((fileUpload) => {
      const input = fileUpload.querySelector(".file-upload__input");
      const preview = fileUpload.querySelector(".file-upload__preview");

      if (!input || !preview) return;

      // 초기 파일 목록이 있으면 미리보기 업데이트
      if (input.files && input.files.length > 0) {
        updateFilePreview(fileUpload, input.files);
      }

      // 초기화 완료 표시
      fileUpload.setAttribute("data-fileupload-initialized", "true");
    });

    console.log(
      `[FileUpload] Initialized ${fileUploads.length} file upload(s)`
    );
  }

  /**
   * File Upload 이벤트 위임 (동적으로 추가된 요소에도 적용)
   */
  function initFileUploadEventDelegation() {
    // 파일 선택 이벤트
    document.addEventListener("change", function (e) {
      if (e.target.classList.contains("file-upload__input")) {
        const input = e.target;
        const fileUpload = input.closest(".file-upload");
        if (!fileUpload) return;

        const files = input.files;
        updateFilePreview(fileUpload, files);

        // 커스텀 이벤트 발생
        fileUpload.dispatchEvent(
          new CustomEvent("fileUpload:change", {
            detail: {
              files: files,
              value: files, // FileList 객체
              name: fileUpload.dataset.name || input.name,
            },
            bubbles: true,
          })
        );
      }
    });

    // 파일 삭제 버튼 클릭 이벤트
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("file-upload__remove")) {
        const removeBtn = e.target;
        const fileItem = removeBtn.closest(".file-upload__item");
        const fileUpload = removeBtn.closest(".file-upload");
        const input = fileUpload?.querySelector(".file-upload__input");

        if (!fileItem || !fileUpload || !input) return;

        const fileIndex = parseInt(removeBtn.dataset.index || "0", 10);

        // FileList는 변경 불가능하므로 DataTransfer 사용
        const dataTransfer = new DataTransfer();

        // 삭제할 파일을 제외한 나머지 파일들 추가
        Array.from(input.files).forEach((file, index) => {
          if (index !== fileIndex) {
            dataTransfer.items.add(file);
          }
        });

        // input의 files 속성 업데이트
        input.files = dataTransfer.files;

        // 미리보기 업데이트
        updateFilePreview(fileUpload, input.files);

        // 커스텀 이벤트 발생
        fileUpload.dispatchEvent(
          new CustomEvent("fileUpload:remove", {
            detail: {
              removedIndex: fileIndex,
              files: input.files,
              value: input.files,
              name: fileUpload.dataset.name || input.name,
            },
            bubbles: true,
          })
        );

        // change 이벤트도 발생 (폼 제출 시 반영되도록)
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  }

  /**
   * 파일 미리보기 업데이트
   * @param {HTMLElement} fileUpload - 파일 업로드 컨테이너
   * @param {FileList} files - 파일 목록
   */
  function updateFilePreview(fileUpload, files) {
    const preview = fileUpload.querySelector(".file-upload__preview");
    if (!preview) return;

    // 기존 미리보기 제거
    preview.innerHTML = "";

    if (!files || files.length === 0) {
      return;
    }

    // 파일 목록 생성
    const fileList = document.createElement("div");
    fileList.className = "file-upload__list";

    Array.from(files).forEach((file, index) => {
      const fileItem = createFileItem(file, index);
      fileList.appendChild(fileItem);
    });

    preview.appendChild(fileList);
  }

  /**
   * 파일 아이템 생성
   * @param {File} file - 파일 객체
   * @param {number} index - 파일 인덱스
   * @returns {HTMLElement} 파일 아이템 요소
   */
  function createFileItem(file, index) {
    const fileItem = document.createElement("div");
    fileItem.className = "file-upload__item";
    fileItem.dataset.index = index;

    // 파일 아이콘
    const fileIcon = getFileIcon(file.name);
    const iconHtml = `<i class="icon ${fileIcon.iconClass} ${fileIcon.iconName}"></i>`;

    // 파일 정보
    const fileName = escapeHtml(file.name);
    const fileSize = formatFileSize(file.size);

    // 삭제 버튼
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "file-upload__remove";
    removeBtn.dataset.index = index;
    removeBtn.setAttribute("aria-label", "파일 삭제");
    removeBtn.innerHTML = '<i class="icon icon--small icon--close"></i>';

    fileItem.innerHTML = `
      <div class="file-upload__item-content">
        ${iconHtml}
        <div class="file-upload__item-info">
          <span class="file-upload__item-name">${fileName}</span>
          <span class="file-upload__item-size">${fileSize}</span>
        </div>
      </div>
    `;

    fileItem.appendChild(removeBtn);
    return fileItem;
  }

  /**
   * 파일 확장자에 따른 아이콘 반환
   * @param {string} fileName - 파일명
   * @returns {Object} 아이콘 클래스와 이름
   */
  function getFileIcon(fileName) {
    const extension = fileName.split(".").pop()?.toLowerCase() || "";
    const iconMap = {
      pdf: { iconClass: "icon--large", iconName: "icon--file-pdf" },
      doc: { iconClass: "icon--large", iconName: "icon--file-doc" },
      docx: { iconClass: "icon--large", iconName: "icon--file-doc" },
      xls: { iconClass: "icon--large", iconName: "icon--file-xls" },
      xlsx: { iconClass: "icon--large", iconName: "icon--file-xls" },
      ppt: { iconClass: "icon--large", iconName: "icon--file-ppt" },
      pptx: { iconClass: "icon--large", iconName: "icon--file-ppt" },
      jpg: { iconClass: "icon--large", iconName: "icon--file-image" },
      jpeg: { iconClass: "icon--large", iconName: "icon--file-image" },
      png: { iconClass: "icon--large", iconName: "icon--file-image" },
      gif: { iconClass: "icon--large", iconName: "icon--file-image" },
      zip: { iconClass: "icon--large", iconName: "icon--file-zip" },
      txt: { iconClass: "icon--large", iconName: "icon--file-text" },
    };

    return (
      iconMap[extension] || {
        iconClass: "icon--large",
        iconName: "icon--file-default",
      }
    );
  }

  /**
   * 파일 크기 포맷팅
   * @param {number} bytes - 바이트 크기
   * @returns {string} 포맷된 크기 문자열
   */
  function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }

  /**
   * HTML 이스케이프 함수
   * @param {string} text - 이스케이프할 텍스트
   * @returns {string} 이스케이프된 텍스트
   */
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // 전역 네임스페이스에 등록
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initFileUpload = initFileUpload;



// ========================================
// input.js
// ========================================

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



// ========================================
// lnb.js
// ========================================

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



// ========================================
// modal.js
// ========================================

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



// ========================================
// popover.js
// ========================================

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



// ========================================
// slider.js
// ========================================

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



// ========================================
// tab.js
// ========================================

/**
 * Tab Component Script
 * 탭 컴포넌트: 탭 전환, 키보드 네비게이션, 콘텐츠 패널 제어
 *
 * 사용법:
 * <div class="tab-group" data-tab-group="myTabs">
 *   <button class="tab" data-tab-content="panel1">탭 1</button>
 *   <button class="tab" data-tab-content="panel2">탭 2</button>
 * </div>
 * <div data-tab-content="myTabs">
 *   <div id="panel1" class="tab-content-panel">콘텐츠 1</div>
 *   <div id="panel2" class="tab-content-panel">콘텐츠 2</div>
 * </div>
 */

  /**
   * Tab 초기화 함수
   */
  function initTab() {
    console.log("[Tab] Initializing Tab...");

    // 이벤트 위임 방식 (한 번만 등록, 모든 동적 요소 지원)
    initTabEventDelegation();

    // 초기 상태 설정
    initTabs();

    console.log("[Tab] Tab initialized successfully");
  }

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

    console.log(`[Tab] Initialized ${tabGroups.length} tab group(s)`);
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

  // 전역 네임스페이스에 등록
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initTab = initTab;



// ========================================
// theme-manager.js
// ========================================

/**
 * Theme Manager
 * 라이트/다크 모드 전환 및 관리
 *
 * 📋 기능:
 * - 테마 전환 (light ↔ dark)
 * - localStorage에 사용자 선택 저장
 * - 시스템 테마 자동 감지 (prefers-color-scheme)
 * - 테마 변경 이벤트 발생
 *
 * 🎨 사용법:
 * ```javascript
 * // 테마 전환
 * ThemeManager.toggle();
 *
 * // 특정 테마 설정
 * ThemeManager.setTheme('dark');
 *
 * // 현재 테마 확인
 * const theme = ThemeManager.getCurrentTheme();
 *
 * // 테마 변경 감지
 * document.addEventListener('themechange', (e) => {
 *   console.log('테마 변경됨:', e.detail.theme);
 * });
 * ```
 *
 * 📅 Created: 2025-11-12
 */

(function (window) {
  "use strict";

  const STORAGE_KEY = "doakumize-theme";
  const THEME_ATTRIBUTE = "data-theme";
  const THEME_LIGHT = "light";
  const THEME_DARK = "dark";

  /**
   * ThemeManager 클래스
   * 싱글톤 패턴으로 구현
   */
  class ThemeManager {
    constructor() {
      if (ThemeManager.instance) {
        return ThemeManager.instance;
      }

      this.currentTheme = null;
      this.systemPreference = null;
      this.mediaQuery = null;

      ThemeManager.instance = this;
    }

    /**
     * 초기화
     * 페이지 로드 시 자동 호출됨
     */
    init() {
      console.log("[ThemeManager] 초기화 시작");

      // 시스템 테마 감지 설정
      this._setupSystemThemeDetection();

      // 저장된 테마 또는 시스템 테마 적용
      const savedTheme = this._getSavedTheme();
      const initialTheme = savedTheme || this._getSystemTheme();

      this.setTheme(initialTheme, false); // 초기화 시에는 저장하지 않음

      console.log(`[ThemeManager] 초기 테마: ${initialTheme}`);
    }

    /**
     * 시스템 테마 감지 설정
     * prefers-color-scheme 미디어 쿼리 사용
     * @private
     */
    _setupSystemThemeDetection() {
      // 미디어 쿼리 생성
      this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      // 시스템 테마 변경 감지
      this.mediaQuery.addEventListener("change", (e) => {
        console.log(
          `[ThemeManager] 시스템 테마 변경: ${e.matches ? "dark" : "light"}`
        );

        // 사용자가 명시적으로 선택하지 않은 경우만 자동 변경
        const savedTheme = this._getSavedTheme();
        if (!savedTheme) {
          this.setTheme(e.matches ? THEME_DARK : THEME_LIGHT, false);
        }
      });
    }

    /**
     * 시스템 테마 확인
     * @private
     * @returns {string} 'light' 또는 'dark'
     */
    _getSystemTheme() {
      if (!this.mediaQuery) {
        this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      }
      return this.mediaQuery.matches ? THEME_DARK : THEME_LIGHT;
    }

    /**
     * 저장된 테마 가져오기
     * @private
     * @returns {string|null} 저장된 테마 또는 null
     */
    _getSavedTheme() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === THEME_LIGHT || saved === THEME_DARK) {
          return saved;
        }
      } catch (e) {
        console.warn("[ThemeManager] localStorage 접근 실패:", e);
      }
      return null;
    }

    /**
     * 테마 저장
     * @private
     * @param {string} theme - 저장할 테마
     */
    _saveTheme(theme) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
        console.log(`[ThemeManager] 테마 저장됨: ${theme}`);
      } catch (e) {
        console.warn("[ThemeManager] localStorage 저장 실패:", e);
      }
    }

    /**
     * 테마 설정
     * @param {string} theme - 'light' 또는 'dark'
     * @param {boolean} [save=true] - localStorage에 저장할지 여부
     */
    setTheme(theme, save = true) {
      // 유효성 검사
      if (theme !== THEME_LIGHT && theme !== THEME_DARK) {
        console.error(`[ThemeManager] 유효하지 않은 테마: ${theme}`);
        return;
      }

      // 같은 테마면 무시
      if (this.currentTheme === theme) {
        return;
      }

      const previousTheme = this.currentTheme;
      this.currentTheme = theme;

      // DOM에 테마 적용
      if (theme === THEME_DARK) {
        document.documentElement.setAttribute(THEME_ATTRIBUTE, THEME_DARK);
      } else {
        document.documentElement.removeAttribute(THEME_ATTRIBUTE);
      }

      // 저장
      if (save) {
        this._saveTheme(theme);
      }

      // 커스텀 이벤트 발생
      this._dispatchThemeChangeEvent(theme, previousTheme);

      console.log(`[ThemeManager] 테마 적용됨: ${theme}`);
    }

    /**
     * 테마 전환 (토글)
     * light ↔ dark
     */
    toggle() {
      const newTheme =
        this.currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
      this.setTheme(newTheme);
    }

    /**
     * 현재 테마 확인
     * @returns {string} 'light' 또는 'dark'
     */
    getCurrentTheme() {
      return this.currentTheme || THEME_LIGHT;
    }

    /**
     * 다크모드 여부 확인
     * @returns {boolean}
     */
    isDarkMode() {
      return this.currentTheme === THEME_DARK;
    }

    /**
     * 테마 변경 이벤트 발생
     * @private
     * @param {string} newTheme - 새 테마
     * @param {string|null} previousTheme - 이전 테마
     */
    _dispatchThemeChangeEvent(newTheme, previousTheme) {
      const event = new CustomEvent("themechange", {
        detail: {
          theme: newTheme,
          previousTheme: previousTheme,
          isDark: newTheme === THEME_DARK,
        },
        bubbles: true,
      });

      document.dispatchEvent(event);
    }

    /**
     * 저장된 테마 초기화 (시스템 기본값으로 복귀)
     */
    reset() {
      try {
        localStorage.removeItem(STORAGE_KEY);
        console.log("[ThemeManager] 저장된 테마 초기화");
      } catch (e) {
        console.warn("[ThemeManager] localStorage 초기화 실패:", e);
      }

      // 시스템 테마로 변경
      const systemTheme = this._getSystemTheme();
      this.setTheme(systemTheme, false);
    }
  }

  // 싱글톤 인스턴스 생성
  const themeManager = new ThemeManager();

  // 전역 객체로 노출
  window.ThemeManager = themeManager;

  // DOM 준비되면 자동 초기화
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      themeManager.init();
    });
  } else {
    // 이미 로드된 경우 즉시 초기화
    themeManager.init();
  }

  console.log("[ThemeManager] 로드 완료");
})(window);



// ========================================
// tooltip.js
// ========================================

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
// ========================================
// initAll - 모든 컴포넌트 초기화
// ========================================

/**
 * 모든 컴포넌트 초기화
 * DOM에 있는 모든 컴포넌트를 자동으로 초기화합니다.
 */
function initAll() {
  console.log("[VanillaComponents] Initializing all components...");
  
  // 각 컴포넌트 초기화 함수 호출
  if (window.VanillaComponents.initAccordion) {
    window.VanillaComponents.initAccordion();
  }
  if (window.VanillaComponents.initCheckboxGroup) {
    window.VanillaComponents.initCheckboxGroup();
  }
  if (window.VanillaComponents.initChip) {
    window.VanillaComponents.initChip();
  }
  if (window.VanillaComponents.initDropdown) {
    window.VanillaComponents.initDropdown();
  }
  if (window.VanillaComponents.initFileCard) {
    window.VanillaComponents.initFileCard();
  }
  if (window.VanillaComponents.initFileUpload) {
    window.VanillaComponents.initFileUpload();
  }
  if (window.VanillaComponents.initInput) {
    window.VanillaComponents.initInput();
  }
  if (window.VanillaComponents.initLnb) {
    window.VanillaComponents.initLnb();
  }
  if (window.VanillaComponents.initModal) {
    window.VanillaComponents.initModal();
  }
  if (window.VanillaComponents.initPopover) {
    window.VanillaComponents.initPopover();
  }
  if (window.VanillaComponents.initSlider) {
    window.VanillaComponents.initSlider();
  }
  if (window.VanillaComponents.initTab) {
    window.VanillaComponents.initTab();
  }
  if (window.VanillaComponents.initTooltip) {
    window.VanillaComponents.initTooltip();
  }
  
  console.log("[VanillaComponents] All components initialized");
}

// 전역 네임스페이스에 등록
window.VanillaComponents = window.VanillaComponents || {};
window.VanillaComponents.initAll = initAll;

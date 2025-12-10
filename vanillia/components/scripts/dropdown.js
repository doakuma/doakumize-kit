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

(function () {
  "use strict";

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
})();

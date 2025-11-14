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

(function () {
  "use strict";

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
})();

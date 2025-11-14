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

(function () {
  "use strict";

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
})();

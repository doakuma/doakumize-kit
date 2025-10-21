/**
 * 채팅 모델 선택 기능
 */
(function () {
  "use strict";

  // 현재 선택된 모델과 버전 상태
  let currentModel = "gemini";
  let currentVersion = "Gemini 2.5 Flash";

  /**
   * 모델 선택 UI 초기화
   */
  function initChatModelSelector() {
    const btnChatIcon = document.querySelector(".btn-chat-icon");
    const modelTypeWrapper = document.querySelector(
      ".chat-model__wrapper--type"
    );
    const modelVersionWrapper = document.querySelector(
      ".chat-model__wrapper--version"
    );
    const currentModelText = document.querySelector(
      ".box-chat_utils .text-sub-md"
    );

    if (
      !btnChatIcon ||
      !modelTypeWrapper ||
      !modelVersionWrapper ||
      !currentModelText
    ) {
      console.warn("Required elements not found");
      return;
    }

    // 초기 상태: 모든 wrapper 숨김
    modelTypeWrapper.style.display = "none";
    modelVersionWrapper.style.display = "none";

    // 1. btn-chat-icon 클릭 시 모델 선택 메뉴 토글
    btnChatIcon.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const isTypeVisible = modelTypeWrapper.style.display === "block";

      if (isTypeVisible) {
        // 모두 숨김
        modelTypeWrapper.style.display = "none";
        modelVersionWrapper.style.display = "none";
        modelVersionWrapper.style.top = "0";
      } else {
        // 모델 타입만 표시
        modelTypeWrapper.style.display = "block";
        modelVersionWrapper.style.display = "none";
        modelVersionWrapper.style.top = "0";
      }
    });

    // 2. 모델 타입 선택
    const modelTypeButtons = modelTypeWrapper.querySelectorAll(
      ".model-list__button"
    );
    modelTypeButtons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const selectedModel = this.getAttribute("data-model");
        if (!selectedModel) return;

        // 현재 모델 업데이트
        currentModel = selectedModel;

        // 모델 타입 버튼 선택 상태 업데이트
        modelTypeButtons.forEach(function (btn) {
          btn.classList.remove("model-list__button--selected");
        });
        this.classList.add("model-list__button--selected");

        // 3. btn-chat-icon의 아이콘 변경
        const iconElement = btnChatIcon.querySelector(".icon-chat");
        if (iconElement) {
          iconElement.className = "icon-chat icon--" + selectedModel;
        }

        // 모델 타입 wrapper는 유지하고 버전 wrapper만 표시
        modelVersionWrapper.style.display = "block";

        // 버전 레이어의 Y 위치를 선택된 버튼 위치에 맞춤
        const buttonOffsetTop = this.offsetTop;
        modelVersionWrapper.style.top =
          buttonOffsetTop + modelTypeWrapper.offsetHeight * -1 - 16 + "px";

        // 해당 모델의 버전 리스트만 표시
        const versionLists = modelVersionWrapper.querySelectorAll(
          ".model-version-list"
        );
        versionLists.forEach(function (list) {
          const listModel = list.getAttribute("data-model");
          list.style.display = listModel === selectedModel ? "flex" : "none";
        });
      });
    });

    // 4. 모델 버전 선택
    const versionLists = modelVersionWrapper.querySelectorAll(
      ".model-version-list"
    );
    versionLists.forEach(function (versionList) {
      const versionButtons = versionList.querySelectorAll(
        ".model-list__button"
      );

      versionButtons.forEach(function (button) {
        button.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();

          const selectedVersion = this.getAttribute("data-version");
          if (!selectedVersion) return;

          // 현재 버전 업데이트
          currentVersion = selectedVersion;

          // 같은 모델 내에서 버전 버튼 선택 상태 업데이트
          versionButtons.forEach(function (btn) {
            btn.classList.remove("model-list__button--selected");
            // 체크 아이콘 제거
            const checkIcon = btn.querySelector(".icon--dropdown-check");
            if (checkIcon) {
              checkIcon.remove();
            }
          });

          this.classList.add("model-list__button--selected");
          // 선택된 버튼에 체크 아이콘 추가
          const existingIcon = this.querySelector(".icon--dropdown-check");
          if (!existingIcon) {
            const checkIcon = document.createElement("i");
            checkIcon.className =
              "icon icon--medium icon--dropdown-check ml-auto";
            this.appendChild(checkIcon);
          }

          // box-chat_utils의 현재 모델 텍스트 업데이트
          currentModelText.textContent = selectedVersion;

          // 모델 선택 메뉴 숨김
          modelTypeWrapper.style.display = "none";
          modelVersionWrapper.style.display = "none";
          modelVersionWrapper.style.top = "0";

          // 커스텀 이벤트 발생
          document.dispatchEvent(
            new CustomEvent("chatModel:change", {
              detail: {
                model: currentModel,
                version: currentVersion,
              },
            })
          );
        });
      });
    });

    // 5. 외부 클릭 시 모델 선택 메뉴 닫기
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".box-chat__input")) {
        modelTypeWrapper.style.display = "none";
        modelVersionWrapper.style.display = "none";
        modelVersionWrapper.style.top = "0";
      }
    });

    // 6. ESC 키로 메뉴 닫기
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        modelTypeWrapper.style.display = "none";
        modelVersionWrapper.style.display = "none";
        modelVersionWrapper.style.top = "0";
      }
    });
  }

  // DOM 로드 완료 시 초기화
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatModelSelector);
  } else {
    initChatModelSelector();
  }
})();

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

(function () {
  "use strict";

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
})();

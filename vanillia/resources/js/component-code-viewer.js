/**
 * Component Code Viewer
 * 컴포넌트 소스 코드 보기/복사 기능
 */

/**
 * Component Source Preservation
 * 라이브러리 적용 전 원본 HTML을 template에 자동 저장
 */
function initComponentSourcePreservation() {
  document.querySelectorAll("[data-component-source]").forEach((preview) => {
    // 이미 template이 있는지 확인
    let template = preview.nextElementSibling;

    if (
      !template ||
      !template.classList.contains("component-source-template")
    ) {
      // template이 없으면 원본 HTML을 저장
      template = document.createElement("template");
      template.className = "component-source-template";
      template.innerHTML = preview.innerHTML;
      preview.after(template);
    }
  });
}

/**
 * Component Source 가져오기
 * 컴포넌트의 원본 소스 코드를 반환
 * @param {HTMLElement} componentPreview - component-preview 요소
 * @returns {string} 원본 HTML 소스
 */
function getComponentSource(componentPreview) {
  const template = componentPreview.nextElementSibling;
  let sourceHTML = "";

  if (template && template.classList.contains("component-source-template")) {
    sourceHTML = template.innerHTML.trim();
  } else {
    // template이 없으면 현재 HTML 반환
    sourceHTML = componentPreview.innerHTML.trim();
  }

  // data-modal-open 속성을 가진 요소가 있는지 확인
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = sourceHTML;
  const modalTrigger = tempDiv.querySelector("[data-modal-open]");

  if (modalTrigger) {
    const modalId = modalTrigger.getAttribute("data-modal-open");
    if (modalId) {
      // 실제 DOM에서 모달 요소 찾기
      const modalElement = document.querySelector(modalId);
      if (modalElement) {
        // 버튼과 모달 HTML을 함께 반환
        sourceHTML =
          sourceHTML +
          "\n\n<!-- Modal Structure -->\n" +
          modalElement.outerHTML;
      }
    }
  }

  return sourceHTML;
}

/**
 * Component Source 복사
 * 컴포넌트의 원본 소스를 클립보드에 복사
 * @param {HTMLElement} componentPreview - component-preview 요소
 * @returns {Promise<boolean>} 복사 성공 여부
 */
async function copyComponentSource(componentPreview) {
  try {
    const source = getComponentSource(componentPreview);
    await navigator.clipboard.writeText(source);
    return true;
  } catch (err) {
    console.error("Failed to copy source:", err);
    return false;
  }
}

/**
 * 컴포넌트 코드 토글 기능
 * @param {HTMLElement} button - 토글 버튼 요소
 */
function toggleComponentCode(button) {
  const componentItem = button.closest(".component-item");
  let codeBlock = componentItem.querySelector(".component-code");

  // 코드 블록이 있으면 제거
  if (codeBlock) {
    codeBlock.remove();
    const iconSpan = button.querySelector(".tab__text");
    if (iconSpan) iconSpan.textContent = "코드 보기";
  } else {
    // 코드 블록이 없으면 생성하고 추가
    const preview = componentItem.querySelector(
      ".component-preview[data-component-source]"
    );
    if (preview) {
      codeBlock = createComponentCodeBlock(preview);
      componentItem.appendChild(codeBlock);
      const iconSpan = button.querySelector(".tab__text");
      if (iconSpan) iconSpan.textContent = "코드 숨기기";
    }
  }
}

/**
 * 컴포넌트 소스 코드 블록 생성
 * @param {HTMLElement} previewElement - component-preview 요소
 * @returns {HTMLElement} 생성된 코드 블록 요소
 */
function createComponentCodeBlock(previewElement) {
  // getComponentSource 함수를 사용하여 원본 소스 가져오기
  const innerHTML = getComponentSource(previewElement);

  // HTML을 이쁘게 포맷팅
  const formattedHTML = formatHTML(innerHTML);

  // 코드 블록 생성
  const codeBlock = document.createElement("div");
  codeBlock.className = "component-code";

  codeBlock.innerHTML = `
    <div class="component-code-header">
      <span class="component-code-title">HTML</span>
      <button class="component-code-copy" onclick="copyComponentCode(this)">
        복사
      </button>
    </div>
    <pre><code>${escapeHTML(formattedHTML)}</code></pre>
  `;

  return codeBlock;
}

/**
 * HTML 포맷팅 함수
 * @param {string} html - 포맷팅할 HTML 문자열
 * @returns {string} 포맷팅된 HTML 문자열
 */
function formatHTML(html) {
  // 앞뒤 공백 제거
  html = html.trim();

  // 연속된 공백을 하나로
  html = html.replace(/\s+/g, " ");

  // 태그 사이 공백 정리
  html = html.replace(/>\s+</g, ">\n<");

  // 들여쓰기 추가
  let formatted = "";
  let indent = 0;
  const lines = html.split("\n");

  lines.forEach((line) => {
    line = line.trim();
    if (line.startsWith("</")) {
      indent = Math.max(0, indent - 2);
    }
    formatted += " ".repeat(indent) + line + "\n";
    if (
      line.startsWith("<") &&
      !line.startsWith("</") &&
      !line.endsWith("/>") &&
      !line.includes("</")
    ) {
      indent += 2;
    }
  });

  return formatted.trim();
}

/**
 * HTML 이스케이프 함수
 * @param {string} html - 이스케이프할 HTML 문자열
 * @returns {string} 이스케이프된 HTML 문자열
 */
function escapeHTML(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * 코드 복사 기능
 * @param {HTMLElement} button - 복사 버튼 요소
 */
function copyComponentCode(button) {
  const codeBlock = button.closest(".component-code").querySelector("code");
  const textToCopy = codeBlock.textContent;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      const originalText = button.textContent;
      button.textContent = "복사 완료!";
      button.classList.add("copied");

      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("copied");
      }, 2000);
    })
    .catch((err) => {
      console.error("복사 실패:", err);
      alert("코드 복사에 실패했습니다.");
    });
}

/**
 * 코드 보기 버튼을 컴포넌트 아이템에 추가
 * @param {HTMLElement} container - 검색할 컨테이너 (기본값: document)
 */
function addCodeToggleButtons(container = document) {
  // component-preview를 가진 모든 component-item 찾기
  const componentItems = container.querySelectorAll(".component-item");

  componentItems.forEach((item) => {
    const preview = item.querySelector(
      ".component-preview[data-component-source]"
    );

    // component-preview가 있고, 아직 코드 보기 버튼이 없는 경우
    if (preview && !item.querySelector(".component-code-toggle")) {
      // 코드 보기 버튼 생성
      const codeToggleBtn = document.createElement("button");
      codeToggleBtn.className =
        "btn btn--default btn--small btn--start-icon component-code-toggle";
      codeToggleBtn.onclick = function () {
        toggleComponentCode(this);
      };

      // 아이콘 추가
      const icon = document.createElement("i");
      icon.className = "icon icon--small icon--code";
      codeToggleBtn.appendChild(icon);

      // 텍스트 추가
      const textSpan = document.createElement("span");
      textSpan.className = "tab__text";
      textSpan.textContent = "코드 보기";
      codeToggleBtn.appendChild(textSpan);

      // component-label 다음에 버튼 추가
      const label = item.querySelector(".component-label");
      if (label) {
        label.after(codeToggleBtn);
      } else {
        // label이 없으면 preview 다음에 추가
        preview.after(codeToggleBtn);
      }
    }
  });

  console.log(
    `[ComponentCodeViewer] Added code toggle buttons to ${componentItems.length} items`
  );
}

// 전역으로 export (다른 스크립트에서 사용 가능)
window.ComponentSource = {
  get: getComponentSource,
  copy: copyComponentSource,
  init: initComponentSourcePreservation,
};

// 코드 뷰어 관련 함수들 전역 노출
window.toggleComponentCode = toggleComponentCode;
window.createComponentCodeBlock = createComponentCodeBlock;
window.copyComponentCode = copyComponentCode;
window.addCodeToggleButtons = addCodeToggleButtons;
window.initComponentSourcePreservation = initComponentSourcePreservation;

console.log("[ComponentCodeViewer] Loaded successfully");

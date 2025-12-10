/**
 * ModalRenderer
 * Modal 컴포넌트 전용 렌더러 및 모달 팩토리 함수 제공
 *
 * 특징:
 * - Modal 컴포넌트 렌더링
 * - createModal() 정적 메서드로 모달 래퍼 생성 제공
 * - 다른 컴포넌트에서도 ModalRenderer.createModal() 사용 가능
 *
 * Single Responsibility: 모달 관련 모든 로직 관리
 */
class ModalRenderer {
  /**
   * Modal Factory Function (Static Method)
   * 모달 래퍼 구조를 생성하는 팩토리 함수
   *
   * @param {string} id - 모달 ID
   * @param {string} bodyContent - 모달 본문 HTML 컨텐츠
   * @param {Object} options - 추가 옵션
   * @param {string} options.modalClass - 모달 클래스 (기본: modal--content)
   * @param {string} options.footerButtons - 푸터 버튼 HTML (기본: 닫기 버튼)
   * @param {boolean} options.showCloseButton - X 버튼 표시 여부 (기본: true)
   * @returns {string} 완성된 모달 HTML
   */
  static createModal(id, bodyContent, options = {}) {
    const {
      modalClass = "modal--content",
      footerButtons = '<button class="btn btn--primary" type="button" data-modal-close>닫기</button>',
      showCloseButton = true,
    } = options;

    const closeButtonHTML = showCloseButton
      ? '<button class="modal__close" type="button" aria-label="닫기" data-modal-close></button>'
      : "";

    return `<div
  class="modal ${modalClass}"
  id="${id}"
  role="dialog"
  aria-modal="true">
  <div class="modal__overlay" data-modal-close></div>
  <div class="modal__dialog">
    ${closeButtonHTML}
    <div class="modal__body">
      ${bodyContent}
    </div>
    <footer class="modal__footer">
      ${footerButtons}
    </footer>
  </div>
</div>`;
  }

  /**
   * HTML 특수문자 이스케이프 (XSS 방지)
   * @param {string} text - 이스케이프할 텍스트
   * @returns {string} - 이스케이프된 텍스트
   */
  _escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Modal 컴포넌트 렌더링
   * @param {Object} data - Modal 컴포넌트 데이터
   * @returns {string} - 렌더링된 HTML
   */
  render(data) {
    if (!data) {
      console.error("[ModalRenderer] Invalid component data:", data);
      return '<div class="error">모달 데이터를 불러올 수 없습니다.</div>';
    }

    const { title, description, variants } = data;

    if (!variants || !Array.isArray(variants)) {
      console.error("[ModalRenderer] Component data without variants:", data);
      return '<div class="error">모달 변형 데이터가 없습니다.</div>';
    }

    const escapedTitle = this._escapeHtml(title || "");
    const escapedDescription = description
      ? `<p class="component-description">${this._escapeHtml(description)}</p>`
      : "";

    // 각 variant를 렌더링
    const variantsHtml = variants
      .map((variant) => {
        const variantTitle = this._escapeHtml(variant.title || "");
        const variantDescription = variant.description
          ? `<p class="component-description">${this._escapeHtml(
              variant.description
            )}</p>`
          : "";

        const itemsHtml = variant.items
          .map((item) => {
            const label = this._escapeHtml(item.label || "");
            return `
            <div class="component-item">
              <div class="component-preview" data-component-source>
                ${item.preview}
              </div>
              <span class="component-label">${label}</span>
            </div>
          `;
          })
          .join("");

        return `
        <div class="variant-group">
          <h4 class="component-subtitle">${variantTitle}</h4>
          ${variantDescription}
          <div class="component-grid">
            ${itemsHtml}
          </div>
        </div>
      `;
      })
      .join("");

    return `
      <h3 class="component-title">${escapedTitle}</h3>
      ${escapedDescription}
      ${variantsHtml}
    `;
  }

  /**
   * 캐시 키 생성
   * @param {Object} data - 컴포넌트 데이터
   * @returns {string} - 캐시 키
   */
  getCacheKey(data) {
    const type = data.type || "modal";
    const id = data.id || "default";
    return `${type}-${id}`;
  }
}

// Export for use in component engine
if (typeof module !== "undefined" && module.exports) {
  module.exports = ModalRenderer;
}

console.log("[ModalRenderer] Modal renderer loaded");

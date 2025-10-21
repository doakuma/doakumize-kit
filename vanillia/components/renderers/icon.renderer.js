/**
 * IconRenderer
 * Icon 컴포넌트 전용 렌더러
 *
 * 특징:
 * - Icon Sizes: 기본 사이즈 미리보기
 * - Icon Variations: 카테고리별로 그룹화된 아이콘 목록
 * - 클릭 인터랙션: 아이콘 클릭 시 모달로 코드 표시
 *
 * Single Responsibility: Icon 컴포넌트의 복잡한 렌더링 로직 처리
 */
class IconRenderer {
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
   * Icon Sizes 렌더링
   * @param {Object} variant - Icon Sizes variant 데이터
   * @returns {string} - 렌더링된 HTML
   */
  _renderIconSizes(variant) {
    const { title, items } = variant;
    const escapedTitle = this._escapeHtml(title);

    if (!items || !Array.isArray(items)) {
      return "";
    }

    const itemsHtml = items
      .map((item) => {
        const escapedLabel = this._escapeHtml(item.label || "");
        return `
        <div class="component-item">
          <div class="component-preview" data-component-source>
            ${item.preview}
          </div>
          <span class="component-label">${escapedLabel}</span>
        </div>
      `;
      })
      .join("");

    return `
      <div class="variant-group">
        <h4 class="component-subtitle">${escapedTitle}</h4>
        <div class="component-grid">
          ${itemsHtml}
        </div>
      </div>
    `;
  }

  /**
   * Icon Variations 렌더링 (카테고리별)
   * @param {Object} variant - Icon Variations variant 데이터
   * @returns {string} - 렌더링된 HTML
   */
  _renderIconVariations(variant) {
    const { title, description, categories, categoryTitles } = variant;
    const escapedTitle = this._escapeHtml(title);
    const escapedDescription = description
      ? `<p class="component-description">${this._escapeHtml(description)}</p>`
      : "";

    if (!categories || typeof categories !== "object") {
      return "";
    }

    let html = `
      <div class="variant-group">
        <h4 class="component-subtitle">${escapedTitle}</h4>
        ${escapedDescription}
        <div id="iconVariationsContainer">
    `;

    // 각 카테고리별로 렌더링
    Object.keys(categories).forEach((categoryKey) => {
      const categoryIcons = categories[categoryKey];
      const categoryTitle =
        (categoryTitles && categoryTitles[categoryKey]) || categoryKey;

      html += `
        <h5 class="component-category-title">${this._escapeHtml(
          categoryTitle
        )}</h5>
        <div class="component-grid component-grid--icon">
      `;

      // 각 카테고리의 아이콘들을 순회
      Object.keys(categoryIcons).forEach((iconKey) => {
        const iconInfo = categoryIcons[iconKey];
        const iconClass = iconInfo.className;
        const iconType = iconInfo.type;

        html += `
          <div class="component-item icon-clickable" onclick="showIconCode('${iconClass}')" data-icon-type="${iconType}">
            <i class="icon icon--small ${iconClass}"></i>
          </div>
        `;
      });

      html += `</div>`;
    });

    html += `
        </div>
      </div>
    `;

    return html;
  }

  /**
   * 전체 Icon 컴포넌트 렌더링
   * @param {Object} data - Icon 컴포넌트 데이터
   * @returns {string} - 렌더링된 HTML
   */
  render(data) {
    if (!data) {
      console.error("[IconRenderer] Invalid component data:", data);
      return '<div class="error">아이콘 데이터를 불러올 수 없습니다.</div>';
    }

    const { title, description, variants } = data;

    if (!variants || !Array.isArray(variants)) {
      console.error("[IconRenderer] Component data without variants:", data);
      return '<div class="error">아이콘 변형 데이터가 없습니다.</div>';
    }

    const escapedTitle = this._escapeHtml(title || "");
    const escapedDescription = description
      ? `<p class="component-description">${this._escapeHtml(description)}</p>`
      : "";

    // 각 variant를 적절한 렌더링 메서드로 처리
    const variantsHtml = variants
      .map((variant) => {
        if (variant.title === "Icon Sizes") {
          return this._renderIconSizes(variant);
        } else if (variant.title === "Icon Variations") {
          return this._renderIconVariations(variant);
        }
        return "";
      })
      .join("");

    return `
      <section class="component-section">
        <h3 class="component-title">${escapedTitle}</h3>
        ${escapedDescription}
        ${variantsHtml}
      </section>
    `;
  }

  /**
   * 캐시 키 생성
   * @param {Object} data - 컴포넌트 데이터
   * @returns {string} - 캐시 키
   */
  getCacheKey(data) {
    const type = data.type || "icon";
    const id = data.id || "default";
    return `${type}-${id}`;
  }

  /**
   * 렌더링 후 모달 생성 및 이벤트 연결
   * @param {HTMLElement} container - 렌더링된 컨테이너
   * @param {Object} data - 컴포넌트 데이터
   */
  afterRender(container, data) {
    // Icon Code Modal 생성 (ModalRenderer 팩토리 사용)
    if (data.modalConfig && typeof ModalRenderer !== "undefined") {
      const modalId = data.modalConfig.id;

      // 이미 모달이 존재하는지 확인
      if (!document.getElementById(modalId)) {
        const modalHTML = ModalRenderer.createModal(
          modalId,
          data.modalConfig.bodyContent,
          {
            modalClass: "modal--content",
            footerButtons: data.modalConfig.footerButtons,
            showCloseButton: true,
          }
        );

        document.body.insertAdjacentHTML("beforeend", modalHTML);
        console.log(`[IconRenderer] ✓ Icon code modal created: ${modalId}`);
      }
    }

    console.log("[IconRenderer] Icon component rendered successfully");
  }
}

// Export for use in component engine
if (typeof module !== "undefined" && module.exports) {
  module.exports = IconRenderer;
}

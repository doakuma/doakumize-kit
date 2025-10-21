/**
 * GenericComponentRenderer
 * 대부분의 컴포넌트를 처리하는 범용 렌더러
 *
 * 지원 컴포넌트:
 * - Typography, Button, Icon, Input, Chip, Checkbox, Radio
 * - File Card, Dropdown, Slider 등
 *
 * Single Responsibility: 공통 구조를 가진 모든 컴포넌트 렌더링
 */
class GenericComponentRenderer {
  /**
   * 인라인 스타일 객체를 CSS 문자열로 변환
   * @param {Object} styles - 스타일 객체
   * @returns {string} - CSS 스타일 문자열
   */
  _stylesToString(styles) {
    if (!styles) return "";
    return Object.entries(styles)
      .map(([key, value]) => {
        // camelCase를 kebab-case로 변환
        const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        return `${kebabKey}: ${value}`;
      })
      .join("; ");
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
   * HTML 속성을 문자열로 변환
   * @param {Object} attributes - 속성 객체
   * @returns {string} - HTML 속성 문자열
   */
  _attributesToString(attributes) {
    if (!attributes) return "";
    return Object.entries(attributes)
      .map(([key, value]) => {
        if (typeof value === "boolean") {
          return value ? key : "";
        }
        return `${key}="${this._escapeHtml(value)}"`;
      })
      .filter(Boolean)
      .join(" ");
  }

  /**
   * 구조화된 데이터를 HTML로 변환
   * @param {Object} element - 요소 정의
   * @returns {string} - 렌더링된 HTML
   */
  _renderElement(element) {
    if (typeof element === "string") {
      return element; // 이미 HTML 문자열인 경우
    }

    const {
      tag,
      className,
      text,
      sampleText,
      html,
      children,
      attributes,
      styles,
      wrapper,
    } = element;

    if (!tag) {
      console.warn("Element without tag:", element);
      return "";
    }

    const classStr = className ? `class="${className}"` : "";
    const styleStr = styles ? `style="${this._stylesToString(styles)}"` : "";
    const attrStr = this._attributesToString(attributes);
    const attrs = [classStr, styleStr, attrStr].filter(Boolean).join(" ");

    let content = "";
    if (html) {
      content = html; // HTML 직접 삽입 (주의: XSS 위험)
    } else if (text || sampleText) {
      // text 또는 sampleText 지원 (하위 호환성)
      content = this._escapeHtml(text || sampleText);
    } else if (children && Array.isArray(children)) {
      content = children.map((child) => this._renderElement(child)).join("");
    }

    let result = `<${tag} ${attrs}>${content}</${tag}>`;

    // wrapper가 있는 경우
    if (wrapper) {
      result = this._renderElement({ ...wrapper, html: result });
    }

    return result;
  }

  /**
   * 단일 컴포넌트 아이템 렌더링
   * @param {Object} item - 컴포넌트 아이템 데이터
   * @returns {string} - 렌더링된 HTML 문자열
   */
  _renderItem(item) {
    const { preview, label, previewElement, tag } = item;

    let previewContent = "";

    // preview가 문자열이면 HTML로 사용
    if (typeof preview === "string") {
      previewContent = preview;
    }
    // preview가 객체면 구조화된 데이터로 렌더링
    else if (typeof preview === "object" && preview !== null) {
      previewContent = this._renderElement(preview);
    }
    // previewElement가 있으면 (레거시 지원)
    else if (previewElement) {
      previewContent = this._renderElement(previewElement);
    }
    // item 자체가 tag를 가지고 있으면 element로 사용
    else if (tag) {
      previewContent = this._renderElement(item);
    }

    const escapedLabel = this._escapeHtml(label || "");

    return `
      <div class="component-item">
        <div class="component-preview" data-component-source>
          ${previewContent}
        </div>
        <span class="component-label">${escapedLabel}</span>
      </div>
    `;
  }

  /**
   * variant 그룹 렌더링
   * @param {Object} variant - variant 데이터
   * @returns {string} - 렌더링된 HTML 문자열
   */
  _renderVariant(variant) {
    const { title, subtitle, description, gridStyle, items } = variant;
    const escapedTitle = this._escapeHtml(title || subtitle || "");
    const escapedDescription = description
      ? `<p class="component-description">${this._escapeHtml(description)}</p>`
      : "";
    const gridStyleAttr = gridStyle ? `style="${gridStyle}"` : "";

    if (!items || !Array.isArray(items)) {
      console.warn("Variant without items:", variant);
      return "";
    }

    const itemsHtml = items.map((item) => this._renderItem(item)).join("");

    return `
      <div class="variant-group">
        <h4 class="component-subtitle">${escapedTitle}</h4>
        ${escapedDescription}
        <div class="component-grid" ${gridStyleAttr}>
          ${itemsHtml}
        </div>
      </div>
    `;
  }

  /**
   * 전체 컴포넌트 섹션 렌더링
   * @param {Object} data - 컴포넌트 데이터
   * @returns {string} - 렌더링된 HTML 문자열
   */
  render(data) {
    if (!data) {
      console.error("Invalid component data:", data);
      return '<div class="error">컴포넌트 데이터를 불러올 수 없습니다.</div>';
    }

    const { title, description, variants } = data;

    if (!variants || !Array.isArray(variants)) {
      console.error("Component data without variants:", data);
      return '<div class="error">컴포넌트 변형 데이터가 없습니다.</div>';
    }

    const escapedTitle = this._escapeHtml(title || "");
    const escapedDescription = description
      ? `<p class="component-description">${this._escapeHtml(description)}</p>`
      : "";

    const variantsHtml = variants
      .map((variant) => this._renderVariant(variant))
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
    const type = data.type || "generic";
    const id = data.id || "default";
    return `${type}-${id}`;
  }
}

// Export for use in component engine
if (typeof module !== "undefined" && module.exports) {
  module.exports = GenericComponentRenderer;
}

/**
 * ColorRenderer
 * Color Palette 컴포넌트 전용 렌더러
 *
 * 특징:
 * - 색상 칩과 정보 표시
 * - 클릭 시 CSS 변수명 복사
 * - 시각적 피드백 제공
 */
class ColorRenderer {
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
   * 단일 컬러 아이템 렌더링
   * @param {Object} item - 컬러 아이템 데이터
   * @returns {string} - 렌더링된 HTML 문자열
   */
  _renderColorItem(item) {
    const { preview, label, variable, hex, hsl, reference } = item;

    // 값 표시 (hex, hsl, reference)
    let valueDisplay = "";
    if (hex) {
      valueDisplay = `<div class="color-palette-hex">${this._escapeHtml(
        hex
      )}</div>`;
    }
    if (hsl) {
      valueDisplay += `<div class="color-palette-hsl" style="font: var(--body-xs); font-family: 'Consolas', 'Monaco', 'Courier New', monospace; color: var(--text-tertiary); margin-top: 2px;">${this._escapeHtml(
        hsl
      )}</div>`;
    }
    if (reference) {
      valueDisplay = `<div class="color-palette-reference">${this._escapeHtml(
        reference
      )}</div>`;
    }

    return `
      <div class="color-palette-item" data-variable="${this._escapeHtml(
        variable
      )}" data-color-label="${this._escapeHtml(label)}">
        ${preview}
        <div class="color-palette-info">
          <div class="color-palette-label">${this._escapeHtml(label)}</div>
          <div class="color-palette-variable">${this._escapeHtml(
            variable
          )}</div>
          ${valueDisplay}
        </div>
      </div>
    `;
  }

  /**
   * variant 그룹 렌더링
   * @param {Object} variant - variant 데이터
   * @returns {string} - 렌더링된 HTML 문자열
   */
  _renderVariant(variant) {
    const { title, description, items, isGuide } = variant;

    if (!items || !Array.isArray(items)) {
      console.warn("Color variant without items:", variant);
      return "";
    }

    const escapedTitle = this._escapeHtml(title || "");
    const descriptionHtml = description
      ? `<div class="variant-group-description">${this._escapeHtml(
          description
        )}</div>`
      : "";

    // Guide 섹션은 특별 처리 (HTML을 직접 사용)
    if (isGuide && items.length > 0) {
      return `
        <div class="variant-group">
          <h4 class="component-subtitle">${escapedTitle}</h4>
          ${descriptionHtml}
          ${items[0].preview}
        </div>
      `;
    }

    const itemsHtml = items.map((item) => this._renderColorItem(item)).join("");

    return `
      <div class="variant-group">
        <h4 class="component-subtitle">${escapedTitle}</h4>
        ${descriptionHtml}
        <div class="color-palette-grid">
          ${itemsHtml}
        </div>
      </div>
    `;
  }

  /**
   * 전체 컴포넌트 렌더링
   * @param {Object} data - 컴포넌트 데이터
   * @returns {string} - 렌더링된 HTML 문자열
   */
  render(data) {
    if (!data) {
      console.error("Invalid color data:", data);
      return '<div class="error">컬러 데이터를 불러올 수 없습니다.</div>';
    }

    const { title, variants } = data;

    if (!variants || !Array.isArray(variants)) {
      console.error("Color data without variants:", data);
      return '<div class="error">컬러 변형 데이터가 없습니다.</div>';
    }

    const escapedTitle = this._escapeHtml(title || "Color Palette");

    const variantsHtml = variants
      .map((variant) => this._renderVariant(variant))
      .join("");

    return `
      <section class="component-section">
        <h3 class="component-title">${escapedTitle}</h3>
        ${variantsHtml}
      </section>
    `;
  }

  /**
   * 컴포넌트 렌더링 후 이벤트 리스너 등록
   * @param {HTMLElement} container - 컨테이너 요소
   */
  afterRender(container) {
    // 색상 팔레트 아이템 클릭 시 CSS 변수명 복사
    const colorItems = container.querySelectorAll(".color-palette-item");

    colorItems.forEach((item) => {
      item.addEventListener("click", async () => {
        const variable = item.dataset.variable;
        const label = item.dataset.colorLabel;

        if (!variable) return;

        try {
          // 클립보드에 CSS 변수명 복사
          await navigator.clipboard.writeText(variable);

          // 시각적 피드백
          item.classList.add("copied");

          // 1.5초 후 피드백 제거
          setTimeout(() => {
            item.classList.remove("copied");
          }, 1500);

          console.log(`[ColorRenderer] Copied to clipboard: ${variable}`);
        } catch (error) {
          console.error("[ColorRenderer] Failed to copy:", error);

          // Fallback: 텍스트 선택 방식
          const tempInput = document.createElement("input");
          tempInput.value = variable;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);

          item.classList.add("copied");
          setTimeout(() => {
            item.classList.remove("copied");
          }, 1500);
        }
      });
    });

    console.log(
      `[ColorRenderer] ${colorItems.length} color items initialized with click handlers`
    );
  }

  /**
   * 캐시 키 생성
   * @param {Object} data - 컴포넌트 데이터
   * @returns {string} - 캐시 키
   */
  getCacheKey(data) {
    return `color-${data.id || "palette"}`;
  }
}

// Export for use in component engine
if (typeof module !== "undefined" && module.exports) {
  module.exports = ColorRenderer;
}

/**
 * SpacingRenderer
 * Spacing System 컴포넌트 전용 렌더러
 *
 * 특징:
 * - 시각적 spacing 표시
 * - 클릭 시 CSS 변수명 복사
 * - 실제 크기 미리보기
 */
class SpacingRenderer {
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
   * 그리드 데모 렌더링 (gap 타입)
   * @param {Object} item - spacing 아이템 데이터
   * @returns {string} - 렌더링된 HTML 문자열
   */
  _renderGridGapDemo(item) {
    const { value, variable, label, description } = item;

    return `
      <div class="spacing-grid-demo" data-variable="${this._escapeHtml(
        variable
      )}">
        <div class="spacing-grid-demo__header">
          <div class="spacing-grid-demo__label">${this._escapeHtml(label)}</div>
          <div class="spacing-grid-demo__variable">${this._escapeHtml(
            variable
          )}</div>
        </div>
        <div class="spacing-grid-demo__visual">
          <div class="spacing-grid-gap" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: ${this._escapeHtml(
            value
          )};">
            <div class="spacing-demo-box"></div>
            <div class="spacing-demo-box"></div>
            <div class="spacing-demo-box"></div>
            <div class="spacing-demo-box"></div>
          </div>
          <div class="spacing-grid-demo__value">${this._escapeHtml(
            value
          )} gap</div>
        </div>
        ${
          description
            ? `<div class="spacing-grid-demo__description">${this._escapeHtml(
                description
              )}</div>`
            : ""
        }
      </div>
    `;
  }

  /**
   * 그리드 데모 렌더링 (padding 타입)
   * @param {Object} item - spacing 아이템 데이터
   * @returns {string} - 렌더링된 HTML 문자열
   */
  _renderGridPaddingDemo(item) {
    const { value, variable, label, description } = item;

    return `
      <div class="spacing-grid-demo" data-variable="${this._escapeHtml(
        variable
      )}">
        <div class="spacing-grid-demo__header">
          <div class="spacing-grid-demo__label">${this._escapeHtml(label)}</div>
          <div class="spacing-grid-demo__variable">${this._escapeHtml(
            variable
          )}</div>
        </div>
        <div class="spacing-grid-demo__visual">
          <div class="spacing-padding-demo" style="padding: ${this._escapeHtml(
            value
          )}; border: 2px dashed var(--primary-300); border-radius: 8px; background: var(--primary-50);">
            <div class="spacing-demo-box" style="background: var(--primary-500);"></div>
          </div>
          <div class="spacing-grid-demo__value">${this._escapeHtml(
            value
          )} padding</div>
        </div>
        ${
          description
            ? `<div class="spacing-grid-demo__description">${this._escapeHtml(
                description
              )}</div>`
            : ""
        }
      </div>
    `;
  }

  /**
   * 텍스트 전용 아이템 렌더링
   * @param {Object} item - spacing 아이템 데이터
   * @returns {string} - 렌더링된 HTML 문자열
   */
  _renderTextOnlyItem(item) {
    const { variable, value, description } = item;

    return `
      <div class="spacing-text-item" data-variable="${this._escapeHtml(
        variable
      )}">
        <div class="spacing-text-item__variable">${this._escapeHtml(
          variable
        )}</div>
        <div class="spacing-text-item__value">${this._escapeHtml(value)}</div>
        ${
          description
            ? `<div class="spacing-text-item__description">${this._escapeHtml(
                description
              )}</div>`
            : ""
        }
      </div>
    `;
  }

  /**
   * variant 그룹 렌더링
   * @param {Object} variant - variant 데이터
   * @returns {string} - 렌더링된 HTML 문자열
   */
  _renderVariant(variant) {
    const {
      title,
      description,
      items,
      isGuide,
      isGridDemo,
      gridType,
      isTextOnly,
    } = variant;

    if (!items || !Array.isArray(items)) {
      console.warn("Spacing variant without items:", variant);
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

    // 그리드 데모
    if (isGridDemo) {
      let itemsHtml = "";
      if (gridType === "gap") {
        itemsHtml = items.map((item) => this._renderGridGapDemo(item)).join("");
      } else if (gridType === "padding") {
        itemsHtml = items
          .map((item) => this._renderGridPaddingDemo(item))
          .join("");
      }

      return `
        <div class="variant-group">
          <h4 class="component-subtitle">${escapedTitle}</h4>
          ${descriptionHtml}
          <div class="spacing-grid-list">
            ${itemsHtml}
          </div>
        </div>
      `;
    }

    // 텍스트 전용
    if (isTextOnly) {
      const itemsHtml = items
        .map((item) => this._renderTextOnlyItem(item))
        .join("");

      return `
        <div class="variant-group">
          <h4 class="component-subtitle">${escapedTitle}</h4>
          ${descriptionHtml}
          <div class="spacing-text-list">
            ${itemsHtml}
          </div>
        </div>
      `;
    }

    return "";
  }

  /**
   * 전체 컴포넌트 렌더링
   * @param {Object} data - 컴포넌트 데이터
   * @returns {string} - 렌더링된 HTML 문자열
   */
  render(data) {
    if (!data) {
      console.error("Invalid spacing data:", data);
      return '<div class="error">Spacing 데이터를 불러올 수 없습니다.</div>';
    }

    const { title, variants } = data;

    if (!variants || !Array.isArray(variants)) {
      console.error("Spacing data without variants:", data);
      return '<div class="error">Spacing 변형 데이터가 없습니다.</div>';
    }

    const escapedTitle = this._escapeHtml(title || "Spacing System");

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
    // 모든 클릭 가능한 아이템에 이벤트 리스너 추가
    const clickableItems = container.querySelectorAll(
      ".spacing-grid-demo, .spacing-text-item"
    );

    clickableItems.forEach((item) => {
      item.addEventListener("click", async () => {
        const variable = item.dataset.variable;

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

          console.log(`[SpacingRenderer] Copied to clipboard: ${variable}`);
        } catch (error) {
          console.error("[SpacingRenderer] Failed to copy:", error);

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
      `[SpacingRenderer] ${clickableItems.length} spacing items initialized with click handlers`
    );
  }

  /**
   * 캐시 키 생성
   * @param {Object} data - 컴포넌트 데이터
   * @returns {string} - 캐시 키
   */
  getCacheKey(data) {
    return `spacing-${data.id || "system"}`;
  }
}

// Export for use in component engine
if (typeof module !== "undefined" && module.exports) {
  module.exports = SpacingRenderer;
}

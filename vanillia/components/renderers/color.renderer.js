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
    const { title, description, items, isGuide, isThemeSwitcher } = variant;

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

    // Theme Switcher 섹션도 특별 처리
    if (isThemeSwitcher && items.length > 0) {
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
      <h3 class="component-title">${escapedTitle}</h3>
      ${variantsHtml}
    `;
  }

  /**
   * HSL을 HEX로 변환
   * @param {number} h - Hue (0-360)
   * @param {number} s - Saturation (0-100)
   * @param {number} l - Lightness (0-100)
   * @returns {string} - HEX 색상 코드
   */
  _hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  /**
   * 색상 값(hex/hsl) 업데이트
   * @param {HTMLElement} container - 컨테이너 요소
   */
  _updateColorValues(container) {
    const colorItems = container.querySelectorAll(".color-palette-item");

    colorItems.forEach((item) => {
      const colorSwatch = item.querySelector(".color-swatch");
      if (!colorSwatch) return;

      // 실제 계산된 색상 가져오기
      const computedColor =
        window.getComputedStyle(colorSwatch).backgroundColor;

      // rgb(r, g, b) 파싱
      const rgbMatch = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (!rgbMatch) return;

      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);

      // RGB를 HSL로 변환
      const rNorm = r / 255;
      const gNorm = g / 255;
      const bNorm = b / 255;

      const max = Math.max(rNorm, gNorm, bNorm);
      const min = Math.min(rNorm, gNorm, bNorm);
      const delta = max - min;

      let h = 0;
      let s = 0;
      let l = (max + min) / 2;

      if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

        if (max === rNorm) {
          h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) / 6;
        } else if (max === gNorm) {
          h = ((bNorm - rNorm) / delta + 2) / 6;
        } else {
          h = ((rNorm - gNorm) / delta + 4) / 6;
        }
      }

      h = Math.round(h * 360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);

      // HEX 변환
      const hex =
        "#" +
        [r, g, b]
          .map((x) => {
            const hexVal = x.toString(16);
            return hexVal.length === 1 ? "0" + hexVal : hexVal;
          })
          .join("");

      // hex 값 업데이트
      const hexElement = item.querySelector(".color-palette-hex");
      if (hexElement) {
        hexElement.textContent = hex;
      }

      // hsl 값 업데이트
      const hslElement = item.querySelector(".color-palette-hsl");
      if (hslElement) {
        hslElement.textContent = `h:${h}, s:${s}%, l:${l}%`;
      }
    });

    console.log("[ColorRenderer] Color values updated");
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

    // 테마 스위처 버튼 클릭 이벤트
    const themeButtons = container.querySelectorAll(".theme-button");

    themeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const themeName = button.dataset.theme;
        const primaryH = button.dataset.primaryH;
        const primaryS = button.dataset.primaryS;
        const secondaryH = button.dataset.secondaryH;
        const secondaryS = button.dataset.secondaryS;

        if (!primaryH || !primaryS) {
          console.warn("[ColorRenderer] Theme button missing data attributes");
          return;
        }

        // CSS 변수 업데이트 (Primary & Secondary)
        document.documentElement.style.setProperty("--primary-h", primaryH);
        document.documentElement.style.setProperty(
          "--primary-s",
          `${primaryS}%`
        );

        if (secondaryH && secondaryS) {
          document.documentElement.style.setProperty(
            "--secondary-h",
            secondaryH
          );
          document.documentElement.style.setProperty(
            "--secondary-s",
            `${secondaryS}%`
          );
        }

        // hex/hsl 값 업데이트
        this._updateColorValues(container);

        // 모든 버튼의 active 클래스 제거 후 현재 버튼에만 추가
        themeButtons.forEach((btn) => {
          btn.style.transform = "scale(1)";
          btn.style.boxShadow = btn.style.boxShadow.replace(
            /0 \d+px \d+px/,
            "0 2px 8px"
          );
        });

        // 클릭된 버튼 강조
        button.style.transform = "scale(1.05)";
        button.style.boxShadow = button.style.boxShadow.replace(
          /0 \d+px \d+px/,
          "0 4px 16px"
        );

        console.log(
          `[ColorRenderer] Theme changed to "${themeName}" (Primary H:${primaryH}, S:${primaryS}% / Secondary H:${secondaryH}, S:${secondaryS}%)`
        );
      });

      // 호버 효과
      button.addEventListener("mouseenter", () => {
        button.style.transform = "scale(1.05)";
      });

      button.addEventListener("mouseleave", () => {
        // active 상태가 아니면 원래대로
        const isActive =
          button.style.boxShadow &&
          button.style.boxShadow.includes("0 4px 16px");
        if (!isActive) {
          button.style.transform = "scale(1)";
        }
      });
    });

    if (themeButtons.length > 0) {
      console.log(
        `[ColorRenderer] ${themeButtons.length} theme buttons initialized`
      );
    }
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

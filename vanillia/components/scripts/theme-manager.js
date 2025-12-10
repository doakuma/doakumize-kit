/**
 * Theme Manager
 * 라이트/다크 모드 전환 및 관리
 *
 * 📋 기능:
 * - 테마 전환 (light ↔ dark)
 * - localStorage에 사용자 선택 저장
 * - 시스템 테마 자동 감지 (prefers-color-scheme)
 * - 테마 변경 이벤트 발생
 *
 * 🎨 사용법:
 * ```javascript
 * // 테마 전환
 * ThemeManager.toggle();
 *
 * // 특정 테마 설정
 * ThemeManager.setTheme('dark');
 *
 * // 현재 테마 확인
 * const theme = ThemeManager.getCurrentTheme();
 *
 * // 테마 변경 감지
 * document.addEventListener('themechange', (e) => {
 *   console.log('테마 변경됨:', e.detail.theme);
 * });
 * ```
 *
 * 📅 Created: 2025-11-12
 */

(function (window) {
  "use strict";

  const STORAGE_KEY = "doakumize-theme";
  const THEME_ATTRIBUTE = "data-theme";
  const THEME_LIGHT = "light";
  const THEME_DARK = "dark";

  /**
   * ThemeManager 클래스
   * 싱글톤 패턴으로 구현
   */
  class ThemeManager {
    constructor() {
      if (ThemeManager.instance) {
        return ThemeManager.instance;
      }

      this.currentTheme = null;
      this.systemPreference = null;
      this.mediaQuery = null;

      ThemeManager.instance = this;
    }

    /**
     * 초기화
     * 페이지 로드 시 자동 호출됨
     */
    init() {
      console.log("[ThemeManager] 초기화 시작");

      // 시스템 테마 감지 설정
      this._setupSystemThemeDetection();

      // 저장된 테마 또는 시스템 테마 적용
      const savedTheme = this._getSavedTheme();
      const initialTheme = savedTheme || this._getSystemTheme();

      this.setTheme(initialTheme, false); // 초기화 시에는 저장하지 않음

      console.log(`[ThemeManager] 초기 테마: ${initialTheme}`);
    }

    /**
     * 시스템 테마 감지 설정
     * prefers-color-scheme 미디어 쿼리 사용
     * @private
     */
    _setupSystemThemeDetection() {
      // 미디어 쿼리 생성
      this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      // 시스템 테마 변경 감지
      this.mediaQuery.addEventListener("change", (e) => {
        console.log(
          `[ThemeManager] 시스템 테마 변경: ${e.matches ? "dark" : "light"}`
        );

        // 사용자가 명시적으로 선택하지 않은 경우만 자동 변경
        const savedTheme = this._getSavedTheme();
        if (!savedTheme) {
          this.setTheme(e.matches ? THEME_DARK : THEME_LIGHT, false);
        }
      });
    }

    /**
     * 시스템 테마 확인
     * @private
     * @returns {string} 'light' 또는 'dark'
     */
    _getSystemTheme() {
      if (!this.mediaQuery) {
        this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      }
      return this.mediaQuery.matches ? THEME_DARK : THEME_LIGHT;
    }

    /**
     * 저장된 테마 가져오기
     * @private
     * @returns {string|null} 저장된 테마 또는 null
     */
    _getSavedTheme() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === THEME_LIGHT || saved === THEME_DARK) {
          return saved;
        }
      } catch (e) {
        console.warn("[ThemeManager] localStorage 접근 실패:", e);
      }
      return null;
    }

    /**
     * 테마 저장
     * @private
     * @param {string} theme - 저장할 테마
     */
    _saveTheme(theme) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
        console.log(`[ThemeManager] 테마 저장됨: ${theme}`);
      } catch (e) {
        console.warn("[ThemeManager] localStorage 저장 실패:", e);
      }
    }

    /**
     * 테마 설정
     * @param {string} theme - 'light' 또는 'dark'
     * @param {boolean} [save=true] - localStorage에 저장할지 여부
     */
    setTheme(theme, save = true) {
      // 유효성 검사
      if (theme !== THEME_LIGHT && theme !== THEME_DARK) {
        console.error(`[ThemeManager] 유효하지 않은 테마: ${theme}`);
        return;
      }

      // 같은 테마면 무시
      if (this.currentTheme === theme) {
        return;
      }

      const previousTheme = this.currentTheme;
      this.currentTheme = theme;

      // DOM에 테마 적용
      if (theme === THEME_DARK) {
        document.documentElement.setAttribute(THEME_ATTRIBUTE, THEME_DARK);
      } else {
        document.documentElement.removeAttribute(THEME_ATTRIBUTE);
      }

      // 저장
      if (save) {
        this._saveTheme(theme);
      }

      // 커스텀 이벤트 발생
      this._dispatchThemeChangeEvent(theme, previousTheme);

      console.log(`[ThemeManager] 테마 적용됨: ${theme}`);
    }

    /**
     * 테마 전환 (토글)
     * light ↔ dark
     */
    toggle() {
      const newTheme =
        this.currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
      this.setTheme(newTheme);
    }

    /**
     * 현재 테마 확인
     * @returns {string} 'light' 또는 'dark'
     */
    getCurrentTheme() {
      return this.currentTheme || THEME_LIGHT;
    }

    /**
     * 다크모드 여부 확인
     * @returns {boolean}
     */
    isDarkMode() {
      return this.currentTheme === THEME_DARK;
    }

    /**
     * 테마 변경 이벤트 발생
     * @private
     * @param {string} newTheme - 새 테마
     * @param {string|null} previousTheme - 이전 테마
     */
    _dispatchThemeChangeEvent(newTheme, previousTheme) {
      const event = new CustomEvent("themechange", {
        detail: {
          theme: newTheme,
          previousTheme: previousTheme,
          isDark: newTheme === THEME_DARK,
        },
        bubbles: true,
      });

      document.dispatchEvent(event);
    }

    /**
     * 저장된 테마 초기화 (시스템 기본값으로 복귀)
     */
    reset() {
      try {
        localStorage.removeItem(STORAGE_KEY);
        console.log("[ThemeManager] 저장된 테마 초기화");
      } catch (e) {
        console.warn("[ThemeManager] localStorage 초기화 실패:", e);
      }

      // 시스템 테마로 변경
      const systemTheme = this._getSystemTheme();
      this.setTheme(systemTheme, false);
    }
  }

  // 싱글톤 인스턴스 생성
  const themeManager = new ThemeManager();

  // 전역 객체로 노출
  window.ThemeManager = themeManager;

  // DOM 준비되면 자동 초기화
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      themeManager.init();
    });
  } else {
    // 이미 로드된 경우 즉시 초기화
    themeManager.init();
  }

  console.log("[ThemeManager] 로드 완료");
})(window);

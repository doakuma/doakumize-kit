/**
 * Layout System
 * 헤더와 푸터를 JSON 데이터 기반으로 렌더링
 * React 컴포넌트처럼 props를 받아서 사용
 *
 * @author Doakuma
 * @date 2025-11-11
 */

(function () {
  "use strict";

  // ==================== 기본 데이터 (defaults) ====================

  const DEFAULT_HEADER = {
    title: "Component Studio",
    link: "./index.html",
  };

  const DEFAULT_FOOTER = {
    logo: "Component Studio",
    description: "반복 작업은 줄이고, 커스터마이징은 자유롭게",
    version: "v1.0.0",
    sections: [
      {
        title: "Links",
        links: [
          { text: "Components", href: "components.html" },
          { text: "Documentation", href: "README.md" },
          {
            text: "Roadmap",
            href: "https://github.com/doakuma/doakumize-kit/projects",
            external: true,
          },
          { text: "License", href: "LICENSE" },
        ],
      },
      {
        title: "Community",
        links: [
          {
            text: "GitHub",
            href: "https://github.com/doakuma/doakumize-kit",
            external: true,
          },
          {
            text: "Discussions",
            href: "https://github.com/doakuma/doakumize-kit/discussions",
            external: true,
          },
          {
            text: "Issues",
            href: "https://github.com/doakuma/doakumize-kit/issues",
            external: true,
          },
        ],
      },
    ],
    copyright: "© 2025 Component Studio. MIT License.",
    credit: "Built with ❤️ by Doakuma",
  };

  // ==================== 렌더 함수 ====================

  /**
   * 헤더 렌더링
   * @param {Object} props - { title, link }
   * @param {string} targetSelector - 마운트할 selector (기본: '#header')
   */
  function renderHeader(props = {}, targetSelector = "#header") {
    const data = { ...DEFAULT_HEADER, ...props };
    const target = document.querySelector(targetSelector);

    if (!target) {
      console.warn("[Layouts] Header target not found:", targetSelector);
      return;
    }

    target.innerHTML = `
      <h1 class="text-h1">
        <a href="${data.link}">${data.title}</a>
      </h1>
      <div class="header-actions">
        <button 
          id="themeToggleBtn" 
          class="btn btn--ghost btn--icon-only" 
          aria-label="테마 전환"
          title="테마 전환">
          <i class="icon icon--medium icon--sun" id="themeToggleIcon"></i>
        </button>
      </div>
    `;

    // 테마 토글 버튼 이벤트 리스너 추가
    _initThemeToggle();

    console.log("[Layouts] Header rendered:", data.title);
  }

  /**
   * 테마 토글 버튼 초기화
   * @private
   */
  function _initThemeToggle() {
    const toggleBtn = document.getElementById("themeToggleBtn");
    const toggleIcon = document.getElementById("themeToggleIcon");

    if (!toggleBtn || !toggleIcon) {
      return;
    }

    // ThemeManager가 로드될 때까지 대기
    const checkThemeManager = setInterval(() => {
      if (window.ThemeManager) {
        clearInterval(checkThemeManager);

        // 초기 아이콘 설정
        _updateThemeIcon(toggleIcon, window.ThemeManager.getCurrentTheme());

        // 클릭 이벤트
        toggleBtn.addEventListener("click", () => {
          window.ThemeManager.toggle();
        });

        // 테마 변경 감지
        document.addEventListener("themechange", (e) => {
          _updateThemeIcon(toggleIcon, e.detail.theme);
        });

        console.log("[Layouts] Theme toggle initialized");
      }
    }, 50);

    // 5초 후에도 ThemeManager가 없으면 포기
    setTimeout(() => {
      clearInterval(checkThemeManager);
    }, 5000);
  }

  /**
   * 테마에 따라 아이콘 업데이트
   * @private
   * @param {HTMLElement} icon - 아이콘 엘리먼트
   * @param {string} theme - 'light' 또는 'dark'
   */
  function _updateThemeIcon(icon, theme) {
    if (!icon) return;

    // 다크모드일 때는 달 아이콘, 라이트모드일 때는 해 아이콘
    if (theme === "dark") {
      icon.classList.remove("icon--sun");
      icon.classList.add("icon--moon");
    } else {
      icon.classList.remove("icon--moon");
      icon.classList.add("icon--sun");
    }
  }

  /**
   * 푸터 렌더링
   * @param {Object} props - footer 데이터 (옵션)
   * @param {string} targetSelector - 마운트할 selector (기본: '#footer')
   */
  function renderFooter(props = {}, targetSelector = "#footer") {
    const data = { ...DEFAULT_FOOTER, ...props };
    const target = document.querySelector(targetSelector);

    if (!target) {
      console.warn("[Layouts] Footer target not found:", targetSelector);
      return;
    }

    // 섹션 렌더링
    const sectionsHTML = data.sections
      .map((section) => {
        const linksHTML = section.links
          .map((link) => {
            const attrs = link.external ? 'target="_blank" rel="noopener"' : "";
            const externalIcon = link.external
              ? '<i class="icon icon--small icon--external"></i>'
              : "";
            return `<li><a href="${link.href}" ${attrs}>${link.text}${externalIcon}</a></li>`;
          })
          .join("");

        return `
        <div class="footer-section">
          <h4 class="footer-title">${section.title}</h4>
          <ul class="footer-links">${linksHTML}</ul>
        </div>
      `;
      })
      .join("");

    target.innerHTML = `
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-logo">${data.logo}</h3>
            <p class="footer-description">${data.description}</p>
            <p class="footer-version">${data.version}</p>
          </div>
          ${sectionsHTML}
        </div>
        <div class="footer-bottom">
          <p class="footer-copyright">${data.copyright}</p>
          <p class="footer-credit">${data.credit}</p>
        </div>
      </div>
    `;

    console.log("[Layouts] Footer rendered:", data.logo);
  }

  /**
   * 헤더+푸터 한번에 렌더링
   * @param {Object} options - { header: {...}, footer: {...} }
   */
  function renderLayouts(options = {}) {
    const { header, footer } = options;

    renderHeader(header);
    renderFooter(footer);

    console.log("[Layouts] All layouts rendered successfully");
  }

  // ==================== Export ====================

  window.Layouts = {
    renderHeader,
    renderFooter,
    renderLayouts,
    // 기본 데이터도 노출 (필요시 참조용)
    defaults: {
      header: DEFAULT_HEADER,
      footer: DEFAULT_FOOTER,
    },
  };
})();

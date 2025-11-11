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
    `;

    console.log("[Layouts] Header rendered:", data.title);
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
            return `<li><a href="${link.href}" ${attrs}>${link.text}</a></li>`;
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

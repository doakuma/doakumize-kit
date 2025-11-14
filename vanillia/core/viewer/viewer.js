/**
 * Component Viewer
 * 경량 컴포넌트 가이드 뷰어
 */

(function () {
  "use strict";

  /**
   * Component Viewer 클래스
   */
  class ComponentViewer {
    constructor() {
      this.examples = window.ComponentExamples || {};
      this.currentComponent = null;
      this.searchTerm = "";
    }

    /**
     * 초기화
     */
    init() {
      this.renderSidebar();
      this.attachEventListeners();
      this.showFirstComponent();
      console.log(
        "[Viewer] Initialized with",
        Object.keys(this.examples).length,
        "components"
      );
    }

    /**
     * 사이드바 렌더링
     */
    renderSidebar() {
      const nav = document.querySelector(".viewer-nav");
      if (!nav) return;

      // 카테고리별로 그룹핑 (간단하게 알파벳순)
      const componentIds = Object.keys(this.examples).sort();

      if (componentIds.length === 0) {
        nav.innerHTML = `
          <div class="viewer-empty">
            <p>No components found</p>
          </div>
        `;
        return;
      }

      let html = '<div class="viewer-category">';
      html += '<div class="viewer-category-title">Components</div>';

      componentIds.forEach((id) => {
        const component = this.examples[id];
        html += `
          <a href="#${id}" class="viewer-nav-item" data-component="${id}">
            ${component.title || this._capitalize(id)}
          </a>
        `;
      });

      html += "</div>";
      nav.innerHTML = html;
    }

    /**
     * 이벤트 리스너 연결
     */
    attachEventListeners() {
      // 네비게이션 클릭
      document.querySelectorAll(".viewer-nav-item").forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          const componentId = item.dataset.component;
          this.showComponent(componentId);
        });
      });

      // 검색
      const searchInput = document.querySelector(".viewer-search input");
      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          this.search(e.target.value);
        });
      }

      // 코드 토글
      document.addEventListener("click", (e) => {
        if (e.target.matches(".viewer-btn-code, .viewer-btn-code *")) {
          const btn = e.target.closest(".viewer-btn-code");
          const example = btn.closest(".viewer-example");
          const codeBlock = example.querySelector(".viewer-code");
          const isVisible = codeBlock.classList.toggle("is-visible");
          btn.textContent = isVisible ? "Hide Code" : "View Code";
        }
      });

      // 코드 복사
      document.addEventListener("click", (e) => {
        if (e.target.matches(".viewer-btn-copy, .viewer-btn-copy *")) {
          const btn = e.target.closest(".viewer-btn-copy");
          this.copyCode(btn);
        }
      });

      // 해시 변경 감지
      window.addEventListener("hashchange", () => {
        const hash = window.location.hash.slice(1);
        if (hash && this.examples[hash]) {
          this.showComponent(hash);
        }
      });
    }

    /**
     * 컴포넌트 표시
     */
    showComponent(componentId) {
      if (!this.examples[componentId]) {
        console.warn("[Viewer] Component not found:", componentId);
        return;
      }

      this.currentComponent = componentId;
      const component = this.examples[componentId];

      // 네비게이션 활성화
      document.querySelectorAll(".viewer-nav-item").forEach((item) => {
        item.classList.remove("is-active");
        if (item.dataset.component === componentId) {
          item.classList.add("is-active");
        }
      });

      // 헤더 업데이트
      const header = document.querySelector(".viewer-header");
      if (header) {
        header.innerHTML = `
          <h2>${component.title || this._capitalize(componentId)}</h2>
          ${component.description ? `<p>${component.description}</p>` : ""}
        `;
      }

      // 컨텐츠 렌더링
      const content = document.querySelector(".viewer-content");
      const section =
        content.querySelector(".viewer-section") ||
        document.createElement("div");
      section.className = "viewer-section";

      let html = "";

      if (!component.items || component.items.length === 0) {
        html = `
          <div class="viewer-empty">
            <div class="viewer-empty-title">No examples</div>
            <div class="viewer-empty-text">This component has no examples yet.</div>
          </div>
        `;
      } else {
        component.items.forEach((item, index) => {
          html += this.renderExample(item, index);
        });
      }

      section.innerHTML = html;

      // 기존 섹션이 없으면 추가
      if (!content.querySelector(".viewer-section")) {
        content.appendChild(section);
      }

      // 컴포넌트 초기화 (스크립트가 있는 경우)
      this.initializeComponents();

      // 해시 업데이트
      window.location.hash = componentId;
    }

    /**
     * 예시 렌더링
     */
    renderExample(item, index) {
      const highlightedCode = this._highlightCode(item.code);
      // data 속성용으로 base64 인코딩 (특수문자 문제 방지)
      const encodedCode = btoa(unescape(encodeURIComponent(item.code)));

      return `
        <div class="viewer-example" data-example="${index}">
          <div class="viewer-example-header">
            <div class="viewer-example-label">${
              item.label || `Example ${index + 1}`
            }</div>
            <div class="viewer-example-actions">
              <button class="viewer-btn viewer-btn-code">View Code</button>
              <button class="viewer-btn viewer-btn-copy" data-code="${encodedCode}">Copy</button>
            </div>
          </div>
          <div class="viewer-preview">
            ${item.code}
          </div>
          <div class="viewer-code">
            <pre><code>${highlightedCode}</code></pre>
          </div>
        </div>
      `;
    }

    /**
     * 검색
     */
    search(term) {
      this.searchTerm = term.toLowerCase();

      document.querySelectorAll(".viewer-nav-item").forEach((item) => {
        const text = item.textContent.toLowerCase();
        const matches = text.includes(this.searchTerm);
        item.style.display = matches ? "block" : "none";
      });
    }

    /**
     * 첫 번째 컴포넌트 표시
     */
    showFirstComponent() {
      const hash = window.location.hash.slice(1);
      if (hash && this.examples[hash]) {
        this.showComponent(hash);
      } else {
        const firstId = Object.keys(this.examples)[0];
        if (firstId) {
          this.showComponent(firstId);
        } else {
          this.showEmptyState();
        }
      }
    }

    /**
     * 빈 상태 표시
     */
    showEmptyState() {
      const content = document.querySelector(".viewer-content");
      content.innerHTML = `
        <div class="viewer-empty">
          <div class="viewer-empty-icon">📦</div>
          <div class="viewer-empty-title">No Components</div>
          <div class="viewer-empty-text">
            examples.js 파일에 컴포넌트를 추가하세요.<br>
            Generator를 사용하면 쉽게 생성할 수 있습니다.
          </div>
        </div>
      `;
    }

    /**
     * 코드 복사
     */
    async copyCode(btn) {
      const encodedCode = btn.dataset.code;
      // base64 디코딩
      const code = decodeURIComponent(escape(atob(encodedCode)));

      try {
        await navigator.clipboard.writeText(code);
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        btn.classList.add("is-copied");

        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove("is-copied");
        }, 2000);
      } catch (err) {
        console.error("[Viewer] Failed to copy:", err);
        alert("Failed to copy code");
      }
    }

    /**
     * 컴포넌트 초기화 (인터랙티브 컴포넌트용)
     */
    initializeComponents() {
      // VanillaComponents가 있으면 초기화
      if (window.VanillaComponents && window.VanillaComponents.initAll) {
        setTimeout(() => {
          window.VanillaComponents.initAll();
        }, 100);
      }
    }

    /**
     * 간단한 코드 하이라이팅
     */
    _highlightCode(code) {
      // HTML을 이스케이프하면서 하이라이팅
      let result = code
        // 먼저 < > & " 를 이스케이프
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

      // 1. 여는 태그 하이라이팅 (<tagname)
      result = result.replace(
        /(&lt;)([\w-]+)/g,
        '<span class="token-tag">$1$2</span>'
      );

      // 2. 닫는 태그 하이라이팅 (</tagname)
      result = result.replace(
        /(&lt;\/)([\w-]+)/g,
        '<span class="token-tag">$1$2</span>'
      );

      // 3. 속성명 하이라이팅 (속성=)
      result = result.replace(
        /\s([\w-]+)(?=&quot;)/g,
        ' <span class="token-attr">$1</span>'
      );

      // 4. 속성값 하이라이팅 (="값")
      result = result.replace(
        /=(&quot;[^&]*?&quot;)/g,
        '=<span class="token-value">$1</span>'
      );

      // 5. 닫는 괄호 > 하이라이팅
      result = result.replace(/(&gt;)/g, '<span class="token-tag">$1</span>');

      return result;
    }

    /**
     * HTML 이스케이프
     */
    _escapeHtml(html) {
      const div = document.createElement("div");
      div.textContent = html;
      return div.innerHTML;
    }

    /**
     * HTML 언이스케이프
     */
    _unescapeHtml(html) {
      const div = document.createElement("div");
      div.innerHTML = html;
      return div.textContent;
    }

    /**
     * 첫 글자 대문자
     */
    _capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }

  // 전역으로 노출
  window.ComponentViewer = ComponentViewer;

  // DOMContentLoaded에서 자동 초기화
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      const viewer = new ComponentViewer();
      viewer.init();
    });
  } else {
    const viewer = new ComponentViewer();
    viewer.init();
  }
})();

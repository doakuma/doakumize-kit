/**
 * Component Viewer
 * 경량 컴포넌트 가이드 뷰어 (카테고리별 구성)
 */

(function () {
  "use strict";

  /**
   * Component Viewer 클래스
   */
  class ComponentViewer {
    constructor() {
      this.examples = window.ComponentExamples || {};
      this.categories = window.ComponentCategories || {};
      this.currentComponent = null;
      this.searchTerm = "";
      this.modalsLoaded = false;
    }

    /**
     * 초기화
     */
    async init() {
      this.renderSidebar();
      this.attachEventListeners();

      // 모달 HTML 로드 (모달 컴포넌트가 있는 경우)
      if (this.examples.modal) {
        await this.loadModals();
      }

      this.showFirstComponent();
      console.log(
        "[Viewer] Initialized with",
        Object.keys(this.examples).length,
        "components"
      );
    }

    /**
     * 모달 HTML 로드 및 추가
     */
    async loadModals() {
      if (this.modalsLoaded) {
        return;
      }

      // examples.js에 포함된 모달 HTML 사용
      if (!window.ModalHTMLs || !Array.isArray(window.ModalHTMLs)) {
        console.warn("[Viewer] No modal HTMLs found");
        return;
      }

      try {
        // 기존 modal-container 확인
        let modalContainer = document.getElementById("modal-container");
        if (!modalContainer) {
          modalContainer = document.createElement("div");
          modalContainer.id = "modal-container";
          document.body.appendChild(modalContainer);
        }

        let modalCount = 0;
        window.ModalHTMLs.forEach((modal) => {
          // 이미 존재하는 모달은 건너뛰기
          if (!document.getElementById(modal.id)) {
            modalContainer.innerHTML += modal.html;
            modalCount++;
          }
        });

        if (modalCount > 0) {
          console.log(`[Viewer] Loaded ${modalCount} modal(s)`);
        }

        this.modalsLoaded = true;
      } catch (error) {
        console.warn("[Viewer] Failed to load modals:", error);
      }
    }

    /**
     * 컴포넌트를 카테고리별로 그룹핑
     */
    groupByCategory() {
      const grouped = {};
      const uncategorized = [];

      // 카테고리 순서 정의
      const categoryOrder = [
        "Overview",
        "Foundation",
        "Form Controls",
        "Data Display",
        "Feedback",
        "Navigation",
      ];

      Object.keys(this.examples).forEach((id) => {
        const component = this.examples[id];
        const category = component.category || "Uncategorized";

        if (!grouped[category]) {
          grouped[category] = [];
        }

        grouped[category].push({
          id,
          ...component,
        });
      });

      // 각 카테고리 내에서 order로 정렬
      Object.keys(grouped).forEach((category) => {
        grouped[category].sort((a, b) => {
          const orderA = a.order !== undefined ? a.order : 999;
          const orderB = b.order !== undefined ? b.order : 999;
          return orderA - orderB;
        });
      });

      // 카테고리 순서대로 정렬된 객체 생성
      const sorted = {};
      categoryOrder.forEach((cat) => {
        if (grouped[cat]) {
          sorted[cat] = grouped[cat];
        }
      });

      // Uncategorized가 있으면 마지막에 추가
      if (grouped["Uncategorized"]) {
        sorted["Uncategorized"] = grouped["Uncategorized"];
      }

      return sorted;
    }

    /**
     * 사이드바 렌더링 (카테고리별)
     */
    renderSidebar() {
      const nav = document.querySelector(".viewer-nav");
      if (!nav) return;

      const grouped = this.groupByCategory();

      if (Object.keys(grouped).length === 0) {
        nav.innerHTML = `
          <div class="viewer-empty">
            <p>No components found</p>
          </div>
        `;
        return;
      }

      let html = "";

      // 카테고리별로 렌더링
      Object.keys(grouped).forEach((category) => {
        const components = grouped[category];
        if (components.length === 0) return;

        html += `<div class="viewer-category">`;
        html += `<div class="viewer-category-title">${category}</div>`;

        components.forEach((component) => {
          const displayName =
            component.name || component.title || this._capitalize(component.id);
          html += `
            <a href="#${component.id}" class="viewer-nav-item" data-component="${component.id}">
              ${displayName}
            </a>
          `;
        });

        html += `</div>`;
      });

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
        } else if (hash === "" || hash === "overview") {
          this.showComponent("overview");
        }
      });
    }

    /**
     * 컴포넌트 표시
     */
    showComponent(componentId) {
      // Overview 특별 처리
      if (
        componentId === "overview" ||
        (!componentId && this.examples.overview)
      ) {
        this.showOverview();
        return;
      }

      if (!this.examples[componentId]) {
        console.warn("[Viewer] Component not found:", componentId);
        // Overview로 폴백
        if (this.examples.overview) {
          this.showOverview();
        }
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
        const displayName =
          component.name || component.title || this._capitalize(componentId);
        header.innerHTML = `
          <h2>${displayName}</h2>
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
     * Overview 표시
     */
    showOverview() {
      if (!this.examples.overview) {
        this.showEmptyState();
        return;
      }

      this.currentComponent = "overview";
      const overview = this.examples.overview;

      // 네비게이션 활성화
      document.querySelectorAll(".viewer-nav-item").forEach((item) => {
        item.classList.remove("is-active");
        if (item.dataset.component === "overview") {
          item.classList.add("is-active");
        }
      });

      // 헤더 업데이트
      const header = document.querySelector(".viewer-header");
      if (header) {
        header.innerHTML = `
          <h2>${overview.title || "Component System Overview"}</h2>
          ${overview.description ? `<p>${overview.description}</p>` : ""}
        `;
      }

      // 컨텐츠 렌더링
      const content = document.querySelector(".viewer-content");
      const section =
        content.querySelector(".viewer-section") ||
        document.createElement("div");
      section.className = "viewer-section viewer-section--overview";

      let html = "";

      if (overview.items && overview.items.length > 0) {
        // Overview는 content 필드가 있으면 사용 (HTML 직접 렌더링)
        overview.items.forEach((item, index) => {
          if (item.code && item.code.includes("<div")) {
            // HTML 콘텐츠인 경우
            html += `
              <div class="viewer-overview-item">
                ${
                  item.label
                    ? `<h3 class="viewer-overview-title">${item.label}</h3>`
                    : ""
                }
                <div class="viewer-overview-content">${item.code}</div>
              </div>
            `;
          } else {
            // 일반 예제인 경우
            html += this.renderExample(item, index);
          }
        });
      } else {
        html = `
          <div class="viewer-empty">
            <div class="viewer-empty-title">Overview</div>
            <div class="viewer-empty-text">Overview content will be displayed here.</div>
          </div>
        `;
      }

      section.innerHTML = html;

      // 기존 섹션이 없으면 추가
      if (!content.querySelector(".viewer-section")) {
        content.appendChild(section);
      }

      // 해시 업데이트
      window.location.hash = "overview";
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

      // 검색어가 있으면 카테고리 제목도 숨김
      document.querySelectorAll(".viewer-category-title").forEach((title) => {
        const category = title.parentElement;
        const hasVisibleItems = Array.from(
          category.querySelectorAll(".viewer-nav-item")
        ).some((item) => item.style.display !== "none");
        category.style.display = hasVisibleItems ? "block" : "none";
      });
    }

    /**
     * 첫 번째 컴포넌트 표시
     */
    showFirstComponent() {
      const hash = window.location.hash.slice(1);
      if (hash && this.examples[hash]) {
        this.showComponent(hash);
      } else if (hash === "" || hash === "overview") {
        // Overview가 있으면 Overview 표시, 없으면 첫 번째 컴포넌트
        if (this.examples.overview) {
          this.showOverview();
        } else {
          const firstId = Object.keys(this.examples)[0];
          if (firstId) {
            this.showComponent(firstId);
          } else {
            this.showEmptyState();
          }
        }
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
            빌드 스크립트를 실행하면 자동으로 생성됩니다.
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

/**
 * Component Generator
 * Studio 컴포넌트를 선택하여 프로젝트용 examples.js 생성
 */

(function () {
  "use strict";

  class ComponentGenerator {
    constructor() {
      this.components = COMPONENT_LIST || [];
      this.selectedComponents = new Set();
      this.componentData = new Map();
    }

    /**
     * 초기화
     */
    async init() {
      console.log(
        "[Generator] Initializing with",
        this.components.length,
        "components"
      );

      this.renderComponentList();
      this.attachEventListeners();
      this.updatePreview();

      // 모든 컴포넌트 데이터 로드
      await this.loadAllComponentData();
    }

    /**
     * 컴포넌트 리스트 렌더링
     */
    renderComponentList() {
      const listContainer = document.getElementById("componentList");
      if (!listContainer) return;

      // 카테고리별로 그룹핑
      const byCategory = {};
      this.components.forEach((comp) => {
        if (!comp.enabled) return; // 비활성화된 컴포넌트는 제외

        const category = comp.category || "Others";
        if (!byCategory[category]) {
          byCategory[category] = [];
        }
        byCategory[category].push(comp);
      });

      let html = "";

      Object.keys(byCategory)
        .sort()
        .forEach((category) => {
          const items = byCategory[category];

          html += `
          <div class="generator-category">
            <div class="generator-category-title">
              ${category}
              <span class="generator-category-count">${items.length}</span>
            </div>
        `;

          items.forEach((comp) => {
            html += `
            <div class="generator-item" data-component="${comp.id}">
              <label class="chk">
                <input type="checkbox" class="chk__input" id="comp-${comp.id}" value="${comp.id}">
                <span class="chk__box" aria-hidden="true"></span>
                <span class="chk__label">${comp.name}</span>
              </label>
            </div>
          `;
          });

          html += `</div>`;
        });

      listContainer.innerHTML = html;
    }

    /**
     * 이벤트 리스너 연결
     */
    attachEventListeners() {
      // 체크박스 변경
      document
        .querySelectorAll(".generator-item .chk__input")
        .forEach((checkbox) => {
          checkbox.addEventListener("change", (e) => {
            this.handleSelectionChange(e.target.value, e.target.checked);
          });
        });

      // Select All
      document.getElementById("selectAllBtn")?.addEventListener("click", () => {
        this.selectAll();
      });

      // Clear All
      document.getElementById("clearAllBtn")?.addEventListener("click", () => {
        this.clearAll();
      });

      // Download (ZIP 패키지)
      document.getElementById("downloadBtn")?.addEventListener("click", () => {
        this.downloadPackage();
      });
    }

    /**
     * 선택 변경 처리
     */
    handleSelectionChange(componentId, isSelected) {
      if (isSelected) {
        this.selectedComponents.add(componentId);
      } else {
        this.selectedComponents.delete(componentId);
      }

      this.updatePreview();
    }

    /**
     * 전체 선택
     */
    selectAll() {
      document
        .querySelectorAll(".generator-item .chk__input")
        .forEach((checkbox) => {
          checkbox.checked = true;
          this.selectedComponents.add(checkbox.value);
        });
      this.updatePreview();
    }

    /**
     * 전체 해제
     */
    clearAll() {
      document
        .querySelectorAll(".generator-item .chk__input")
        .forEach((checkbox) => {
          checkbox.checked = false;
        });
      this.selectedComponents.clear();
      this.updatePreview();
    }

    /**
     * 모든 컴포넌트 데이터 로드
     */
    async loadAllComponentData() {
      console.log("[Generator] Loading component data...");

      const promises = this.components
        .filter((comp) => comp.enabled)
        .map((comp) => this.loadComponentData(comp.id));

      await Promise.all(promises);
      console.log(
        "[Generator] Loaded",
        this.componentData.size,
        "component data files"
      );
    }

    /**
     * 개별 컴포넌트 데이터 로드
     */
    async loadComponentData(componentId) {
      try {
        const script = document.createElement("script");
        script.src = `components/data/${componentId}.data.js`;

        return new Promise((resolve, reject) => {
          script.onload = () => {
            // window.ComponentData에서 데이터 가져오기
            if (window.ComponentData && window.ComponentData[componentId]) {
              this.componentData.set(
                componentId,
                window.ComponentData[componentId]
              );
              console.log(`[Generator] Loaded: ${componentId}`);
            }
            resolve();
          };
          script.onerror = () => {
            console.warn(`[Generator] Failed to load: ${componentId}`);
            resolve(); // 에러여도 계속 진행
          };
          document.head.appendChild(script);
        });
      } catch (error) {
        console.error(`[Generator] Error loading ${componentId}:`, error);
      }
    }

    /**
     * 미리보기 업데이트
     */
    updatePreview() {
      const selectedCount = this.selectedComponents.size;
      const previewArea = document.getElementById("previewArea");
      const downloadBtn = document.getElementById("downloadBtn");
      const selectedCountEl = document.getElementById("selectedCount");
      const estimatedSizeEl = document.getElementById("estimatedSize");

      // 카운트 업데이트
      if (selectedCountEl) {
        selectedCountEl.textContent = selectedCount;
      }

      if (selectedCount === 0) {
        // 선택 없음 (빈 상태 표시)
        previewArea.innerHTML = `
          <div class="generator-empty">
            <div class="generator-empty-icon">📦</div>
            <div class="generator-empty-title">No Components Selected</div>
            <div class="generator-empty-text">
              <p style="margin: 0 0 16px;">왼쪽에서 컴포넌트를 선택하면 여기에 생성된 코드가 표시됩니다.</p>
              <div style="text-align: left; display: inline-block; padding: 16px 24px; background: var(--bg-secondary); border-radius: 8px;">
                <p style="margin: 0 0 12px; font-weight: 600;">🚀 빠른 시작</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6;">
                  1️⃣ 왼쪽에서 Button, Input 등 필요한 컴포넌트 체크<br>
                  2️⃣ 여기서 생성된 코드 확인<br>
                  3️⃣ Download 버튼으로 examples.js 다운로드
                </p>
              </div>
            </div>
          </div>
        `;
        downloadBtn.disabled = true;
        if (estimatedSizeEl) {
          estimatedSizeEl.textContent = "0 KB";
        }
      } else {
        // 생성된 코드 표시
        const generatedCode = this.generateExamplesCode();
        const sizeKB = (new Blob([generatedCode]).size / 1024).toFixed(2);

        previewArea.innerHTML = `
          <div class="generator-code-block">
            <pre><code>${this._escapeHtml(generatedCode)}</code></pre>
          </div>
        `;
        downloadBtn.disabled = false;
        if (estimatedSizeEl) {
          estimatedSizeEl.textContent = `${sizeKB} KB`;
        }
      }
    }

    /**
     * examples.js 코드 생성
     */
    generateExamplesCode() {
      const examples = {};

      for (const componentId of this.selectedComponents) {
        const data = this.componentData.get(componentId);
        if (!data) {
          console.warn(`[Generator] No data found for: ${componentId}`);
          continue;
        }

        // 컴포넌트 데이터를 examples 형식으로 변환
        examples[componentId] = this.convertToExampleFormat(data);
      }

      // examples.js 파일 생성
      const header = `/**
 * Component Examples
 * 
 * Generated by Doakumize Kit Generator
 * Date: ${new Date().toISOString().split("T")[0]}
 * 
 * Selected components: ${Array.from(this.selectedComponents).join(", ")}
 */

`;

      const code = `window.ComponentExamples = ${JSON.stringify(
        examples,
        null,
        2
      )};`;

      return header + code;
    }

    /**
     * Studio 데이터 형식을 Example 형식으로 변환
     */
    convertToExampleFormat(data) {
      const example = {
        title: data.title || data.name || "Component",
        description: data.description || "",
        items: [],
      };

      // variants를 items로 변환
      if (data.variants && Array.isArray(data.variants)) {
        data.variants.forEach((variant) => {
          if (variant.items && Array.isArray(variant.items)) {
            variant.items.forEach((item) => {
              example.items.push({
                label: item.label || variant.title || "Example",
                code: item.preview || item.code || "",
              });
            });
          }
        });
      }

      return example;
    }

    /**
     * CSS 파일 로드
     */
    async loadCSSFile(filePath) {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load ${filePath}`);
        }
        return await response.text();
      } catch (error) {
        console.warn(`[Generator] Failed to load CSS: ${filePath}`, error);
        return null;
      }
    }

    /**
     * 선택된 컴포넌트의 CSS 빌드
     */
    async buildComponentsCSS() {
      const cssFiles = [];

      // 필수: icons는 항상 포함
      if (!this.selectedComponents.has("icon")) {
        cssFiles.push("icons");
      }

      // 선택된 컴포넌트 CSS 매핑
      const componentCSSMap = {
        button: "button.css",
        input: "input.css",
        textarea: "input.css", // input.css 재사용
        dropdown: "dropdown.css",
        modal: "modal.css",
        icon: "icons.css",
      };

      // 선택된 컴포넌트의 CSS 파일 수집
      for (const comp of this.selectedComponents) {
        if (componentCSSMap[comp]) {
          const cssName = componentCSSMap[comp].replace(".css", "");
          if (!cssFiles.includes(cssName)) {
            cssFiles.push(cssName);
          }
        }
      }

      // CSS 파일 로드 및 결합
      let combinedCSS = `/* ========================================
 * Components Styles - Generated by Doakumize Kit
 * Date: ${new Date().toISOString().split("T")[0]}
 * Selected: ${Array.from(this.selectedComponents).join(", ")}
 * ======================================== */\n\n`;

      for (const cssFile of cssFiles) {
        const content = await this.loadCSSFile(
          `components/styles/${cssFile}.css`
        );
        if (content) {
          combinedCSS += `/* ========== ${cssFile} ========== */\n${content}\n\n`;
        }
      }

      // 선택되지 않은 컴포넌트는 all-other-components.css에서 로드
      const hasOtherComponents = Array.from(this.selectedComponents).some(
        (comp) => !componentCSSMap[comp]
      );

      if (hasOtherComponents) {
        const otherCSS = await this.loadCSSFile(
          "components/styles/all-other-components.css"
        );
        if (otherCSS) {
          combinedCSS += `/* ========== Other Components ========== */\n${otherCSS}\n`;
        }
      }

      return combinedCSS;
    }

    /**
     * 필수 CSS 파일들 로드
     */
    async loadEssentialCSS() {
      const files = {
        "normalize.css": "components/styles/normalize.css",
        "variables.css": "components/styles/variables.css",
        "base.css": "resources/styles/base.css",
        "animations.css": "resources/styles/animations.css",
        "scrollbar.css": "resources/styles/scrollbar.css",
      };

      const loadedFiles = {};

      for (const [name, path] of Object.entries(files)) {
        const content = await this.loadCSSFile(path);
        if (content) {
          loadedFiles[name] = content;
        }
      }

      return loadedFiles;
    }

    /**
     * common.css 생성
     */
    generateCommonCSS() {
      return `/* ========================================
 * Core Styles - Generated by Doakumize Kit
 * Date: ${new Date().toISOString().split("T")[0]}
 * ======================================== */

/* Base Styles */
@import url(normalize.css);
@import url(variables.css);
@import url(base.css);

/* Animation & Effects */
@import url(animations.css);

/* Optional: 스크롤바 커스터마이징이 필요하면 아래 주석 해제 */
/* @import url(scrollbar.css); */

/* Component Styles */
@import url(components.css);

/* External Fonts */
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css");
`;
    }

    /**
     * ZIP 패키지 다운로드 (examples.js + CSS 파일들)
     */
    async downloadPackage() {
      if (this.selectedComponents.size === 0) {
        alert("컴포넌트를 선택해주세요.");
        return;
      }

      if (typeof JSZip === "undefined") {
        console.error("[Generator] JSZip not loaded");
        alert("다운로드 기능을 사용할 수 없습니다. 페이지를 새로고침해주세요.");
        return;
      }

      try {
        const zip = new JSZip();
        const stylesFolder = zip.folder("styles");

        // 1. examples.js 생성
        const examplesJS = this.generateExamplesCode();
        zip.file("examples.js", examplesJS);

        // 2. 필수 CSS 파일들 로드
        console.log("[Generator] Loading essential CSS files...");
        const essentialCSS = await this.loadEssentialCSS();

        for (const [name, content] of Object.entries(essentialCSS)) {
          stylesFolder.file(name, content);
          console.log(`[Generator] Added: ${name}`);
        }

        // 3. components.css 빌드 (선택된 컴포넌트만)
        console.log("[Generator] Building components.css...");
        const componentsCSS = await this.buildComponentsCSS();
        stylesFolder.file("components.css", componentsCSS);

        // 4. common.css 생성
        const commonCSS = this.generateCommonCSS();
        stylesFolder.file("common.css", commonCSS);

        // 5. README.txt 생성 (사용 가이드)
        const readme = this.generateReadme();
        zip.file("README.txt", readme);

        // 6. ZIP 생성 및 다운로드
        console.log("[Generator] Generating ZIP...");
        const blob = await zip.generateAsync({ type: "blob" });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `doakumize-components-${Date.now()}.zip`;
        a.click();
        URL.revokeObjectURL(url);

        console.log("[Generator] Download complete!");

        // 성공 메시지
        setTimeout(() => {
          alert(
            `✅ 패키지 다운로드 완료!\n\n` +
              `포함된 파일:\n` +
              `- examples.js\n` +
              `- styles/common.css\n` +
              `- styles/components.css (선택한 컴포넌트만)\n` +
              `- styles/base.css, animations.css, scrollbar.css\n` +
              `- styles/normalize.css, variables.css\n` +
              `- README.txt (사용 가이드)\n\n` +
              `선택한 컴포넌트: ${this.selectedComponents.size}개`
          );
        }, 100);
      } catch (error) {
        console.error("[Generator] Download failed:", error);
        alert("다운로드 중 오류가 발생했습니다. 콘솔을 확인해주세요.");
      }
    }

    /**
     * README.txt 생성
     */
    generateReadme() {
      return `Doakumize Kit - Component Package
Generated: ${new Date().toISOString().split("T")[0]}

📦 포함된 컴포넌트 (${this.selectedComponents.size}개):
${Array.from(this.selectedComponents)
  .map((c) => `  - ${c}`)
  .join("\n")}

📁 파일 구조:
  examples.js           컴포넌트 예제 데이터
  styles/
    ├── common.css      Import 진입점
    ├── components.css  선택한 컴포넌트 스타일
    ├── base.css        기본 스타일
    ├── animations.css  애니메이션
    ├── scrollbar.css   스크롤바 (선택적)
    ├── normalize.css   CSS Reset
    └── variables.css   디자인 토큰

🚀 사용 방법:

1. 프로젝트에 복사:
   - examples.js → core/viewer/examples.js
   - styles/ → core/styles/

2. HTML에 추가:
   <link rel="stylesheet" href="core/styles/common.css">

3. 완료!
   core/viewer/index.html을 열어서 확인하세요.

📚 자세한 문서: https://github.com/doakuma/doakumize-kit
`;
    }

    /**
     * examples.js 파일만 다운로드 (레거시 지원)
     */
    downloadExamplesFile() {
      if (this.selectedComponents.size === 0) {
        alert("컴포넌트를 선택해주세요.");
        return;
      }

      const code = this.generateExamplesCode();
      const blob = new Blob([code], { type: "text/javascript;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "examples.js";
      a.click();

      URL.revokeObjectURL(url);

      console.log("[Generator] Downloaded examples.js");

      // 사용 안내 alert
      setTimeout(() => {
        alert(
          `✅ examples.js 다운로드 완료!\n\n` +
            `사용 방법:\n` +
            `1. 다운로드된 파일을 프로젝트의 core/viewer/ 폴더에 복사\n` +
            `2. core/viewer/index.html을 열어서 확인\n\n` +
            `선택한 컴포넌트: ${this.selectedComponents.size}개`
        );
      }, 100);
    }

    /**
     * HTML 이스케이프
     */
    _escapeHtml(html) {
      const div = document.createElement("div");
      div.textContent = html;
      return div.innerHTML;
    }
  }

  // DOMContentLoaded에서 초기화
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      const generator = new ComponentGenerator();
      generator.init();
    });
  } else {
    const generator = new ComponentGenerator();
    generator.init();
  }
})();

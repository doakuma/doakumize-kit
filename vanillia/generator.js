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
      console.log("[Generator] Initializing with", this.components.length, "components");
      
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

      Object.keys(byCategory).sort().forEach((category) => {
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
              <input type="checkbox" id="comp-${comp.id}" value="${comp.id}">
              <label class="generator-item-label" for="comp-${comp.id}">
                ${comp.name}
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
      document.querySelectorAll('.generator-item input[type="checkbox"]').forEach((checkbox) => {
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

      // Download
      document.getElementById("downloadBtn")?.addEventListener("click", () => {
        this.downloadExamplesFile();
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
      document.querySelectorAll('.generator-item input[type="checkbox"]').forEach((checkbox) => {
        checkbox.checked = true;
        this.selectedComponents.add(checkbox.value);
      });
      this.updatePreview();
    }

    /**
     * 전체 해제
     */
    clearAll() {
      document.querySelectorAll('.generator-item input[type="checkbox"]').forEach((checkbox) => {
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
        .filter(comp => comp.enabled)
        .map((comp) => this.loadComponentData(comp.id));

      await Promise.all(promises);
      console.log("[Generator] Loaded", this.componentData.size, "component data files");
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
              this.componentData.set(componentId, window.ComponentData[componentId]);
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
      const previewContent = document.getElementById("previewContent");
      const downloadBtn = document.getElementById("downloadBtn");
      const selectedCountEl = document.getElementById("selectedCount");
      const estimatedSizeEl = document.getElementById("estimatedSize");

      // 카운트 업데이트
      if (selectedCountEl) {
        selectedCountEl.textContent = selectedCount;
      }

      if (selectedCount === 0) {
        // 선택 없음
        previewContent.innerHTML = `
          <div class="generator-empty">
            <div class="generator-empty-icon">📦</div>
            <div class="generator-empty-title">No Components Selected</div>
            <div class="generator-empty-text">
              왼쪽에서 컴포넌트를 선택하면 여기에 생성된 코드가 표시됩니다.
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

        previewContent.innerHTML = `
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
 * Date: ${new Date().toISOString().split('T')[0]}
 * 
 * Selected components: ${Array.from(this.selectedComponents).join(', ')}
 */

`;

      const code = `window.ComponentExamples = ${JSON.stringify(examples, null, 2)};`;

      return header + code;
    }

    /**
     * Studio 데이터 형식을 Example 형식으로 변환
     */
    convertToExampleFormat(data) {
      const example = {
        title: data.title || data.name || "Component",
        description: data.description || "",
        items: []
      };

      // variants를 items로 변환
      if (data.variants && Array.isArray(data.variants)) {
        data.variants.forEach((variant) => {
          if (variant.items && Array.isArray(variant.items)) {
            variant.items.forEach((item) => {
              example.items.push({
                label: item.label || variant.title || "Example",
                code: item.preview || item.code || ""
              });
            });
          }
        });
      }

      return example;
    }

    /**
     * examples.js 파일 다운로드
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


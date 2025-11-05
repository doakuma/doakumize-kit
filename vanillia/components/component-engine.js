/**
 * ComponentEngine
 * 컴포넌트 렌더링을 관리하는 메인 엔진
 *
 * 책임:
 * - 컴포넌트 타입별 렌더러 관리
 * - 렌더링 결과 캐싱
 * - JSON 데이터 로딩
 * - 에러 처리
 */
class ComponentEngine {
  constructor() {
    this.renderers = new Map();
    this.cache = new Map();
    this.dataCache = new Map();
  }

  /**
   * 렌더러 등록
   * @param {string} type - 컴포넌트 타입 (예: 'typography')
   * @param {Object} renderer - 렌더러 인스턴스
   */
  registerRenderer(type, renderer) {
    if (!renderer || typeof renderer.render !== "function") {
      throw new Error(
        `Invalid renderer for type: ${type}. Must have a render() method.`
      );
    }
    this.renderers.set(type, renderer);
    console.log(`[ComponentEngine] Registered renderer: ${type}`);
  }

  /**
   * 스크립트 파일 동적 로드
   * @param {string} scriptPath - 스크립트 파일 경로
   * @returns {Promise<void>}
   */
  _loadScript(scriptPath) {
    return new Promise((resolve, reject) => {
      // 이미 로드된 스크립트인지 확인
      const existingScript = document.querySelector(
        `script[src="${scriptPath}"]`
      );
      if (existingScript) {
        console.log(`[ComponentEngine] Script already loaded: ${scriptPath}`);
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = scriptPath;
      script.async = true;

      script.onload = () => {
        console.log(`[ComponentEngine] Script loaded: ${scriptPath}`);
        resolve();
      };

      script.onerror = () => {
        console.error(`[ComponentEngine] Failed to load script: ${scriptPath}`);
        reject(new Error(`Failed to load script: ${scriptPath}`));
      };

      document.head.appendChild(script);
    });
  }

  /**
   * 컴포넌트 타입을 파일 경로로 변환
   * @param {string} componentType - 컴포넌트 타입 (예: 'button')
   * @returns {string} 파일 경로 (예: 'components/data/button.data.js')
   */
  _getDataFilePath(componentType) {
    return `components/data/${componentType}.data.js`;
  }

  /**
   * JSON 데이터 로딩 (전역 데이터 또는 동적 로드)
   * @param {string} path - JSON 파일 경로 또는 컴포넌트 타입
   * @returns {Promise<Object>} - 로드된 데이터
   */
  async loadData(path) {
    // 캐시 확인
    if (this.dataCache.has(path)) {
      console.log(`[ComponentEngine] Using cached data: ${path}`);
      return this.dataCache.get(path);
    }

    // 1. 전역 ComponentData에서 먼저 확인 (이미 로드된 경우)
    if (typeof window !== "undefined" && window.ComponentData) {
      // path가 컴포넌트 타입인 경우 (예: 'typography')
      if (window.ComponentData[path]) {
        const data = window.ComponentData[path];
        this.dataCache.set(path, data);
        console.log(
          `[ComponentEngine] Loaded data from ComponentData: ${path}`
        );
        return data;
      }

      // path가 파일 경로인 경우 파일명에서 타입 추출
      const match = path.match(/\/([^/]+)\.(?:json|data\.js)$/);
      if (match && window.ComponentData[match[1]]) {
        const data = window.ComponentData[match[1]];
        this.dataCache.set(path, data);
        console.log(
          `[ComponentEngine] Loaded data from ComponentData: ${match[1]}`
        );
        return data;
      }
    }

    // 2. 파일 경로 파싱
    let filePath = path;
    let componentType = path;

    // .data.js 또는 .json 확장자가 있는 경우
    if (
      path.includes("/") ||
      path.endsWith(".data.js") ||
      path.endsWith(".json")
    ) {
      filePath = path;
      // 파일명에서 컴포넌트 타입 추출
      const match = path.match(/\/([^/]+)\.(?:json|data\.js)$/);
      if (match) {
        componentType = match[1];
      }
    } else {
      // 컴포넌트 타입만 있는 경우 파일 경로 생성
      filePath = this._getDataFilePath(path);
      componentType = path;
    }

    // 3. .data.js 파일인 경우 동적으로 스크립트 로드
    if (filePath.endsWith(".data.js")) {
      try {
        // ComponentData 초기화 확인
        if (typeof window.ComponentData === "undefined") {
          window.ComponentData = {};
        }

        // 스크립트 동적 로드
        await this._loadScript(filePath);

        // 로드 후 ComponentData에서 데이터 확인
        if (window.ComponentData && window.ComponentData[componentType]) {
          const data = window.ComponentData[componentType];
          this.dataCache.set(path, data);
          console.log(
            `[ComponentEngine] Loaded data via dynamic script: ${componentType}`
          );
          return data;
        } else {
          throw new Error(
            `ComponentData.${componentType} not found after loading ${filePath}`
          );
        }
      } catch (error) {
        console.error(
          `[ComponentEngine] Error loading script ${filePath}:`,
          error
        );
        throw error;
      }
    }

    // 4. .json 파일인 경우 fetch로 로드
    if (filePath.endsWith(".json")) {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(
            `Failed to load data from ${filePath}: ${response.statusText}`
          );
        }
        const data = await response.json();
        this.dataCache.set(path, data);
        console.log(`[ComponentEngine] Loaded data via fetch: ${filePath}`);
        return data;
      } catch (error) {
        console.error(
          `[ComponentEngine] Error loading JSON from ${filePath}:`,
          error
        );
        throw error;
      }
    }

    // 5. 지원하지 않는 형식
    throw new Error(
      `Unsupported data format: ${path}. Use .data.js or .json files.`
    );
  }

  /**
   * 컴포넌트 렌더링
   * @param {string} type - 컴포넌트 타입
   * @param {Object} data - 렌더링할 데이터
   * @param {boolean} useCache - 캐시 사용 여부 (기본: true)
   * @returns {string} - 렌더링된 HTML 문자열
   */
  render(type, data, useCache = true) {
    // 렌더러 확인
    const renderer = this.renderers.get(type);
    if (!renderer) {
      const error = `No renderer registered for type: ${type}`;
      console.error(`[ComponentEngine] ${error}`);
      return `<div class="error">${error}</div>`;
    }

    // 캐시 확인
    const cacheKey = renderer.getCacheKey
      ? renderer.getCacheKey(data)
      : `${type}-${JSON.stringify(data)}`;

    if (useCache && this.cache.has(cacheKey)) {
      console.log(`[ComponentEngine] Using cached render: ${cacheKey}`);
      return this.cache.get(cacheKey);
    }

    // 렌더링
    try {
      console.log(`[ComponentEngine] Rendering: ${type}`);
      const html = renderer.render(data);

      if (useCache) {
        this.cache.set(cacheKey, html);
      }

      return html;
    } catch (error) {
      console.error(`[ComponentEngine] Error rendering ${type}:`, error);
      return `<div class="error">렌더링 중 오류가 발생했습니다: ${error.message}</div>`;
    }
  }

  /**
   * 컴포넌트를 DOM에 마운트
   * @param {string} type - 컴포넌트 타입
   * @param {Object} data - 렌더링할 데이터
   * @param {string|HTMLElement} target - 마운트할 대상 (선택자 또는 요소)
   * @param {boolean} useCache - 캐시 사용 여부
   */
  mount(type, data, target, useCache = true) {
    const html = this.render(type, data, useCache);

    const targetElement =
      typeof target === "string" ? document.querySelector(target) : target;

    if (!targetElement) {
      console.error(`[ComponentEngine] Target element not found: ${target}`);
      return;
    }

    targetElement.innerHTML = html;
    console.log(`[ComponentEngine] Mounted ${type} to`, targetElement);

    // 렌더러의 afterRender 메서드 호출 (있는 경우)
    const renderer = this.renderers.get(type);
    if (renderer && typeof renderer.afterRender === "function") {
      renderer.afterRender(targetElement, data);
    }
  }

  /**
   * 데이터를 로드하고 렌더링하여 마운트
   * @param {string} type - 컴포넌트 타입
   * @param {string} dataPath - JSON 데이터 경로
   * @param {string|HTMLElement} target - 마운트할 대상
   * @param {boolean} useCache - 캐시 사용 여부
   * @returns {Promise<void>}
   */
  async loadAndMount(type, dataPath, target, useCache = true) {
    try {
      const data = await this.loadData(dataPath);
      this.mount(type, data, target, useCache);
    } catch (error) {
      console.error(`[ComponentEngine] Error in loadAndMount:`, error);
      const targetElement =
        typeof target === "string" ? document.querySelector(target) : target;

      if (targetElement) {
        targetElement.innerHTML = `<div class="error">컴포넌트를 불러오는 중 오류가 발생했습니다.</div>`;
      }
    }
  }

  /**
   * 캐시 초기화
   * @param {string} type - 특정 타입만 초기화 (선택적)
   */
  clearCache(type = null) {
    if (type) {
      // 특정 타입의 캐시만 삭제
      for (const [key] of this.cache) {
        if (key.startsWith(`${type}-`)) {
          this.cache.delete(key);
        }
      }
      console.log(`[ComponentEngine] Cleared cache for type: ${type}`);
    } else {
      // 전체 캐시 삭제
      this.cache.clear();
      console.log(`[ComponentEngine] Cleared all cache`);
    }
  }

  /**
   * 등록된 렌더러 목록 조회
   * @returns {Array<string>} - 렌더러 타입 목록
   */
  getRegisteredRenderers() {
    return Array.from(this.renderers.keys());
  }

  /**
   * 캐시 상태 조회
   * @returns {Object} - 캐시 통계
   */
  getCacheStats() {
    return {
      renderCacheSize: this.cache.size,
      dataCacheSize: this.dataCache.size,
      renderCacheKeys: Array.from(this.cache.keys()),
      dataCacheKeys: Array.from(this.dataCache.keys()),
    };
  }
}

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = ComponentEngine;
}

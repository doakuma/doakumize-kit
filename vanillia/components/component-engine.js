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
   * JSON 데이터 로딩
   * @param {string} path - JSON 파일 경로
   * @returns {Promise<Object>} - 로드된 데이터
   */
  async loadData(path) {
    // 캐시 확인
    if (this.dataCache.has(path)) {
      console.log(`[ComponentEngine] Using cached data: ${path}`);
      return this.dataCache.get(path);
    }

    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(
          `Failed to load data from ${path}: ${response.statusText}`
        );
      }
      const data = await response.json();
      this.dataCache.set(path, data);
      console.log(`[ComponentEngine] Loaded data: ${path}`);
      return data;
    } catch (error) {
      console.error(
        `[ComponentEngine] Error loading data from ${path}:`,
        error
      );
      throw error;
    }
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

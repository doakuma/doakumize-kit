/**
 * Components Page Scripts
 * components.html 페이지 전용 스크립트
 *
 * 아이콘 렌더링은 IconRenderer가 처리하며,
 * 이 파일은 아이콘 클릭 인터랙션(모달)만 담당합니다.
 */

/**
 * Icon Code Display 기능 - 모달 버전
 * @param {string} iconClass - 아이콘 클래스명
 */
function showIconCode(iconClass) {
  // 아이콘 미리보기 업데이트
  document.getElementById(
    "iconPreviewSmall"
  ).className = `icon icon--small ${iconClass}`;
  document.getElementById(
    "iconPreviewMedium"
  ).className = `icon icon--medium ${iconClass}`;
  document.getElementById(
    "iconPreviewLarge"
  ).className = `icon icon--large ${iconClass}`;
  document.getElementById(
    "iconPreviewXLarge"
  ).className = `icon icon--xlarge ${iconClass}`;

  // 아이콘 이름 표시
  const iconName = iconClass.replace("icon--", "");
  document.getElementById("iconName").textContent = iconName;

  // 아이콘 코드 생성 (다양한 사이즈 포함)
  const code = `<!-- Small (16x16) -->
<i class="icon icon--small ${iconClass}"></i>

<!-- Medium (20x20) - Default -->
<i class="icon icon--medium ${iconClass}"></i>

<!-- Large (24x24) -->
<i class="icon icon--large ${iconClass}"></i>

<!-- XLarge (32x32) -->
<i class="icon icon--xlarge ${iconClass}"></i>`;

  // 코드 표시
  document.getElementById("iconCodeContent").textContent = code;

  // 모달 열기
  const modal = document.getElementById("iconCodeModal");
  modal.classList.add("modal--open");
  document.body.classList.add("modal-open");

  // 선택된 아이콘 하이라이트
  document.querySelectorAll(".icon-clickable").forEach((item) => {
    item.classList.remove("icon-selected");
  });
  event.currentTarget.classList.add("icon-selected");
}

/**
 * 아이콘 코드 복사
 */
function copyIconCode() {
  const codeContent = document.getElementById("iconCodeContent");
  const code = codeContent.textContent;

  navigator.clipboard
    .writeText(code)
    .then(() => {
      const button = event.currentTarget;
      const originalHTML = button.innerHTML;

      // 복사 성공 메시지 표시
      button.innerHTML =
        '<i class="icon icon--small icon--check"></i><span>복사 완료!</span>';
      button.style.backgroundColor = "var(--success-100)";
      button.style.borderColor = "var(--success-600)";
      button.style.color = "var(--success-700)";

      // 2초 후 원래 상태로 복원
      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.backgroundColor = "";
        button.style.borderColor = "";
        button.style.color = "";
      }, 2000);
    })
    .catch((err) => {
      console.error("복사 실패:", err);
      alert("코드 복사에 실패했습니다.");
    });
}

/**
 * DataTables 초기화
 */
let dataTableInitialized = false;

function initDataTable() {
  if (
    !dataTableInitialized &&
    typeof jQuery !== "undefined" &&
    jQuery.fn.DataTable
  ) {
    $("#exampleDataTable").DataTable({
      scrollCollapse: true,
      scrollY: "300px",
      scrollX: "hidden",
      paging: true,
      filter: true,
      search: true,
      info: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Korean.json",
      },
    });
    dataTableInitialized = true;
  }
}

/**
 * DatePicker 초기화
 */
function initDatePicker() {
  // single types
  const singleType = {
    singleDatePicker: true,
    showDropdowns: true,
    locale: {
      format: "YYYY-MM-DD",
      applyLabel: "확인",
      cancelLabel: "취소",
    },
  };

  // range types
  const rangeType = {
    showDropdowns: true,
    ranges: {
      오늘: [moment(), moment()],
      이번주: [moment().startOf("week"), moment().endOf("week")],
      이번달: [moment().startOf("month"), moment().endOf("month")],
      지난달: [
        moment().subtract(1, "month").startOf("month"),
        moment().subtract(1, "month").endOf("month"),
      ],
      다음달: [
        moment().add(1, "month").startOf("month"),
        moment().add(1, "month").endOf("month"),
      ],
      최근1개월: [moment().subtract(1, "month"), moment()],
      최근3개월: [moment().subtract(3, "months"), moment()],
      올해: [moment().startOf("year"), moment().endOf("year")],
      전월까지: [
        moment().startOf("year"),
        moment().subtract(1, "month").endOf("month"),
      ],
    },
    alwaysShowCalendars: true,
    locale: {
      format: "YYYY-MM-DD",
      applyLabel: "확인",
      cancelLabel: "취소",
      customRangeLabel: "직접 입력",
    },
  };

  const pickeres = document.querySelectorAll(".input--datepicker");
  pickeres.forEach((picker) => {
    const pickerType = picker.getAttribute("data-picker-type");
    if (pickerType === "range") {
      $(picker).daterangepicker({
        ...rangeType,
      });
    } else if (pickerType === "single") {
      $(picker).daterangepicker({
        ...singleType,
      });
    }
  });
}

/**
 * Select2 초기화
 */
function initSelect2() {
  const select2s = document.querySelectorAll(".drop-down-select select");
  select2s.forEach((select) => {
    const isMultiple = select.hasAttribute("multiple");
    const maxLength = select.getAttribute("maxLength");
    $(select).select2({
      minimumResultsForSearch: 0,
      allowClear: isMultiple,
      maximumSelectionLength: maxLength,
    });
  });
}

/**
 * LNB 카테고리별 네비게이션 동적 생성
 * ComponentConfig 기반으로 카테고리별로 그룹핑하여 생성
 * enabled: false인 컴포넌트도 표시 (공사 중 표시)
 */
function renderCategoryNavigation() {
  const nav = document.getElementById("componentCategoryNav");
  if (!nav) {
    console.warn("[ComponentsPage] Category nav not found");
    return;
  }

  if (!window.ComponentConfig) {
    console.warn("[ComponentsPage] ComponentConfig not loaded");
    return;
  }

  // 전체 컴포넌트 리스트 가져오기 (enabled: false 포함)
  const allComponents = window.ComponentConfig.COMPONENT_LIST;

  // 카테고리별로 그룹핑 (enabled 무관)
  const componentsByCategory = {};
  allComponents.forEach((comp) => {
    const category = comp.category || "Uncategorized";
    if (!componentsByCategory[category]) {
      componentsByCategory[category] = [];
    }
    componentsByCategory[category].push(comp);
  });

  const categories = [...new Set(allComponents.map((c) => c.category))].filter(
    Boolean
  );

  console.log(`[ComponentsPage] Rendering ${categories.length} category menus`);

  // 카테고리별로 메뉴 생성
  categories.forEach((category, index) => {
    const components = componentsByCategory[category];
    if (!components || components.length === 0) return;

    // 카테고리 아이템 생성
    const categoryItem = document.createElement("div");
    categoryItem.className = "lnb-menu-item";

    // 첫 번째 카테고리는 기본으로 열어두기
    if (index === 0) {
      categoryItem.classList.add("lnb-menu-item--expanded");
    }

    // 카테고리 헤더
    const header = document.createElement("div");
    header.className = "lnb-menu-item__header";

    const categoryButton = document.createElement("button");
    categoryButton.className = "lnb-menu-item__link";
    categoryButton.type = "button";

    // 활성화된 컴포넌트 개수 표시
    const enabledCount = components.filter((c) => c.enabled !== false).length;
    const totalCount = components.length;
    categoryButton.innerHTML = `<span class="lnb-menu-item__text">${category} <span class="text-tertiary">(${enabledCount}/${totalCount})</span></span>`;

    const toggleButton = document.createElement("button");
    toggleButton.className = "lnb-menu-item__toggle";
    toggleButton.type = "button";
    toggleButton.innerHTML = '<i class="icon icon--chevron-down"></i>';

    header.appendChild(categoryButton);
    header.appendChild(toggleButton);

    // 카테고리 서브메뉴
    const submenu = document.createElement("div");
    submenu.className = "lnb-menu-item__submenu";

    const list = document.createElement("ul");
    list.className = "lnb-submenu";

    // 컴포넌트 항목 생성
    components.forEach((comp) => {
      const item = document.createElement("li");
      item.className = "lnb-submenu__item";

      const link = document.createElement("a");
      link.href = "#";
      link.dataset.componentId = comp.id;

      // enabled 여부에 따라 클래스 및 스타일 적용
      const isEnabled = comp.enabled !== false;

      if (isEnabled) {
        link.className = "lnb-submenu__link";
        link.innerHTML = `<span>${comp.name}</span>`;

        // 클릭 시 해당 컴포넌트 표시
        link.addEventListener("click", (e) => {
          e.preventDefault();
          showComponent(comp.id);
        });
      } else {
        // 비활성화된 컴포넌트 (공사 중)
        link.className = "lnb-submenu__link lnb-submenu__link--disabled";
        link.innerHTML = `
          <i class="icon icon--small icon--pending" style="opacity: 0.5;"></i>
          <span style="opacity: 0.5;">${comp.name}</span>
          <span class="chip chip--small" style="opacity: 0.5; margin-left: 4px;">준비 중</span>
        `;

        // 클릭 이벤트 막기
        link.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log(
            `[ComponentsPage] ${comp.name} 컴포넌트는 준비 중입니다.`
          );
        });

        // 비활성화 스타일
        link.style.cursor = "not-allowed";
        link.style.pointerEvents = "auto"; // 클릭 이벤트는 받되 처리만 막음
      }

      item.appendChild(link);
      list.appendChild(item);
    });

    submenu.appendChild(list);
    categoryItem.appendChild(header);
    categoryItem.appendChild(submenu);
    nav.appendChild(categoryItem);
  });

  // 컴포넌트 총 개수 업데이트 (활성화/전체)
  const componentCount = document.getElementById("componentCount");
  if (componentCount) {
    const enabledComponents = allComponents.filter(
      (c) => c.enabled !== false
    ).length;
    const totalComponents = allComponents.length;
    componentCount.innerHTML = `<strong>${enabledComponents}</strong>/${totalComponents} Components`;
  }

  console.log("[ComponentsPage] Category navigation rendered");
}

/**
 * URL 파라미터에서 컴포넌트 ID 추출
 * @returns {string|null} 컴포넌트 ID 또는 null
 */
function getComponentFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("component");
}

/**
 * URL에 컴포넌트 파라미터 업데이트
 * @param {string} componentId - 컴포넌트 ID
 */
function updateURLParameter(componentId) {
  const url = new URL(window.location);
  url.searchParams.set("component", componentId);

  // 브라우저 히스토리에 추가 (뒤로가기 지원)
  window.history.pushState({ component: componentId }, "", url.toString());

  console.log(`[ComponentsPage] URL updated: ${url.toString()}`);
}

/**
 * 컴포넌트 표시 (컨텐츠 전환 방식)
 * @param {string} componentId - 컴포넌트 ID
 * @param {boolean} updateURL - URL 업데이트 여부 (기본: true)
 */
function showComponent(componentId, updateURL = true) {
  const container = document.getElementById("componentContentContainer");
  if (!container) {
    console.warn("[ComponentsPage] Component container not found");
    return;
  }

  const config = window.ComponentConfig.getComponentConfig(componentId);
  if (!config) {
    console.warn(`[ComponentsPage] Component config not found: ${componentId}`);
    return;
  }

  // URL 업데이트 (선택적)
  if (updateURL) {
    updateURLParameter(componentId);
  }

  // 기본 환영 섹션 숨기기
  const welcomeSection = document.getElementById("defaultWelcomeSection");
  if (welcomeSection) {
    welcomeSection.style.display = "none";
  }

  // 제목과 설명 업데이트
  const title = document.getElementById("currentComponentTitle");
  const description = document.getElementById("currentComponentDescription");

  if (title) {
    title.textContent = config.name;
  }

  if (description) {
    description.textContent = `${config.name} 컴포넌트의 다양한 변형과 사용 예시를 확인할 수 있습니다.`;
  }

  // Fade out 애니메이션
  container.style.opacity = "0";
  container.style.transition = "opacity 0.2s ease-in-out";

  setTimeout(async () => {
    // 기존 컴포넌트 섹션만 제거 (welcomeSection은 유지)
    const existingSections = container.querySelectorAll(".component-section");
    existingSections.forEach((section) => section.remove());

    // 새 컴포넌트 섹션 생성
    const section = document.createElement("section");
    section.className = "component-section";
    section.dataset.component = componentId;
    const dataSource = config.dataSource || componentId;
    section.dataset.source = dataSource;

    container.appendChild(section);

    // 컴포넌트 엔진으로 렌더링
    try {
      if (window.componentEngine) {
        await window.componentEngine.loadAndMount(
          componentId,
          dataSource,
          section
        );
        console.log(`[ComponentsPage] ✓ ${componentId} component rendered`);

        // 코드 보기 버튼 추가
        if (typeof window.addCodeToggleButtons === "function") {
          window.addCodeToggleButtons(section);
        }

        // 동적으로 추가된 컴포넌트의 초기화는 scripts-init.js에서 자동 처리됨
        // 이벤트는 이미 위임으로 처리되므로 추가 초기화 불필요
      } else {
        console.warn("[ComponentsPage] componentEngine not found");
      }
    } catch (error) {
      console.error(`[ComponentsPage] Failed to render ${componentId}:`, error);
      section.innerHTML = `<div class="error">컴포넌트를 불러오는데 실패했습니다.</div>`;
    }

    // Fade in 애니메이션
    setTimeout(() => {
      container.style.opacity = "1";

      // 스크롤을 최상단으로 이동
      window.scrollTo({ top: 0, behavior: "smooth" });

      // 컴포넌트 전환 완료 이벤트 발생 (라이브러리 초기화용)
      const event = new CustomEvent("component:changed", {
        detail: { componentId: componentId },
      });
      document.dispatchEvent(event);
    }, 50);

    // LNB 활성화 상태 업데이트
    updateLNBActiveState(componentId);

    console.log(`[ComponentsPage] Showing component: ${componentId}`);
  }, 200);
}

/**
 * LNB 활성화 상태 업데이트
 * @param {string} componentId - 활성화할 컴포넌트 ID
 */
function updateLNBActiveState(componentId) {
  // 모든 LNB 링크에서 active 클래스 제거
  document.querySelectorAll(".lnb-submenu__link").forEach((link) => {
    link.classList.remove("lnb-submenu__link--active");
  });

  // 선택된 컴포넌트에 active 클래스 추가
  const activeLink = document.querySelector(
    `.lnb-submenu__link[data-component-id="${componentId}"]`
  );
  if (activeLink) {
    activeLink.classList.add("lnb-submenu__link--active");
  }
}

/**
 * 컴포넌트 검색 기능
 */
function initComponentSearch() {
  const searchInput = document.getElementById("componentSearchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const menuItems = document.querySelectorAll(".lnb-submenu__item");

    menuItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        item.style.display = "";
        // 매칭되면 카테고리도 펼치기
        const category = item.closest(".lnb-menu-item");
        if (category) {
          category.classList.add("is-active");
        }
      } else {
        item.style.display = "none";
      }
    });

    // 모든 항목이 숨겨진 카테고리는 숨기기
    document.querySelectorAll(".lnb-menu-item").forEach((category) => {
      const visibleItems = category.querySelectorAll(
        '.lnb-submenu__item:not([style*="display: none"])'
      );
      if (visibleItems.length === 0) {
        category.style.display = "none";
      } else {
        category.style.display = "";
      }
    });
  });
}

/**
 * 브라우저 히스토리 이벤트 처리
 */
function initHistoryHandling() {
  // 뒤로가기/앞으로가기 버튼 처리
  window.addEventListener("popstate", function (event) {
    console.log("[ComponentsPage] History navigation detected");

    if (event.state && event.state.component) {
      // 히스토리에서 컴포넌트 정보가 있으면 해당 컴포넌트 표시 (URL 업데이트 없이)
      showComponent(event.state.component, false);
    } else {
      // URL 파라미터 확인
      const componentFromURL = getComponentFromURL();
      if (componentFromURL) {
        showComponent(componentFromURL, false);
      } else {
        // 파라미터가 없으면 기본 환영 화면 표시
        showWelcomeScreen();
      }
    }
  });
}

/**
 * 기본 환영 화면 표시
 */
function showWelcomeScreen() {
  const container = document.getElementById("componentContentContainer");
  const welcomeSection = document.getElementById("defaultWelcomeSection");

  if (container && welcomeSection) {
    // 기존 컴포넌트 섹션 제거
    const existingSections = container.querySelectorAll(".component-section");
    existingSections.forEach((section) => section.remove());

    // 환영 섹션 표시
    welcomeSection.style.display = "block";
    container.style.opacity = "1";

    // LNB 활성화 상태 초기화
    document.querySelectorAll(".lnb-submenu__link").forEach((link) => {
      link.classList.remove("lnb-submenu__link--active");
    });

    console.log("[ComponentsPage] Welcome screen displayed");
  }
}

/**
 * URL 파라미터 기반 초기 컴포넌트 로드
 */
function loadComponentFromURL() {
  const componentId = getComponentFromURL();

  if (componentId) {
    // URL에 컴포넌트 파라미터가 있으면 해당 컴포넌트 표시
    const config = window.ComponentConfig.getComponentConfig(componentId);
    if (config && config.enabled !== false) {
      console.log(
        `[ComponentsPage] Loading component from URL: ${componentId}`
      );
      showComponent(componentId, false); // URL은 이미 설정되어 있으므로 업데이트하지 않음
    } else {
      console.warn(
        `[ComponentsPage] Component not found or disabled: ${componentId}`
      );
      showWelcomeScreen();
    }
  } else {
    // URL 파라미터가 없으면 기본 환영 화면 표시
    showWelcomeScreen();
  }
}

/**
 * 페이지 초기화
 */
function initComponentsPage() {
  console.log("[ComponentsPage] Initializing...");

  // 1. LNB 카테고리 네비게이션 생성
  renderCategoryNavigation();
  initComponentSearch();

  // 2. 브라우저 히스토리 관리 초기화
  initHistoryHandling();

  // 3. URL 파라미터 기반 초기 컴포넌트 로드
  loadComponentFromURL();

  // 4. 라이브러리 적용 전 원본 소스 보존
  if (typeof window.initComponentSourcePreservation === "function") {
    window.initComponentSourcePreservation();
  }

  // 5. 코드 보기 버튼을 모든 component-item에 동적으로 추가
  if (typeof window.addCodeToggleButtons === "function") {
    window.addCodeToggleButtons();
  }

  // 아이콘 렌더링은 IconRenderer가 Component Engine을 통해 자동으로 처리

  // 컴포넌트 전환 시 특정 라이브러리 초기화
  document.addEventListener("component:changed", function (e) {
    const componentId = e.detail.componentId;

    if (componentId === "table") {
      setTimeout(() => initDataTable(), 300);
    }
    if (componentId === "input") {
      setTimeout(() => initDatePicker(), 300);
    }
    if (componentId === "dropdown") {
      setTimeout(() => initSelect2(), 300);
    }
  });

  // Dropdown 이벤트 리스너 (테스트용)
  document.addEventListener("dropdown:select", function (e) {
    console.log("Dropdown selected:", e.detail);
  });

  document.addEventListener("dropdown:open", function (e) {
    console.log("Dropdown opened:", e.detail.dropdown);
  });

  document.addEventListener("dropdown:close", function (e) {
    console.log("Dropdown closed:", e.detail.dropdown);
  });

  document.addEventListener("dropdown:clear", function (e) {
    console.log("Dropdown cleared:", e.detail.dropdown);
  });

  // Accordion 이벤트 리스너 (테스트용)
  document.addEventListener("accordion:open", function (e) {
    console.log("Accordion opened:", e.detail);
  });

  document.addEventListener("accordion:close", function (e) {
    console.log("Accordion closed:", e.detail);
  });

  console.log("[ComponentsPage] Initialized successfully");
}

// 전역 함수로 노출
window.showIconCode = showIconCode;
window.copyIconCode = copyIconCode;
window.showComponent = showComponent;
window.getComponentFromURL = getComponentFromURL;
window.updateURLParameter = updateURLParameter;
window.showWelcomeScreen = showWelcomeScreen;

// DOM 로드 시 자동 초기화
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initComponentsPage);
} else {
  initComponentsPage();
}

console.log("[ComponentsPage] Loaded successfully");

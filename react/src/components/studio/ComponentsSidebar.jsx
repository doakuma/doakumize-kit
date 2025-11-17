import { useState, useMemo } from "react";
import LnbTreeMenu, { LnbMenuItem, LnbSubmenuItem } from "./LnbTreeMenu";
import "./ComponentsSidebar.css";

/**
 * Components Sidebar
 * 컴포넌트 카테고리 네비게이션
 */
function ComponentsSidebar({
  components,
  categories,
  selectedComponent,
  onSelectComponent,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // 카테고리별로 그룹핑 (React 기준)
  const groupedComponents = useMemo(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return components
        .filter((comp) => comp.name.toLowerCase().includes(query))
        .reduce((acc, comp) => {
          if (!acc[comp.category]) {
            acc[comp.category] = [];
          }
          acc[comp.category].push(comp);
          return acc;
        }, {});
    }

    return components.reduce((acc, comp) => {
      if (!acc[comp.category]) {
        acc[comp.category] = [];
      }
      acc[comp.category].push(comp);
      return acc;
    }, {});
  }, [components, searchQuery]);

  const enabledCount =
    components.filter((c) => {
      if (typeof c.enabled === "object") {
        return c.enabled?.react === true;
      }
      return c.enabled !== false;
    }).length +
    "/" +
    components.length;

  return (
    <aside className="components-sidebar">
      {/* <div className="sidebar-header">
        <h2 className="sidebar-title">Component Studio</h2>
      </div> */}

      <div className="lnb-body-util">
        <div className="input-field input-field--start-icon">
          <input
            type="text"
            className="input"
            placeholder="컴포넌트 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <LnbTreeMenu
        items={useMemo(() => {
          // 카테고리별로 그룹핑된 데이터를 LnbTreeMenu 형식으로 변환
          const sortedCategories = Object.entries(groupedComponents).sort(
            ([catA], [catB]) => {
              const order = [
                categories.OVERVIEW,
                categories.FOUNDATION,
                categories.FORM_CONTROLS,
                categories.DATA_DISPLAY,
                categories.FEEDBACK,
                categories.NAVIGATION,
              ];
              return order.indexOf(catA) - order.indexOf(catB);
            }
          );

          return sortedCategories.map(([category, items]) => {
            // React 활성화된 컴포넌트 개수 계산
            const completedCount = items.filter((comp) => {
              if (typeof comp.enabled === "object") {
                return comp.enabled?.react === true;
              }
              return comp.enabled !== false;
            }).length;
            const totalCount = items.length;

            // 정렬된 서브메뉴 아이템 생성
            const children = items
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((comp) => {
                const isEnabled =
                  typeof comp.enabled === "object"
                    ? comp.enabled?.react === true
                    : comp.enabled !== false;

                return {
                  id: comp.id,
                  label: comp.name,
                  disabled: !isEnabled,
                };
              });

            return {
              id: category,
              label: (
                <>
                  {category}{" "}
                  <span className="text-tertiary">
                    ({completedCount}/{totalCount})
                  </span>
                </>
              ),
              defaultExpanded: true, // 기본적으로 펼침
              showToggle: true,
              children,
            };
          });
        }, [groupedComponents, categories])}
        activeItemId={selectedComponent}
        onItemClick={(e, itemId) => {
          e?.preventDefault();
          onSelectComponent(itemId);
        }}
      />

      <div className="sidebar-footer">
        <p className="sidebar-footer-text">
          <span>{enabledCount}</span> Components
        </p>
        <p className="sidebar-footer-version">Akumize Design System v1.0</p>
      </div>
    </aside>
  );
}

export default ComponentsSidebar;

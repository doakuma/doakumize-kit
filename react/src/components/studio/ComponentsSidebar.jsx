import { useState, useMemo } from "react";
import LnbTreeMenu, { LnbMenuItem, LnbSubmenuItem } from "./LnbTreeMenu";

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

  const transformToLnbItems = useMemo(() => {
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
      const hasChildren = items.some((comp) => comp.hasChildren !== false);

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
      // hasChildren이 false이고 컴포넌트가 1개면 실제 컴포넌트 id 사용
      const itemId =
        !hasChildren && items.length === 1 ? items[0].id : category;
      return {
        id: itemId,
        label: (
          <>
            {category}
            {hasChildren && (
              <span className="text-tertiary">
                ({completedCount}/{totalCount})
              </span>
            )}
          </>
        ),
        defaultExpanded: false, // 기본적으로 펼침
        showToggle: true,
        children,
        hasChildren,
      };
    });
  }, [groupedComponents, categories]);

  return (
    <aside className="lnb">
      <div className="lnb-content">
        <header className="lnb-header">
          <h1 className="text-h4">Component Studio</h1>
        </header>
        <main className="lnb-body">
          <div className="lnb-body-util">
            <div className="input-field input-field--start-icon">
              <i class="icon icon--medium icon--search input-icon"></i>
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
            items={transformToLnbItems}
            activeItemId={selectedComponent}
            onItemClick={(e, itemId) => {
              e?.preventDefault();
              onSelectComponent(itemId);
            }}
          />
        </main>

        <footer className="lnb-footer">
          <div className="lnb-footer-info">
            <p className="text-sub-md-12 text-secondary">
              <span>{enabledCount}</span> Components
            </p>
            <p className="text-sub-md-12 text-tertiary">
              Akumize Design System v1.0
            </p>
          </div>
        </footer>
      </div>
    </aside>
  );
}

export default ComponentsSidebar;

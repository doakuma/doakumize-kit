import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  COMPONENT_LIST,
  COMPONENT_CATEGORIES,
  isComponentEnabled,
} from "@/data/components-config";

/**
 * Components Section
 * 컴포넌트 목록 및 설명
 */
function Components() {
  // React 기준 진행률 계산
  const progress = useMemo(() => {
    const completedCount = COMPONENT_LIST.filter((comp) =>
      isComponentEnabled(comp, "react")
    ).length;
    const totalCount = COMPONENT_LIST.length;
    const percentage = Math.round((completedCount / totalCount) * 100);

    return {
      completed: completedCount,
      total: totalCount,
      percentage,
    };
  }, []);

  // 카테고리별 그룹핑 및 진행률 계산
  const categoryGroups = useMemo(() => {
    const groups = {};

    // 카테고리별로 그룹핑
    Object.values(COMPONENT_CATEGORIES).forEach((category) => {
      groups[category] = {
        completed: [],
        pending: [],
      };
    });

    // 컴포넌트 분류 (React 기준)
    COMPONENT_LIST.forEach((comp) => {
      const category = comp.category;
      if (!groups[category]) return;

      const isCompleted = isComponentEnabled(comp, "react");
      if (isCompleted) {
        groups[category].completed.push(comp);
      } else {
        groups[category].pending.push(comp);
      }
    });

    // 카테고리 순서 정의 (Overview 제외)
    const categoryOrder = [
      COMPONENT_CATEGORIES.FOUNDATION,
      COMPONENT_CATEGORIES.FORM_CONTROLS,
      COMPONENT_CATEGORIES.DATA_DISPLAY,
      COMPONENT_CATEGORIES.FEEDBACK,
      COMPONENT_CATEGORIES.NAVIGATION,
    ];

    return categoryOrder.map((category) => {
      const group = groups[category];
      const completedCount = group.completed.length;
      const totalCount = group.completed.length + group.pending.length;

      // 정렬된 컴포넌트 리스트
      const completedItems = [...group.completed].sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );
      const pendingItems = [...group.pending].sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );

      return {
        category,
        completedCount,
        totalCount,
        completedItems,
        pendingItems,
      };
    });
  }, []);

  return (
    <section id="components">
      <div className="container">
        <h2 className="text-h2">Components</h2>
        <h2 className="text-h2" style={{ marginBottom: "48px" }}>
          컴포넌트 라이브러리
        </h2>

        {/* 카테고리별 카드들 */}
        <div className="categories-grid">
          {categoryGroups.map((group) => (
            <div key={group.category} className="category-card">
              <h3 className="category-title">
                {group.category}
                <span className="category-count">
                  ({group.completedCount}/{group.totalCount} 완성)
                </span>
              </h3>
              <div className="component-list">
                {group.completedItems.map((comp) => (
                  <span
                    key={comp.id}
                    className="component-item component-item--completed"
                  >
                    {comp.name} ✅
                  </span>
                ))}
                {group.pendingItems.map((comp) => (
                  <span
                    key={comp.id}
                    className="component-item component-item--pending"
                  >
                    {comp.name} 🚧
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 진행 현황 섹션 */}
        <div className="progress-section">
          <p className="progress-text">
            진행률:{" "}
            <strong>
              {progress.completed}/{progress.total} Components (
              {progress.percentage}%)
            </strong>
          </p>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="components-cta">
          <Link to="/components" className="btn btn--primary btn--large">
            모든 컴포넌트 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Components;

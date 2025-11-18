import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  COMPONENT_LIST,
  COMPONENT_CATEGORIES,
  isComponentEnabled,
} from "../../data/components-config";

/**
 * Features Section
 * 주요 기능 소개 및 진행 현황
 */
function Features() {
  const features = [
    {
      icon: "🎨",
      title: "일관된 디자인 시스템",
      description:
        "색상, 타이포그래피, 간격까지 CSS Variables로 중앙 관리됩니다. 디자인 토큰 하나만 바꾸면 전체 프로젝트에 즉시 반영되어 브랜드 아이덴티티를 일관되게 유지할 수 있습니다.",
    },
    {
      icon: "🧩",
      title: "풍부한 컴포넌트 라이브러리",
      description:
        "Button, Input부터 Modal, Tab까지 다양한 컴포넌트를 제공합니다. 5개 카테고리로 체계적으로 분류되어 있어 필요한 UI를 쉽고 빠르게 찾아 사용할 수 있습니다.",
    },
    {
      icon: "✨",
      title: "자유로운 커스터마이징",
      description:
        "CSS Variables만 수정하면 프로젝트 특성에 맞게 자유롭게 변형할 수 있습니다. 디자인 토큰 구조 덕분에 일관성을 유지하면서도 브랜드 컬러와 스타일을 원하는 대로 조정할 수 있습니다.",
    },
    {
      icon: "⚡",
      title: "간편한 설치 및 사용",
      description:
        "복사 & 붙여넣기로 즉시 사용하거나, 패키지 매니저로 설치할 수 있습니다. npm, pnpm, yarn 등 원하는 방식으로 프로젝트에 통합하고, import 한 줄이면 바로 적용할 수 있어 빠른 프로토타이핑이 가능합니다.",
    },
  ];

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
    <section id="features">
      <div className="container">
        <h2 className="text-h2">주요 기능</h2>

        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* 컴포넌트 라이브러리 섹션 */}
        <div style={{ marginTop: "80px" }}>
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
      </div>
    </section>
  );
}

export default Features;

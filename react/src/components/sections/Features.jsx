/**
 * Features Section
 * 주요 기능 소개
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
      title: "npm으로 간편 설치",
      description:
        "npm install 한 번이면 모든 컴포넌트를 사용할 수 있습니다. 버전 관리가 자동으로 되고, import 한 줄이면 바로 프로젝트에 적용할 수 있어 빠른 프로토타이핑이 가능합니다.",
    },
  ];

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
      </div>
    </section>
  );
}

export default Features;

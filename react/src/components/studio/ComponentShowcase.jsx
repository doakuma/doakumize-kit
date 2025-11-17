import { Button } from "../ui/Button";
import ComponentCodeViewer from "./ComponentCodeViewer";
import "./ComponentShowcase.css";

/**
 * Component Showcase
 * 개별 컴포넌트 쇼케이스 (Variants, Props, 코드 미리보기)
 */
function ComponentShowcase({ componentId }) {
  // 컴포넌트별 쇼케이스 데이터 (나중에 별도 파일로 분리 가능)
  const showcaseData = {
    button: {
      title: "Button",
      description: "다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.",
      variants: [
        {
          title: "Variants",
          items: [
            { name: "Primary", component: <Button variant="primary">Primary</Button> },
            { name: "Secondary", component: <Button variant="secondary">Secondary</Button> },
            { name: "Default", component: <Button variant="default">Default</Button> },
            { name: "Ghost", component: <Button variant="ghost">Ghost</Button> },
            { name: "Text", component: <Button variant="text">Text</Button> },
            { name: "Point", component: <Button variant="point">Point</Button> },
            { name: "Point Secondary", component: <Button variant="point-secondary">Point Secondary</Button> },
          ]
        },
        {
          title: "Sizes",
          items: [
            { name: "Small", component: <Button size="small">Small</Button> },
            { name: "Medium", component: <Button size="medium">Medium</Button> },
            { name: "Large", component: <Button size="large">Large</Button> },
          ]
        },
        {
          title: "States",
          items: [
            { name: "Disabled", component: <Button disabled>Disabled</Button> },
            { name: "Circle", component: <Button circle>○</Button> },
          ]
        }
      ],
      props: [
        { name: "variant", type: "string", default: "primary", description: "버튼 스타일 (primary, secondary, default, ghost, text, point, point-secondary)" },
        { name: "size", type: "string", default: "medium", description: "버튼 크기 (small, medium, large)" },
        { name: "disabled", type: "boolean", default: "false", description: "비활성화 여부" },
        { name: "circle", type: "boolean", default: "false", description: "원형 버튼 여부" },
        { name: "startIcon", type: "ReactNode", default: "-", description: "시작 아이콘" },
        { name: "endIcon", type: "ReactNode", default: "-", description: "끝 아이콘" },
        { name: "children", type: "ReactNode", default: "-", description: "버튼 텍스트" },
      ],
      codeExample: `import { Button } from "@doakumize-kit/react";

function App() {
  return (
    <div>
      <Button variant="primary" size="medium">
        Click me
      </Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
    </div>
  );
}`
    }
  };

  const data = showcaseData[componentId];

  if (!data) {
    return (
      <div className="showcase-not-found">
        <h2>컴포넌트를 찾을 수 없습니다.</h2>
        <p>컴포넌트 ID: {componentId}</p>
      </div>
    );
  }

  return (
    <div className="component-showcase">
      <header className="showcase-header">
        <h1 className="showcase-title">{data.title}</h1>
        <p className="showcase-description">{data.description}</p>
      </header>

      {/* Variants 섹션 */}
      {data.variants.map((variant, idx) => (
        <section key={idx} className="showcase-section">
          <h2 className="showcase-section-title">{variant.title}</h2>
          <div className="showcase-items">
            {variant.items.map((item, itemIdx) => (
              <div key={itemIdx} className="showcase-item">
                <div className="showcase-preview">
                  {item.component}
                </div>
                <p className="showcase-label">{item.name}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Props 섹션 */}
      <section className="showcase-section">
        <h2 className="showcase-section-title">Props</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {data.props.map((prop, idx) => (
                <tr key={idx}>
                  <td><code className="props-code">{prop.name}</code></td>
                  <td><code className="props-code">{prop.type}</code></td>
                  <td><code className="props-code">{prop.default}</code></td>
                  <td>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 코드 예제 */}
      <section className="showcase-section">
        <h2 className="showcase-section-title">Usage</h2>
        <ComponentCodeViewer code={data.codeExample} language="jsx" />
      </section>
    </div>
  );
}

export default ComponentShowcase;


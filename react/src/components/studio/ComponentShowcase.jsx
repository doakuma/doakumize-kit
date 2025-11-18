import React from "react";
import ComponentCodeViewer from "./ComponentCodeViewer";
import { COMPONENT_LIST, isComponentEnabled } from "@/data/components-config";
import "./ComponentShowcase.css";

/**
 * 컴포넌트 ID를 컴포넌트 이름으로 변환
 * 예: "button" -> "Button", "file-upload" -> "FileUpload"
 */
function toComponentName(id) {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/**
 * 컴포넌트 showcase 파일 경로 생성
 * 예: "button" -> "@/components/ui/Button/Button.showcase.jsx"
 */
function getShowcasePath(componentId) {
  const componentName = toComponentName(componentId);
  return `@/components/ui/${componentName}/${componentName}.showcase.jsx`;
}

/**
 * 자동 등록된 showcase 맵 생성
 * components-config.js의 enabled된 컴포넌트들만 자동으로 등록
 */
function createShowcaseMap() {
  const map = {};

  COMPONENT_LIST.forEach((comp) => {
    // React가 enabled된 컴포넌트만 등록
    if (isComponentEnabled(comp, "react")) {
      const showcasePath = getShowcasePath(comp.id);
      map[comp.id] = () =>
        import(/* @vite-ignore */ showcasePath)
          .then((module) => {
            // export 이름 규칙: {componentId}Showcase (camelCase) 또는 default
            // 예: "button" -> "buttonShowcase"
            const exportName = `${comp.id}Showcase`;

            // 디버깅: 모듈에 어떤 export가 있는지 확인
            if (import.meta.env.DEV) {
              console.log(`[ComponentShowcase] Loading ${comp.id}:`, {
                path: showcasePath,
                exportName,
                availableExports: Object.keys(module),
                hasExport: exportName in module,
              });
            }

            const data = module[exportName] || module.default || module;

            // 함수인 경우 호출
            if (typeof data === "function") {
              return data();
            }

            return data;
          })
          .catch((err) => {
            console.warn(
              `[ComponentShowcase] Showcase not found for ${comp.id}:`,
              err
            );
            return null;
          });
    }
  });

  return map;
}

// 자동 등록된 showcase 맵 (한 번만 생성)
const showcaseMap = createShowcaseMap();

/**
 * Component Showcase
 * 개별 컴포넌트 쇼케이스 (Variants, Props, 코드 미리보기)
 */
function ComponentShowcase({ componentId }) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const loadShowcase = async () => {
      setLoading(true);
      setError(null);

      try {
        const loader = showcaseMap[componentId];
        if (!loader) {
          throw new Error(
            `Showcase not registered for component: ${componentId}`
          );
        }

        const showcaseData = await loader();

        if (!showcaseData) {
          throw new Error(
            `Showcase file exists but no data exported for: ${componentId}`
          );
        }

        setData(showcaseData);
      } catch (err) {
        console.error(
          `[ComponentShowcase] Failed to load showcase for ${componentId}:`,
          err
        );
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (componentId) {
      loadShowcase();
    }
  }, [componentId]);

  if (loading) {
    return (
      <div className="showcase-loading">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="showcase-not-found">
        <h2>컴포넌트를 찾을 수 없습니다.</h2>
        <p>컴포넌트 ID: {componentId}</p>
        {error && <p className="error-message">에러: {error}</p>}
        <p className="hint">
          💡 컴포넌트 폴더에{" "}
          <code>{toComponentName(componentId)}.showcase.js</code> 파일을
          추가해주세요.
        </p>
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
      {data.variants?.map((variant, idx) => (
        <section key={idx} className="showcase-section">
          <h2 className="showcase-section-title">{variant.title}</h2>
          <div className="showcase-items">
            {variant.items.map((item, itemIdx) => (
              <div key={itemIdx} className="showcase-item">
                <div className="showcase-preview">{item.component}</div>
                <p className="showcase-label">{item.name}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Props 섹션 */}
      {data.props && (
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
                    <td>
                      <code className="props-code">{prop.name}</code>
                    </td>
                    <td>
                      <code className="props-code">{prop.type}</code>
                    </td>
                    <td>
                      <code className="props-code">{prop.default}</code>
                    </td>
                    <td>{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 코드 예제 */}
      {data.codeExample && (
        <section className="showcase-section">
          <h2 className="showcase-section-title">Usage</h2>
          <ComponentCodeViewer code={data.codeExample} language="jsx" />
        </section>
      )}
    </div>
  );
}

export default ComponentShowcase;

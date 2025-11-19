import React from "react";
import ComponentCodeViewer from "./ComponentCodeViewer";
import { getShowcase } from "@/components/ui/showcases";
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
 * Component Showcase
 * 개별 컴포넌트 쇼케이스 (Variants, Props, 코드 미리보기)
 */
function ComponentShowcase({ componentId }) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!componentId) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    const loadShowcase = () => {
      setLoading(true);
      setError(null);

      try {
        // 정적 import된 showcase 데이터 가져오기
        const showcaseData = getShowcase(componentId);

        if (!showcaseData) {
          throw new Error(`Showcase not found for component: ${componentId}`);
        }

        // 함수인 경우 호출
        const data =
          typeof showcaseData === "function" ? showcaseData() : showcaseData;

        setData(data);
        setError(null);
      } catch (err) {
        console.error(
          `[ComponentShowcase] Failed to load showcase for ${componentId}:`,
          err
        );
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    // 다음 틱에서 실행하여 로딩 상태가 잠깐 보이도록
    const timeoutId = setTimeout(loadShowcase, 0);
    return () => clearTimeout(timeoutId);
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

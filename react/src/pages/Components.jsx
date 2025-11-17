import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ComponentsSidebar from "../components/studio/ComponentsSidebar";
import ComponentShowcase from "../components/studio/ComponentShowcase";
import {
  COMPONENT_LIST,
  COMPONENT_CATEGORIES,
} from "../data/components-config";
import "./Components.css";

/**
 * Components Page
 * React 컴포넌트 스튜디오 메인 페이지
 */
function Components() {
  const { componentId } = useParams();
  const navigate = useNavigate();

  // URL 파라미터를 직접 사용
  const selectedComponent = useMemo(() => componentId || null, [componentId]);

  // 사이드바에서 컴포넌트 선택 시 URL 업데이트
  const handleSelectComponent = (id) => {
    navigate(`/components/${id}`);
  };

  return (
    <Layout>
      <div className="components-page">
        <ComponentsSidebar
          components={COMPONENT_LIST}
          categories={COMPONENT_CATEGORIES}
          selectedComponent={selectedComponent}
          onSelectComponent={handleSelectComponent}
        />

        <main className="components-content">
          {selectedComponent ? (
            <ComponentShowcase componentId={selectedComponent} />
          ) : (
            <div className="welcome-section">
              <h1>Component Studio</h1>
              <p>왼쪽에서 컴포넌트를 선택해주세요.</p>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}

export default Components;

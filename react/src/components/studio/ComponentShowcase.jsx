import React, { useMemo, useEffect, useState, useRef, Fragment } from "react";
import ComponentCodeViewer from "./ComponentCodeViewer";
import ComponentNavigation from "./ComponentNavigation";
import { getShowcase } from "@/components/ui/showcases";
import { parsePropTypes } from "@/utils/propTypesParser";
import { elementToCode } from "@/utils/elementToCode";
import "./ComponentShowcase.css";
import { Chip } from "../ui/Chip/Chip";

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

// 스크롤 offset 상수 (헤더 + 네비게이션)
const HEADER_HEIGHT = 96; // px
const NAVIGATION_TOP_OFFSET = 32; // px (네비게이션 sticky top의 추가 여백)
const TOTAL_OFFSET = HEADER_HEIGHT + NAVIGATION_TOP_OFFSET; // 128px

function ComponentShowcase({ componentId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef({});

  useEffect(() => {
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

  // Props 파싱 (propTypes, defaultProps, propDescriptions로부터)
  const parsedProps = useMemo(() => {
    if (!data) return null;
    if (
      data.propTypes &&
      data.defaultProps !== undefined &&
      data.propDescriptions
    ) {
      // console.debug("parsedProps data", data);
      return parsePropTypes(
        data.propTypes,
        data.defaultProps,
        data.propDescriptions,
        data.propTypesString
      );
    }
    return null;
  }, [data]);

  // 네비게이션에 전달할 구조 (title, description 제외)
  const navigationStructure = useMemo(() => {
    if (!data) return {};
    const structure = {};
    if (data.useage) structure.useage = data.useage;
    if (data.property) structure.property = data.property;
    if (parsedProps) structure.props = parsedProps;
    return structure;
  }, [data, parsedProps]);

  // IntersectionObserver로 현재 보이는 섹션 감지
  useEffect(() => {
    if (!data) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${TOTAL_OFFSET}px 0px -70% 0px`, // 헤더 + 네비게이션 높이만큼 offset
        threshold: 0,
      }
    );

    // 모든 섹션 observe
    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [data]);

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

  /**
   * 네비게이션 클릭 시 해당 섹션으로 스크롤 이동 (상단 offset 보정)
   * - 헤더 높이: 96px (#header)
   * - 네비게이션 sticky top: 128px (96px 헤더 + 32px 여백)
   * - 스크롤 시 섹션이 네비게이션 아래에 보이도록 offset 계산
   */
  const handleClickNav = (sectionId) => {
    const target = sectionRefs.current[sectionId];
    if (!target) return;

    // 요소의 현재 뷰포트 기준 상대 위치
    const elementRect = target.getBoundingClientRect();
    // 현재 스크롤 위치 (window.pageYOffset는 deprecated, scrollY 사용)
    const currentScrollY = window.scrollY || window.pageYOffset;
    // 요소의 문서 기준 절대 위치
    const elementAbsoluteTop = elementRect.top + currentScrollY;
    // offset을 고려한 스크롤 목표 위치
    const scrollTargetPosition = elementAbsoluteTop - TOTAL_OFFSET;

    window.scrollTo({
      top: Math.max(0, scrollTargetPosition), // 음수 방지
      behavior: "smooth",
    });
  };

  /**
   * Property items에서 코드 문자열 생성
   * - item.code가 있으면 우선 사용
   * - 없으면 item.component를 JSX 코드로 변환
   */
  const createCodeInfo = (items) => {
    if (!items || !Array.isArray(items)) return "";
    return items
      .map((item) => {
        // code 필드가 있으면 우선 사용
        if (item.code) return item.code;
        // component를 JSX 코드로 변환
        if (item.component) {
          try {
            return elementToCode(item.component);
          } catch (err) {
            console.warn(
              `[ComponentShowcase] Failed to convert element to code for ${item.name}:`,
              err
            );
            return `// ${item.name} - 코드 변환 실패`;
          }
        }
        return "";
      })
      .filter(Boolean) // 빈 문자열 제거
      .join("\n");
  };

  return (
    <div className="component-showcase">
      <div className="showcase-content">
        <header className="showcase-header">
          <h1 className="showcase-title">{data.title}</h1>
          <p className="showcase-description">{data.description}</p>
        </header>

        {/* 코드 예제 */}
        {data.useage && (
          <section
            className="showcase-section"
            id="showcaseUseage"
            ref={(el) => (sectionRefs.current["showcaseUseage"] = el)}
          >
            <h2 className="text-h1">Usage</h2>
            <ComponentCodeViewer code={data.useage} language="jsx" />
          </section>
        )}
        {/* Property 섹션 */}
        <section
          className="showcase-section"
          id="showcaseProperty"
          ref={(el) => (sectionRefs.current[`showcaseProperty`] = el)}
        >
          <h2 className="text-h1">Properties</h2>
          {data.property?.map((property, idx) => (
            <Fragment key={idx}>
              <h2
                className="showcase-section-title"
                id={`showcaseProperty${property.title}`}
                ref={(el) =>
                  (sectionRefs.current[`showcaseProperty${property.title}`] =
                    el)
                }
              >
                {property.title}
              </h2>
              {property.description && (
                <p className="showcase-section-description">
                  {property.description}
                </p>
              )}
              <div className="showcase-items">
                {property.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="showcase-item">
                    <div className="showcase-preview">{item.component}</div>
                    {/* <p className="showcase-label">{item.name}</p> */}
                  </div>
                ))}
              </div>
              <div className="showcase-section-code">
                <ComponentCodeViewer
                  code={property.code || createCodeInfo(property.items)}
                  language="jsx"
                />
              </div>
            </Fragment>
          ))}
        </section>

        {/* Props 섹션 */}
        {parsedProps && (
          <section
            className="showcase-section"
            id="showcaseProps"
            ref={(el) => (sectionRefs.current["showcaseProps"] = el)}
          >
            <h2 className="showcase-section-title">Props Types</h2>
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
                  {parsedProps.map((prop, idx) => {
                    return (
                      <tr key={idx}>
                        <td>
                          <code className="props-code">{prop.name}</code>
                          {prop.required && (
                            <Chip variant="default" color="green" size="small">
                              Required
                            </Chip>
                          )}
                        </td>
                        <td>
                          <code className="props-code">{prop.type}</code>
                        </td>
                        <td>
                          <code className="props-code">{prop.default}</code>
                        </td>
                        <td>{prop.description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
      <ComponentNavigation
        structure={navigationStructure}
        onClickNav={handleClickNav}
        activeSection={activeSection}
      />
    </div>
  );
}

export default ComponentShowcase;

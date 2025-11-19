/**
 * React Element를 JSX 코드 문자열로 변환
 * @param {ReactElement} element - 변환할 React Element
 * @returns {string} JSX 코드 문자열
 */
export function elementToCode(element) {
  if (!element || typeof element !== "object") {
    return "";
  }

  // React Element가 아닌 경우 (문자열, 숫자 등)
  if (typeof element === "string" || typeof element === "number") {
    return String(element);
  }

  // React Element인 경우
  if (element.type) {
    const { type, props } = element;

    // 컴포넌트 이름 추출
    let componentName = "Component";
    if (typeof type === "string") {
      // HTML 태그 (div, button 등)
      componentName = type;
    } else if (type.displayName) {
      // displayName이 있는 경우
      componentName = type.displayName;
    } else if (type.name) {
      // 함수명이 있는 경우
      componentName = type.name;
    } else if (type.render) {
      // ForwardRef인 경우
      componentName =
        type.render?.displayName || type.render?.name || "ForwardRef";
    }

    // props를 JSX 속성으로 변환
    const propsArray = [];
    if (props) {
      Object.keys(props).forEach((key) => {
        // children은 별도 처리
        if (key === "children") return;

        const value = props[key];

        // undefined, null은 제외
        if (value === undefined || value === null) return;

        // React Element인 경우 (가장 먼저 체크)
        if (value && typeof value === "object" && value.type) {
          const elementCode = elementToCode(value);
          if (elementCode) {
            // 한 줄이면 인라인, 여러 줄이면 줄바꿈
            if (elementCode.includes("\n")) {
              propsArray.push(
                `${key}={\n${elementCode
                  .split("\n")
                  .map((line) => `  ${line}`)
                  .join("\n")}\n}`
              );
            } else {
              propsArray.push(`${key}={${elementCode}}`);
            }
          }
        }
        // boolean true는 속성명만
        else if (value === true) {
          propsArray.push(key);
        }
        // boolean false는 제외
        else if (value === false) {
          // 제외
        }
        // 문자열은 따옴표로 감싸기
        else if (typeof value === "string") {
          propsArray.push(`${key}="${value}"`);
        }
        // 숫자는 그대로
        else if (typeof value === "number") {
          propsArray.push(`${key}={${value}}`);
        }
        // 배열인 경우 (React Element가 아닌 순수 배열)
        else if (Array.isArray(value)) {
          // 배열 내부에 React Element가 있는지 확인
          const hasElements = value.some(
            (item) => item && typeof item === "object" && item.type
          );
          if (hasElements) {
            // React Element가 있으면 각각 변환
            const arrayCode = value
              .map((item) => {
                if (item && typeof item === "object" && item.type) {
                  return elementToCode(item);
                }
                return JSON.stringify(item);
              })
              .filter(Boolean)
              .join(", ");
            propsArray.push(`${key}={[${arrayCode}]}`);
          } else {
            // 순수 배열은 JSON.stringify
            propsArray.push(`${key}={${JSON.stringify(value)}}`);
          }
        }
        // 객체는 JSON.stringify (React Element가 아닌 경우)
        else if (typeof value === "object") {
          propsArray.push(`${key}={${JSON.stringify(value)}}`);
        }
        // 함수는 간단히 표시
        else if (typeof value === "function") {
          propsArray.push(`${key}={...}`);
        }
      });
    }

    const propsStr = propsArray.length > 0 ? ` ${propsArray.join(" ")}` : "";

    // children 처리
    let childrenStr = "";
    if (props?.children !== undefined && props?.children !== null) {
      if (Array.isArray(props.children)) {
        // 배열인 경우 각각 변환
        childrenStr = props.children
          .map((child) => {
            // 문자열/숫자는 그대로 반환
            if (typeof child === "string" || typeof child === "number") {
              return String(child);
            }
            return elementToCode(child);
          })
          .filter((str) => str !== "") // 빈 문자열만 제거
          .join("\n");
      } else {
        // 단일 children
        // 문자열/숫자는 그대로 반환
        if (
          typeof props.children === "string" ||
          typeof props.children === "number"
        ) {
          childrenStr = String(props.children);
        } else {
          childrenStr = elementToCode(props.children);
        }
      }
    }

    // JSX 코드 생성
    if (childrenStr) {
      // children이 있는 경우
      if (childrenStr.includes("\n")) {
        // 여러 줄인 경우
        return `<${componentName}${propsStr}>\n${childrenStr
          .split("\n")
          .map((line) => `  ${line}`)
          .join("\n")}\n</${componentName}>`;
      } else {
        // 한 줄인 경우
        return `<${componentName}${propsStr}>${childrenStr}</${componentName}>`;
      }
    } else {
      // children이 없는 경우 self-closing 태그 사용
      return `<${componentName}${propsStr} />`;
    }
  }

  return "";
}

import PropTypes from "prop-types";

/**
 * propTypes 정의 문자열에서 oneOf 값 추출
 * @param {string} propTypesString - propTypes 정의 문자열
 * @param {string} propName - prop 이름
 * @returns {Array|null} oneOf 값 배열 또는 null
 */
function extractOneOfFromString(propTypesString, propName) {
  if (!propTypesString || !propName) return null;

  // propName 을 정규식 안전하게 escape
  const escapedPropName = propName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // propName: PropTypes.oneOf([...]) (.isRequired 있을 수도 있음) 패턴 찾기
  const pattern = new RegExp(
    `${escapedPropName}\\s*:\\s*PropTypes\\.oneOf\\s*\\(\\s*\\[([^\\]]+)\\]\\s*\\)\\s*(?:\\.isRequired)?`,
    "s"
  );

  const match = propTypesString.match(pattern);
  if (!match) return null;

  const arrayContent = match[1];

  try {
    const values = arrayContent
      .split(",")
      .map((s) => s.trim().replace(/^["']|["']$/g, "")) // 앞뒤 따옴표 제거
      .filter(Boolean);

    return values.length > 0 ? values : null;
  } catch {
    return null;
  }
}

/**
 * propTypes의 타입을 문자열로 변환
 * @param {Function} propType - 개별 prop의 validator
 * @param {string} propName - prop 이름 (oneOf 추출용)
 * @param {string} propTypesString - propTypes 정의 문자열 (선택)
 * @returns {string}
 */
function getPropTypeString(propType, propName = "", propTypesString = "") {
  if (!propType) return "unknown";

  // 기본 타입들
  if (
    propType === PropTypes.string ||
    propType === PropTypes.string.isRequired
  ) {
    return "string";
  }
  if (
    propType === PropTypes.number ||
    propType === PropTypes.number.isRequired
  ) {
    return "number";
  }
  if (propType === PropTypes.bool || propType === PropTypes.bool.isRequired) {
    return "boolean";
  }
  if (propType === PropTypes.node || propType === PropTypes.node.isRequired) {
    return "ReactNode";
  }
  if (
    propType === PropTypes.element ||
    propType === PropTypes.element.isRequired
  ) {
    return "ReactElement";
  }
  if (propType === PropTypes.func || propType === PropTypes.func.isRequired) {
    return "function";
  }
  if (propType === PropTypes.array || propType === PropTypes.array.isRequired) {
    return "array";
  }
  if (
    propType === PropTypes.object ||
    propType === PropTypes.object.isRequired
  ) {
    return "object";
  }

  // oneOf: 소스 문자열에서 값 추출 (optional / required 둘 다 지원)
  if (propTypesString && propName) {
    const oneOfValues = extractOneOfFromString(propTypesString, propName);
    if (oneOfValues) {
      return `"${oneOfValues.join('" | "')}"`;
    }
  }

  return "unknown";
}

/**
 * propTypes를 파싱해서 문서화용 props 정보로 변환
 * @param {object} propTypes - 컴포넌트의 propTypes
 * @param {object} defaultProps - 컴포넌트의 defaultProps
 * @param {object} descriptions - prop별 description (선택)
 * @param {string} propTypesString - propTypes 정의 문자열 (oneOf 추출용, 선택)
 * @returns {Array} props 정보 배열
 */
export function parsePropTypes(
  propTypes,
  defaultProps = {},
  descriptions = {},
  propTypesString = ""
) {
  if (!propTypes) return [];

  return Object.keys(propTypes).map((propName) => {
    const propType = propTypes[propName];
    const defaultValue = defaultProps[propName];

    const type = getPropTypeString(propType, propName, propTypesString);

    // ✅ required 여부:
    // createChainableTypeChecker 구조 상
    // optional: validator.isRequired 존재
    // required: validator === optional.isRequired → isRequired 프로퍼티 없음
    const required =
      typeof propType === "function"
        ? propType.isRequired === undefined
        : false;

    return {
      name: propName,
      type,
      default: defaultValue !== undefined ? String(defaultValue) : "-",
      required,
      description: descriptions[propName] || "-",
    };
  });
}

import PropTypes from "prop-types";

/**
 * propTypes를 파싱해서 문서화용 props 정보로 변환
 * @param {object} propTypes - 컴포넌트의 propTypes
 * @param {object} defaultProps - 컴포넌트의 defaultProps
 * @param {object} descriptions - prop별 description (선택)
 * @returns {Array} props 정보 배열
 */
export function parsePropTypes(
  propTypes,
  defaultProps = {},
  descriptions = {}
) {
  if (!propTypes) return [];

  return Object.keys(propTypes).map((propName) => {
    const propType = propTypes[propName];
    const defaultValue = defaultProps[propName];

    // propTypes의 타입 정보 추출
    let type = "unknown";

    if (propType) {
      // PropTypes의 타입 확인
      if (
        propType === PropTypes.string ||
        propType === PropTypes.string.isRequired
      ) {
        type = "string";
      } else if (
        propType === PropTypes.number ||
        propType === PropTypes.number.isRequired
      ) {
        type = "number";
      } else if (
        propType === PropTypes.bool ||
        propType === PropTypes.bool.isRequired
      ) {
        type = "boolean";
      } else if (
        propType === PropTypes.node ||
        propType === PropTypes.node.isRequired
      ) {
        type = "ReactNode";
      } else if (
        propType === PropTypes.element ||
        propType === PropTypes.element.isRequired
      ) {
        type = "ReactElement";
      } else if (
        propType === PropTypes.func ||
        propType === PropTypes.func.isRequired
      ) {
        type = "function";
      } else if (
        propType === PropTypes.array ||
        propType === PropTypes.array.isRequired
      ) {
        type = "array";
      } else if (
        propType === PropTypes.object ||
        propType === PropTypes.object.isRequired
      ) {
        type = "object";
      } else if (propType.oneOf) {
        // oneOf인 경우 가능한 값들 표시
        const values = propType.oneOf;
        type = `"${values.join('" | "')}"`;
      } else if (propType.oneOfType) {
        // oneOfType인 경우 여러 타입 표시
        const types = propType.oneOfType.map((t) => {
          if (t === PropTypes.string) return "string";
          if (t === PropTypes.number) return "number";
          if (t === PropTypes.bool) return "boolean";
          return "unknown";
        });
        type = types.join(" | ");
      }
    }

    return {
      name: propName,
      type: type,
      default: defaultValue !== undefined ? String(defaultValue) : "-",
      required: propType?.isRequired !== undefined,
      description: descriptions[propName] || "-",
    };
  });
}

import PropTypes from "prop-types";
import "./Button.css";
import Icon from "../Icon/Icon";

/**
 * Button Component
 *
 * @param {string} variant - 버튼 스타일: 'primary' | 'secondary' | 'default' | 'ghost' | 'text' | 'point' | 'point-secondary'
 * @param {string} size - 버튼 크기: 'small' | 'medium' | 'large'
 * @param {boolean} disabled - 비활성화 여부
 * @param {boolean} circle - 원형 버튼 여부
 * @param {ReactNode} startIcon - 시작 아이콘
 * @param {ReactNode} endIcon - 끝 아이콘
 * @param {ReactNode} children - 버튼 텍스트
 * @param {object} ...props - 나머지 button props (onClick, type 등)
 */
export const Button = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  circle = false,
  startIcon,
  endIcon,
  children,
  ...props
}) => {
  // 클래스명 생성
  const className = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    circle && "btn--circle",
    startIcon && "btn--start-icon",
    endIcon && "btn--end-icon",
    !children && (startIcon || endIcon) && "btn--only-icon",
    disabled && "btn--disabled",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={className} disabled={disabled} {...props}>
      {startIcon && <Icon name={startIcon.props.name} size={size} />}
      {children && <span>{children}</span>}
      {endIcon && <Icon name={endIcon.props.name} size={size} />}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "default",
    "ghost",
    "text",
    "point",
    "point-secondary",
  ]).isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
  disabled: PropTypes.bool,
  circle: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  children: PropTypes.node,
};

Button.defaultProps = {
  variant: "primary",
  size: "medium",
  disabled: false,
  circle: false,
  startIcon: null,
  endIcon: null,
  children: null,
};

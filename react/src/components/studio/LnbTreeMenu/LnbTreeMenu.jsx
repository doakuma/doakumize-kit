import { useState } from "react";
import "@shared/styles/base/lnb.css";
import "./LnbTreeMenu.css";

/**
 * LNB Tree Menu Item
 * 바닐라의 lnb-menu-item 구조를 리액트 컴포넌트로 구현
 *
 * @param {Object} props
 * @param {string|React.ReactNode} props.label - 카테고리 라벨
 * @param {React.ReactNode} props.children - 서브메뉴 아이템들
 * @param {boolean} props.defaultExpanded - 기본 펼침 상태
 * @param {boolean} props.showToggle - 토글 버튼 표시 여부
 */
function LnbMenuItem({
  label,
  children,
  defaultExpanded = false,
  showToggle = true,
  hasChildren = true,
  isActive = false,
  onClick,
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const handleClick = (e) => {
    if (hasChildren && showToggle) {
      handleToggle(e);
    }
    onClick?.(e);
  };

  return (
    <div
      className={`lnb-menu-item ${
        hasChildren && isExpanded ? "lnb-menu-item--expanded" : ""
      } ${isActive ? "lnb-menu-item--active" : ""}`}
    >
      <div className="lnb-menu-item__header">
        <button
          className="lnb-menu-item__link"
          type="button"
          onClick={handleClick}
        >
          <span className="lnb-menu-item__text">{label}</span>
        </button>
        {hasChildren && showToggle && (
          <button
            className="lnb-menu-item__toggle"
            type="button"
            onClick={handleToggle}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "메뉴 접기" : "메뉴 펼치기"}
          >
            <i className="icon icon--chevron-down"></i>
          </button>
        )}
      </div>
      {hasChildren && (
        <div className="lnb-menu-item__submenu">
          <ul className="lnb-submenu">{children}</ul>
        </div>
      )}
    </div>
  );
}

/**
 * LNB Submenu Item
 * 서브메뉴 아이템 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.id - 아이템 ID
 * @param {string} props.label - 아이템 라벨
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {boolean} props.isActive - 활성화 상태
 * @param {Function} props.onClick - 클릭 핸들러
 * @param {React.ReactNode} props.children - 추가 콘텐츠 (아이콘, 칩 등)
 */
function LnbSubmenuItem({
  id,
  label,
  disabled = false,
  isActive = false,
  onClick,
  children,
}) {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e, id);
  };

  return (
    <li className="lnb-submenu__item">
      <button
        className={`lnb-submenu__link ${
          isActive ? "lnb-submenu__link--active" : ""
        } ${disabled ? "lnb-submenu__link--disabled" : ""}`}
        type="button"
        onClick={handleClick}
        disabled={disabled}
        data-component-id={id}
      >
        {children}
        <span>{label}</span>
      </button>
    </li>
  );
}

/**
 * LNB Tree Menu
 * 바닐라의 lnb-body-menu 구조를 리액트 컴포넌트로 구현
 *
 * @param {Object} props
 * @param {Array} props.items - 메뉴 아이템 배열
 * @param {string} props.activeItemId - 활성화된 아이템 ID
 * @param {Function} props.onItemClick - 아이템 클릭 핸들러 (e, itemId) => void
 * @param {boolean} props.defaultExpanded - 기본 펼침 상태 (모든 카테고리)
 */
function LnbTreeMenu({
  items = [],
  activeItemId,
  onItemClick,
  defaultExpanded = false,
}) {
  return (
    <div className="lnb-body-menu">
      <h2 className="text-body-sm">Component Categories</h2>
      <div className="lnb-body-menu-list-wrapper">
        <nav className="lnb-body-menu-list">
          {items.map((item) => {
            const hasActiveChild =
              item.hasChildren &&
              activeItemId &&
              item.children?.some((child) => child.id === activeItemId);
            const shouldExpand =
              hasActiveChild || (item.defaultExpanded ?? defaultExpanded);
            return (
              <LnbMenuItem
                key={
                  item.id ||
                  (typeof item.label === "string"
                    ? item.label
                    : `item-${items.indexOf(item)}`)
                }
                label={item.label}
                defaultExpanded={shouldExpand}
                showToggle={item.showToggle !== false}
                hasChildren={item.hasChildren}
                isActive={activeItemId === item.id}
                onClick={(e) =>
                  !item.hasChildren ? onItemClick?.(e, item.id) : undefined
                }
              >
                {item.children?.map((child) => (
                  <LnbSubmenuItem
                    key={child.id}
                    id={child.id}
                    label={child.label}
                    disabled={child.disabled}
                    isActive={activeItemId === child.id}
                    onClick={onItemClick}
                  >
                    {child.disabled && (
                      <>
                        {/* <i
                          className="icon icon--small icon--pending"
                          style={{ opacity: 0.5 }}
                        /> */}
                        <span className="chip chip--small">준비 중</span>
                      </>
                    )}
                  </LnbSubmenuItem>
                ))}
              </LnbMenuItem>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default LnbTreeMenu;
export { LnbMenuItem, LnbSubmenuItem };

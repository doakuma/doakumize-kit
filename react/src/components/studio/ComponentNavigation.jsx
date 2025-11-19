/**
 * Component Navigation
 * 컴포넌트 네비게이션
 */
import "./ComponentNavigation.css";

/**
 * 네비게이션 링크 컴포넌트
 * @param {string} sectionId - 섹션 ID
 * @param {string} activeSection - 현재 활성화된 섹션 ID
 * @param {Function} onClickNav - 클릭 핸들러
 * @param {React.ReactNode} children - 링크 텍스트
 */
const NavLink = ({ sectionId, activeSection, onClickNav, children }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClickNav(sectionId);
  };

  return (
    <a
      href={`#${sectionId}`}
      className={`showcase-navigation-link ${
        activeSection === sectionId ? "is-active" : ""
      }`}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

const ComponentNavigation = (props) => {
  const { structure, onClickNav, activeSection = "" } = props;

  const renderList = (list, idx) => {
    const [key, value] = list;
    const sectionId = `showcase${key.charAt(0).toUpperCase() + key.slice(1)}`;
    return (
      <ul className="showcase-list" key={idx}>
        <li>
          <NavLink
            sectionId={sectionId}
            activeSection={activeSection}
            onClickNav={onClickNav}
          >
            {key}
          </NavLink>
        </li>
        {key !== "props" && <li>{renderItems(value)}</li>}
      </ul>
    );
  };

  const renderItems = (items) => {
    if (typeof items === "string") return;
    return (
      <ul className="showcase-list-items">
        {items.map((item, idx) => {
          const sectionId = `showcaseProperty${item.title}`;
          return (
            <li key={idx}>
              <NavLink
                sectionId={sectionId}
                activeSection={activeSection}
                onClickNav={onClickNav}
              >
                {item.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav className="showcase-navigation">
      <h3 className="text-h3">목차</h3>
      <hr className="divider" />
      {Object.entries(structure).map((item, idx) => {
        return <>{renderList(item, idx)}</>;
      })}
    </nav>
  );
};

export default ComponentNavigation;

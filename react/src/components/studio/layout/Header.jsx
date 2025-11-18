import { Link } from "react-router-dom";
import { useState } from "react";

/**
 * Header Component
 * 로고, 테마 토글 버튼 포함
 */
function Header({ title = "Component Studio", link = "/" }) {
  // 테마 초기화 - lazy initialization으로 localStorage 읽기
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    // 초기 렌더링 시 DOM에도 적용
    document.documentElement.setAttribute("data-theme", savedTheme);
    return savedTheme;
  });

  // 테마 토글
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header id="header">
      <h1 className="text-h1">
        <Link to={link}>{title}</Link>
      </h1>
      <div className="header-actions">
        <button
          id="themeToggleBtn"
          className="btn btn--ghost btn--icon-only"
          aria-label="테마 전환"
          title="테마 전환"
          onClick={toggleTheme}
        >
          <i
            className={`icon icon--medium icon--${
              theme === "light" ? "sun" : "moon"
            }`}
            id="themeToggleIcon"
          ></i>
        </button>
      </div>
    </header>
  );
}

export default Header;


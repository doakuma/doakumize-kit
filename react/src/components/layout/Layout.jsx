import Header from "./Header";
import Footer from "./Footer";

/**
 * Layout Component
 * 모든 페이지를 감싸는 공통 레이아웃
 */
function Layout({ children }) {
  return (
    <div id="wrapper">
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;

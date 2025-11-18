import { Outlet } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import "./App.css";

/**
 * App Component
 * 공통 레이아웃 및 ScrollRestoration
 */
function App() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}

export default App;

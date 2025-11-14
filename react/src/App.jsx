import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Components 페이지는 나중에 추가 */}
      {/* <Route path="/components" element={<Components />} /> */}
    </Routes>
  );
}

export default App;

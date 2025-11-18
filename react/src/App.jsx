import { Routes, Route } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import Home from "./pages/Home";
import Components from "./pages/Components";
import "./App.css";

function App() {
  return (
    <>
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<Components />} />
        <Route path="/components/:componentId" element={<Components />} />
      </Routes>
    </>
  );
}

export default App;

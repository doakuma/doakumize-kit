import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home";
import Components from "./pages/Components";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "components",
          element: <Components />,
        },
        {
          path: "components/:componentId",
          element: <Components />,
        },
      ],
    },
  ],
  {
    basename: "/doakumize-kit/react",
  }
);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// React DevTools 디버깅용
if (import.meta.env.DEV) {
  console.log("React version:", React.version);
  console.log("React DevTools should detect this app");
  console.log("Development mode:", import.meta.env.MODE);
}

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // App 컴포넌트 불러오기
import "./index.css"; // 스타일 시트 불러오기

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

const isAdmin = window.location.pathname.replace(/\/+$/, "").startsWith("/admin");

if (isAdmin) {
  // Lazy-load admin panel — keeps the public card bundle small
  import("./Admin").then(({ default: Admin }) => {
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <Admin />
      </React.StrictMode>,
    );
  });
} else {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

// PWA service worker registration (only for public card, not admin)
if (!isAdmin && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.error("Service worker registration failed:", error);
    });
  });
}

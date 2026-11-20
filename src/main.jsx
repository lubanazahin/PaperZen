// ============================================
// main.jsx - Application Entry Point
// ============================================
// Here we wrap the entire app with AuthProvider
// So that all components can access auth data

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrapped with AuthProvider - now all components can access authInfo */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);

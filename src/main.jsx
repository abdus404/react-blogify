import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import ProfileProvider from "./providers/ProfileProvider.jsx";
import UserIdProvider from "./providers/UserIdProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <UserIdProvider>
          <Router>
            <App />
          </Router>
        </UserIdProvider>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);

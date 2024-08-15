import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import BlogIdProvider from "./providers/BlogIdProvider.jsx";
import BlogProvider from "./providers/BlogProvider.jsx";
import EditBlogProvider from "./providers/EditBlogProvider.jsx";
import ProfileProvider from "./providers/ProfileProvider.jsx";
import UserIdProvider from "./providers/UserIdProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <UserIdProvider>
          <BlogProvider>
            <BlogIdProvider>
              <EditBlogProvider>
                <Router>
                  <App />
                </Router>
              </EditBlogProvider>
            </BlogIdProvider>
          </BlogProvider>
        </UserIdProvider>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);

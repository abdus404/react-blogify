import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import BlogProvider from "./providers/BlogProvider";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <BlogProvider>
                <HomePage />
              </BlogProvider>
            }
          />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Dynamic profile route */}
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Dynamic profile route */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/blogs/:id" element={<SingleBlogPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import CreateBlog from "./pages/CreateBlog";
import EditBlogPage from "./pages/EditBlogPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import SearchPage from "./pages/SearchPage";
import SingleBlogPage from "./pages/SingleBlogPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/blogs/:id" element={<SingleBlogPage />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/edit-blog" element={<EditBlogPage />} />
        </Route>
      </Routes>
    </>
  );
}

import { createContext } from "react";

const AuthContext = createContext();
const ProfileContext = createContext();
const UserIdContext = createContext();
const BlogContext = createContext();
const BlogIdContext = createContext();
const EditBlogContext = createContext();

export {
  AuthContext,
  BlogContext,
  BlogIdContext,
  EditBlogContext,
  ProfileContext,
  UserIdContext,
};

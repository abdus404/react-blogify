import { createContext } from "react";

const AuthContext = createContext();
const ProfileContext = createContext();
const UserIdContext = createContext();
const BlogContext = createContext();
const BlogIdContext = createContext();

export {
  AuthContext,
  BlogContext,
  BlogIdContext,
  ProfileContext,
  UserIdContext,
};

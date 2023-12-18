import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/login/login-page";
import { RegisterPage } from "../pages/register/register";
import { Dashboard } from "../pages/dashboard/dashboard";

export const Router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

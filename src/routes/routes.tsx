import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/login/login-page";
import { RegisterPage } from "../pages/register/register";
import { Dashboard } from "../pages/dashboard/dashboard";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}
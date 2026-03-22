import { Routes, Route } from "react-router-dom"

import { isLoggedIn } from "../utils/auth";

import LandingPage from "../pages/LandingPage"
import MainLayout from "../layouts/MainLayout"
import RegisterComplaint from "../pages/RegisterComplaint";
import Login from "../pages/Login";
import Register from "../pages/Register";

function AppRoutes() {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registercomplaint" element={<RegisterComplaint />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/report" element={<RegisterComplaint />} />
    </Routes>
  )
}

export default AppRoutes
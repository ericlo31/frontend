import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/residente/dashboardd";

export default function ResidentRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

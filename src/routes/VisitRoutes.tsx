import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/main/Dashboard";

export default function VisitsRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

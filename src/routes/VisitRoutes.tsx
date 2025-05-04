import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

export default function VisitsRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

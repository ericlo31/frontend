import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/residente/Dashboard";

export default function ResidentRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

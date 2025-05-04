import React from "react";
import ResidentDashboard from "./pages/ResidenteDashboard";
import Home from "./components/login/Home";
import Authorizations from "./pages/Authorizations";
import VisitHistory from "./pages/VisitHistory";
import Settings from "./pages/Settings";
import { Route, Routes } from "react-router-dom";
import VisitEntryForm from "./components/visitRegistry/VisitEntryForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<VisitEntryForm />} />
      <Route path="/authorizations" element={<Authorizations />} />
      <Route path="/visit-history" element={<VisitHistory />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default App;

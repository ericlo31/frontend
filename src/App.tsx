import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/main/Dashboard";
import Authorizations from "./pages/main/Authorizations";
import Settings from "./pages/main/Settings";
import History from "./pages/main/History";
import { SidebarProvider } from "./contexts/SidebarContext";
import Home from "./pages/login/Home";
import AdminAuthorizations from "./pages/main/AuthorizationRecords";
import Report from "./pages/main/Report"

const App = () => {
  return (
    <SidebarProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/authorizations" element={<Authorizations />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/visit-history" element={<History />} />
        <Route path="/admin/authorizations" element={<AdminAuthorizations />} />
        <Route path="/admin/report" element={<Report />} />
      </Routes>
    </SidebarProvider>
  );
};

export default App;

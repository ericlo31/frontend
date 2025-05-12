import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Authorizations from "./pages/Authorizations";
import Settings from "./pages/Settings";
import History from "./pages/History";
import { SidebarProvider } from "./contexts/SidebarContext";
import Home from "./components/login/ResidentLogin";

const App = () => {
  return (
    <SidebarProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/authorizations" element={<Authorizations />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/visit-history" element={<History />} />
      </Routes>
    </SidebarProvider>
  );
};

export default App;

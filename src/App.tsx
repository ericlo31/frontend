import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Authorizations from "./pages/Authorizations";
import Settings from "./pages/Settings";
import History from "./pages/History";
import VisitForm from "./components/authorization/VisitFormCard";
import { SidebarProvider } from "./contexts/SidebarContext";

const App = () => {
  return (
    <SidebarProvider>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/authorizations" element={<Authorizations />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/visit-history" element={<History />} />
      <Route path="/entry-form" element={<VisitForm />} />
    </Routes>
    </SidebarProvider>
  );
};

export default App;

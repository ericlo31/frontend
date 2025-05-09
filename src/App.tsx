import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Authorizations from "./pages/Authorizations";
import Settings from "./pages/Settings";
import History from "./pages/History";
import VisitEntryForm from "./pages/Form";
import Home from "./components/login/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/authorizations" element={<Authorizations />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/visit-history" element={<History />} />
      <Route path="/entry-form" element={<VisitEntryForm />} />
    </Routes>
  );
};

export default App;

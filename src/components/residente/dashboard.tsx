import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import StatCards from "./statCards";
import QuickActions from "./quickActions";
import Authorizations from "./activeAuthorizations";
import History from "./visitHistory";

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <div>
        <Header />
        <StatCards />
        <QuickActions />
        <Authorizations />
        <History />
      </div>
    </div>
  );
};

export default Dashboard;

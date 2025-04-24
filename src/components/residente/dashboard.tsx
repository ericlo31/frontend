import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <div>
        <Header />
        {/* <statCards />
        <quickActions />
        <activeAuthorizations />
        <visitHistory /> */}
      </div>
    </div>
  );
};

export default Dashboard;

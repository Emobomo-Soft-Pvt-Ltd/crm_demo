import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

function MontlyConversations() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Header />
        <h5 className="main-title">Montly Conversations</h5>
      </div>
    </div>
  );
}

export default MontlyConversations;

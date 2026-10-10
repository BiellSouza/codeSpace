import React from "react";
import HeaderComponent from "../Components/HeaderComponent";

function Dashboard() {
  return (
    <div className="min-h-screen w-full">
      <HeaderComponent />

      <section className="mt-6 rounded-lg bg-red-500 h-32 w-full">
        Conteúdo do Dashboard
      </section>
    </div>
  );
}

export default Dashboard;

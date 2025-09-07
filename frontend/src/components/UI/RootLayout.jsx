import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

function RootLayout() {
  const [isSidebaropen, setIsSideBarOpen] = useState(false);
  const toggleSidebar = () => setIsSideBarOpen(!isSidebaropen);

  return (
    <div className="flex h-screen bg-gray-100 flex-col lg:flex-row">
      <Sidebar isOpen={isSidebaropen} />

      <div className="flex flex-col flex-1">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;

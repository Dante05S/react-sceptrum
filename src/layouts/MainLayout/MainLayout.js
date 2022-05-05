import React from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "./Nav/Nav";

export const MainLayout = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Nav></Nav>
      <div style={{ height: "88%", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};

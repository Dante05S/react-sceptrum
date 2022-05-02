import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./Nav.css";

export const Nav = () => {
  return (
    <header>
      <nav className="nav">
        <div className="contain">
          <div className="header-up">
            <div className="container-logo">
              <Link to="/">
                <img src={process.env.PUBLIC_URL + "/logo.jpeg"} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

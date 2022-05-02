import React, { useState } from "react";
import "./ListBranchOffices.css";

export const ListBranchOffices = ({ branchOffices, obtainMarker }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className="btn-list"
        onClick={() => {
          setShow(!show);
          if (!show) {
            document.body.className += "overflow-hidden";
            document.querySelector(".btn-list").className += " show-btn";
          } else {
            document.body.className = "";
            document.querySelector(".btn-list").className = "btn-list";
          }
        }}
      >
        <i
          className="material-icons"
          style={{ transform: show ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          chevron_left
        </i>
      </div>

      <div
        className="ListBranchOffices"
        style={{ right: show ? "0" : "-100%" }}
      >
        <ul className="list">
          {branchOffices.length > 0 &&
            branchOffices.map((item) => (
              <li
                key={item.uuid}
                onClick={() => {
                  obtainMarker(item);
                  setShow(false);
                }}
                className="item-list"
              >
                <div className="branch-office">
                  <div className="logo2">
                    <img src={item.logo}></img>
                  </div>
                  <div className="info-item">
                    <p className="name-branch">{item.name}</p>
                    <p className="address">{item.address}</p>
                    <p className="description">{item.description}</p>
                    <p
                      style={{ color: item.is_open ? "#1fbf74" : "#dc3545" }}
                      className="open"
                    >
                      {item.message}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

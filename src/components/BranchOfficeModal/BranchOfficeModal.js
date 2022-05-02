import React, { useState } from "react";
import "./BranchOfficeModal.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const BranchOfficeModal = ({ toogleModal, branchOffice }) => {
  return (
    <div className="BranchOfficeModal">
      {console.log(branchOffice)}
      <div className="pane" onClick={toogleModal}></div>
      <div className="modal">
        <div className="header">
          <div className="title">
            <h3>Detalle de la sucursal</h3>
            <i onClick={toogleModal} className="material-icons">
              highlight_off
            </i>
          </div>
        </div>

        <div className="body">
          <div className="brand">
            <div className="open">
              <p
                style={{ color: branchOffice?.is_open ? "#1fbf74" : "#dc3545" }}
              >
                {branchOffice?.message}
              </p>
            </div>
            <div className="logo">
              <img src={branchOffice?.logo}></img>
            </div>
            <div className="name">
              <h4>{branchOffice?.name}</h4>
              <p>{branchOffice?.description}</p>
            </div>
          </div>

          <div className="info">
            <div className="item">
              <i className="material-icons">home</i>
              <p>
                <span>Dirección:</span> {branchOffice?.address}
              </p>
            </div>
            <div className="item">
              <i className="material-icons">phone</i>
              <p>
                <span>Telefono:</span> +57 {branchOffice?.phone}
              </p>
            </div>
            <div className="item">
              <i className="material-icons">schedule</i>
              <p>
                <span>Entrega en:</span> {branchOffice?.delivery_rate}
              </p>
            </div>
            <div className="item">
              <i className="material-icons">attach_money</i>
              <p>
                <span>Costo de entrega:</span> ${branchOffice?.delivery_cost}
              </p>
            </div>
          </div>
          <Link
            style={{ color: "#000000" }}
            to={`/sucursal/${branchOffice?.uuid}`}
          >
            <div className="btn">Ver menú...</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

BranchOfficeModal.defaultProps = {
  branchOffice: {},
};

BranchOfficeModal.propTypes = {
  branchOffice: PropTypes.object,
  toogleModal: PropTypes.func,
};

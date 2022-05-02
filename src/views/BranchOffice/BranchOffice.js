import React, { useState, useEffect } from "react";
import "./BranchOffice.css";
import { useParams } from "react-router-dom";
import { Menu } from "./Menu/Menu";
import BranchOfficeService from "../../services/BranchOfficeService";

export const BranchOffice = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [branchOffice, setBranchOffice] = useState({});
  const [categories, setCategories] = useState([]);

  const fetchDataBranchOffice = async () => {
    try {
      const response = await BranchOfficeService.getById(id);
      if (response.code === 200) {
        setBranchOffice(() => {
          const uuid = response.data.id;
          const is_open = response.data.is_open;
          const message = response.data.message;
          const logo = response.data.brand.logo;
          const name = response.data.brand.name;
          const address = response.data.address;
          const phone = response.data.phone1;
          const delivery_rate = response.data.delivery_rate;
          const delivery_cost = response.data.delivery_cost;

          return {
            uuid,
            is_open,
            message,
            logo,
            name,
            address,
            phone,
            delivery_rate,
            delivery_cost,
          };
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchDataCategories = async () => {
    try {
      const response = await BranchOfficeService.getAllCategoriesById(id);
      if (response.code === 200) {
        setCategories(
          response.data.map((categorie) => {
            const name = categorie.name;
            const stocks = categorie.stocks;

            return {
              name,
              stocks,
            };
          }) || []
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchDataBranchOffice();
    fetchDataCategories();
  });

  return (
    <div className="BranchOffice">
      <div className="aside">
        <div className="top">
          <div className="brand-info">
            <div className="icon">
              <img src={branchOffice.logo} alt={branchOffice.name}></img>
            </div>
            <div>
              <h3>{branchOffice.name}</h3>
              <p
                style={{ color: branchOffice?.is_open ? "#1fbf74" : "#dc3545" }}
              >
                {branchOffice.message}
              </p>
            </div>
          </div>

          <div
            onClick={() => {
              setShow(true);
              document.body.className += "overflow-hidden";
            }}
            className="btn-menu"
          >
            Ver menú
          </div>
        </div>

        <div className="info-branch">
          <div className="row">
            <div className="branch-address">
              <i className="material-icons">home</i>
              <p>{branchOffice.address}</p>
            </div>
            <div className="phone">
              <i className="material-icons">phone</i>
              <p>+57 {branchOffice.phone}</p>
            </div>
          </div>
          <div className="row">
            <div className="time-delivery">
              <i className="material-icons">schedule</i>
              <p>{branchOffice.delivery_rate}</p>
            </div>
            <div className="cost">
              <i className="material-icons">attach_money</i>
              <p>Envío: ${branchOffice.delivery_cost}</p>
            </div>
          </div>
        </div>

        <div style={{ top: show ? "0" : "-100%" }} className="categories">
          <div className="head-title">
            <i
              className="material-icons close"
              onClick={() => {
                setShow(false);
                document.body.className = "";
              }}
            >
              cancel
            </i>
            <div className="title-menu">
              <i className="material-icons">restaurant</i>
              <h4>Menú y Precios</h4>
            </div>
          </div>

          <div className="list-categories">
            {categories.length > 0 &&
              categories.map((item) => (
                <a
                  className="categorie"
                  onClick={() => {
                    setShow(false);
                    document.body.className = "";
                  }}
                  key={item.name}
                  href={`#${item.name}`}
                >
                  {item.name}
                </a>
              ))}
          </div>
        </div>
      </div>

      <Menu categories={categories} />
    </div>
  );
};

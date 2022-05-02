import React from "react";
import "./Menu.css";
import PropTypes from "prop-types";

export const Menu = ({ categories }) => {
  return (
    <div className="Menu">
      {categories.length > 0 &&
        categories.map((item) => (
          <div id={item.name} key={item.name} className="section">
            <div className="title-section">
              <h3>{item.name}</h3>
            </div>
            <div className="stocks">
              {item.stocks.length > 0 &&
                item.stocks.map((stock) => (
                  <div key={stock.product.id} className="product">
                    <div className="card-product">
                      <div className="img-product">
                        <img src={stock.product.primary_image} />
                      </div>
                      <div className="details">
                        <p className="name-product">{stock.product.name}</p>
                        <p className="descrip-product">
                          {stock.product.description}
                        </p>
                        <p className="price">${stock.product.price}</p>
                      </div>

                      <div className="btn-add">
                        <i className="material-icons">add</i>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

Menu.defaultProps = {
  categories: [],
};

Menu.propTypes = {
  categories: PropTypes.array,
};

import React, { useEffect, useState } from "react";
import "./GoogleMapBranchOffices.css";
import BranchOfficeService from "../../services/BranchOfficeService";
import { GoogleMap, Marker, OverlayView } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { BranchOfficeModal } from "../BranchOfficeModal/BranchOfficeModal";

export const GoogleMapBranchOffices = ({ markers, center, idBounce }) => {
  const options = {
    zoom: 17,
    disableDefaultUI: true,
    clickableIcons: false,
    zoomControl: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi.business",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
    ],
  };

  const [flag, setFlag] = useState(false);
  const [branchOffice, setBranchOffice] = useState({});

  const toggleModal = () => {
    setFlag(!flag);
  };

  const fetchData = async (id) => {
    try {
      const response = await BranchOfficeService.getById(id);
      if (response.code === 200) {
        setBranchOffice(() => {
          const uuid = response.data.id;
          const is_open = response.data.is_open;
          const message = response.data.message;
          const logo = response.data.brand.logo;
          const name = response.data.brand.name;
          const description = response.data.brand.description;
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
            description,
            address,
            phone,
            delivery_rate,
            delivery_cost,
          };
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {console.log(idBounce)}
      <GoogleMap
        center={center}
        options={options}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        {markers.length > 0 &&
          markers.map((marker) => (
            <div key={marker.uuid}>
              <OverlayView
                position={marker.pos}
                mapPaneName={OverlayView.MARKER_LAYER}
              >
                <>
                  <Marker
                    onClick={async () => {
                      await fetchData(marker.uuid);
                      toggleModal();
                    }}
                    position={marker.pos}
                    icon={{
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: 11,
                      fillColor: "#fff",
                      fillOpacity: 0,
                      strokeOpacity: 0,
                    }}
                  ></Marker>
                  <div
                    className="marker"
                    style={{
                      backgroundImage: `url(${marker.logo})`,
                      animationName:
                        idBounce === marker.uuid ||
                        branchOffice.uuid === marker.uuid
                          ? "bounce"
                          : "none",
                    }}
                  ></div>
                </>
              </OverlayView>
            </div>
          ))}
        {flag && (
          <BranchOfficeModal
            toogleModal={toggleModal}
            branchOffice={branchOffice}
          ></BranchOfficeModal>
        )}
      </GoogleMap>
    </div>
  );
};

GoogleMapBranchOffices.defaultProps = {
  markers: [],
};

GoogleMapBranchOffices.propTypes = {
  markers: PropTypes.array,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
};

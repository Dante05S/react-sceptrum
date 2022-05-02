import env from "react-dotenv";
import React, { useState, useEffect } from "react";
import BranchOfficeService from "../../services/BranchOfficeService";
import { useLoadScript } from "@react-google-maps/api";
import { GoogleMapBranchOffices } from "../../components/GoogleMapBranchOffices/GoogleMapBranchOffices";
import { ListBranchOffices } from "./ListBranchOffices";
import { Outlet } from "react-router-dom";

export const BranchOffices = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyC-iy9TOFFiZZmnGlDpLg4l96c2-abh-r8",
  });

  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({
    lat: 4.545367057195659,
    lng: -76.09435558319092,
  });

  const [idBounce, setIdBounce] = useState("");

  const obtainMarker = (marker) => {
    setCenter(marker.pos);
    setIdBounce(marker.uuid);
  };

  const fetchData = async () => {
    try {
      const response = await BranchOfficeService.getAll();
      if (response.code === 200) {
        setMarkers(
          response.data.map((item) => {
            const uuid = item.id;
            const pos = { lat: item.latitude, lng: item.longitude };
            const logo = item.brand.logo;
            const name = item.brand.name;
            const address = item.address;
            const description = item.brand.description;
            const is_open = item.is_open;
            const message = item.message;

            return {
              uuid,
              pos,
              logo,
              name,
              address,
              description,
              is_open,
              message,
            };
          }) || []
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderMap = () => {
    return (
      <div style={{ height: "100%", display: "flex" }}>
        <GoogleMapBranchOffices
          center={center}
          markers={markers}
          idBounce={idBounce}
        />
        <ListBranchOffices
          branchOffices={markers}
          obtainMarker={obtainMarker}
        />
        <Outlet></Outlet>
      </div>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <div>Loading...</div>;
};

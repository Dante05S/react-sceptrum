import "./App.css";
import { useEffect } from "react";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import cookie from "js-cookie";
function App() {
  const routing = useRoutes(routes);

  useEffect(() => {
    cookie.set(
      "token",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsidXNlcl9pZCI6IjI5Nzk4NGIzLTQ1NDMtNDhmMC1hMTkxLTdlN2UwMWVjMWRjOCIsInVzZXJfdHlwZSI6IkFETUlOIiwicHVzaGVyX2NoYW5uZWwiOiJBRE1JTl8yOTc5ODRiMy00NTQzLTQ4ZjAtYTE5MS03ZTdlMDFlYzFkYzgifSwiaWF0IjoxNjQ0ODU5MjE3LCJleHAiOjE2NTQwNTk1OTl9.3ximsrIe4RlcXBDrVpoj7XlvhIJsLVpXEPXA42x6YeI"
    );
  });

  return <div className="App">{routing}</div>;
}

export default App;

import { BranchOffices } from "./views/BranchOffices/BranchOffices";
import { BranchOffice } from "./views/BranchOffice/BranchOffice";
import { MainLayout } from "./layouts/MainLayout/MainLayout";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <BranchOffices /> },
      { path: "sucursal/:id", element: <BranchOffice /> },
      { path: "*", element: <BranchOffices /> },
    ],
  },
];

export default routes;

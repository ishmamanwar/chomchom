import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PetListPage from "../features/pets/pages/PetListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PetListPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
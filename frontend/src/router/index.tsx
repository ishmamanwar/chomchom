import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PetListPage from "../features/pets/pages/PetListPage";
import PetDetailsPage from "../features/pets/pages/PetDetailsPage";

const router = createBrowserRouter([
  { path: "/", element: <PetListPage /> },
  { path: "/pets/:id", element: <PetDetailsPage /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
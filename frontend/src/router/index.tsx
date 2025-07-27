import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PetListPage from "../components/PetListPage";
import PetDetailsPage from "../components/PetDetailsPage";
import AppLayout from "../components/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <PetListPage />
      </AppLayout>
    ),
  },
  {
    path: "/pets/:id",
    element: (
      <AppLayout>
        <PetDetailsPage />
      </AppLayout>
    ),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

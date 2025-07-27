import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PetListPage from "../components/pages/landing/PetListPage";
import PetDetailsPage from "../components/pages/details/PetDetailsPage";
import AppLayout from "../components/global/AppLayout";

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

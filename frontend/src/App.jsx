import { Routes, Route } from "react-router-dom";
import SuperAdminPages from "./middlewares/SuperAdminPages";
import Login from "./pages/superadmin/Login";
import DashboardIndex from "./pages/superadmin/DashboardIndex";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPhotoDetails from "./pages/superadmin/DashboardPhotoDetails";
import NotFound from "./pages/NotFound";
import DashboardAddPhoto from "./pages/superadmin/DashboardAddPhoto";
import DashboardUpdatePhoto from "./pages/superadmin/DashboardUpdatePhoto";
import DashboardCategoriesIndex from "./pages/superadmin/DashboardCategoriesIndex";
import DashboardInbox from "./pages/superadmin/DashboardInbox";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />

      {/* Superadmin Login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Superadmin */}
      <Route
        path="/admin/dashboard"
        element={
          <SuperAdminPages>
            <DashboardLayout />
          </SuperAdminPages>
        }
      >
        <Route index element={<DashboardIndex />} />
        <Route path="categories" element={<DashboardCategoriesIndex />} />
        <Route path="add-photo" element={<DashboardAddPhoto />} />
        <Route path="inbox" element={<DashboardInbox />} />
        <Route path="update/:slug" element={<DashboardUpdatePhoto />} />
        <Route path=":slug" element={<DashboardPhotoDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

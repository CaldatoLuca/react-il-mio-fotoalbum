import { Routes, Route } from "react-router-dom";
import SuperAdminPages from "./middlewares/SuperAdminPages";
import Login from "./pages/superadmin/Login";
import DashboardIndex from "./pages/superadmin/DashboardIndex";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPhotoDetails from "./pages/superadmin/DashboardPhotoDetails";
import NotFound from "./pages/NotFound";
import DashboardAddPhoto from "./pages/superadmin/DashboardAddPhoto";
import DashboardUpdatePhoto from "./pages/superadmin/DashboardUpdatePhoto";

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin/dashboard"
        element={
          <SuperAdminPages>
            <DashboardLayout />
          </SuperAdminPages>
        }
      >
        <Route index element={<DashboardIndex />} />
        <Route path="add-photo" element={<DashboardAddPhoto />} />
        <Route path="update/:slug" element={<DashboardUpdatePhoto />} />
        <Route path=":slug" element={<DashboardPhotoDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

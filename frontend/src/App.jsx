import { Routes, Route } from "react-router-dom";
import SuperAdminPages from "./middlewares/SuperAdminPages";
import Login from "./pages/superadmin/Login";
import DashboardIndex from "./pages/superadmin/DashboardIndex";
import DashboardLayout from "./layouts/DashboardLayout";

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
      </Route>
    </Routes>
  );
}

export default App;

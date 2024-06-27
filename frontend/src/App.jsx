import { Routes, Route } from "react-router-dom";
import SuperAdminPages from "./middlewares/SuperAdminPages";
import Login from "./pages/superadmin/Login";
import Dashboard from "./pages/superadmin/Dashboard";
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
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;

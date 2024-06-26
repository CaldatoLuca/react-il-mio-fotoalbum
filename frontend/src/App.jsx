import { Routes, Route } from "react-router-dom";
import SuperAdminPages from "./middlewares/SuperAdminPages";
import Login from "./pages/superadmin/Login";
import Dashboard from "./pages/superadmin/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin/dashboard"
        element={
          <SuperAdminPages>
            <Dashboard />
          </SuperAdminPages>
        }
      />
    </Routes>
  );
}

export default App;

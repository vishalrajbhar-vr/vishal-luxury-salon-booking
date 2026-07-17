import { BrowserRouter, Routes, Route, } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";


function AdminRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>

    </BrowserRouter>
  );
}

export default AdminRoutes;
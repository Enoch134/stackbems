import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/useraccount/credentails/Login";
import SignUp from "./components/useraccount/credentails/SignUp";
import AllUser from "./pages/users/AllUser";
import AllBusinesss from "./pages/business/AllBusinesss";
import AllCutomers from "./pages/customer/AllCustomers";
import Bulk from "./pages/inventory/Bulk";
import Categories from "./pages/inventory/Categories";
import ExpiryProduct from "./pages/inventory/ExpiryProduct";
import LowStock from "./pages/inventory/LowStock";
import Products from "./pages/inventory/Products";
import ProductReport from "./pages/report/ProductReport";
import SaleReport from "./pages/report/SaleReport";
import Due from "./pages/sale/Due";
import Sales from "./pages/sale/Sales";
import Privilege from "./pages/permit/Privilege";
import Role from "./pages/permit/Role";
import SaleCreate from "./pages/sale/SaleCreate";
import SaleEdit from "./pages/sale/SaleEdit";
import CreateInvent from "./pages/inventory/CreateInvent";
import EditInvent from "./pages/inventory/EditInvent";
import PrivilegeRole from "./components/permissions/PrivilegeRole";
import Priv from "./pages/permit/Priv";
import RoleEdit from "./pages/permit/RoleEdit";
import CustomerEdit from "./pages/customer/CustomerEdit";
import EditPriv from "./pages/permit/EditPriv";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/allUser" element={<AllUser />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/business" element={<AllBusinesss />} />
          <Route path="/allCutomers" element={<AllCutomers />} />
          <Route path="/allCutomers/edit/:id" element={<CustomerEdit />} />
          <Route path="/bulk" element={<Bulk />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/expiryProduct" element={<ExpiryProduct />} />
          <Route path="/lowStock" element={<LowStock />} />
          <Route path="/products/add" element={<CreateInvent />} />
          <Route path="/products/edit/:id" element={<EditInvent />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productReport" element={<ProductReport />} />
          <Route path="/saleReport" element={<SaleReport />} />
          <Route path="/dueCustomers" element={<Due />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/add" element={<SaleCreate />} />
          <Route path="/sales/edit/:id" element={<SaleEdit />} />
          <Route path="/privilege" element={<Privilege />} />
          <Route path="/privilege/add" element={<Priv />} />
          <Route path="/privilege/edit/:id" element={<EditPriv />} />
          <Route path="/role" element={<Role />} />
          <Route path="/role/edit/:id" element={<RoleEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

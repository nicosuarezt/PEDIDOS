import React from "react";
import Header from "./components/Header";
import "./App.css";
import QuickOrder from "./components/Quick Order/QuickOrder";
import { HashRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./components/Product/AddProduct";
import AppHome from "./components/AppHome";
import AddCategory from "./components/Category/AddCategory";
import AddWarehouse from "./components/Warehouse/AddWarehouse";
import AddSKU from "./components/SKU/AddSKU";
import Brands from "./components/Brand/Brands";
import AddBrand from "./components/Brand/AddBrand";
import EditBrand from "./components/Brand/EditBrand";
import Categories from "./components/Category/Categories";
import EditCategory from "./components/Category/EditCategory";
import Warehouses from "./components/Warehouse/Warehouses";
import EditWarehouse from "./components/Warehouse/EditWarehouse";
import Products from "./components/Product/Products";
import GroupsSKU from "./components/GroupSKU/GroupsSKU";
import AddGroupSKU from "./components/GroupSKU/AddGroupSKU";
import Fields from "./components/FieldSKU/Fields";
import AddFieldSKU from "./components/FieldSKU/AddFieldSKU";
import ValueSKU from "./components/FieldSKU/ValueSKU";
import AddValueSKU from "./components/FieldSKU/AddValueSKU";
import PriceList from "./components/PriceList/PriceList";
import AddPriceList from "./components/PriceList/AddPriceList";
import Prices from "./components/PriceList/Prices";
import AddPrice from "./components/PriceList/AddPrice";
import CheckOut from "./components/Checkout/CheckOut";
import Clients from "./components/Client/Clients";

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/quick-order" element={<QuickOrder />} />
          <Route path="/quick-order/checkout" element={<CheckOut />} />
          <Route path="/product" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/brand" element={<Brands />} />
          <Route path="/add-brand" element={<AddBrand />} />
          <Route path="/edit-brand" element={<EditBrand />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/edit-category" element={<EditCategory />} />
          <Route path="/warehouse" element={<Warehouses />} />
          <Route path="/add-warehouse" element={<AddWarehouse />} />
          <Route path="/edit-warehouse" element={<EditWarehouse />} />
          <Route path="/group-sku" element={<GroupsSKU />} />
          <Route path="/group-sku/add-group-sku" element={<AddGroupSKU />} />
          <Route path="/group-sku/field-sku" element={<Fields />} />
          <Route path="/group-sku/field-sku/add-field-sku" element={<AddFieldSKU />} />
          <Route path="/group-sku/field-sku/add-field-sku" element={<AddFieldSKU />} />
          <Route path="/group-sku/field-sku/field-value" element={<ValueSKU />} />
          <Route path="/group-sku/field-sku/field-value/add-field-value" element={<AddValueSKU />} />
          <Route path="/price-list" element={<PriceList />} />
          <Route path="/add-price-list" element={<AddPriceList />} />
          <Route path="/price-list/price" element={<Prices />} />
          <Route path="/add-price" element={<AddPrice />} />
          <Route path="/client" element={<Clients />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;

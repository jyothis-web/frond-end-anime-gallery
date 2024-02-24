import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserRegister from "./components/UserAuthentication/UserRegister/UserRegister";
import UserLogin from "./components/UserAuthentication/UserLogin/UserLogin";
import UserHomePage from "./components/pages/UserHomePage";
import HomePage from "./components/pages/HomePage";
import Wishlist from "./components/Wishlist/Wishlist";
import UserDashboard from "./components/pages/userDashboard/UserDashboard";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin";
import AdminDashboard from "./components/pages/AdminDashboard/AdminDashborad";
import Catergory from "./components/pages/AdminDashboard/categorySection/Catergory";
import { Toaster } from "react-hot-toast";
import Product from "./components/pages/AdminDashboard/ProductSection/Product";
import CreateProduct from "./components/pages/AdminDashboard/ProductSection/CreateProduct";
import UpdateProduct from "./components/pages/AdminDashboard/ProductSection/UpdateProduct";
import CategoryWithProducts from "./components/pages/AdminDashboard/categorySection/CategoryWithProducts";
import Search from "./components/Products/filterProducts/Search";
import SearchPage from "./components/pages/SearchpPage";
import ProductDescription from "./components/pages/ProductDescription";
function App() {
  return (
    <div className="App">
      <Toaster
        containerStyle={{
          position: "absolute",
          top: "0px",
          left: "-60px",
        }}
      />
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/UserHomepage" element={<UserHomePage />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/Catergory" element={<Catergory />} />
        <Route path="/Product" element={<Product />} />
        <Route
          path={`/ProductDescription/:id`}
          element={<ProductDescription />}
        />
        <Route path="/CreateProduct" element={<CreateProduct />} />
        <Route
          path="/CategoryWithProducts"
          element={<CategoryWithProducts />}
        />
        <Route
          path={`/UpdateProduct/:productId/:productName`}
          element={<UpdateProduct />}
        />
      </Routes>
      {/* <SwipeableTemporaryDrawer/> */}
    </div>
  );
}

export default App;

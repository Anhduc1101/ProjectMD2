import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/user/register/Register";
import About from "./pages/user/About";
import Bill from "./pages/user/Bill";
import Blog from "./pages/user/Blog";
import Cart from "./pages/user/Cart";
import Contact from "./pages/user/Contact";
import Index from "./pages/user/Index";
import Services from "./pages/user/Services";
import ThanksPage from "./pages/user/ThanksPage";
import Login from "./pages/user/Login";
import Products from "./pages/user/Products";
import AdminPage from "./common/adminPage/AdminPage";
import Description from "./pages/content/Description";
import CategoryManagement from "./pages/private/admin/category-manager/CategoryManagement";
import OrderManagement from "./pages/private/admin/order-manager/OrderManagement";
import ProductManagement from "./pages/private/admin/product-manager/ProductManagement";
import UserManagement from "./pages/private/admin/user-manager/UserManagement";

function App() {
  return (
    <>
      <Routes>
        {/* admin */}
        <Route path="/admin" element={<AdminPage />}>
          <Route path="category" element={<CategoryManagement />} />
          <Route path="order" element={<OrderManagement />} />
          <Route path="product" element={<ProductManagement />} />
          <Route path="user" element={<UserManagement />} />
        </Route>

        {/* user */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/" element={<Index />} />
        <Route path="/thankspage" element={<ThanksPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/description" element={<Description />} />
      </Routes>
    </>
  );
}

export default App;

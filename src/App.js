import "antd/dist/antd.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./Pages/About/About";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import PageNotFound from "./Pages/PageNotFound";
import Pricing from "./Pages/Pricing/Pricing";
import Register from "./Pages/Register/Register";
import Category from "./Pages/Category/Category";
import Cart from "./Pages/Cart/Cart";
import Course from "./Pages/Course/Course";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:categoryId/courses" element={<Course />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

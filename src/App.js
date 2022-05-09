import "antd/dist/antd.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./Pages/About/About";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import PageNotFound from "./Pages/PageNotFound";
import Pricing from "./Pages/Pricing/Pricing";
import Register from "./Pages/Register/Register";

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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

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
import Order from "./Pages/Order/Order";
import Cart from "./Pages/Cart/Cart";
import StripePaymentSuccess from "./components/StripePaymentSuccess";
import StripePaymentCancel from "./components/StripePaymentCancel";
import Course from "./Pages/Course/Course";
import CourseContent from "./Pages/Course/CourseContent";
import { AuthProvider } from "./components/Auth";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                //   <RequireAuth>
                <Login />
                //   </RequireAuth>
              }
            />
            <Route
              path="/register"
              element={
                //   <RequireAuth>
                <Register />
                //   </RequireAuth>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route
              path="/category"
              element={
                <RequireAuth>
                  <Category />
                </RequireAuth>
              }
            />
            <Route
              path="/order"
              element={
                <RequireAuth>
                  <Order />
                </RequireAuth>
              }
            />
            <Route
              path="/category/:categoryId/courses"
              element={
                <RequireAuth>
                  <Course />
                </RequireAuth>
              }
            />
            <Route
              path="/category/:categoryId/courses/:courseId"
              element={
                <RequireAuth>
                  <CourseContent />
                </RequireAuth>
              }
            />
            <Route
              path="/cart"
              element={
                <RequireAuth>
                  <Cart />
                </RequireAuth>
              }
            />

            <Route
              path="/stripepaymentsuccess"
              element={<StripePaymentSuccess />}
            />
            <Route
              path="/stripepaymentcancel"
              element={<StripePaymentCancel />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;

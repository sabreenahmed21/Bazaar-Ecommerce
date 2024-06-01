import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import Login from "./signin&up/Login";
import SignUp from "./signin&up/Signup";
import EmailVerification from "./signin&up/EmailVerification";
import Forgotpassword from "./signin&up/Forgotpassword";
import Verifypassword from "./signin&up/Verifypassword";
import ResetPassword from "./signin&up/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";
import Profle from "./profile/Profile";
import DeleteAccount from "./profile/DeleteAccount";
import UpdateAccount from "./profile/UpdateAccount";
import UpdatePassword from "./profile/UpdatePassword";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/ClientFacing/products/Products";
import Orders from "./pages/ClientFacing/orders/Orders";
import Customers from "./pages/ClientFacing/users/Customers";
import Admins from "./pages/Management/Admins";
import AddProductForm from "./pages/ClientFacing/products/AddProduct";
import ProductDetails from "./pages/ClientFacing/products/ProductDetails";
import EditProduct from "./pages/ClientFacing/products/EditProduct";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route path="products" element={<Products />} />
            <Route path="addProduct" element={<AddProductForm />} />
            <Route path="product/:productId" element={<ProductDetails />} />
            <Route path="edit-product/:productId" element={<EditProduct />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="admin" element={<Admins />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="verify-email" element={<EmailVerification />} />
            <Route path="/forgetPassword" element={<Forgotpassword />} />
            <Route path="/verifypassword" element={<Verifypassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/profilePage" element={<Profle />} />
            <Route path="/deleteAccount" element={<DeleteAccount />} />
            <Route path="/updateAccount" element={<UpdateAccount />} />
            <Route path="/updatePassword" element={<UpdatePassword />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

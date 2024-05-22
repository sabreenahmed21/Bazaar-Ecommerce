import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./signin&up/Login";
import SignUp from "./signin&up/Signup";
import EmailVerification from "./signin&up/EmailVerification";
import Forgotpassword from "./signin&up/Forgotpassword";
import Verifypassword from "./signin&up/Verifypassword";
import ResetPassword from "./signin&up/ResetPassword";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";
import Profle from "./profile/Profile";
import DeleteAccount from "./profile/DeleteAccount";
import UpdateAccount from "./profile/UpdateAccount";
import UpdatePassword from "./profile/UpdatePassword";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

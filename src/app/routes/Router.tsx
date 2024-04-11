import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "../../features/users/components/Signup";
import Login from "../../features/users/components/Login";
import NotFound from "../components/NotFound";
import Home from "../components/Home";
import HoverCards from "../components/HoverCards";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../../features/admin/component/AdminDashboard";
import VenueBooking from "../../features/bookings/components/CreateBooking";
import UserDashboard from "../../features/users/components/UserDashboard";
import AboutPage from "../components/AboutPage";

const Router = () => {
    const isAuthenticated = !!localStorage.getItem("token");
    return (
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/venues" element={<HoverCards />} />
              <Route path="/bookings" element={<VenueBooking bookingValue={null}/>} />
              <Route path="/aboutUs" element={<AboutPage/>} />

        <Route
          path="/profile"
          element={<ProtectedRoute Component={UserDashboard} Role={{role:"UserDashboard"}} />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute Component={AdminDashboard} Role={{role:"AdminDashboard"}} />}
        />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
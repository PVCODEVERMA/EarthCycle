import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./component/Loading";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardTab from "./userPages/DashboardTab.jsx";
import BookingDetails from "./userPages/BookingDetails.jsx";
import LiveTracking from "./userPages/LiveTracking.jsx";
import BookingHistory from "./userPages/BookingHistory.jsx";
import AccountSettings from "./userPages/AccountSettings.jsx";
import Profile from "./userPages/Profile.jsx";


// Lazy-loaded pages
const Home = React.lazy(() => import("./pages/Home"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const ForgotPasswordPage = React.lazy(() =>
  import("./pages/ForgotPasswordPage")
);
const PickupScheduling = React.lazy(() => import("./pages/PickupScheduling"));
const RecyclingServices = React.lazy(() => import("./pages/RecyclingServices"));
const WasteAnalytics = React.lazy(() => import("./pages/WasteAnalytics"));
const Contact = React.lazy(() => import("./pages/Company/Contact"));
const LearnMorePage = React.lazy(() =>
  import("./components/common/LearnMorePage")
);
const Booking = React.lazy(() => import("./pages/Booking"));
const Mission = React.lazy(() => import("./pages/Company/Mission"));
const Team = React.lazy(() => import("./pages/Company/Team"));
const Blog = React.lazy(() => import("./pages/Home/Blog"));
const BlogDetails = React.lazy(() => import("./pages/BlogDetails"));
const Careers = React.lazy(() => import("./pages/Home/Careers"));
const AboutHome = React.lazy(() => import("./pages/Home/AboutHome"));
const Residential = React.lazy(() => import("./pages/Residential"));
const Industrial = React.lazy(() => import("./pages/Industrial"));
const PaymentPage = React.lazy(() => import("./pages/PaymentPage"));
const LearnMore = React.lazy(() => import("./pages/LearnMore"));
const Shop = React.lazy(() => import("./pages/Shop"));
const RequestQuote = React.lazy(() => import("./pages/RequestQuote"));
const Layout = React.lazy(() => import("./component/layout/Layout"));
const TeamDashboard = React.lazy(() => import("./dashboard/TeamDashboard"));
const AdminDashboard = React.lazy(() => import("./dashboard/AdminDashboard"));


const DocumentsPage = React.lazy(() => import("./userPages/DocumentsPage.jsx"));

const SupportCenter = React.lazy(() => import("./userPages/SupportCenter.jsx"));

const NewService = React.lazy(() => import("./userPages/NewService.jsx"))

const Unauthorized = React.lazy(() => import("./pages/Unauthorized"));
const NotFound = React.lazy(() => import("./pages/NotFound"));


const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="pickupScheduling" element={<PickupScheduling />} />
          <Route path="recycling" element={<RecyclingServices />} />
          <Route path="analytics" element={<WasteAnalytics />} />
          <Route path="contact" element={<Contact />} />
          <Route path="learn-more-page" element={<LearnMorePage />} />
          <Route path="booking" element={<Booking />} />
          <Route path="mission" element={<Mission />} />
          <Route path="team" element={<Team />} />
          <Route path="blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="careers" element={<Careers />} />
          <Route path="about" element={<AboutHome />} />
          <Route path="services" element={<Residential />} />
          <Route path="industrial" element={<Industrial />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="learn-more" element={<LearnMore />} />
          <Route path="shop" element={<Shop />} />
          <Route path="requestQuote" element={<RequestQuote />} />

         
          <Route path="/support" element={<SupportCenter />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/new-service" element={<NewService />} />
          <Route path="/booking-det" element={<BookingDetails />} />
          <Route path="/live-tracking" element={<LiveTracking />} />
          <Route path="/user/History" element={<BookingHistory />} />
          <Route path="/accountSettings" element={<AccountSettings  />} />
          <Route path="user/profile" element={<Profile  />} />
          <Route path="user/dashboard" element={<DashboardTab />} />

          {/* Role-Based Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team/dashboard"
            element={
              <ProtectedRoute allowedRoles={["team-admin"]}>
                <TeamDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/DashboardTab"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                {/* <UserDashboard /> */}
                <DashboardTab />
              </ProtectedRoute>
            }
          />

          {/* Fallback Routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" />
    </Suspense>
  );
};

export default App;

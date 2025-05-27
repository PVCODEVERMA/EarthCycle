import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./component/Loading";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";


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
const Dashboard = React.lazy(() => import("./dashboard/UserDashboard.jsx"));
const TeamDashboard = React.lazy(() => import("./dashboard/TeamDashboard"));
const SuperAdminDashboard = React.lazy(() =>
  import("./dashboard/SuperAdminDashboard")
);
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

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["team-admin"]} />}>
            <Route path="team-dashboard" element={<TeamDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["super-admin"]} />}>
            <Route
              path="super-admin-dashboard"
              element={<SuperAdminDashboard />}
            />
          </Route>

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

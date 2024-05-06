import "./App.css";
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Forget from "./Forget.jsx";
import Otp from "./Otp.jsx";
import { CookiesProvider } from "react-cookie";
import Home from "./Home.jsx";
import Navbar from "./Navbar.jsx";
import Profile from "./Profile.jsx";
import TaskDashboard from "./TaskDashboard.jsx";
import Leaderboard from "./Leaderboard.jsx";
import UserProfile from "./UserProfile.jsx"
import MyApplications from "./MyApplications.jsx";
import ResetPassword from "./ResetPassword.jsx";
import TaskPage from "./TaskPage.jsx";
import Admin_Dashboard from "./Admin_Dashboard.jsx";
import PointConversion from "./PointConversion.jsx";
import ImageVerification from "./ImageVerification.jsx";

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CookiesProvider>
  );
}

function AppContent() {
  const location = useLocation();

  // Define an array of paths where the Navbar should be hidden
  const hiddenPaths = ["/login", "/signup", "/forget"];

  // Check if the current path starts with "/otp/"
  const isOtpPath = location.pathname.startsWith("/otp/");
  const isResetPath = location.pathname.startsWith("/password_reset/");
  const isVerification = location.pathname.startsWith("/imageVerification");

  // Check if the current path is in the hiddenPaths array or is an OTP path
  const isNavbarHidden = hiddenPaths.includes(location.pathname) || isOtpPath || isResetPath || isVerification;

  return (
    <>
      {!isNavbarHidden && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/otp/:id" element={<Otp />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<TaskDashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/userProfile/:id" element={<UserProfile/>} key={location.pathname}/>
        <Route path="/my_applications" element={<MyApplications />} />
        <Route path="/password_reset/:id" element={<ResetPassword />} />
        <Route path="/task/:id" element={<TaskPage />} />
        <Route path="/admin" element={<Admin_Dashboard/>} />
        <Route path="/point_conversion" element={<PointConversion />} />
        <Route path="/imageVerification" element={<ImageVerification/>} />
      </Routes>
    </>
  );
}

export default App;

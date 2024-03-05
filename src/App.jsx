import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import OtpVerification from "./OtpVerification.jsx";
import Loader from "./Loader.jsx";
import Navbar from "./Navbar.jsx";
import BottomNavigationBar from "./BottomNavigationBar.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Define an array of paths where the Navbar should be hidden
  const hiddenPaths = [ "/signup", "/otp_verification"];

  // Check if the current path is in the hiddenPaths array
  const isNavbarHidden = hiddenPaths.includes(location.pathname);

  return (
    <>
      {/* Conditionally render Navbar based on the current route */}
      {!isNavbarHidden && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp_verification" element={<OtpVerification />} />
        <Route path="/loading" element={<Loader />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
      <BottomNavigationBar/>
    </>
  );
}

export default App;

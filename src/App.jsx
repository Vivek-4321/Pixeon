import "./App.css";
import { HashRouter, Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import Home from './Home.jsx';
import Navbar from "./Navbar.jsx";

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
  const hiddenPaths = [ "/hi thre","/signup", "/otp_verification"];

  // Check if the current path is in the hiddenPaths array
  const isNavbarHidden = hiddenPaths.includes(location.pathname);

  return (
    <>
      {/* Conditionally render Navbar based on the current route */}
      {!isNavbarHidden && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;


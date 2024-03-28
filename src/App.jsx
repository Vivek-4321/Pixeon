import "./App.css";
<<<<<<< HEAD
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
=======
import { HashRouter, Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import Home from './Home.jsx';
import Navbar from "./Navbar.jsx";
>>>>>>> home_page

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
  // const location = useLocation();

<<<<<<< HEAD
  // // Define an array of paths where the Navbar should be hidden
  // const hiddenPaths = [ "/","/signup", "/otp_verification"];
=======
  // Define an array of paths where the Navbar should be hidden
  const hiddenPaths = [ "/hi thre","/signup", "/otp_verification"];
>>>>>>> home_page

  // // Check if the current path is in the hiddenPaths array
  // const isNavbarHidden = hiddenPaths.includes(location.pathname);

  return (
    <>
      {/* {!isNavbarHidden && <Navbar />} */}
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/otp/:id" element={<Otp />} />
=======
        <Route path="/" element={<Home />} />
>>>>>>> home_page
      </Routes>
    </>
  );
}

export default App;

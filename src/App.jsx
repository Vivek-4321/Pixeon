import "./App.css";
import { HashRouter, Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Forget from "./Forget.jsx";
import Otp from "./Otp.jsx";


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  // const location = useLocation();

  // // Define an array of paths where the Navbar should be hidden
  // const hiddenPaths = [ "/","/signup", "/otp_verification"];

  // // Check if the current path is in the hiddenPaths array
  // const isNavbarHidden = hiddenPaths.includes(location.pathname);

  return (
    <>
      {/* {!isNavbarHidden && <Navbar />} */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget" element={<Forget/>}/>
        <Route path="/otp" element={<Otp/>}/>
      
      </Routes>
   
    </>
  );
}

export default App;


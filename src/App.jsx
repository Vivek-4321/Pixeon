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
import Home from './Home.jsx';
import Navbar from "./Navbar.jsx";
import Profile from "./Profile.jsx";


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
  const location = useLocation(); // Import and use useLocation hook

  // Define an array of paths where the Navbar should be hidden
  const hiddenPaths = ["/login", "/signup", "/forget", /^\/otp\/\d+$/]; // Update the path to use regex

  // Check if the current path is in the hiddenPaths array
  const isNavbarHidden = hiddenPaths.some((path) =>
    typeof path === 'string' ? location.pathname === path : path.test(location.pathname)
  );

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
      </Routes>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/LoginSignup/Login";
import Signup from "./Components/LoginSignup/Signup";
import Dashboard from "./Components/Dashboard/Dashboard";
import Facilities from "./Components/Facilities/Facilities";
import AddFacilities from "./Components/Facilities/AddFacilities";
// import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/facilities/new" element={<AddFacilities />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

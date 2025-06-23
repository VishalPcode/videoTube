import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Myprofile from "./components/Myprofile";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Sidebar />} />
      <Route path="/profile" element={<Myprofile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    {/* <Sidebar /> */}
  </>
  );
}

export default App;

import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Posts from "./components/Posts";
import Register from "./components/Register";
import Login from "./components/Login";
import NavbarST from "./components/NavBar";

function App() {
  return (
    <>
      <NavbarST />
      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

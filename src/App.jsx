import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Posts from "./components/Posts";
import Register from "./components/Register";
import Login from "./components/Login";
import NavbarST from "./components/NavBar";
import CreatePosts from "./components/CreatePosts";
import EditPosts from "./components/EditPost";

function App() {
  return (
    <>
      <NavbarST />
      <Routes>
        <Route path="/editposts" element={<EditPosts />} />
        <Route path="/createposts" element={<CreatePosts />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

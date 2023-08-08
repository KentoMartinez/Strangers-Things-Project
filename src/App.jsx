import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Posts from "./components/Posts";
import Nav from "react-bootstrap/Nav";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Nav.Link
        onClick={() => {
          navigate("/posts");
        }}
      >POSTS</Nav.Link>
      <div>
        <Routes>
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

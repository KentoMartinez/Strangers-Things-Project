import "./App.css";
import { Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";
import Register from "./components/Register";
import Login from "./components/Login";
import NavbarST from "./components/NavBar";
import CreatePosts from "./components/CreatePosts";
import EditPosts from "./components/EditPosts";
import SinglePosts from "./components/SinglePosts";
import Toast from "react-bootstrap/Toast";
import { useState } from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Profile from "./components/Profile";

function App() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  function showMessage(msg, typ) {

    setType(typ);
    setMessage(msg);
    setShow(true);
  }

  return (
    <>
      <NavbarST />
      <Routes>
        <Route path="/post/:id" element={<SinglePosts showMessage={showMessage}  />} />
        <Route path="/editpost" element={<EditPosts showMessage={showMessage}  />} />
        <Route path="/createpost" element={<CreatePosts showMessage={showMessage}  />} />
        <Route path="/posts" element={<Posts showMessage={showMessage}  />} />
        <Route path="/register" element={<Register showMessage={showMessage} />} />
        <Route path="/login" element={<Login showMessage={showMessage}  />} />
        <Route path="/profile" element={<Profile showMessage={showMessage}  />} />
      </Routes>

      
      <ToastContainer
        position="bottom-center"
        className="p-3"
        style={{ zIndex: 1 }}
      >
        <Toast show={show} bg={type.toLowerCase()} onClose={toggleShow} delay={5000} autohide>
          <Toast.Header>
            <strong className="me-auto">{type==="danger"?"Error":type==="Warning"?"Succes":type}</strong>
            
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default App;

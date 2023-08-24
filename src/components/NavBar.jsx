import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import NavBarPost from "./NavBarPost";
import NavbarGuest from "./NavbarGuest";

export default function NavbarPlayers() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();

  return (
    <>{
      console.log(localStorage.getItem("username") +"navbar")
    }{
      
      localStorage.getItem("username")?
    <NavBarPost />:
    <NavbarGuest/>}
    </>

  );
}

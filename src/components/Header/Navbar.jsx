import React from "react";
import "./navbar.css";
//import IconButton from "@mui/material/IconButton";
//import { Badge } from "@mui/material";
//import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
//import SwipeableTemporaryDrawer from "../Cart/Cartslide";
//import { cart } from "../Contex";
//import { Button } from "antd";
//import axios from "axios";
import Search from "../Products/filterProducts/Search";
import logo from "../images/logo.png"

const Navbar = ({ handleSearch }) => {
 // const { cartitem, wishlist } = useContext(cart);



  return (
    <div style={{ position: "fixed", top: "0", width: "100%", zIndex: "10" }}>
      <div className="nav">
        <div className="logo" style={{ marginLeft: "1cm" }}>
          {/* <h5>you first order is free</h5> */}
          <img src={logo} alt="" width={"200px"} />
        </div>
       <Search/>
       
        <div className="right-nav">
          <Link to="/UserLogin">
            {" "}
            <button id="navbtn" className="signin">
              Login
            </button>
          </Link>
          <Link to="/UserRegister">
            <button id="navbtn" className="Register">
              Register
            </button>
          </Link>

         
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;

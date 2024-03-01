import React from "react";
import "./navbar.css";
//import IconButton from "@mui/material/IconButton";
//import { Badge } from "@mui/material";
//import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
//import SwipeableTemporaryDrawer from "../Cart/Cartslide";

//import { Button } from "antd";
//import axios from "axios";
import Search from "../Products/filterProducts/Search";
import logo from "../images/movie logo.png";
import Headroom from "react-headroom";

const Navbar = ({ handleSearch }) => {
  // const { cartitem, wishlist } = useContext(cart);

  return (
    <>
    <Headroom>
      <div className="nav">
        <div className="logo" style={{ marginLeft: "1cm" }}>
          <img src={logo} alt=""height={"50px"} style={{borderRadius:"12px"}}/>
        </div>
        <div>Home</div>
        <div>Services</div>
        <div>Contact Us</div>
        <Search />
        <div className="right-nav">
          <Link to="/UserRegister">
            <button id="navbtn" className="Register">
              Sign In
            </button>
          </Link>
          <div>filter</div>
        </div>
      </div>
    </Headroom>
    </>
  );
};

export default Navbar;

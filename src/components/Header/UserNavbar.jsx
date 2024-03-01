import React, { useContext } from "react";
import "./navbar.css";
import { Avatar, Badge } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";

import Search from "../Products/filterProducts/Search";
import logo from "../images/logo.png"
import { movies } from "../Contex";


const UserNavbar = () => {
  const {wishlist } = useContext(movies);
  return (
    <div style={{ position: "fixed", top: "0", width: "100%", zIndex: "10" }}>
      <div className="nav">
      <div className="logo" style={{ marginLeft: "1cm" }}>
          {/* <h5>you first order is free</h5> */}
          <img src={logo} alt="" width={"200px"} />
        </div>
        <div>Home</div>
      
       <Search/>
       
        <div className="hotline">HOTLINE: 1-900-9999</div>
        <div className="right-nav">
         <Link to="/UserDashboard"> <Avatar /></Link>

          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/Wishlist"
          >
            <p style={{ marginRight: "12px" }}>
              {" "}
              {/* display:{wishlist.length === 0 ? "none" : "block"} */}
              <Badge
                badgeContent={wishlist.length === 0 ? "0" : wishlist.length}
                color="error"
              >
                <FavoriteBorderIcon />
              </Badge>
            </p>
          </Link>

          {/* <p style={{ paddingBottom: "9px" }}>
            <Badge
              style={{ marginRight: "15px", marginTop: "10px" }}
              badgeContent={cartitem.length === 0 ? "0" : cartitem.length}
              color="error"
            >
              {" "}
              <IconButton sx={{ padding: "0px" }}>
                {" "}
                <SwipeableTemporaryDrawer />
              </IconButton>
            </Badge>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;

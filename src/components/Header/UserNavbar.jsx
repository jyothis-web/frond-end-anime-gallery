import "./navbar.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

import Search from "../Products/filterMovies/Search";
import logo from "../images/movie logo.png";
import Headroom from "react-headroom";
import MobileDrawer from "./MobileDrawer/MobileDrawer";

const UserNavbar = () => {
  const authString = localStorage.getItem("auth");
  const handleAvatarClick = () => {
    if (authString) {
      // Navigate to UserDashboard if authString exists
      window.location.href = "/UserDashboard";
    } else {
      // Show error message if authString doesn't exist
      alert("Error: No authentication data found.");
    }
  };
  return (
    <div>
      <Headroom>
        <div className="nav">
          <div className="logo">
            <img
              src={logo}
              alt=""
              height={"50px"}
              style={{ borderRadius: "12px" }}
            />
          </div>
          <Link className="navbar-navigation"
            style={{
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
            }}
            to="/UserHomepage"
          >
            <div >Home</div>
          </Link>
          <Search />

          <div className="hotline">HOTLINE: 1-900-9999</div>
          <div className="right-nav">
          {authString ? (
              <Avatar onClick={handleAvatarClick} />
            ) : (
              <div
                style={{
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={handleAvatarClick}
              >
               authenticated error occured
              </div>
            )}

            {/* <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/Wishlist"
            >
              <p style={{ marginRight: "12px" }}>
                {" "}
             
                <Badge
                  badgeContent={wishlist.length === 0 ? "0" : wishlist.length}
                  color="error"
                >
                  <FavoriteBorderIcon />
                </Badge>
              </p>
            </Link> */}
          </div>
          <div className="menu-btn">
            <MobileDrawer />
          </div>
        </div>
      </Headroom>
    </div>
  );
};

export default UserNavbar;

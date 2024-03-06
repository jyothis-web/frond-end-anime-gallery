import "./navbar.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

import Search from "../Products/filterProducts/Search";
import logo from "../images/movie logo.png";
import Headroom from "react-headroom";
import MobileDrawer from "./MobileDrawer/MobileDrawer";

const UserNavbar = () => {
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
            to="/"
          >
            <div >Home</div>
          </Link>
          <Search />

          <div className="hotline">HOTLINE: 1-900-9999</div>
          <div className="right-nav">
            <Link to="/UserDashboard">
              {" "}
              <Avatar />
            </Link>

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

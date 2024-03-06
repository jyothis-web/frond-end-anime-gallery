import { Drawer, IconButton } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const MobileDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div>
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
        </div>

        <Drawer
          anchor="top"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap:"20px"
            }}
          >
           <Link to="/"></Link> <div className="navbar-navigation">Home</div>
            <div className="navbar-navigation">Services</div>
            <div className="navbar-navigation">Contact Us</div>

            <Link to="/UserRegister">
              <button id="navbtn" className="Register">
                Sign In
              </button>
            </Link>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default MobileDrawer;

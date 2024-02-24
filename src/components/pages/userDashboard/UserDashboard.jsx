import React, { useContext, useEffect } from "react";
import { cart } from "../../Contex";
import { Link, useNavigate } from "react-router-dom";
import UserNavbar from "../../Header/UserNavbar";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(cart);
  useEffect(() => {
    // Set initial auth state when component mounts
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, [setAuth]);

  const Handlelogout = () => {
    console.log(localStorage.getItem("auth"));
    try {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      console.log("sucessfully logout");
      localStorage.removeItem("auth");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
       <UserNavbar/>
<div style={{marginTop:"150px",display:"flex", gap:"50px"}}>
       {auth.user?.name ? `Welcome ${auth.user.name}` : ""}
       <Link to="/"> <button id="navbtn">Home</button></Link>
      <button  id="navbtn" onClick={Handlelogout}>Logout</button>
      </div>
      {/* <Link to="/AdminLogin"><Button variant="contained">for admin</Button></Link> */}
    </div>
  );
};

export default UserDashboard;

import { Button } from "@mui/material";
import React, { useContext } from "react";
import { cart } from "../../Contex";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(cart);

  const Handlelogout = () => {
    //console.log(localStorage.getItem("auth"));
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
    <div style={{marginLeft:"30px"}}>
        <h1>Admin Dashboard</h1>
        <div style={{display:"flex",flexDirection:"column",gap:"20px",}}>
      {auth.user?.name ? `Welcome ${auth.user.name}` : ""}
      <Link to="/Catergory"><Button variant="contained">create category</Button></Link>
      <Link to="/CategoryWithProducts"><Button variant="contained">view category</Button></Link>
      <Link to="/CreateProduct"><Button variant="contained">create products</Button></Link>
      <Link to="/Product"><Button variant="contained">view products</Button></Link>
      <Button  variant="contained" sx={{maxWidth:"80px"}} onClick={Handlelogout}>Logout</Button>
      </div>
      
    </div>
  );
};

export default AdminDashboard;

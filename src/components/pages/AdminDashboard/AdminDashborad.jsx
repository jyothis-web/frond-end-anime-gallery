import { Button } from "@mui/material";
import React, { useContext } from "react";
import { movies} from "../../Contex";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(movies);

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
      <Link to="/Catergory"><Button variant="contained">movie category</Button></Link>
      <Link to="/CreateMovie"><Button variant="contained">create movies</Button></Link>
      <Link to="/movies"><Button variant="contained">view movies</Button></Link>
      <Button  variant="contained" sx={{maxWidth:"80px"}} onClick={Handlelogout}>Logout</Button>
      </div>
      
    </div>
  );
};

export default AdminDashboard;

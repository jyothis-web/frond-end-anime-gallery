import { Button, Card } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../UserLogin/UserLogin.css";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { cart } from "../../Contex";

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useContext(cart);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        email,
        password,
      });
      console.log(response.data);
      toast.success(response.data.message);
      setAuth({
        ...auth,
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem("auth", JSON.stringify(response.data));
      navigate("/UserHomepage");
      //  window.location.reload();
    } catch (error) {
      console.log(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {" "}
      <Toaster
        containerStyle={{
          position: "absolute",
          top: "0px",
          left: "-60px",
        }}
      />
      <form onSubmit={handleSubmit}>
        <Card
          className="login-card"
          sx={{
            width: "350px",
            padding: "15px",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          <h2>Login Page</h2>
          <input
            type="email"
            name="email"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bluebtn" type="submit">
            Log in
          </button>

          <Link to="/PasswordResetPage">
            {" "}
            <button className="btn"> forgot password?</button>
          </Link>

          <div>
            {" "}
            Already have an account{" "}
            <Link to="/UserRegister">
              <Button sx={{ textTransform: "none" }}>Sign in</Button>
            </Link>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default UserLogin;

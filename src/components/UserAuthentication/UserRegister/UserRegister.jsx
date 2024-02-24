import React, { useState } from "react";
// import GoogleButton from "react-google-button";
//  import { signInWithPopup } from "firebase/auth";
//  import { auth, provider } from "../../Firebase";
//  import UserHomepage from "../../Pages/Homepage/UserHomepage";
import { Alert, Button, Card } from "@mui/material";
import "../UserRegister/UserRegister.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // if (!name) {
      //   console.log("name is required");
      // }
      // if (!email) {
      //   console.log("email is required");
      // }
      // if (!password) {
      //   console.log("password is required");
      // }
      if (!name || !email || !password) {
        console.log("fill all tha fields");
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/register`,
          { name, email, password } // Send data as an object
        );
        console.log(response.data);
        navigate('/UserLogin');
      }
      // Assuming `navigate` is defined somewhere, navigate to "/UserLogin"
    } catch (error) {
      // if (error.message.statuscode === 400) {
      //   console.error(error.message);
      // }
      console.error(error.response.data.message);
      // Use error.response.data.message
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
      <form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Card
          className="signup-card"
          sx={{
            width: "350px",
            padding: "15px",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          <h2>Signup Page</h2>

          <input
            //type={option ? "email" : "tel"}
            type="text"
            name="name"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            //type={option ? "email" : "tel"}
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bluebtn">Sign up</button>

          {/* {value ? (
            <UserHomepage />
          ) : ( */}
          {/* <GoogleButton onClick={HandleGoogleSignIn}></GoogleButton> */}
          {/* )} */}

          <div>
            {" "}
            Already have an account{" "}
            <Link to="/UserLogin">
              <Button sx={{ textTransform: "none" }}>log in</Button>
            </Link>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default UserRegister;

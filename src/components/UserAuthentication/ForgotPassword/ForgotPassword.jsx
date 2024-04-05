import axios from "axios";
import React from "react";
import "../ForgotPassword/forgotPassword.css";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/auth/forgotpassword`,
        {
          email: email,
        }
      );
      console.log(response.data);
      localStorage.setItem('resetEmail', email);
      toast.success("Email sent Successfully", {
        style: {
          marginTop: "100px",
          padding: "10px 15px",
          color: "#00A264",
          backgroundColor: "#00A26426",
        },
        duration: 7000,
      });
      navigate(`/Otppage?email=${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      console.error("Forgot password error:", error.message);
    }
  };
  return (
    <div className="password-page">
      {" "}
      <Toaster position="top-center" />
      <h3
        style={{
          marginTop: "147px",
          marginBottom: "20px",
          paddingLeft: "0",
        }}
      >
        Forgot Password
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="login_inputfield2">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button variant="outlined"
            type="submit"
           
            style={{ marginTop: "10px" }}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;

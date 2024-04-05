import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
console.log(confirmPassword);
    try {
      const response = await axios.post(
        `http://localhost:8080/auth/resetPassword`,
        {
          email: email,
          password: confirmPassword,
        }
      );
      console.log(response.data);
      toast.success(response.data.message);
      navigate("/UserLogin")
    } catch (error) {
      console.error("Password reset failed:", error.message);
      toast.error(error.response.data.message || error.response.statusText || error.message);
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
          placeholder="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
          placeholder="confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PasswordReset;

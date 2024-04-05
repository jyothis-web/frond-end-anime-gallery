import axios from "axios";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Otppage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
  const navigate = useNavigate();
    // Use the email value as needed
    console.log('Email:', email);
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const otpInputRefs = useRef(
    Array.from({ length: 4 }, () => React.createRef())
  );
//   console.log(email);
  const handleOtpChange = (index, value) => {
    if (/^\d{0,1}$/.test(value)) {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value;
      setOtpDigits(newOtpDigits);

      // Move focus to the next input field if value is entered
      if (value && index < 3) {
        otpInputRefs.current[index + 1].current.focus();
      } else if (!value && index > 0) {
        // Move focus backward if value is deleted
        otpInputRefs.current[index - 1].current.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (/^\d{4}$/.test(pastedData)) {
      setOtpDigits(pastedData.split(""));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email =  localStorage.getItem('resetEmail');
    const otp = otpDigits.join("");
    console.log("Entered OTP:", otp);
    console.log("Entered email:", email);
    try {
      const response = await axios.post(
        `http://localhost:8080/auth/verifyOTP`,
        {
          email: email,
          userOTP: otp,
        }
      );
      console.log(response.data);
      toast.success(response.data.message);
      navigate(`/PasswordReset?email=${encodeURIComponent(email)}`);
      // toast.success("Email sent Successfully", {
      //   style: {
      //     marginTop: "100px",
      //     padding: "10px 15px",
      //     color: "#00A264",
      //     backgroundColor: "#00A26426",
      //   },
      //   duration: 7000,
      // });
      // navigate(`/Otppage`);
     // return response.data;
    } catch (error) {
      console.error("Forgot password error:", error.message);
      toast.error(error.response.data.message || error.response.statusText || error.message);
    }
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <p>Enter the OTP sent to {email}</p>
      <form onSubmit={handleSubmit} onPaste={handlePaste}>
        {otpDigits.map((digit, index) => (
          <input
            key={index}
            ref={otpInputRefs.current[index]}
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
          />
        ))}
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default Otppage;

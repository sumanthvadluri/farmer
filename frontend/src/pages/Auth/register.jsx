
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [userType, setUserType] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.userType) {
      console.log("Redirecting user:", userInfo.userType);
      navigate(userInfo.userType === "buyer" ? "/seller" : "/farmerhome", { replace: true });
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password, location, userType }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(res.userType === "buyer" ? "/seller" : "/farmerhome", { replace: true });
        toast.success("User successfully registered.");
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="lr-body">
      <style>
        {`
        .lr-body {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #4CAF50, #2E7D32);
          font-family: "Poppins", sans-serif;
        }
        .container {
          width: 100%;
          max-width: 400px;
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          text-align: center;
        }
        .login-box h2 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #333;
        }
        .input-box {
          position: relative;
          margin-bottom: 20px;
        }
        .input-box input {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 6px;
          outline: none;
          transition: 0.3s;
        }
        .input-box input:focus {
          border-color: #4CAF50;
          box-shadow: 0 0 8px rgba(76, 175, 80, 0.5);
        }
        .input-box label {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 14px;
          color: #777;
          transition: 0.3s ease-in-out;
          pointer-events: none;
        }
        .input-box input:focus + label,
        .input-box input:valid + label {
          top: -10px;
          left: 8px;
          font-size: 12px;
          color: #4CAF50;
          background: white;
          padding: 0 5px;
        }
        .radio-box {
          text-align: left;
          margin-bottom: 20px;
        }
        .radio-box label {
          display: block;
          font-size: 14px;
          margin-top: 5px;
        }
        .radio-box input {
          margin-right: 10px;
        }
        .btnn {
          width: 100%;
          padding: 12px;
          background: #4CAF50;
          border: none;
          color: #fff;
          font-size: 18px;
          font-weight: 500;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .btnn:hover {
          background: #388E3C;
        }
        .register {
          margin-top: 10px;
          font-size: 14px;
        }
        .register a {
          color: #4CAF50;
          text-decoration: none;
          font-weight: 500;
        }
        .register a:hover {
          text-decoration: underline;
        }
        @media (max-width: 500px) {
          .container {
            width: 90%;
            padding: 20px;
          }
        }
        `}
      </style>
      <div className="container">
        <div className="login-box">
          <h2>Register</h2>
          <form onSubmit={submitHandler}>
            <div className="input-box">
              <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <label>Username</label>
            </div>
            <div className="input-box">
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label>Email</label>
            </div>
            <div className="input-box">
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <label>Password</label>
            </div>
            <div className="input-box">
              <input type="password" name="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              <label>Confirm Password</label>
            </div>
            <div className="input-box">
              <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
              <label>Location</label>
            </div>
            <button className="btnn" type="submit">Register</button>
            <p className="register">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;


// <div className="radio-box">
//               <p className="radio-label">Select User Type</p>
//               <label>
//                 <input type="radio" name="userType" value="farmer" checked={userType === "farmer"} onChange={(e) => setUserType(e.target.value)} />
//                 Farmer
//               </label>
//               <label>
//                 <input type="radio" name="userType" value="buyer" checked={userType === "buyer"} onChange={(e) => setUserType(e.target.value)} />
//                 Buyer
//               </label>
//             </div>

// import React from "react";
// import "../../styles.css";
// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// // import Loader from "../../components/Loader";
// import { setCredentials } from "../../redux/features/auth/authSlice";
// import { useLoginMutation } from "../../redux/api/users";
// import { toast } from "react-toastify";

// const Login = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   console.log(email)
//   console.log(password)

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const [login, { isLoading }] = useLoginMutation();

//   const { userInfo } = useSelector((state) => state.auth);

//   const { search } = useLocation();
//   const sp = new URLSearchParams(search);
//   // const redirect = sp.get("redirect") || "/farmerhome";

//   const redirect = "/farmerhome";
//   const Bredirect = "/seller";

//   // useEffect(() => {
//   //     if (userInfo?.userType) {
//   //       console.log("Redirecting user:", userInfo.userType);
        
//   //       if (userInfo.userType === "buyer" && location.pathname !== "/seller") {
//   //         navigate("/seller", { replace: true });  
//   //       } else if (userInfo.userType === "farmer" && location.pathname !== "/farmerhome") {
//   //         navigate("/farmerhome", { replace: true });
//   //       }
//   //     }
//   //   }, [userInfo]);

//   useEffect(() => {
//     if (userInfo?.userType) {
//       console.log("Redirecting user:", userInfo.userType);
      
//       if (userInfo.userType === "buyer" && location.pathname !== "/seller") {
//         navigate("/seller", { replace: true });  
//       } else if (userInfo.userType === "farmer" && location.pathname !== "/farmerhome") {
//         navigate("/farmerhome", { replace: true });
//       }
//     }
//   }, [userInfo]);

//   // useEffect(() => {
//   //   if (userInfo) {
//   //     navigate(redirect);
//   //   }
//   // }, [navigate, redirect, userInfo]);


//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await login({ email, password, }).unwrap();
//       dispatch(setCredentials({ ...res }));
//       if (res.userType === "buyer") {
//         navigate("/seller", { replace: true });
//       } else if (res.userType === "farmer") {
//         navigate("/farmerhome", { replace: true });
//       }
//       setEmail("");
//       setPassword("");
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//     }
//   };


//   return (
//     <div className="lr-body">
//     <div className="container">
//       <div className="login-box">
//         <h2>Login</h2>
//         <form onSubmit={submitHandler}>
//           <div className="input-box">
//             <input type="email" value={email}
//                 onChange={(e) => setEmail(e.target.value)} required />
//             <label>Email</label>
//           </div>
//           <div className="input-box">
//             <input type="password" value={password}
//                 onChange={(e) => setPassword(e.target.value)} required />
//             <label>Password</label>
//           </div>
//           <button className="btnn" type="submit">Login</button>
//           <p className="register">
//             Don't have an account? <Link to="/signup">Register</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [login] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.userType) {
      console.log("Redirecting user:", userInfo.userType);
      if (userInfo.userType === "buyer") {
        navigate("/seller", { replace: true });  
      } else if (userInfo.userType === "farmer") {
        navigate("/farmerhome", { replace: true });
      }
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(res.userType === "buyer" ? "/seller" : "/farmerhome", { replace: true });
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
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
          background: linear-gradient(135deg,rgb(141, 180, 142),rgb(135, 175, 137));
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
          <h2>Login</h2>
          <form onSubmit={submitHandler}>
            <div className="input-box">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label>Email</label>
            </div>
            <div className="input-box">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <label>Password</label>
            </div>
            <button className="btnn" type="submit">Login</button>
            <p className="register">
              Don't have an account? <Link to="/signup">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

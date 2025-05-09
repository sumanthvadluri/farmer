// // import React from "react";
// //  import "../styles.css";
// // import Header from "../components/header.jsx"
// // import FeatureBox from "../components/featurebox.jsx";
// // import About from "../components/About.jsx"
// // import { useSelector } from "react-redux";

// // const Home=()=> {
// //   const { userInfo } = useSelector((state) => state.auth);
// // return (
// //   // <div >
// //   //   {/* <Header/>

// //   // <FeatureBox/>

// //   // <About/> */}

// //   //   </div>

// //   <div class="container-ram">
// //         <div class="background">
// //             <div class="bg-img">
// //             </div>
// //             <div class="bg-clr">
// //             </div>
// //         </div>

// //         <div class="overlay">
// //             <header class="full-head">
// //                 <nav class="head-section">
// //                     <h1 style="margin-left: 25px;">Smart Farming</h1>
// //                     {userInfo ? ( <ul style="margin-right: 25px;" class="link-section">
// //                         <li><a href="#Dashboard">Dashboard</a></li>
// //                         <li><a href="#SoilHealth">Soil Health</a></li>
// //                         <li><a href="#IrrigationControl">Irrigation Control</a></li>
// //                         <li><a href="#DiseaseDetection">Disease Detection</a></li>
// //                         <li><a href="#WeatherForecast">Weather Report</a></li>
// //                     </ul> ):( 
// //                       <ul style="margin-right: 25px;" class="link-section">
// //                         <li><a href="#login">Login</a></li>
// //                         <li><a href="#sign-up">Sign-up</a></li>
// //                     </ul>)}
// //                 </nav>  
// //                 <div id="sub-head">
// //                 </div>
// //                 <main>
// //                     <div class="boxes">
// //                         <div id="box1">
// //                             <h3>About us</h3>
// //                             <img src="farmer.jpeg" alt="about us"/>
// //                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sed ipsum veniam modi odio voluptate nemo pariatur culpa, alias aliquam in dolores, non quam sit nesciunt voluptatem. Tempore, deserunt possimus.</p>
// //                         </div>
// //                         <div id="box2">
// //                             <h3>Why choose us</h3>
// //                             <img src="question.jpg" alt="why choose us"/>
// //                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sed ipsum veniam modi odio voluptate nemo pariatur culpa, alias aliquam in dolores, non quam sit nesciunt voluptatem. Tempore, deserunt possimus.</p>
// //                         </div>
// //                         <div id="box3">
// //                             <h3>Do You Know</h3>
// //                             <img src="douknow.jpg" alt="do you know?"/>
// //                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sed ipsum veniam modi odio voluptate nemo pariatur culpa, alias aliquam in dolores, non quam sit nesciunt voluptatem. Tempore, deserunt possimus.</p>
// //                         </div>
// //                     </div>
// //                 </main>
// //             </header>
// //         </div>
// //     </div>

// // );

// // };

// // export default Home;

// // const Home = () => {
// //   return (
// //     <div className="body-cont">
// //       <header className="header">
// //         <h1>Empowering Farmers with Technology</h1>
// //         <p>Upload leaf images, detect plant diseases, and get expert advice instantly.</p>
// //         <div className="auth-buttons">
// //           <a href="/signup" className="signup-btn">Sign-up</a>
// //           <a href="/login" className="login-btn">Login</a>
// //         </div>
// //       </header>

// //       <section className="features">
// //         <div className="feature">
// //           <h3>AI-Powered Disease Detection</h3>
// //           <p>Use AI to identify plant diseases and get treatment recommendations.</p>
// //         </div>
// //         <div className="feature">
// //           <h3>Market Price Insights</h3>
// //           <p>Stay updated with real-time market prices for your crops.</p>
// //         </div>
// //         <div className="feature">
// //           <h3>Community Support</h3>
// //           <p>Connect with other farmers and agriculture experts for guidance.</p>
// //         </div>
// //       </section>
      
// //       <section className="partners">
// //         <h2>Trusted by Leading Agriculture Organizations</h2>
// //         <div className="partner-logos">
// //           <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/FAO_logo.svg" alt="FAO" />
// //           <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/World_Bank_Group_logo.svg" alt="World Bank" />
// //           <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/United_Nations_Development_Programme_Logo.svg" alt="UNDP" />
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Home;


// import React from "react";
// import "../styles.css";
// import Header from "../components/header.jsx";
// import FeatureBox from "../components/featurebox.jsx";
// import About from "../components/About.jsx";
// import { Link } from "react-router-dom"; // Import Link
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useLogoutMutation } from "../redux/api/users";
// import { logout } from "../redux/features/auth/authSlice";
// import { useEffect } from "react";


// const Home = () => {
  // const { userInfo } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  //   const navigate = useNavigate();
  
  //   const [logoutApiCall] = useLogoutMutation();

//     useEffect(() => {
//       if (userInfo === undefined) return;  // ✅ Wait until `userInfo` is defined
//       if(!userInfo)
//       {
//         navigate("/", { replace: true });
//       }
//       else
//       {
//       if (userInfo && userInfo.userType !== "farmer") {
//         navigate("/seller", { replace: true });
//       }
//     }
//     }, [userInfo, navigate]);
  
    // const logoutHandler = async () => {
    //   try {
    //     await logoutApiCall();
    //     dispatch(logout());
    //     setTimeout(() => {
    //       navigate("/");
    //     }, 100);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

//   return (
//     <div className="container-ram">
//         <div className="bg-img">
//          {userInfo ? ( <ul className="log-out">
//           <li> <button onClick={logoutHandler}>
//               Logout
//           </button></li>
//                 </ul>):(<></>)} 
//         <div className="overlay">
//         <header className="full-head">
//           <nav className="head-section">
//             <h1 style={{ marginLeft: "25px" }}>Smart Farming</h1>
//             {userInfo ? (
//               <ul style={{ marginRight: "25px" }} className="link-section">
//                 <li><Link to="/dashboard">Dashboard</Link></li>
//                 <li><Link to="/field">Soil Monitoring</Link></li>
//                 <li><Link to="/presentcrop">Contract Forming</Link></li>
//                 <li><Link to="/disease-prediction">Disease Detection</Link></li>
//                 <li><Link to="/chats">Chat</Link></li>
//               </ul>
//             ) : (
//               <ul style={{ marginRight: "25px" }} className="link-section">
//                 <li><Link to="/login">Login</Link></li>
//                 <li><Link to="/signup">Sign-up</Link></li>
//               </ul>
//             )}
//           </nav>
//           <div id="sub-head"></div>
//           <main>
//             <div className="boxes">
//               <div id="box1">
//                 <h3>About us</h3>
//                 <img src="photo1.jpeg" alt="about us" />
//                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo est eveniet eum ipsa quis autem minima! In necessitatibus, ex inventore aliquam magnam voluptates repellendus iusto aut consectetur cum minus, temporibus vero magni saepe nemo! Reiciendis amet libero, esse quos mollitia enim quod dicta optio ad excepturi veritatis! Explicabo, officiis tempora.</p>
//               </div>
//               <div id="box2">
//                 <h3>Why choose us</h3>
//                 <img src="photo2.jpeg" alt="why choose us" />
//                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi facilis quod dolore commodi qui provident officiis cumque, id autem illo excepturi dolor unde ut nisi ab suscipit aspernatur quasi, quae vel eligendi minus nostrum, at amet ipsam. Et voluptate quasi veritatis ipsum placeat iusto magni aut, omnis explicabo sint quos.</p>
//               </div>
//               <div id="box3">
//                 <h3>Do You Know</h3>
//                 <img src="photo3.jpeg" alt="do you know?" />
//                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptate nesciunt perferendis dicta repudiandae veritatis nemo, porro eum, ex consequatur animi error aut tempore ut esse delectus laudantium quos repellat necessitatibus ea explicabo. Eaque neque eos vero consectetur magnam officiis voluptates, rem, obcaecati nesciunt in, iusto quasi. Eligendi, vitae repudiandae!</p>
//               </div>
//             </div>
//           </main>
//         </header>
//       </div>
//         </div>
//         <div className="bg-clr"></div>
//     </div>
//   );
// };

// export default Home;



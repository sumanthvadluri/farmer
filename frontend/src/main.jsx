// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );



import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // ✅ Import BrowserRouter
import { Provider } from "react-redux";
import store from "./redux/store";  
import App from "./App";
// import { ChakraProvider } from "@chakra-ui/react";
//import ChatProvider from "./Context/ChatProvider";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider  store={store}>
    <BrowserRouter>   {/* ✅ Wrap App inside BrowserRouter */}
    {/* <ChatProvider> */}
      <App />
      {/* </ChatProvider> */}
    </BrowserRouter>
  </Provider >
);


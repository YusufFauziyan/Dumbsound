// import components
import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { UserContext } from "./context/userContext";
import { API } from "./config/api";

// import pages
import Transaction from './pages/Transaction'
import PendingTransaction from './pages/PendingTransaction'
import AdminPage from './pages/AdminPage'
import AddMusic from './pages/AddMusic'
import AddArtis from './pages/AddArtis'
import Home from './pages/Home'
import Auth from './pages/Auth'

const App = () => {

  // base URL
  let api = API();
  // navigate
  const navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/auth");
    } else {
      if (state.user.status === "admin") {
        navigate("/admin");
      } else if (state.user.status === "user") {
        navigate("/");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await api.get("/check-auth", config);
      console.log(response);
      // If the token incorrect
      if (response.status === "failed") {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.user;
      // Get token from local storage
      payload.token = localStorage.token;
      
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  
  return (
    <Routes>
      <Route exact path='/auth' element={<Auth />} />
      <Route exact path='/' element={<Home />} />
      <Route exact path='/pay' element={<Transaction />} />
      <Route exact path='/pending' element={<PendingTransaction />} />
      <Route exact path='/admin' element={<AdminPage />} />
      <Route exact path='/add-music' element={<AddMusic />} />
      <Route exact path='/add-artis' element={<AddArtis />} />

    </Routes>
  );
}

export default App;
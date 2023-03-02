import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  let LS = JSON.parse(localStorage.getItem("userInfo"));
  const [user, setUser] = useState(LS);

  const login = async (payload) => {
    try {
      let { data } = await axios.post(
        "https://sleepy-tick-sneakers.cyclic.app/api/users/login",
        payload
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      setUser(data);

      alert("Login Successful");

      setTimeout(() => {
        navigate("/images");
      }, 1500);
    } catch (err) {
      console.log("err:", err);
      alert(err.response?.data.message);
    }
  };

  const Signup = async (payload) => {
    try {
      await axios.post(
        "https://sleepy-tick-sneakers.cyclic.app/api/users/register",
        payload
      );

      alert("Signup Successful");
      navigate("/");
    } catch (err) {
      console.log("err:", err);
      alert(err.response?.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);

    alert("LoggedOut");
  };

  return (
    <AuthContext.Provider value={{ user, login, Signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const AuthState = () => {
  return useContext(AuthContext);
};

import React from "react";
import { AuthState } from "./context/AuthContextProvider";

const UserDetails = () => {
  const { user } = AuthState();
  console.log("user:", user);

  return (
    <div className="UserDetails">
      <img src={user.profile} alt="" />
      <h4>{user.name}</h4>
      <h4>{user.email}</h4>
    </div>
  );
};

export default UserDetails;

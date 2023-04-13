import React, { useContext} from "react";
import userContext from "../context/user/userContext";

export default function Profile() {
  const uContext = useContext(userContext);
  const { user } = uContext;

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/login");
  };

  return (
    <div className="py-4">
      <h1 className="title is-5"> Profile</h1>
      <p>Name : {user ? user.name : ""} </p>
      <p>Email : {user ? user.email : ""} </p>

      <button className="button is-danger is-small mt-4" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

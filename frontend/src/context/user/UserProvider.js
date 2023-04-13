import React, { useState, useEffect } from "react";
import userContext from "./userContext";
import host from "../../dbConfig";
const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();

    setUser(json);
  };

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getUser();
    }
    // eslint-disable-next-line
  }, [localStorage.getItem("auth-token")]);

  return (
    <userContext.Provider value={{ user }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserProvider;

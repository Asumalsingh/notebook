import React from "react";
import jwt_decode from "jwt-decode";
import host from "../dbConfig";
import { GoogleLogin } from "@react-oauth/google";

export default function SigninWithGoogle() {
  // code for google login

  return (
    <div>
      <GoogleLogin
        onSuccess={(response) => {
          const decoded = jwt_decode(response.credential);
          const userObj = {
            name: decoded.name,
            email: decoded.email,
            googleId: decoded.sub,
            emailVerified: decoded.email_verified,
            picture: decoded.picture,
          };
          fetch(`${host}/api/auth/loginWithGoogle`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj),
          }).then(async (res) => {
            const json = await res.json();
            console.log(json);
            if (json.success) {
              // redirect to home
              localStorage.setItem("auth-token", json.authToken);
              window.location.replace("/");
            } else {
              alert(json.error);
            }
          });
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        auto_select
      />
    </div>
  );
}

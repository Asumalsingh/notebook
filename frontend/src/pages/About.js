import React from "react";
import "../styles/about.css";

export default function About() {
  return (
    <div className="pt-5">
      <h1 className="ask title is-2">About</h1>
      <p className="pb-3">This website is made by an Full Stack Developer</p>
      <p className="title is-6 mb-1">Things used in this:</p>
      <ul className="">
        <li>"React js" in frontend</li>
        <li>"Node js" in backend</li>
        <li>"MongoDb" database</li>
        <li>"Google Identity" for google login</li>
        <li>"Nodmailer" for send email</li>
        <li>"Bulma" for styling</li>
      </ul>
    </div>
  );
}

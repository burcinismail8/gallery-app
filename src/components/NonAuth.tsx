import React from "react";
import { AuthButtons } from "./AuthButtons";
import "../NonAuth.css";
import Title from "./Title";
const NonAuth = () => {
  return (
    <div className="non-auth-page">
      <div className="non-auth-page-image"></div>
      <div className="non-auth-content">
        <h2>Welcome to our Gallery app</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat,
          saepe? Est eveniet odit similique, omnis corrupti quos nulla nam eaque
          quasi dolorem facilis autem inventore error quisquam soluta doloremque
          porro? Sequi nihil consectetur quibusdam repellendus adipisci
          voluptatem vitae exercitationem eaque.
        </p>
        <AuthButtons />
      </div>
    </div>
  );
};

export default NonAuth;

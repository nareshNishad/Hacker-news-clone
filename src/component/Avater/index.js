import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Avatar.css";
import accountPic from "../../assert/account.png";

function AccountPane() {
  const history = useHistory();

  return (
    <div class="dropdown">
      <img alt="account" src={accountPic} className="dropbtn" />

      <div class="dropdown-content">
        <Link to="/login">Login</Link>
        {sessionStorage.getItem("user") && (
          <Link
            onClick={() => {
              sessionStorage.removeItem("user");
              history.push("/");
            }}
          >
            Logout
          </Link>
        )}
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default AccountPane;

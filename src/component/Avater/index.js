import React from "react";
import { Link } from "react-router-dom";
import "./Avatar.css";
import accountPic from "../../assert/account.png";

function AccountPane({ isLoggedIn, logout }) {
  return (
    <div class="dropdown">
      <img alt="account" src={accountPic} className="dropbtn" />

      <div class="dropdown-content">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default AccountPane;

import React from "react";
import Account from "../Avater";

function index({ children }) {
  return (
    <div className="container">
      <a href="/" className="logo">
        <img src="https://d3nb9u6x572n0.cloudfront.net/packs/media/images/logo-hn-search-a822432b.png" />
        {!sessionStorage.getItem("user") ? (
          <div className="user">
            Search
            <br />
            Hacker News
          </div>
        ) : (
          <div className="user">{sessionStorage.getItem("user")} </div>
        )}
      </a>
      <div style={{ flex: 1 }}>{children}</div>
      <Account />
    </div>
  );
}

export default index;

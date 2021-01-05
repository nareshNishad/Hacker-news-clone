import React from "react";

function index({ userInput, setUserInput }) {
  return (
    <div className="search_box">
      <span className="search_icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>

      <input
        type="search"
        placeholder="Search stories by title, url or author"
        className="search_input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      ></input>
    </div>
  );
}

export default index;

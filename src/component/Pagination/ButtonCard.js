import React from "react";

const ButtonCard = ({ value, isActive, isDisabled, onClick }) => {
  return (
    <li className={isActive ? "active" : ""}>
      {isDisabled ? (
        <button disabled>{value}</button>
      ) : (
        <button onClick={onClick}>{value}</button>
      )}
    </li>
  );
};

export default ButtonCard;

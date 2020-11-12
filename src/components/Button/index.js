import React from "react";

const Button = ({ children }) => {
  return <button>{children || "click"}</button>;
};
export default Button;

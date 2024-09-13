import React from "react";

const Button = ({ children, onClick = () => {}, styles }) => {
  return (
    <button
      className={`bg-slate-200 font-extrabold rounded-lg px-4 py-2  hover:bg-slate-300 text-slate-900 ${styles}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

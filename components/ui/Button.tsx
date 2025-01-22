"use client";

import React from "react";

interface ButtonProps {
  onClick: (e: any) => void;
  title: string;
  type: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ onClick, title, type }) => {
  const baseStyles = "px-4 py-2 rounded font-semibold text-sm transition-all";
  const primaryStyles = "bg-blue-500 text-white hover:bg-blue-600";
  const secondaryStyles = "bg-gray-200 text-gray-700 hover:bg-gray-300";

  const buttonStyles = type === "primary" ? primaryStyles : secondaryStyles;

  return (
    <button
      onClick={(e: any) => onClick(e)}
      className={`${baseStyles} ${buttonStyles} h-11 w-52`}
    >
      {title}
    </button>
  );
};

export default Button;

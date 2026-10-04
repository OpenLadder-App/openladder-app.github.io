import React from "react";
import logo from "../assets/logo.svg";
import logoWithText from "../assets/logo-with-text.svg";

export const Logo = ({ className = "h-8", withText = false }: { className?: string, withText?: boolean }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={withText ? logoWithText : logo} 
        alt="OpenLadder Logo" 
        className="h-full w-auto object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

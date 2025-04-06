"use client";
import type React from "react";
import Login from "./components/login";

const AuthForm = () => {
  return (
    <div className="h-full w-full relative overflow-hidden bg-black bg-opacity-70">
      <Login />
    </div>
  );
};

export default AuthForm;

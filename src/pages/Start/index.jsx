import React from "react";
import { useSelector } from "react-redux";
import { selectorIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Start = () => {
  const isAuth = useSelector(selectorIsAuth);

  const login = window.localStorage.getItem("login");
  if (isAuth) {
    if (login === "1") {
      return <Navigate to="/home" />;
    }
    if (login === "0") {
      return <Navigate to="/admin" />;
    }
    return <Navigate to="/" />;
  }
  return (
    <>
      <div>Start!</div>
    </>
  );
};

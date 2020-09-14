import React from "react";
import { Route, Redirect } from "react-router-dom";

export function GuestRoute({ component: Component, ...rest }) {
  return (
    <Route
      render={(props) => {
        return !localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
      {...rest}
    />
  );
}
export function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      render={(props) => {
        return localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="login" />
        );
      }}
      {...rest}
    />
  );
}

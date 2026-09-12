import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props  }) => {
  if (props.loggedIn === null) {
    return null;
  }

  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to='/sign-in' replace/>
)};


export { ProtectedRouteElement }; 
import React from "react";
import { Redirect, Route } from "react-router-dom";
import GlobalContext from "../Context";

const PrivateRouteLogin = ({ component: Component, ...rest }) => {
  const { currentUser } = GlobalContext();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Redirect to="/dashboard" />: <Component {...props} /> ;
      }}
    />
  );
};

export default PrivateRouteLogin;

import React from "react";
import { Redirect, Route } from "react-router-dom";
import GlobalContext from "../Context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = GlobalContext();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;

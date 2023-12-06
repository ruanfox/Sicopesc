import React from "react";
import { Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

const PrivateRoute = ({ component: Component, title = "", ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <AppLayout {...props} title={title}>
          <Component {...props} {...rest} />
        </AppLayout>
      )}
    />
  );
};

export default PrivateRoute;

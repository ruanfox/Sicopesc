import React from "react";
import { Route } from "react-router-dom";
import ConfigLayout from "../../layouts/ConfigLayout"

const ConfigRoute = ({
  component: Component,
  title = "",
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <ConfigLayout
          {...props}
          title={title}
        >
          <Component {...props} {...rest} />
        </ConfigLayout>
      )}
    />
  );
};

export default ConfigRoute;

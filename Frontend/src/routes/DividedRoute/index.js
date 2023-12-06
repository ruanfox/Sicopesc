import React from "react";
import { Route } from "react-router-dom";
import DividedLayout from "../../layouts/DividedLayout";

const LandPageRoute = ({
  component: Component,
  description = "",
  showBtnLogin = false,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <DividedLayout
          {...props}
          description={description}
          showBtnLogin={showBtnLogin}
        >
          <Component {...props} {...rest} />
        </DividedLayout>
      )}
    />
  );
};

export default LandPageRoute;

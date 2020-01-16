import * as React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouter = ({ component: Component, ...rest }) => {
  const loggedIn = localStorage.getItem("login");

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <div>
            {localStorage.clear()}
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          </div>
        )
      }
    />
  );
};

export default PrivateRouter;

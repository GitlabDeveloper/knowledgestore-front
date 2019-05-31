import React from 'react';
import {Route,Redirect} from "react-router";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authenticated ? (
                <Redirect
                    to={{
                        pathname: rest.location.state.from.pathname,
                        state: { from: props.location }
                    }}
                />
            ) : (
                <Component {...rest} {...props} />
            )
        }
    />
);

export default AuthRoute;
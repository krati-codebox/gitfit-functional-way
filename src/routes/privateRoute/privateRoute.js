import React from "react"
import { Route, Redirect } from "react-router-dom";
import SecureLS from "secure-ls";

import {identifyToken} from "../../utils/identifyToken"
const ls = new SecureLS();

export const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={(props) =>
                !identifyToken(ls.get("auth_token")) ?
                    <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
};
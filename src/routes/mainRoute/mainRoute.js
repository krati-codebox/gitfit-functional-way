import { Route, Switch } from "react-router-dom";

import { LogInComponent, RegistrationComponent, ResetpassComponent, DashboardComponent } from "../../screens";
import { PrivateRoute } from "../privateRoute";
import { AuthRoute } from "../authRoute";

export const MainRoute=()=> {
    return (
        <>
      <Switch>

        {/* in case user is not authorised */}
        {/* <AuthRoutes exact path="/" component={FreeText} /> */}
        <AuthRoute exact path="/" component={LogInComponent} />
        <AuthRoute exact path="/registration" component={RegistrationComponent} />
        <AuthRoute exact path="/resetpassword" component={ResetpassComponent} />

        {/* <AuthRoutes exact path="/signup" component={Signup} /> */}

        {/* in case user is authorised */}
        <PrivateRoute exact path="/coach/dashboard" component={DashboardComponent} />

        {/* incase user enters some random url.. */}
        <Route path="*" component={()=> "404 NOT FOUND"} />

      </Switch>
    </>
    )
}

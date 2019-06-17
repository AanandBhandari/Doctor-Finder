import React from "react";
import { Switch, Route } from "react-router-dom";
import Menu from './home/Menu'
import Home from './home/Home'
import DoctorSignup from './doctor/SignUp'

const MainRouter = () => {
    return (
        <>
        <Menu/>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/doctorSignUp" component={DoctorSignup} />
        </Switch>
        </>
    );
}
export default MainRouter;
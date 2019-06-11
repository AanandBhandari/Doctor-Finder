import React from "react";
import { Switch, Route } from "react-router-dom";
import Menu from './home/Menu'
import Home from './home/Home'

const MainRouter = () => {
    return (
        <>
        <Menu/>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
        </>
    );
}
export default MainRouter;
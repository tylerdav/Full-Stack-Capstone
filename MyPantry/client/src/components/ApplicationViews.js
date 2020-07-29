import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <p>Welcome to MyPantry</p> : <Redirect to="/login" />}
                </Route>

                <Route path="/recipes" exact>
                    {isLoggedIn ? <p>Hello recipes</p> : <Redirect to="/login" />}
                </Route>

                <Route path="/mypantry" exact>
                    {isLoggedIn ? <p>Hello pantry</p> : <Redirect to="/login" />}
                </Route>

                <Route path="/profiles" exact>
                    {isLoggedIn ? <p>Hello profiles</p> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
};
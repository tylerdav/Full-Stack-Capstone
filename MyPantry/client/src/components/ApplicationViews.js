import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import UserProfile from "./userProfiles/UserProfile";
import { RecipeList } from "./recipes/RecipeList";
import { FoodPantryList } from "./foodPantry/FoodPantryList";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <p>Welcome to MyPantry</p> : <Redirect to="/login" />}
                </Route>

                <Route path="/recipes" exact>
                    {isLoggedIn ? <RecipeList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/mypantry" exact>
                    {isLoggedIn ? <FoodPantryList /> : <Redirect to="/recipes" />}
                </Route>

                <Route path="/profiles/:Id" exact>
                    {isLoggedIn ? <UserProfile /> : <Redirect to="/login" />}
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
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import UserProfile from "./userProfiles/UserProfile";
import { RecipeList } from "./recipes/RecipeList";
import { FoodPantryList } from "./foodPantry/FoodPantryList";
import RecipeForm from "./recipes/RecipeForm";
import { RFManage } from "./recipeFood/RFManage";

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

                <Route path="/profiles" exact>
                    {isLoggedIn ? <UserProfile /> : <Redirect to="/login" />}
                </Route>

                <Route path="/recipeform" exact>
                    {isLoggedIn ? <RecipeForm /> : <Redirect to="/profiles/:Id" />}
                </Route>

                <Route path="/rfmanage/recipe/:id">
                    {isLoggedIn ? <RFManage /> : <Redirect to="/profiles/:Id" />}
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
import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const UserRecipeContext = React.createContext();

export const UserRecipeProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [userRecipes, setRecipes] = useState([]);

    const apiUrl = '/api/Recipe'

    const getAllRecipesByUser = (id) => {
        getToken().then((token) =>
            fetch(apiUrl + `/getbyuser/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setRecipes));
    };

    const addRecipe = (recipe) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recipe)
            }).then(resp => resp.json())
                .then(getAllRecipesByUser))
    };

    const deleteRecipe = (recipe) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${recipe.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })).then(() => getAllRecipesByUser(recipe.userProfile.id))
    }

    return (
        <UserRecipeContext.Provider value={{
            userRecipes, getAllRecipesByUser, addRecipe, deleteRecipe
        }}>
            {props.children}
        </UserRecipeContext.Provider>
    );
};

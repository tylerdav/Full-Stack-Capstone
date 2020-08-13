import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const RecipeContext = React.createContext();

export const RecipeProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [recipes, setRecipes] = useState([]);

    const apiUrl = '/api/recipe'

    const getAllRecipes = () => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
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
            }).then(resp => resp.json()).then(getAllRecipes))
    };

    const updateRecipe = (recipe) => {
        return getToken().then((token) =>
            fetch(`/api/recipe/${recipe.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recipe),
            }).then(getAllRecipes));

    }

    const deleteRecipe = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })).then(getAllRecipes);
    }

    const getRecipe = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    };

    return (
        <RecipeContext.Provider value={{
            recipes, getAllRecipes, addRecipe, deleteRecipe, getRecipe, getAllRecipes, updateRecipe
        }}>
            {props.children}
        </RecipeContext.Provider>
    );
};

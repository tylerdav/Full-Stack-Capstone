import React, { createContext, useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const RecipeFoodContext = createContext();

export function RecipeFoodProvider(props) {
    const { getToken } = useContext(UserProfileContext);
    const [recipeFoods, setRecipeFoods] = useState([]);

    const apiUrl = "/api/recipefood/";

    const getAllRecipeFoods = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(setRecipeFoods))
    }

    const getRecipeFoodByRecipeId = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `recipe/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
        );
    }


    const addRecipeFood = (recipeFood) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recipeFood),
            }).then(() => getRecipeFoodByRecipeId(recipeFood.recipeId))
        );
    };

    const editRecipeFood = (recipeFood) => {
        return getToken().then((token) =>
            fetch(apiUrl + `${recipeFood.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recipeFood)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }))
    }

    const deleteRecipeFood = (recipeFood) => {
        return getToken().then((token) =>
            fetch(apiUrl + `${recipeFood.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }).then(() => getRecipeFoodByRecipeId(recipeFood.recipeId))
        );
    };

    return (
        <RecipeFoodContext.Provider value={{ recipeFoods, setRecipeFoods, getAllRecipeFoods, getRecipeFoodByRecipeId, addRecipeFood, editRecipeFood, deleteRecipeFood }}>
            {props.children}
        </RecipeFoodContext.Provider>
    );
}
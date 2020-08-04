import React, { createContext, useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const FoodPantryContext = createContext();

export function FoodPantryProvider(props) {
    const { getToken } = useContext(UserProfileContext);
    const [foodPantries, setFoodPantries] = useState([]);

    const apiUrl = "/api/foodpantry/";

    const getAllFoodPantries = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(setFoodPantries))
    }

    const getFoodPantryByUserProfileId = () => {
        return getToken().then((token) =>
            fetch(apiUrl + `mypantry`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setFoodPantries));
    }


    const addFoodPantry = (foodPantry) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(foodPantry),
            })
                .then(getFoodPantryByUserProfileId)
        );
    };

    const editFoodPantry = (foodPantry) => {
        return getToken().then((token) =>
            fetch(apiUrl + `${foodPantry.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(foodPantry)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }))
    }

    const deleteFoodPantry = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
        ).then(getFoodPantryByUserProfileId);
    };

    return (
        <FoodPantryContext.Provider value={{ foodPantries, setFoodPantries, getAllFoodPantries, getFoodPantryByUserProfileId, addFoodPantry, editFoodPantry, deleteFoodPantry }}>
            {props.children}
        </FoodPantryContext.Provider>
    );
}
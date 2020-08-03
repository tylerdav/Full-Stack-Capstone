import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const FoodContext = React.createContext();

export const FoodProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [foods, setFoods] = useState([]);

    const apiUrl = '/api/food'

    const getAllFoods = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setFoods));

    const getFoodsByUserProfileId = (id) => {
        getToken().then((token) =>
            fetch(apiUrl + `/getbypost/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setFoods));
    };

    const searchFood = (searchTerm) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/search?q=${searchTerm}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setFoods));
    }

    const getFood = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    };

    const addFood = (food) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(food)
            }).then(resp => resp.json()))
    };

    const deleteFood = (food) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${food.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })).then(() => getFoodsByUserProfileId(food.postId))
    };

    return (
        <FoodContext.Provider value={{
            foods, getAllFoods, getFoodsByUserProfileId, searchFood, getFood, addFood, deleteFood,
        }}>
            {props.children}
        </FoodContext.Provider>
    );
};

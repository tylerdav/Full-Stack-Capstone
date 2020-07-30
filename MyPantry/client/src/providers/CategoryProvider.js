
import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {

    const apiUrl = "/api/category";

    const { getToken } = useContext(UserProfileContext);
    const [categories, setCategories] = useState([]);

    const getAllCategories = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setCategories));

    const getCategory = (id) => {
        getToken().then((token) =>
            fetch(`/api/category/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then((res) => res.json())
    }


    return (
        <CategoryContext.Provider value={{ categories, getAllCategories, getCategory }}>
            {props.children}
        </CategoryContext.Provider>
    );
};
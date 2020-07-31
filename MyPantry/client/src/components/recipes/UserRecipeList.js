import React, { useContext, useEffect } from "react";
import { UserRecipe } from "./UserRecipe";
import { UserRecipeContext } from "../../providers/UserRecipeProvider";

export const UserRecipeList = () => {

    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    const { userRecipes, getAllRecipesByUser } = useContext(UserRecipeContext);

    useEffect(() => {
        getAllRecipesByUser(userProfile.id)
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {userRecipes.map((recipe) => (
                        <UserRecipe key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    );
};

import React, { useContext, useEffect } from "react";
import { Recipe } from "./Recipe";
import { RecipeContext } from "../../providers/RecipeProvider";

export const RecipeList = () => {

    const { recipes, getAllRecipes } = useContext(RecipeContext);

    useEffect(() => {
        getAllRecipes();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {recipes.map((recipe) => (
                        <Recipe key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    );
};

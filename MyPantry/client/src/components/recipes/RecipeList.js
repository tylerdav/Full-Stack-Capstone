import React, { useContext, useEffect } from "react";
import { Recipe } from "./Recipe";
import { RecipeContext } from "../../providers/RecipeProvider";
import { RecipeFoodContext } from "../../providers/RecipeFoodProvider";
import { FoodPantryContext } from "../../providers/FoodPantryProvider";

export const RecipeList = () => {

    const { recipes, getAllRecipes } = useContext(RecipeContext);
    const { recipeFoods, getAllRecipeFoods } = useContext(RecipeFoodContext);
    const { foodPantries, getFoodPantryByUserProfileId } = useContext(FoodPantryContext);

    useEffect(() => {
        getAllRecipes()
        getFoodPantryByUserProfileId()
        getAllRecipeFoods()
    }, []);

    const canMake = (recipe) => {
        // debugger
        if (recipe.recipeFood.every(recipeFood => foodPantries.some(fp => fp.foodId === recipeFood.foodId))) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className="container">
            <div className="btn_container">
                <button className="btn btn-info make_now_btn">Make Now!</button>
            </div>
            <div className="my_pantry_container">
                <div className="cards-column">
                    {/* {recipes.map((recipe) => (
                        <Recipe key={recipe.id} recipe={recipe} />
                    ))} */}

                    {
                        recipes.filter(canMake).map((recipe) => (<Recipe key={recipe.id} recipe={recipe} />))
                    }
                </div>
            </div>
        </div>
    );
};

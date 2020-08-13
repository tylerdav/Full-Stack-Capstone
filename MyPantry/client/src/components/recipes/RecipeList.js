import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Recipe } from "./Recipe";
import { RecipeContext } from "../../providers/RecipeProvider";
import { RecipeFoodContext } from "../../providers/RecipeFoodProvider";
import { FoodPantryContext } from "../../providers/FoodPantryProvider";

export const RecipeList = () => {

    const { recipes, getAllRecipes } = useContext(RecipeContext);
    const { getAllRecipeFoods } = useContext(RecipeFoodContext);
    const { foodPantries, getFoodPantryByUserProfileId } = useContext(FoodPantryContext);
    const [recipeState, setRecipeState] = useState("allRecipes");

    useEffect(() => {
        getAllRecipes()
        getFoodPantryByUserProfileId()
        getAllRecipeFoods()
    }, []);

    const canMake = (recipe) => {

        if (recipe.recipeFood.every(rf => foodPantries.some(fp => fp.foodId === rf.foodId))) {
            return true
        } else {
            return false
        }
    }

    const recipeView = () => {
        if (recipeState === "allRecipes") {
            {
                return recipes.map((recipe) => (
                    <Recipe key={recipe.id} recipe={recipe} />
                ))
            }
        } else if (recipeState === "filteredRecipes") {
            {
                return recipes.filter(canMake).map((recipe) => (
                    <Recipe key={recipe.id} recipe={recipe} />
                ))
            }
        }
    }

    return (
        <div className="container">
            <div className="btn_container">
                {
                    (recipeState === "allRecipes")
                        ? < Button outline color="success"
                            onClick={() => setRecipeState("filteredRecipes")}
                        >View Usable Recipes
                        </Button>
                        :
                        <Button outline color="success"
                            onClick={() => setRecipeState("allRecipes")}
                        >View All Recipes
                        </Button>
                }
            </div>
            <div className="my_pantry_container">
                <div className="cards-column">
                    {recipeView()}
                </div>
            </div>
        </div >
    );
};

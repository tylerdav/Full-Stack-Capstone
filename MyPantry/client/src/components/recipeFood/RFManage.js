

import React, { useContext, useEffect, useState } from "react";
import { AddRecipeFoodForm } from "./AddRecipeFoodForm";
import { Card } from "reactstrap";
import { FoodContext } from "../../providers/FoodProvider";
import FoodSearch from "../food/FoodSearch";
import { useParams } from "react-router-dom";
import { RFList } from "./RFList";
import { RecipeFoodContext } from "../../providers/RecipeFoodProvider";
import { RecipeContext } from "../../providers/RecipeProvider";


export const RFManage = () => {
    const [currentRecipe, setCurrentRecipe] = useState([]);
    const { id } = useParams();
    const { foods, getAllFoods } = useContext(FoodContext);
    const { getRecipeFoodByRecipeId } = useContext(RecipeFoodContext);
    const { getRecipe } = useContext(RecipeContext);
    const [ingredients, setIngredients] = useState([])
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));


    useEffect(() => {
        getAllFoods()
        getRecipeFoodByRecipeId(id)
            .then(setIngredients)
        getRecipe(id).then(setCurrentRecipe);
    }, []);
    if (currentRecipe.userProfileId !== userProfile.id) {
        return null
    } else {
        return (
            <div className="container">
                <Card>
                    <div>
                        <RFList recipeId={id} ingredients={ingredients} setIngredients={setIngredients} />
                    </div>
                    <div>
                        <FoodSearch />
                        {foods.map((food) => (
                            <AddRecipeFoodForm key={food.id} food={food} recipeId={id} ingredients={ingredients} setIngredients={setIngredients} />
                        ))}
                    </div>
                </Card>
            </div>
        );
    }
};
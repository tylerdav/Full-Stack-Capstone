import React, { useContext, useEffect, useState } from "react";
import { Card } from "reactstrap";
import { RecipeFoodContext } from "../../providers/RecipeFoodProvider";
import { RF } from "./RF";

export const RFList = ({ recipeId, ingredients, setIngredients }) => {

    const { getRecipeFoodByRecipeId } = useContext(RecipeFoodContext);

    useEffect(() => {
        getRecipeFoodByRecipeId(recipeId)
            .then(() => setIngredients(ingredients))
    }, []);

    return (
        <div className="pantry_container">
            {ingredients.map((recipeFood) => (
                <RF key={recipeFood.id} recipeFood={recipeFood} setIngredients={setIngredients} />
            ))}]
        </div>
    );
};
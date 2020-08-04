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
            <Card className="pantry_cards">
                <h1>Manage Food</h1>
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {ingredients.map((recipeFood) => (
                            <RF key={recipeFood.id} recipeFood={recipeFood} setIngredients={setIngredients} />
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};
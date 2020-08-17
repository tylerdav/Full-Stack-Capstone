import React, { useContext, useEffect, useState } from "react";
import { RecipeFood } from "./RecipeFood";
import { Card } from "reactstrap";
import { RecipeFoodContext } from "../../providers/RecipeFoodProvider";

export const RecipeFoodList = ({ recipeId }) => {
    const { recipeFoods, getRecipeFoodByRecipeId } = useContext(RecipeFoodContext);
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        getRecipeFoodByRecipeId(recipeId)
            .then(setIngredients);
    }, []);

    return (
        <Card className="m-4 recipe_ingredients">
            <div className="cards-row">
                <p>Ingrediants: </p>
                {ingredients.map((recipeFood) => (
                    <RecipeFood key={recipeFood.id} recipeFood={recipeFood} />
                ))}
            </div>
        </Card>
    );
};
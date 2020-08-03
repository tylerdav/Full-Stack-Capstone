import React, { useContext, useEffect, useState } from "react";
import { RecipeFood } from "./RecipeFood";
import { Card } from "reactstrap";
import { RecipeFoodContext } from "../../providers/RecipeFoodProvider";

export const RecipeFoodList = ({ recipeId }) => {

    const { recipeFoods, getRecipeFoodByRecipeId } = useContext(RecipeFoodContext);

    useEffect(() => {
        getRecipeFoodByRecipeId(recipeId);
    }, []);

    return (
        <div className="container">
            <Card className="m-4 recipe">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {recipeFoods.map((recipeFood) => (
                            <RecipeFood key={recipeFood.id} recipeFood={recipeFood} />
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};
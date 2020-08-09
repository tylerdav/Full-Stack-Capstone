import React from "react";
import { Card, CardBody } from "reactstrap";

export const RecipeFood = ({ recipeFood }) => {

    return (
        <div className="m-2 food_recipe_ingredient">
            <h5>{recipeFood.food.name}</h5>
        </div>
    );
};
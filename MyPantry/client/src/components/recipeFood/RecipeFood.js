import React from "react";
import { Card, CardBody } from "reactstrap";

export const RecipeFood = ({ recipeFood }) => {

    return (
        <Card className="m-4">
            <CardBody>
                <h3>{recipeFood.food.name}</h3>
            </CardBody>
        </Card>
    );
};
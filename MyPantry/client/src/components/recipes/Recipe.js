import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";

export const Recipe = ({ recipe }) => {
    return (
        <Card className="m-4 recipe">
            <CardImg top src={recipe.imageLocation} />
            <CardBody>
                <h3>{recipe.title}</h3>
                <div className="recipeItems">
                    <p>{recipe.content}</p>
                    <p>Posted by: {recipe.userProfile.displayName}</p>
                    <p>Category: {recipe.category.name}</p>
                </div>
            </CardBody>
        </Card>
    );
};
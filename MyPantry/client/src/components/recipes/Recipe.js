import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { RecipeFoodList } from "../recipeFood/RecipeFoodList";

export const Recipe = ({ recipe }) => {



    return (
        <Card className="m-4 recipe">
            <CardImg top src={recipe.imageLocation} />
            <CardBody>
                <h3>{recipe.title}</h3>
                <div className="recipeItems">
                    <p>{recipe.content}</p>
                    <p>Category: {recipe.category.name}</p>
                    <div>
                        <RecipeFoodList recipeId={recipe.id} />
                    </div>
                    <p>Posted by: {recipe.userProfile.displayName}</p>
                </div>
            </CardBody>
        </Card>
    );
};
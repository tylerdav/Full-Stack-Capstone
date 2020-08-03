import React from "react";
import { Card, CardImg, CardBody, Button, ListGroupItem } from "reactstrap";
import { useParams, Link, useHistory } from 'react-router-dom'

import { RecipeFoodList } from "../recipeFood/RecipeFoodList";

export const Recipe = ({ recipe }) => {





    return (
        <Card className="m-4 recipe">
            <CardImg top src={recipe.imageLocation} />
            <CardBody>
                <div className="userPostTitle">
                    <h3>{recipe.title}</h3>
                </div>
                <div className="recipeItems">
                    <p>{recipe.content}</p>
                    <p>Category: {recipe.category.name}</p>
                    <div>
                        <strong>Ingrediants: </strong>
                        <RecipeFoodList recipeId={recipe.id} />
                    </div>
                    <p>Posted by: {recipe.userProfile.displayName}</p>
                </div>
            </CardBody>
        </Card>
    );
};



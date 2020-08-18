import React from "react";
import { Card, CardImg, CardBody, Row, Container, Col } from "reactstrap";
import { RecipeFoodList } from "../recipeFood/RecipeFoodList";

export const Recipe = ({ recipe }) => {

    return (
        <Container>
            <Card className="m-4 recipe_card">
                <h3 className="recipe_title">{recipe.title}</h3>
                <Row>
                    <Col>
                        <CardImg className="recipe_img" src={recipe.imageLocation} />
                        <p>Posted by: {recipe.userProfile.displayName}</p>
                    </Col>
                    <Col>
                        <RecipeFoodList recipeId={recipe.id} />
                    </Col>
                    <Col>
                        <h5>Instructions:</h5>
                        <p>{recipe.content}</p>
                        <p className="recipe_category">Category: {recipe.category.name}</p>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};
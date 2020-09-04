import React, { useState, useContext } from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { RecipeFoodContext } from "../../providers/RecipeFoodProvider";

export const RF = ({ recipeFood, setIngredients }) => {

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const { deleteRecipeFood } = useContext(RecipeFoodContext);

    return (
        <Card className="m-1 food_pantry_card">
            <CardBody>
                <Row className="food_card">
                    <Col>
                        <h5>{recipeFood.food.name}</h5>
                    </Col>
                    <Button type="submit"
                        onClick={
                            evt => {
                                evt.preventDefault()
                                deleteRecipeFood(recipeFood)
                                    .then(setIngredients)
                                    .then(toggle)
                            }}
                        outline color="danger"
                        className="button_margin">
                        Delete
                        </Button>
                </Row>
            </CardBody>
        </Card>
    );
};
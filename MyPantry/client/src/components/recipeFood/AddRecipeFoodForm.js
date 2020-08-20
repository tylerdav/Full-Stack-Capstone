import React, { useContext } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { RecipeFoodContext } from "../../providers/RecipeFoodProvider";

export const AddRecipeFoodForm = ({ food, recipeId, setIngredients }) => {

    const { addRecipeFood } = useContext(RecipeFoodContext);

    const addThisFood = (foodId) => {
        return addRecipeFood({
            recipeId: recipeId,
            foodId: foodId
        })
    }

    if (!food) {
        return null;
    }

    return (
        <Card className="m-1 food_pantry_card">
            <Row className="food_card">
                <Col>
                    <h5>{food.name}</h5>
                </Col>
                <Col>
                    < button type="submit"
                        onClick={
                            evt => {
                                evt.preventDefault() // Prevent browser from submitting the form
                                addThisFood(food.id)
                                    .then(setIngredients)
                            }
                        }
                        className="btn btn-primary">
                        Add Ingredient
                    </button>
                </Col>
            </Row>
        </Card>
    )
}
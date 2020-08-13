

import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { FoodPantryContext } from "../../providers/FoodPantryProvider";

export const Food = ({ food }) => {


    const { addFoodPantry } = useContext(FoodPantryContext)
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

    const addThisFood = (foodId) => {
        return addFoodPantry({
            userProfileId: userProfile.id,
            foodId: foodId
        })
    }

    if (!food) {
        return null;
    }

    return (
        <Card className="m-1 food_pantry_card">
            <CardBody>
                <Row className="food_card">
                    <Col>
                        <h5>{food.name}</h5>
                    </Col>
                    <Button type="submit"
                        outline color="secondary"
                        onClick={
                            evt => {
                                evt.preventDefault() // Prevent browser from submitting the form
                                addThisFood(food.id)
                            }
                        }
                        className="add_food_pantry">
                        Add
                    </Button>
                </Row>
            </CardBody>
        </Card>
    )
}
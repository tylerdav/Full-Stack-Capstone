

import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { FoodPantryContext } from "../../providers/FoodPantryProvider";

export const Food = ({ food }) => {


    const { addFoodPantry, getFoodPantryByUserProfileId } = useContext(FoodPantryContext)
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
                <div className="food_card">
                    <h5>{food.name}</h5>
                    <button type="submit"
                        onClick={
                            evt => {
                                evt.preventDefault() // Prevent browser from submitting the form
                                addThisFood(food.id)
                            }
                        }
                        className="btn btn-primary">
                        Add
                    </button>
                </div>
            </CardBody>
        </Card>
    )
}
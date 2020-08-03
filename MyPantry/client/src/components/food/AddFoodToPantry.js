import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FoodPantryContext } from "../../providers/FoodPantryProvider";

export const AddFoodToPantry = ({ foodPantry }) => {

    const { addFoodPantry } = useContext(FoodPantryContext)
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    const { id } = useParams();

    const [foodPantries, setFoodPantries] = useState();

    useEffect(() => {
        addFoodPantry(parseInt(id)).then(setFoodPantries);
    }, []);


    const addThisFood = (foodId) => {
        return addFoodPantry({
            userProfileId: userProfile.id,
            foodId: foodId
        })
    }

    if (!foodPantry) {
        return null;
    }

    return (
        <div>
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
    )

}

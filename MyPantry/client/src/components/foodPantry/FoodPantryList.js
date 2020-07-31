import React, { useContext, useEffect } from "react";
import { FoodPantry } from "./FoodPantry";
import { Card } from "reactstrap";
import { FoodPantryContext } from "../../providers/FoodPantryProvider";

export const FoodPantryList = () => {

    const { foodPantries, getFoodPantryByUserProfileId } = useContext(FoodPantryContext)

    useEffect(() => {
        getFoodPantryByUserProfileId()
    }, []);
    debugger
    return (
        <div className="container">
            <Card className="m-4 recipe">
                <h2>My Pantry</h2>
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {foodPantries.map((foodPantry) => (
                            <FoodPantry key={foodPantry.id} foodPantry={foodPantry} />
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};
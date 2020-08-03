import React, { useContext, useEffect } from "react";
import { FoodPantry } from "./FoodPantry";
import { Card } from "reactstrap";
import { FoodPantryContext } from "../../providers/FoodPantryProvider";
import { FoodList } from "../food/FoodList";

export const FoodPantryList = () => {

    const { foodPantries, getFoodPantryByUserProfileId } = useContext(FoodPantryContext)

    useEffect(() => {
        getFoodPantryByUserProfileId()
    }, []);

    return (
        <div className="pantry_container">
            <h2>My Pantry</h2>
            <div className="pantry_search">
                <FoodList />
            </div>
            <Card className="pantry_cards">
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
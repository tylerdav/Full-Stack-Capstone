import React, { useContext, useEffect } from "react";
import { Food } from "./Food";
import { Card } from "reactstrap";
import FoodPantrySearch from "../food/FoodPantrySearch";
import { FoodContext } from "../../providers/FoodProvider";


export const FoodList = () => {

    const { foods, getAllFoods } = useContext(FoodContext);

    useEffect(() => {
        getAllFoods()
    }, []);

    return (
        <div className="container">
            <Card>
                <div>
                    <FoodPantrySearch />
                    {foods.map((food) => (
                        <Food key={food.id} food={food} />
                    ))}
                </div>
            </Card>
        </div>
    );
};
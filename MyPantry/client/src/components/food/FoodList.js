import React, { useContext, useEffect } from "react";
import { Food } from "./Food";
import FoodSearch from "../food/FoodSearch";
import { FoodContext } from "../../providers/FoodProvider";


export const FoodList = () => {

    const { foods, getAllFoods } = useContext(FoodContext);

    useEffect(() => {
        getAllFoods()
    }, []);

    return (
        <div className="container">
            <FoodSearch />
            <br />
            <div className="food_scroll">
                {foods.map((food) => (
                    <Food key={food.id} food={food} />
                ))}
            </div>
        </div>
    );
};
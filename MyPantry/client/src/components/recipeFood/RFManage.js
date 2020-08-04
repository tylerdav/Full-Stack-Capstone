

import React, { useContext, useEffect, useState } from "react";
import { AddRecipeFoodForm } from "./AddRecipeFoodForm";
import { Card } from "reactstrap";
import { FoodContext } from "../../providers/FoodProvider";
import FoodSearch from "../food/FoodSearch";
import { useParams } from "react-router-dom";
import { RFList } from "./RFList";
import { RecipeFoodContext } from "../../providers/RecipeFoodProvider";


export const RFManage = () => {

    const { id } = useParams();
    const { foods, getAllFoods } = useContext(FoodContext);
    const { getRecipeFoodByRecipeId } = useContext(RecipeFoodContext);
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        getAllFoods()
        getRecipeFoodByRecipeId(id)
            .then(setIngredients)
    }, []);

    return (
        <div className="container">
            <Card>
                <div>
                    <RFList recipeId={id} ingredients={ingredients} setIngredients={setIngredients} />
                </div>
                <div>
                    <FoodSearch />
                    {foods.map((food) => (
                        <AddRecipeFoodForm key={food.id} food={food} recipeId={id} ingredients={ingredients} setIngredients={setIngredients} />
                    ))}
                </div>
            </Card>
        </div>
    );
};
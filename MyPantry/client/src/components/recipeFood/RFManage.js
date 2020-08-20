

import React, { useContext, useEffect, useState } from "react";
import { AddRecipeFoodForm } from "./AddRecipeFoodForm";
import { Card, Col, Row } from "reactstrap";
import { FoodContext } from "../../providers/FoodProvider";
import FoodSearch from "../food/FoodSearch";
import { useParams } from "react-router-dom";
import { RFList } from "./RFList";
import { RecipeFoodContext } from "../../providers/RecipeFoodProvider";
import { RecipeContext } from "../../providers/RecipeProvider";


export const RFManage = () => {
    const [currentRecipe, setCurrentRecipe] = useState([]);
    const { id } = useParams();
    const { foods, getAllFoods } = useContext(FoodContext);
    const { getRecipeFoodByRecipeId } = useContext(RecipeFoodContext);
    const { getRecipe } = useContext(RecipeContext);
    const [ingredients, setIngredients] = useState([])
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));


    useEffect(() => {
        getAllFoods()
        getRecipeFoodByRecipeId(id)
            .then(setIngredients)
        getRecipe(id).then(setCurrentRecipe);
    }, []);
    if (currentRecipe.userProfileId !== userProfile.id) {
        return null
    } else {
        return (
            <div className="container">
                <h1>Manage Food</h1>
                <Row>
                    <Col>
                        <FoodSearch />
                        <div className="food_scroll">
                            {foods.map((food) => (
                                <AddRecipeFoodForm key={food.id} food={food} recipeId={id} ingredients={ingredients} setIngredients={setIngredients} />
                            ))}
                        </div>
                    </Col>
                    <Col>
                        <h5>Recipe Ingredient(s)</h5>
                        <div className="food_scroll">
                            <RFList recipeId={id} ingredients={ingredients} setIngredients={setIngredients} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
};


import React, { useContext, useEffect, useState } from "react";
import { AddRecipeFoodForm } from "./AddRecipeFoodForm";
import { Card, Col, Row, Button } from "reactstrap";
import { FoodContext } from "../../providers/FoodProvider";
import FoodSearch from "../food/FoodSearch";
import { useParams, Link, useHistory } from "react-router-dom";
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
    const history = useHistory();



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
                <Link to={`/profiles`}>
                    <Button outline>
                        Back to Profile
                    </Button>
                </Link>
                <h1 className="mypantry_title">Manage Food</h1>
                <br />
                <Row>
                    <Col>
                        <FoodSearch />
                        <br />
                        <div className="food_scroll">
                            {foods.map((food) => (
                                <AddRecipeFoodForm key={food.id} food={food} recipeId={id} ingredients={ingredients} setIngredients={setIngredients} />
                            ))}
                        </div>
                    </Col>
                    <Col>
                        <h5 className="mypantry_title">Recipe Ingredient(s)</h5>
                        <br />
                        <div className="food_scroll">
                            <RFList recipeId={id} ingredients={ingredients} setIngredients={setIngredients} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
};
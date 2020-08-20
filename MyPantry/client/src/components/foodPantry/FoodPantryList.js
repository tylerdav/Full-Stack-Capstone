import React, { useContext, useEffect } from "react";
import { FoodPantry } from "./FoodPantry";
import { Card, Col, Row } from "reactstrap";
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
            <br />
            <Row className="my_pantry">
                <Col className="pantry_search">
                    <FoodList />
                </Col>
                <Col>
                    <h5 className="mypantry_title">My Ingredients</h5>
                    <br />
                    <div className="container food_scroll">
                        {foodPantries.map((foodPantry) => (
                            <FoodPantry key={foodPantry.id} foodPantry={foodPantry} />
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
};
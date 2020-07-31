import React from "react";
import { Card, CardBody } from "reactstrap";

export const FoodPantry = ({ foodPantry }) => {
    debugger
    return (
        <Card className="m-4">
            <CardBody>
                <h3>{foodPantry.food.name}</h3>
            </CardBody>
        </Card>
    );
};
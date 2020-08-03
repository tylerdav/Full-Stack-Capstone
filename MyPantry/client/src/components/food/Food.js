import React from "react";
import { Card, CardBody } from "reactstrap";

export const Food = ({ food }) => {


    return (
        <Card className="m-1 food_pantry_card">
            <CardBody>
                <div className="food_card">
                    <h5>{food.name}</h5>
                </div>
            </CardBody>
        </Card>
    )
}
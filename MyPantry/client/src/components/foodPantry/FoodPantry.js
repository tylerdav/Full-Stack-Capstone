import React, { useState, useContext } from "react";
import { Card, CardBody, Button, ModalBody, Modal, ModalHeader } from "reactstrap";
import { FoodPantryContext } from "../../providers/FoodPantryProvider";

export const FoodPantry = ({ foodPantry }) => {

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const { deleteFoodPantry } = useContext(FoodPantryContext);

    return (
        <Card className="m-1 food_pantry_card">
            <CardBody>
                <div className="food_card">
                    <h5>{foodPantry.food.name}</h5>
                    <Button color="danger" className="foodPantryBtn" onClick={toggle}>Delete</Button>
                </div>

                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        Are you sure you want to delete {foodPantry.food.name}?</ModalHeader>

                    <ModalBody>
                        <button type="submit"
                            onClick={
                                evt => {
                                    evt.preventDefault()
                                    deleteFoodPantry(foodPantry.id).then(toggle)
                                }}
                            className="btn btn-danger button_margin">
                            Delete</button>
                        <button type="submit"
                            onClick={
                                evt => {
                                    evt.preventDefault()
                                    toggle()
                                }}
                            className="btn btn-primary">
                            Cancel</button>
                    </ModalBody>
                </Modal>
            </CardBody>
        </Card>
    );
};
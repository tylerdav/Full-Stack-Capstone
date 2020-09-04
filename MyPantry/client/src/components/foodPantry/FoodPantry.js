import React, { useState, useContext } from "react";
import { Card, Button, ModalBody, Modal, ModalHeader, Row, Col } from "reactstrap";
import { FoodPantryContext } from "../../providers/FoodPantryProvider";

export const FoodPantry = ({ foodPantry }) => {

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const { deleteFoodPantry } = useContext(FoodPantryContext);

    return (
        <Card className="m-1 food_in_pantry">
            <Row>
                <Col>
                    <h5>{foodPantry.food.name}</h5>
                </Col>
                <Button outline color="danger" className="mypantry_delete" onClick={toggle}>Delete</Button>
            </Row>

            <Modal className="mypantry_delete_modal" isOpen={modal} toggle={toggle}>
                <ModalHeader className="mypantry_delete_header" toggle={toggle}>
                    Are you sure you want to delete {foodPantry.food.name}?</ModalHeader>

                <ModalBody>
                    <Button type="submit"
                        onClick={
                            evt => {
                                evt.preventDefault()
                                deleteFoodPantry(foodPantry.id).then(toggle)
                            }}
                        className="button_margin"
                        outline color="danger">
                        Delete
                    </Button>
                    <Button type="submit"
                        onClick={
                            evt => {
                                evt.preventDefault()
                                toggle()
                            }}
                        outline color="secondary">
                        Cancel
                    </Button>
                </ModalBody>
            </Modal>
        </Card >
    );
};
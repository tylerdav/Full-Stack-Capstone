import React, { useState, useContext } from "react";
import { Card, CardBody, Button, ModalBody, Modal, ModalHeader, Row, Col } from "reactstrap";
import { RecipeFoodContext } from "../../providers/RecipeFoodProvider";

export const RF = ({ recipeFood, setIngredients }) => {

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const { deleteRecipeFood } = useContext(RecipeFoodContext);

    return (
        <Card className="m-1 food_pantry_card">
            <CardBody>
                <Row className="food_card">
                    <Col>
                        <h5>{recipeFood.food.name}</h5>
                    </Col>
                    <Button
                        outline color="danger"
                        className="add_food_pantry"
                        onClick={toggle}>
                        Delete
                    </Button>
                </Row>

                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        Are you sure you want to delete {recipeFood.food.name}?
                    </ModalHeader>
                    <ModalBody>
                        <Button type="submit"
                            onClick={
                                evt => {
                                    evt.preventDefault()
                                    deleteRecipeFood(recipeFood)
                                        .then(setIngredients)
                                        .then(toggle)
                                }}
                            outline color="danger"
                            className="button_margin">
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
            </CardBody>
        </Card>
    );
};
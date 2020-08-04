import React, { useState, useContext } from "react";
import { Card, CardBody, Button, ModalBody, Modal, ModalHeader } from "reactstrap";
import { RecipeFoodContext } from "../../providers/RecipeFoodProvider";

export const RF = ({ recipeFood, setIngredients }) => {

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const { deleteRecipeFood } = useContext(RecipeFoodContext);

    return (
        <Card className="m-1 food_pantry_card">
            <CardBody>
                <div className="food_card">
                    <h5>{recipeFood.food.name}</h5>
                    <Button color="danger" className="foodPantryBtn" onClick={toggle}>Delete</Button>
                </div>

                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        Are you sure you want to delete {recipeFood.food.name}?
                    </ModalHeader>
                    <ModalBody>
                        <button type="submit"
                            onClick={
                                evt => {
                                    evt.preventDefault()
                                    deleteRecipeFood(recipeFood)
                                        .then(setIngredients)
                                        .then(toggle)
                                }}
                            className="btn btn-danger button_margin">
                            Delete
                        </button>
                        <button type="submit"
                            onClick={
                                evt => {
                                    evt.preventDefault()
                                    toggle()
                                }}
                            className="btn btn-primary">
                            Cancel
                        </button>
                    </ModalBody>
                </Modal>
            </CardBody>
        </Card>
    );
};
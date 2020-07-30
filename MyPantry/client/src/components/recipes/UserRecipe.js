import React, { useContext, useState } from "react";
import { Card, CardImg, CardBody, ModalHeader, ModalBody, Modal, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { EditPostForm } from "./EditPostForm";
import { UserRecipeContext } from "../../providers/UserRecipeProvider";

export const UserRecipe = ({ recipe }) => {
    const { deleteRecipe } = useContext(UserRecipeContext);

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

    return (
        <Card className="userRecipe">
            <CardImg top src={recipe.imageLocation} />
            <CardBody>
                <div className="userRecipeTitle">
                    <Link to={`/recipes/${recipe.id}`}>
                        <h3>{recipe.title}</h3>
                    </Link>
                </div>
                <div className="userRecipeItems">
                    <div>
                        Category: <br />
                        {recipe.category.name} <br /><br />
                    </div>
                </div>
                <div className="userRecipeBtns">
                    <div><Button color="danger" onClick={toggle}>Delete</Button>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}>
                                Are you sure you want to delete {recipe.title}?
                            </ModalHeader>
                            <ModalBody className="RecipeModalBody">
                                <button type="submit"
                                    onClick={
                                        evt => {
                                            evt.preventDefault()
                                            deleteRecipe(recipe).then(toggle)
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
                    </div>
                    <div><Button color="warning" onClick={toggleEdit}>Edit</Button>
                        <Modal isOpen={editModal} toggle={toggleEdit}>
                            <ModalBody className="RecipeModalBody">
                                <EditRecipeForm recipe={recipe} toggle={toggleEdit} />
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}



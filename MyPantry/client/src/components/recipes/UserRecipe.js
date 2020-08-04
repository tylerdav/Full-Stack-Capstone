import React, { useContext, useState } from "react";
import { Card, CardImg, CardBody, ModalHeader, ModalBody, Modal, Button, ListGroupItem } from "reactstrap";
import { useParams, Link, useHistory } from 'react-router-dom'
import { EditRecipeForm } from "./EditRecipeForm";
import { UserRecipeContext } from "../../providers/UserRecipeProvider";
import { RecipeFoodList } from "../recipeFood/RecipeFoodList";

export const UserRecipe = ({ recipe }) => {

    const { deleteRecipe } = useContext(UserRecipeContext);
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    const history = useHistory();

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)


    const ManageFood = () => {
        return history.push(`/rfmanage/recipe/${recipe.id}`)
    }

    return (
        <Card className="userRecipe">
            <CardImg top src={recipe.imageLocation} />
            <CardBody>
                <div className="userRecipeTitle">
                    <h3>{recipe.title}</h3>
                </div>
                <div className="userRecipeItems">
                    <div>
                        <p>{recipe.content}</p>
                        <p>Category: {recipe.category.name}</p>
                        {/* <strong>Ingrediants: </strong>
                        <div>
                            <RecipeFoodList recipeId={recipe.id} />
                        </div> */}

                        <div>
                            {
                                (recipe.userProfileId === userProfile.id)
                                    ? <Button
                                        color="info"
                                        onClick={
                                            evt => {
                                                evt.preventDefault()
                                                ManageFood()
                                            }
                                        }>Manage Food
                                    </Button>
                                    : ""
                            }
                            <ListGroupItem>
                                <div>
                                    <strong>Ingrediants: </strong>
                                    <div>
                                        <RecipeFoodList recipeId={recipe.id} />
                                    </div>
                                </div>
                            </ListGroupItem>
                        </div>



                        <p>Posted by: {recipe.userProfile.displayName}</p>
                    </div>
                </div>
                <br />
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



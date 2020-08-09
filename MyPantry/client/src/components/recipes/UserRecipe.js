import React, { useContext, useState } from "react";
import { Card, CardImg, CardBody, ModalHeader, ModalBody, Modal, Button, ListGroupItem, Row, Col } from "reactstrap";
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
        <Card className="m-4 recipe_card card">
            <div className="userRecipeTitle">
                <h3 className="recipe_title">{recipe.title}</h3>
            </div>
            <br />
            <Row>
                <Col>
                    <CardImg top src={recipe.imageLocation} />
                </Col>
                <Col className="userRecipeItems">
                    <div className="btn_container">
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
                    </div>
                    <RecipeFoodList recipeId={recipe.id} />
                </Col>
                <Col>
                    <p>{recipe.content}</p>
                    <p>Category: {recipe.category.name}</p>
                </Col>
            </Row>
            <Row>
                <p>Posted by: {recipe.userProfile.displayName}</p>
            </Row>
            <Row className="userRecipeBtns">
                <Button className="button_margin" outline color="danger" onClick={toggle}>Delete</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        Are you sure you want to delete {recipe.title}?
                            </ModalHeader>
                    <ModalBody className="RecipeModalBody">
                        <button
                            type="submit"
                            outline color="danger"
                            onClick={
                                evt => {
                                    evt.preventDefault()
                                    deleteRecipe(recipe).then(toggle)
                                }}
                            className="button_margin">
                            Delete
                                </button>
                        <button
                            type="submit"
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
                <Button outline color="warning" onClick={toggleEdit}>Edit</Button>
                <Modal isOpen={editModal} toggle={toggleEdit}>
                    <ModalBody className="RecipeModalBody">
                        <EditRecipeForm recipe={recipe} toggle={toggleEdit} userProfileId={userProfile.id} />
                    </ModalBody>
                </Modal>
            </Row>
        </Card>
    )
}



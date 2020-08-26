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
                    <CardImg className="recipe_img" top src={recipe.imageLocation} />
                    <p>Posted by: {recipe.userProfile.displayName}</p>
                </Col>
                <Col className="userRecipeItems">
                    <div className="btn_container">
                        {
                            (recipe.userProfileId === userProfile.id)
                                ? <Button
                                    color="info"
                                    outline color="secondary"
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
                    <h5>Instructions:</h5>
                    <p>{recipe.content}</p>
                    <p>Category: {recipe.category.name}</p>
                </Col>
            </Row>

            <Row className="userRecipeBtns">
                <Button className="button_margin delete_edit_btns" outline color="secondary" onClick={toggleEdit}>Edit</Button>
                <Modal className="EditRecipeModalBody" isOpen={editModal} toggle={toggleEdit}>
                    <ModalBody>
                        <EditRecipeForm recipe={recipe} toggle={toggleEdit} userProfileId={userProfile.id} />
                    </ModalBody>
                </Modal>
                <Button className="delete_edit_btns" outline color="secondary" onClick={toggle}>Delete</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        Are you sure you want to delete {recipe.title}?
                    </ModalHeader>
                    <ModalBody className="RecipeModalBody">
                        <Button
                            type="submit"
                            outline color="danger"
                            onClick={
                                evt => {
                                    evt.preventDefault()
                                    deleteRecipe(recipe).then(toggle)
                                }}
                            className="button_margin">
                            Delete
                        </Button>
                        <Button
                            type="submit"
                            outline color="secondary"
                            onClick={
                                evt => {
                                    evt.preventDefault()
                                    toggle()
                                }}
                            className="">
                            Cancel
                        </Button>
                    </ModalBody>
                </Modal>
            </Row>
        </Card>
    )
}



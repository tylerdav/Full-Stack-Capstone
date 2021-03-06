import React, { useContext, useState, useEffect } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Button, Form } from "reactstrap";
import { useHistory } from "react-router-dom";
import { RecipeContext } from "../../providers/RecipeProvider";
import { UserRecipeContext } from "../../providers/UserRecipeProvider";

export const EditRecipeForm = (props) => {
    const { getAllRecipesByUser } = useContext(UserRecipeContext);
    const { updateRecipe } = useContext(RecipeContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const [profileUpdate, setRecipe] = useState(props.recipe);

    const handleControlledInputChange = (event) => {
        const newRecipe = Object.assign({}, profileUpdate);
        newRecipe[event.target.name] = event.target.value;
        setRecipe(newRecipe);
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const editRecipe = () => {
        profileUpdate.categoryId = parseInt(profileUpdate.categoryId);
        updateRecipe(profileUpdate).then(props.toggle).then(() => getAllRecipesByUser(props.userProfileId));
    };

    return (
        <Form className="editRecipeForm">
            <fieldset>
                <div className="form-group">
                    <label className="recipe_edit" htmlFor="title">
                        <h5>Title:</h5>
                        <input
                            type="text"
                            name="title"
                            required
                            autoFocus
                            className="form-control"
                            placeholder="Edit recipe title"
                            defaultValue={props.recipe.title}
                            onChange={handleControlledInputChange}
                        />
                        <br />
                        <h5>Content:</h5>
                        <textarea
                            name="content"
                            rows="10"
                            required
                            autoFocus
                            className="form-control"
                            placeholder="Edit content"
                            defaultValue={props.recipe.content}
                            onChange={handleControlledInputChange}
                        />
                        <br />
                        <h5>Category:</h5>
                        <select
                            name="categoryId"
                            required
                            className="form-control"
                            defaultValue={
                                props.recipe.category.isDeleted ? null : props.recipe.categoryId
                            }
                            onChange={handleControlledInputChange}
                        >
                            <option
                                value={
                                    props.recipe.category.isDeleted ? null : props.recipe.categoryId
                                }
                            >
                                {props.recipe.category.isDeleted
                                    ? "Select a Category"
                                    : props.recipe.category.name}
                            </option>
                            {categories.map((e) =>
                                e.isDeleted ? null : (
                                    <option key={e.id} value={e.id}>
                                        {e.name}
                                    </option>
                                )
                            )}
                        </select>
                        <br />
                        <h5>Header Image:</h5>
                        <input
                            type="text"
                            name="imageLocation"
                            className="form-control"
                            placeholder="Edit recipe image (must be a jpeg URL)"
                            defaultValue={props.recipe.imageLocation}
                            onChange={handleControlledInputChange}
                        />
                    </label>
                </div>
            </fieldset>

            <Button
                color="primary"
                className="button_margin"
                outline color="success"
                onClick={(e) => {
                    e.preventDefault();
                    editRecipe();
                }}
            >
                Save Updates
            </Button>
            <Button outline onClick={props.toggle}>Cancel</Button>
        </Form>
    );
};

import React, { useContext, useRef, useEffect } from 'react';
import { Button } from "reactstrap";
import { useHistory, Link } from 'react-router-dom';
import { CategoryContext } from "../../providers/CategoryProvider";
import { RecipeContext } from '../../providers/RecipeProvider';



export default props => {
    const { addRecipe, recipes } = useContext(RecipeContext);
    const { categories, getAllCategories } = useContext(CategoryContext);

    const title = useRef('title')
    const content = useRef('content')
    const category = useRef('category')
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    const imageLocation = useRef('imageLocation')
    const history = useHistory()

    const constructNewRecipe = () => {

        const newRecipeObject = {
            title: title.current.value,
            content: content.current.value,
            categoryId: parseInt(category.current.value),
            userProfileId: userProfile.id,
            imageLocation: imageLocation.current.value
        }

        console.log(newRecipeObject)
        return addRecipe(newRecipeObject).then(props)
    }


    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className="newRecipeForm">
            <Link to={`/profiles`}>
                <Button outline>
                    Back to Profile
                </Button>
            </Link>
            <form className='recipeFormCard'>
                <h2 className='recipeForm__title'>New Recipe</h2>
                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='recipeTitle'>Recipe Name: </label>
                        <input
                            type='text'
                            id='recipeTitle'
                            ref={title}
                            required
                            autoFocus
                            className='form-control'
                            placeholder='Recipe title'
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='recipeContent'>Instructions: </label>
                        <textarea
                            name="content"
                            rows="10"
                            id='recipeContent'
                            ref={content}
                            required
                            autoFocus
                            className='form-control'
                            placeholder='Recipe content'
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='recipeCategory'>Category: </label>
                        <select
                            defaultValue=''
                            name='category'
                            ref={category}
                            id='category'
                            className='form-control'
                            placeholder='category'
                            required
                            autoFocus
                        >
                            <option value='0'>Select a category</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='recipeImageLocation'>Recipe Image URL: </label>
                        <input
                            type='text'
                            id='recipeImageLocation'
                            ref={imageLocation}
                            autoFocus
                            className='form-control'
                            placeholder='Recipe imageLocation'
                        />
                    </div>
                </fieldset>

                <button
                    type='submit'
                    onClick={evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        constructNewRecipe().then(p => history.push(`/profiles`))
                    }}
                    className='btn btn-primary'
                >
                    Save Recipe
                </button>
            </form>
        </div>
    )
}

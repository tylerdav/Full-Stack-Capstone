import React, { useState, useContext, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory } from "react-router-dom";



export const AddFoodPantry = ({ foodPantry }) => {
    const history = useHistory();

    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    const { addFoodPantry, getPost } = useContext(PostContext);
    const { id } = useParams();

    const [foodPantries, setFoodPantries] = useState();

    useEffect(() => {
        getPost(parseInt(id)).then(setFoodPantries);
    }, []);


    const addThisFood = (userProfileId) => {
        return addFoodPantry({
            foodId: parseInt(id),
            UserProfileId: userProfileId
        }).then(() => {
            getPost(parseInt(id)).then(setFoodPantries).then(() => history.push(`/mypantry`));
        })
    }

    if (!foodPantry) {
        return null;
    }

    // return (
    //     <Card className="tagCard">
    //         <CardBody>
    //             <div className="tagCardBody">
    //                 <h4>{tag.name}</h4>
    //                 <div className="tagButtonContainer">
    //                     (!post.postTags.find(fp => fp.foodId === food.id))
    //                             ? <button type="submit"
    //                         onClick={
    //                             evt => {
    //                                 evt.preventDefault() // Prevent browser from submitting the form
    //                                 addThisFood(food.id)
    //                             }}
    //                         className="btn btn-primary">
    //                         Add Food to Pantry
    //                             </button>
    //                 </div>
    //             </div>
    //         </CardBody>
    //     </Card>

    // )

}

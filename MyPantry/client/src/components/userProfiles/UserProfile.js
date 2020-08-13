import React, { useEffect, useContext, useState } from 'react'
import { Card, CardImg, CardBody, Button, Row, Col } from "reactstrap";
import { useParams, Link } from 'react-router-dom'
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { UserRecipeList } from '../recipes/UserRecipeList';

const UserProfile = () => {
    const [userProfile, setUserProfiles] = useState()
    const { getProfile } = useContext(UserProfileContext)
    const { Id } = useParams()

    console.log(Id);

    useEffect(() => {
        getProfile(Id)
            .then(setUserProfiles)
    }, [])

    if (!userProfile) {
        return null
    }

    return (
        <div className='container'>
            <Row>
                <Col>
                    <CardImg className="up_img" src={userProfile.imageLocation} />
                </Col>
                <Col>
                    <br />
                    <h3>User:  {userProfile.displayName}</h3>
                    <h3>Email:  {userProfile.email}</h3>
                </Col>
            </Row>
            <br />
            <div className="add_recipe">
                <Link to={`/Recipeform`}>
                    <Button outline color="success">Add Recipe</Button>
                </Link>
            </div>
            <div>
                <UserRecipeList />
            </div>
        </div>
    )
}

export default UserProfile
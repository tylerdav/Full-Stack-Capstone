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
            <Card className="user_card mx-auto">
                <Row>
                    <Col className="d-flex align-items-center">
                        <CardImg className="up_img" src={userProfile.imageLocation} />
                    </Col>
                    <Col className="d-flex align-items-center">
                        <h3 className="row justify-content-center align-self-center">User:  {userProfile.displayName}</h3>
                    </Col>
                </Row>
            </Card>
            <br />
            <div></div>
            <br />
            <h2>My Recipes</h2>
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
import React, { useEffect, useContext, useState } from 'react'
import { Card, CardImg, CardBody, Button } from "reactstrap";
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
            <div>
                <div>
                    <Card className="profile_details">
                        <section className="upd_details">
                            <CardImg className="upd_img" src={userProfile.imageLocation} />
                            <CardBody className="upd_card">
                                <br />
                                <h3>UserName:  {userProfile.displayName}</h3>
                                <h3>Email:  {userProfile.email}</h3>
                            </CardBody>
                            <Link to={`/Recipeform`}>
                                <button className="btn btn-primary">
                                    Add Recipe
                                </button>
                            </Link>
                            <div>
                                <UserRecipeList />
                            </div>
                        </section>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
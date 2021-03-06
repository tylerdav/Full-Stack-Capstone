import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Register() {
    const history = useHistory();
    const { register } = useContext(UserProfileContext);

    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [imageLocation, setImageLocation] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Try Again.");
        } else {
            const userProfile = { displayName, email, imageLocation };
            register(userProfile, password)
                .then(() => history.push("/recipes"));
        }
    };

    return (
        <Form onSubmit={registerClick}>
            <div className="login_img">
                <img src="https://img.icons8.com/color/96/000000/hamper.png" />
            </div>
            <fieldset className="register_box">
                <FormGroup>
                    <Label htmlFor="displayName">Username</Label>
                    <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="imageLocation">Profile Image URL</Label>
                    <Input id="imageLocation" type="text" onChange={e => setImageLocation(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Button>Register</Button>
                </FormGroup>
            </fieldset>
        </Form>
    );
}
import React, { useContext, useRef, useEffect } from 'react';
import { Form, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom'
import { FoodContext } from '../../providers/FoodProvider';
import SelectSearch from 'react-select-search';
import { FoodPantryContext } from '../../providers/FoodPantryProvider';

const FoodPantrySearch = () => {
    const { getAllFoods, searchFood, foods } = useContext(FoodContext);
    const { addFoodPantry } = useContext(FoodPantryContext);
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

    useEffect(() => {
        getAllFoods()
    }, [])

    const Search = e => {
        searchFood(e.target.value)
    }

    return (
        <Form>
            <Input placeholder='Search...' onChange={Search} />
        </Form>
    )



    // return (
    //     <div className="container">
    //         <div className="row justify-content-center">
    //             <Form>
    //                 <SelectSearch
    //                     options={foods}
    //                     value='food'
    //                     search
    //                     placeholder="Select Food to Add"
    //                 />
    //             </Form>
    //         </div>
    //     </div>
    // )
}

export default FoodPantrySearch
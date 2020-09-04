import React, { useContext, useEffect } from 'react';
import { Form, Input } from 'reactstrap';
import { FoodContext } from '../../providers/FoodProvider';

const FoodSearch = () => {
    const { getAllFoods, searchFood } = useContext(FoodContext);

    useEffect(() => {
        getAllFoods()
    }, [])

    const Search = e => {
        searchFood(e.target.value)
    }

    return (
        <Form>
            <Input placeholder='Search for Food...' onChange={Search} />
        </Form>
    )
}

export default FoodSearch
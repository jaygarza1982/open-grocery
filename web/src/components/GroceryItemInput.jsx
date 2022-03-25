import { Add } from '@mui/icons-material';
import { IconButton, TextField, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { listItemsAtom } from '../atmos';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GroceryItemInput = () => {

    const { listCode } = useParams();

    const [listItems, setListItems] = useRecoilState(listItemsAtom);

    const [groceryInput, setGroceryInput] = useState('');
    const [loading, setLoading] = useState(false);

    const onTextChange = e => {
        // Do not change text if loading
        if (loading) return;

        setGroceryInput(e.target.value);
    }

    const onKeyDown = e => {
        if (e.key === 'Enter') addListItem();
    }

    const addListItem = async () => {
        try {
            if (groceryInput.trim() === '' || loading) return;
            setLoading(true);

            const insertResult = (await axios.post('/api/items/insert', {
                item: groceryInput,
                list_code: listCode
            })).data;

            const newListItems = JSON.parse(JSON.stringify(listItems));
            newListItems[insertResult.item_id] = insertResult;

            setListItems(newListItems);
            
            setGroceryInput('');
        } catch (error) {
            console.log('Could not add item', error);
        }

        setLoading(false);
    }

    return (
        <div className="grocery-input">
            <TextField
                name="groceryItem"
                label={"Grocery Item"}
                value={groceryInput}
                onChange={onTextChange}
                onKeyDown={onKeyDown}
            />
            {
                loading ? <CircularProgress /> : (
                    <IconButton onClick={addListItem}>
                        <Add />
                    </IconButton>
                )
            }
        </div>
    );
}

export default GroceryItemInput;
import { Add } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { listItemsAtom } from '../atmos';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GroceryItemInput = () => {

    const { listCode } = useParams();

    const [listItems, setListItems] = useRecoilState(listItemsAtom);

    const [groceryInput, setGroceryInput] = useState('');

    const onTextChange = e => {
        setGroceryInput(e.target.value);
    }

    const onKeyDown = e => {
        if (e.key === 'Enter') addListItem();
    }

    const addListItem = async () => {
        try {
            if (groceryInput.trim() === '') return;

            await axios.post('/api/items/insert', {
                item: groceryInput,
                list_code: listCode
            });
            
            setListItems([
                ...listItems,
                { item: groceryInput, item_id: Math.round(Math.random()*999999), checked: false }
            ]);
    
            setGroceryInput('');
        } catch (error) {
            console.log('Could not add item', error);
        }
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
            <IconButton onClick={addListItem}>
                <Add />
            </IconButton>
        </div>
    );
}

export default GroceryItemInput;
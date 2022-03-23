import { Add } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { listItemsAtom } from '../atmos';

const GroceryItemInput = () => {

    const [listItems, setListItems] = useRecoilState(listItemsAtom);

    const [groceryInput, setGroceryInput] = useState('');

    const onTextChange = e => {
        setGroceryInput(e.target.value);
    }

    const onKeyDown = e => {
        if (e.key === 'Enter') addListItem();
    }

    const addListItem = () => {
        if (groceryInput.trim() === '') return;

        setListItems([
            ...listItems,
            { item: groceryInput, item_id: Math.round(Math.random()*999999), checked: false }
        ]);

        setGroceryInput('');
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
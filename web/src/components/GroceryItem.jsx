import React from 'react';
import { useRecoilState } from 'recoil';
import { listItemsAtom } from '../atmos';
import { IconButton } from '@mui/material';
import { Check, Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const GroceryItem = ({ item }) => {

    const [listItems, setListItems] = useRecoilState(listItemsAtom);
    
    const checkItem = async () => {
        // Mock a check of an item
        const newListItems = JSON.parse(JSON.stringify(listItems));

        delete newListItems[item.item_id];
        newListItems[item.item_id] = { ...item, checked: !item.checked };

        setListItems(newListItems);
    }
    
    const editItem = async () => {

    }
    
    const deleteItem = async () => {
        try {
            await axios.post(`/api/items/delete/${item.item_id}`);

            // Remove item from local list
            const newItems = JSON.parse(JSON.stringify(listItems));
            delete newItems[item.item_id];
            setListItems(newItems);
        } catch (error) {
            console.log('Could not delete item', error);
        }
    }
    
    return (
        <div className="grocery-list-item">
            <div className="grocery-item-text">
                {item?.item}
            </div>
            <div className="grocery-item-controls">
                <IconButton onClick={deleteItem}>
                    <Delete />
                </IconButton>
                <IconButton onClick={checkItem}>
                    <Check />
                </IconButton>
            </div>
        </div>
    );
}

export default GroceryItem;
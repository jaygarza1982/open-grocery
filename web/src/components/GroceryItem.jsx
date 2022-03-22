import React from 'react';
import { useRecoilState } from 'recoil';
import { listItemsAtom } from '../atmos';
import { IconButton } from '@mui/material';
import { Check, Delete, Edit } from '@mui/icons-material';

const GroceryItem = ({ item }) => {

    const [listItems, setListItems] = useRecoilState(listItemsAtom);
    
    const checkItem = async () => {

    }
    
    const editItem = async () => {

    }
    
    const deleteItem = async () => {
        const newItems = listItems.filter(i => i.item_id != item.item_id);
        setListItems(newItems);
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
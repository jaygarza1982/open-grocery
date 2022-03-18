import React from 'react';
import { useRecoilState } from 'recoil';
import { listItemsAtom } from '../atmos';

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
        <div className="list-item">
            <li>
                {item?.item}
            </li>
            <button onClick={checkItem}>Check</button>
            <button onClick={editItem}>Edit</button>
            <button onClick={deleteItem}>Delete</button>
        </div>
    );
}

export default GroceryItem;
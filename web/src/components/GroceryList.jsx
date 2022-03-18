import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { listItemsAtom } from '../atmos';
import GroceryItem from './GroceryItem';

const GroceryList = () => {

    const [listItems, setListItems] = useRecoilState(listItemsAtom);

    const loadGroceryItems = async () => {
        setListItems([
            { item: 'Food item 1', item_id: 1 },
            { item: 'Food item 2', item_id: 2 },
            { item: 'Food item 3', item_id: 3 },
            { item: 'Food item 4', item_id: 4 },
        ])
    }

    useEffect(() => {
        loadGroceryItems();
    }, []);

    return (
        <div className="grocery-list">
            <ul>
                {
                    listItems?.map(listItem => (
                        <GroceryItem
                            key={`item-${listItem?.item_id}`}
                            item={listItem}
                        />
                    ))
                }
            </ul>
        </div>        
    );
}

export default GroceryList;
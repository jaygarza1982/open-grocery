import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { listItemsAtom } from '../atmos';
import GroceryItem from './GroceryItem';
import { Paper } from '@mui/material'

const GroceryList = () => {

    const [listItems, setListItems] = useRecoilState(listItemsAtom);

    const loadGroceryItems = async () => {
        setListItems([
            { item: 'Beer', checked: false, item_id: 1 },
            { item: 'Milk', checked: false, item_id: 4 },
            { item: 'apples', checked: false, item_id: 3 },
            { item: 'Bread', checked: false, item_id: 2 },
        ])
    }

    useEffect(() => {
        loadGroceryItems();
    }, []);

    const stringCompare = (a, b) => {
        if (a?.item?.toLowerCase() < b?.item?.toLowerCase()) return -1;
        if (a?.item?.toLowerCase() > b?.item?.toLowerCase()) return 1;
        return 0;
    }

    return (
        <div className="grocery-list">
            {
                // Do not mutate state directly
                JSON.parse(JSON.stringify(listItems))
                ?.sort(stringCompare)
                ?.map(listItem => (
                    <Paper
                        key={`grocery-item-${listItem?.item_id}`}
                        className={listItem?.checked ? 'item-checked' : 'item-unchecked'}
                        elevation={5}
                    >
                        <GroceryItem
                            item={listItem}
                        />
                    </Paper>
                ))
            }
        </div>        
    );
}

export default GroceryList;
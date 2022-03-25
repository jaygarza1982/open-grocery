import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { listItemsAtom } from '../atmos';
import GroceryItem from './GroceryItem';
import { Paper } from '@mui/material'

const GroceryList = () => {

    const [listItems, setListItems] = useRecoilState(listItemsAtom);

    const loadGroceryItems = async () => {
        // Mock API data
        const items = [
            { item: 'Beer', checked: false, item_id: 1 },
            { item: 'Milk', checked: false, item_id: 4 },
            { item: 'apples', checked: false, item_id: 3 },
            { item: 'Bread', checked: false, item_id: 2 },
        ]

        // Place items into map based off of array
        const itemMap = {}
        items.forEach(item => {
            itemMap[item.item_id] = item;
        });

        setListItems(itemMap);
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
                //Turn object back into array so that we can render
                Object.keys(listItems).map(k => listItems[k])
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
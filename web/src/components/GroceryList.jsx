import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { listItemsAtom } from '../atmos';
import GroceryItem from './GroceryItem';
import { Paper } from '@mui/material'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GroceryList = () => {

    const { listCode } = useParams();

    const [listItems, setListItems] = useRecoilState(listItemsAtom);

    const loadGroceryItems = async () => {
        try {
            const items = (await axios.get(`/api/items/${listCode}`)).data;

            // Place items into map based off of array
            const itemMap = {}
            items.forEach(item => {
                itemMap[item.item_id] = item;
            });

            setListItems(itemMap);
        } catch (error) {
            console.log('Could not fetch list items', error);
        }
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
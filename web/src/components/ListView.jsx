import React from 'react';
import GroceryItemInput from './GroceryItemInput';
import GroceryList from './GroceryList';

const ListView = () => {
    return (
        <div className="list-view">
            <GroceryItemInput />
            <GroceryList />
        </div>
    );
}

export default ListView;
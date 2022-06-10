const express = require('express');
const morgan = require('morgan');
const { Client } = require('pg');

const app = express();
const port = 3000;

app.use(express.json());

// Logging
app.use(morgan('common'));

// Postgres setup
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

const client = new Client({
    user: POSTGRES_USER,
    host: 'open-grocery-postgres',
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: 5432,
});

const sqlInit = `
    CREATE TABLE public.list_items (
        item_id SERIAL PRIMARY KEY NOT NULL,
        item varchar(100) NOT NULL,
        list_code varchar(100) NOT NULL
    );
`;

setTimeout(async () => {
    try {
        await client.connect();

        await client.query(sqlInit);
    } catch (error) {
        console.log('Could not connect to Postgres DB!', error);
        return;
    }
}, 5000)

const itemsController = require('./controllers/items.controller');

app.get('/api/items/:listCode', itemsController.allItems(client));
app.post('/api/items/insert', itemsController.insertItem(client));
app.post('/api/items/update/:item_id', itemsController.updateItem(client));
app.post('/api/items/delete/:item_id', itemsController.deleteItem(client));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

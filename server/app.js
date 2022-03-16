const express = require('express');
const morgan = require('morgan');
const { Client } = require('pg');

const app = express();
const port = 3000;

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

client.connect();

const itemsController = require('./controllers/items.controller');

app.get('/api/items', itemsController.allItems(client));

// TODO: Implement this
// app.post('/api/items/insert', itemsController.insertItem(client));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

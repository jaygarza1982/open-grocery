const express = require('express');
const morgan = require('morgan');
const { Client } = require('pg');
const { WebSocketServer } = require('ws');
const WebSocket = require('ws');

const app = express();
const port = 8000;
const wsPort = 8001;

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

client.connect();

const wss = new WebSocketServer({ port: wsPort });

wss.on('error', console.error);

wss.on('connection', ws => {
    ws.on('error', console.error);
    
    ws.on('message', (data, isBinary) => {
        
        console.log(`WebSocket: ${data}`);

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
});

const itemsController = require('./controllers/items.controller');

app.get('/api/items', itemsController.allItems(client));
app.post('/api/items/insert', itemsController.insertItem(client));
app.post('/api/items/update/:item_id', itemsController.updateItem(client));
app.post('/api/items/delete/:item_id', itemsController.deleteItem(client));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});


const queries = require('../queries');

module.exports = {
    allItems: (client) => {
        return async (req, res) => {
            try {
                const { listCode } = req.params;

                const query = await client.query(queries.getAllItems, [listCode]);

                res.send(query.rows);
            } catch (error) {
                console.error(error);
                res.status(500).send(error);
            }
        }
    },
    insertItem: (client) => {
        return async (req, res) => {
            try {
                const { item, list_code } = req.body;
    
                const queryResult = await client.query(queries.insertListItem, [item, list_code]);
    
                res.send(queryResult.rows[0]);
            } catch (error) {
                console.error(error);
                res.status(500).send(error);
            }
        }
    },
    updateItem: (client) => {
        return async (req, res) => {
            try {
                const { item } = req.body;
                const { item_id } = req.params;
                
                await client.query(queries.updateListItem, [item, item_id]);
    
                res.send();
            } catch (error) {
                console.error(error);
                res.status(500).send(error);
            }
        }
    },
    deleteItem: (client) => {
        return async (req, res) => {
            try {
                const { item_id } = req.params;
                
                await client.query(queries.deleteListItem, [item_id]);
    
                res.send();
            } catch (error) {
                console.error(error);
                res.status(500).send(error);
            }
        }
    },
}

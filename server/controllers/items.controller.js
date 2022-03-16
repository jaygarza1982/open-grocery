
const queries = require('../queries');

module.exports = {
    allItems: (client) => {
        return async (req, res) => {
            try {
                const query = await client.query(queries.getAllItems);

                res.send(query.rows);
            } catch (error) {
                res.status(500).send(error);
            }
        }
    },
    insertItem: (client) => {
        return async (req, res) => {
            // TODO: Implement this
        }
    }
}

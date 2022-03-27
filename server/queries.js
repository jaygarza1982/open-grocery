
// Holds all SQL queries for application

module.exports = {
    getAllItems: `
        SELECT * FROM list_items WHERE list_code = $1;
    `,
    insertListItem: `
        INSERT INTO list_items (item, list_code) VALUES ($1, $2) RETURNING *;
    `,
    updateListItem: `
        UPDATE list_items SET item = $1 WHERE item_id = $2;
    `,
    deleteListItem: `
        DELETE FROM list_items WHERE item_id = $1;
    `,
}

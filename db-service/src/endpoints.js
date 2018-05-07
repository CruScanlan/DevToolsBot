module.exports = [
    {
        name: "db-guilds-get-all",
        doesReturn: true,
        queryConstructor: () => {
            return {
                sql: "SELECT * FROM `bot_guilds`;",
                inserts: []
            }
        }
    }
];
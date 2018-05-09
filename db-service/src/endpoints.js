module.exports = [
    {
        name: "db-guilds-get-all",
        doesReturn: true,
        queryParams: {},
        queryConstructor: () => {
            return {
                sql: "SELECT * FROM `bot_guilds`;",
                inserts: []
            }
        }
    },
    {
        name: "db-guilds-insert-and-update",
        doesReturn: false,
        queryParams: {
            guild_id: "string",
            guild_name: "string",
            guild_memberCount: "number",
            guild_ownerID: "string",
            guild_region: "string"
        },
        queryConstructor: (queryParams) => {
            let sql = "INSERT INTO `bot_guilds` (guild_id, guild_name, guild_memberCount, guild_ownerID, guild_region) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE guild_name = VALUES(guild_name), guild_memberCount = VALUES(guild_memberCount), guild_region = VALUES(guild_region);";
            let inserts = [
                queryParams.guild_id,
                queryParams.guild_name,
                queryParams.guild_memberCount,
                queryParams.guild_ownerID,
                queryParams.guild_region
            ];
            return {sql, inserts}
        }
    },
    {
        name: "trello-get-all",
        doesReturn: true,
        queryParams: {},
        queryConstructor: ()=>{
            return {
                sql: "SELECT * FROM `service_trello`",
                inserts: []
            }
        }
    }
];
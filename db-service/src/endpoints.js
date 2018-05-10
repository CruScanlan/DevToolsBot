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
        name: "trello-get-all",
        doesReturn: true,
        queryParams: {},
        queryConstructor: () => {
            return {
                sql: "SELECT * FROM `service_trello`;",
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
            let sql = "INSERT INTO `bot_guilds` (guild_id, guild_name, guild_memberCount, guild_ownerID, guild_region, joined) VALUES (?, ?, ?, ?, ?, 1) ON DUPLICATE KEY UPDATE guild_name = VALUES(guild_name), guild_memberCount = VALUES(guild_memberCount), guild_region = VALUES(guild_region), joined = VALUES(joined);";
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
        name: "db-guilds-left",
        doesReturn: false,
        queryParams: {
            guild_id: "string"
        },
        queryConstructor: (queryParams) => {
            let sql = "UPDATE `bot_guilds` SET `joined` = 0 WHERE `bot_guilds`.`guild_id` = ?; DELETE FROM `bot_guild_managers` WHERE `bot_guild_managers`.`guild_id` = ?";
            let inserts = [
                queryParams.guild_id,
                queryParams.guild_id
            ];
            return {sql, inserts}
        }
    },
    {
        name: "db-guild-managers-insert-and-update",
        doesReturn: false,
        queryParams: {
            manager_id: "string",
            guild_id: "string"
        },
        queryConstructor: (queryParams) => {
            let sql = "INSERT INTO `bot_guild_managers` (manager_id, guild_id) VALUES (?, ?);";
            let inserts = [
                queryParams.manager_id,
                queryParams.guild_id
            ];
            return {sql, inserts}
        }
    }
];
const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    let user = args[0];
    let reason = args.slice(1).join(" ");
    
    client.fetchUser(user).then(id => {
        message.guild.unban(id).catch(err => {
            return message.channel.send("Failed to unban user " + id)
        }) 
    })
    auto.actionTaken(message, "unbanned", user, reason);
    auto.log(message, "unbanned", user, reason);

}

module.exports.help = {
    "description": "Unbans the given user.",
    "usage": "/unban <userID> [reason]",
    "perms": "BAN_MEMBERS",
    "state": "functional"
}
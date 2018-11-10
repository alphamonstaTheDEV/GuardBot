    const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let warning_channel = message.guild.channels.find("name", "guardbot-database-channel");
    let user = auto.getUser(message, args);
    let reason = args.slice(1).join(" ")
    if (user == "error") return message.channel.send(`Invalid \`<user>\``);
    
    if (user == message.member) return;

    if (!warning_channel) return;
    let json = JSON.stringify({ user: user.id, action: "warning", reason: reason, moderator: message.author.id, date: Date.now()})
    await warning_channel.send(user.id + json)
    auto.log(message, "warned", user, reason)
    auto.actionTaken(message, "warned", user, reason)
}
module.exports.help = {
    "description": "Warns the given user.",
    "usage": "/warn <user> [reason]",
    "perms": "MANAGE_MESSAGES",
    "state": "functional"
}
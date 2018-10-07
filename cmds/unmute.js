const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let user = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!user) {
        if (!parseInt(args[0])) return message.channel.send("**ERROR**: \`/unmute **<user>** [reason]\`");
        user = message.guild.members.get(args[0]);
    }
    mutedRole = message.guild.roles.find("name", "Muted")
    if (user == message.member) return;
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
    if(!user.roles.has(mutedRole.id)) return message.channel.send("Unable to `unmute`: `User is not muted.`");
    user.removeRole(mutedRole);
    auto.log(message, "unmuted", user, reason);
    auto.actionTaken(message, "unmuted", user, reason);
}

module.exports.help = {
    "description": "Unmutes the given user.",
    "usage": "/unmute <user> [reason]",
    "perms": "MANAGE_MESSAGES",
    "state": "functional"
}
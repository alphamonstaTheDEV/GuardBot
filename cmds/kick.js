const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return;
    let user = message.mentions.members.first();
    let reason = args.slice(1).join(" ");

    if (!user) {
        if (!parseInt(args[0])) return message.channel.send("**ERROR**: \`/kick **<user>** [reason]\`");
        user = message.guild.members.get(args[0]);
    }
    if (user == message.member) return;
    if (!user.kickable) return message.channel.send(`${user.user.tag} can't be banned. \`kickable == False\``)
    if (user.highestRole.position >= message.member.highestRole.position) return message.channel.send(`${user.user.tag} has a higher role than you.`)
    user.kick(reason);
    auto.log(message, "kicked", user, reason);
    return auto.actionTaken(message, "kicked", user, reason);
}


module.exports.help = {
    "description": "Kicks the given user.",
    "usage": "/kick <user> [reason]",
    "perms": "KICK_MEMBERS",
    "state": "functional"
}
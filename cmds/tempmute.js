const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");
const ms = require("ms")
module.exports.run = async (client, message, args) => {

    let mutedRole;
    if (!message.guild.roles.find("name", "Muted")) {
        message.channel.send("Unable to find a `Muted` role. Creating...")
        await message.guild.createRole({
            name: "Muted",
            permissions: []
        }).then(role => {
            mutedRole = role;
        })
        message.guild.channels.forEach(channel => {
            channel.overwritePermissions()
        });
    }
    mutedRole = message.guild.roles.find("name", "Muted")
    let user = message.mentions.members.first();
    let reason = args.slice(2).join(" ");
    if (!user) {
        if (!parseInt(args[0])) return message.channel.send("**ERROR**: \`/tempmute **<user>** <duration> [reason]\`");
        user = message.guild.members.get(args[0]);
    }
    let duration = args[1]
    if (!duration) return message.channel.send("**ERROR**: \`/tempmute <user> **<duration>** [reason]\`");
    if (user == message.member) return;
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
    if (user.highestRole.position >= message.member.highestRole.position) return message.channel.send(`${user.user.tag} has a higher role than you.`);
    user.addRole(mutedRole).then(err => {
        auto.actionTaken(message, "tempmuted", user, reason);
        auto.log(message, "tempmuted", user, reason);
    })
    setTimeout(() => {
        user.removeRole(mutedRole);
    }, ms(duration));
}

module.exports.help = {
    "description": "TemMutes the given user.",
    "usage": "/tempmute <user> <duration> [reason]",
    "perms": "MANAGE_MESSAGES",
    "state": "functional"
}
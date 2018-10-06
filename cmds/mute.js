const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let mutedRole = message.guild.roles.find("name", "Muted")
    if (!mutedRole) {
        message.channel.send("Unable to find a `Muted` role. Creating...")
        message.guild.createRole({
            name: "Muted",
            permissions: []
        }).then(role => {
            mutedRole = role;
        })
        message.guild.channels.forEach(channel => {
            channel.overwritePermissions(mutedRole, { SEND_MESSAGES: false}, "Created Muted Role")
        });
    }
    
    let user = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!user) {
        if (!parseInt(args[0])) return message.channel.send("**ERROR**: \`/mute **<user>** [reason]\`");
        user = message.guild.members.get(args[0]);
    }
    if (user == message.member) return;
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
    if (user.highestRole.position >= message.member.highestRole.position) return message.channel.send(`${user.user.tag} has a higher role than you.`);
    try {user.addRole(mutedRole)} catch (err) {
        return message.channel.send("ERROR: `Muted` role is above my role.")
    }
    auto.log(message, "muted", user, reason);
    auto.actionTaken(message, "muted", user, reason);
}

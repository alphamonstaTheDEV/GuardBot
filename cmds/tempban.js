const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");
const ms = require("ms");
module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return;
    let duration = args[1]
    let reason = args.slice(2).join(" ");
    let user = auto.getUser(message, args);
    if (user == "error") return message.channel.send(`Invalid \`<user>\``);
    if (user == message.member) return;
    console.log("goin great");
    if (!user.bannable) return message.channel.send(`${user.user.tag} can't be Tempbanned. \`bannable == False\``)
    if (user.highestRole.position >= message.member.highestRole.position) return message.channel.send(`${user.user.tag} has a higher role than you.`)
    
    user.ban(reason);
    
    auto.actionTaken(message, "tempbanned", user, reason);
    auto.log(message, "tempbanned", user, reason);

    setTimeout(() => {
        message.guild.unban(user.id);
        auto.log(message, "unbanned", user.id, reason);
    }, ms(duration));

}

module.exports.help = {
    "description": "Tempbans the given user.",
    "usage": "/tempban <user> <duration> [reason]",
    "perms": "BAN_MEMBERS",
    "state": "functional"
}
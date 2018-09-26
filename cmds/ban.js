const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return;
    let user = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!user) {
        if (!parseInt(args[0])) return message.channel.send("**ERROR**: \`/ban **<user>** [reason]\`");
        user = message.guild.members.get(`${args[0]}`);
    }    
    if (user == message.member) return;
    console.log("goin great");
    if (!user.bannable) return message.channel.send(`${user.user.tag} can't be banned. \`bannable == False\``)
    if (user.highestRole.position >= message.member.highestRole.position) return message.channel.send(`${user.user.tag} has a higher role than you.`)
    
    user.ban(reason);
    console.log("still going great");
    auto.actionTaken(message, "banned", user, reason);
    auto.log(message, "banned", user, reason);

}

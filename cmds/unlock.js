const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");
const ms = require("ms")
module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return;
    let channel = message.channel;
    let reason = args.slice(1).join(" ")
        channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
        }, `${message.author.tag} used Lock command.`)
        auto.log(message, "unlock")
        return message.channel.send(`<#${message.channel.id}> has been unlocked by **${message.author.tag}** :unlock:`);
}

module.exports.help = {
    "description": "Unlocks the current channel.",
    "usage": "/unlock [reason]",
    "perms": "MANAGE_CHANNELS",
    "state": "functional"
}
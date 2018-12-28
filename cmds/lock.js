const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");
const ms = require("ms")

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return;
    let channel = message.channel;
    let duration = args[0];
    let reason = args.slice(1).join(" ")
    if (!duration) {
        channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }, `${message.author.tag} used Lock command.`)
        auto.log(message, "lock")
        return message.channel.send(`<#${message.channel.id}> has been locked by **${message.author.tag}** :lock:`);
    }
    channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
    }, `${message.author.tag} used Lock command.`)
    setTimeout(() => {
        channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
        }, `${message.author.tag} used Lock command.`)
        message.channel.send(":unlock:");
    }, ms(duration));
    auto.log(message, "lock", duration)
    return message.channel.send(`<#${message.channel.id}> has been locked by **${message.author.tag}** for ${duration} :lock:`);

}

module.exports.help = {
    "description": "Locks the current channel.",
    "usage": "/lock [reason]",
    "perms": "MANAGE_CHANNELS",
    "state": "functional"
}
const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    let action = args[0];
    let type = args[1].toLowerCase();
    let name = args.slice(2).join(" ");
    if (action == "create") {
        if (!args[0] || !args[1] || !args[2]) return message.channel.send("**ERROR**: \`/channel <create/delete> <text/voice> <name>\`");
        if (type == "voice") {
            message.guild.createChannel(name, type)
            message.channel.send(`:ok_hand: channel created! **Name:** \`${channelc.name}\` **Type:** \`${type}\``)
        } else if (type == "text") {
            try {
                message.guild.createChannel(name, type).then(channelc => {
                    message.channel.send(`:ok_hand: channel created! **Name:** \`${channelc.name}\` **Type:** \`${type}\``)
                })
            } catch (err) {
                message.channel.send("**ERROR** please make sure that you are using `-` between words.")
            }

        }
    } else if (action == "delete") {
        if (!args[0] || !args[1]) return message.channel.send("**ERROR**: \`/channel <create/delete> <name>\`");
        let channelD = message.guild.channels.get(args[1]) || message.guild.channels.find("name", args.slice(1).join(" ")) || args[1]
        channelD.delete()
        message.channel.send(`:ok_hand: \`${name}\` named channel deleted!`)
    }
    

}

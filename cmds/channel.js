const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!args[0] || !args[1] || !args[2]) return message.channel.send("**ERROR**: \`/channel <create/delete> <text/voice> <name>\`");
    let action = args[0];
    let type = args[1].toLowerCase();
    let name = args.slice(2).join(" ");
    if (type == "voice") {
        message.guild.createChannel(name, type)
    } else if (type == "text") {
        try {
        message.guild.createChannel(name, type)
        }catch(err) {
            message.channel.send("**ERROR** please make sure that you are using `-` between words.")
        }
    }
    

}

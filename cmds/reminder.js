const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");
const ms = require("ms");
module.exports.run = async (client, message, args) => {
    if (!args[0] || !args[1]) return message.channel.send(help.usage);
    let duartion = args[0]
    let text = args.slice(1).join(" ")
    setTimeout(() => {
        message.reply(`Hey! You wanted me to remind you this: ${text}`);
    }, ms(duartion));
}

module.exports.help = {
    "description": "Sets a reminder.",
    "usage": "/remind <duration(s/m/h/d)> <text>",
    "perms": "USER",
    "state": "functional"
}
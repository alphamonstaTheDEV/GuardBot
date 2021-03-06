const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {

    if(!args[0] || args[0].toLowerCase() == "eval") return message.channel.send("/help <command>")
     const cmd = require(`./${args[0].toLowerCase()}.js`)
    let help = new Discord.RichEmbed()
    .setTitle(`${args[0]} command`)
    .setDescription(cmd.help.description)
    .addField("Usage:", cmd.help.usage, 1)
    .addField("Permissions:", cmd.help.perms, 1)
    .addField("State:", cmd.help.state);

    switch (cmd.help.state) {
        case "unavailable":
        help.setColor(0x010101);
        break;
        case "functional":
        help.setColor(0x00ff00);
        break;
        case "on repair":
        help.setColor(0xffff00);
        break;
        case "in beta":
        help.setColor(0xff0000);
        break;
    }
    message.channel.send(help);
}

module.exports.help = {
    "description": "Help",
    "usage": "/help <command>",
    "perms": "USER",
    "state": "functional"
}
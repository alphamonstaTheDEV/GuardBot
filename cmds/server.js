const fs = require(`fs`);
const Discord = require("discord.js");
const mongoose = require("mongoose");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");
const schemas = require("../utils/schemas.js")
module.exports.run = async (client, message, args) => {
    let serverID;
    if (!args[0]) {serverID = message.guild.id} else {serverID = args[0]}
    if (client.guilds.get(serverID).available == false || client.guilds.get(serverID) == undefined) return message.channel.send("Invalid server.")
    let serverInfo = new Discord.RichEmbed()
        .setThumbnail(client.guilds.get(serverID).icon)
        .addField(">>General Information", `Name: ${client.guilds.get(serverID).name}\nCreated at: ${client.guilds.get(serverID).createdAt}\nMembers: ${client.guilds.get(serverID).members.size}`)
}

module.exports.help = {
    "description": "gives information about the server.",
    "usage": "/server [ID]",
    "perms": "USER",
    "state": "in beta"
}
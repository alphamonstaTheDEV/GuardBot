const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    //if (!config.ownerID.includes(message.author.id)) return;
    //code here
}

module.exports.help = {
    "description": "Gives the infractions of the member",
    "usage": "/infs <user>",
    "perms": "BAN_MEMBERS",
    "state": "in beta"
}
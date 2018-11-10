const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let data, output;
    data = [
        ["User", "Action", "Reason", "Moderator"]
    ]
}

module.exports.help = {
    "description": "Gives the infractions of the member",
    "usage": "/infs <user>",
    "perms": "KICK_MEMBERS",
    "state": "in beta"
}
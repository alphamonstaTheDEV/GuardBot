const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    message.channel.send(`Ping: ${Date.now() - message.createdAt}ms`);
}

module.exports.help = {
    "description": "Use this to check bot's ping.",
    "usage": "/ping",
    "perms": "USER",
    "state": "functional"
}
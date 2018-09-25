const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    message.channel.send(`Ping: ${Date.now() - message.createdAt}ms`);
}

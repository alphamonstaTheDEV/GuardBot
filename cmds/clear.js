const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    let messagecount = parseInt(args[0]);
    message.delete();
    message.channel.fetchMessages({
        limit: messagecount
    }).then(messages => message.channel.bulkDelete(messages));

    message.channel.send("Deleted **" + messagecount + "** messages.").then(msg => {msg.delete(8000)})
    auto.log(message, "clear")
}

module.exports.help = {
    "description": "Deletes given amount of messages.",
    "usage": "/clear <messageAmount>",
    "perms": "ADMINISTRATOR",
    "state": "functional"
}
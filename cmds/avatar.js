const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let user = message.mentions.users.first();
    if (!message.mentions.users.first() && args[0]) {user = client.users.get(args[0])} else {user = message.author}
    let embed = new Discord.RichEmbed()
    .setColor(0x0000ff)
    .setTitle("Avatar of " + user.tag)
    .setImage(user.displayAvatarURL)
    message.channel.send(embed)
}
module.exports.help = {
    "description": "Sends the avatar of the given user.",
    "usage": "/avatar [user]",
    "perms": "USER",
    "state": "functional"
}
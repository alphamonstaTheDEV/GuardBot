const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    if (!args[0]) {let user = message.member} 
    else {
        user = message.mentions.members.first()
    if (!user) {
        user = message.guild.members.get(args[0])
        if (!user) return help.usage;
    }
}

    let embed = new Discord.RichEmbed()
    .setColor(0x0000ff)
    .setTitle("Avatar of " + user.user.tag)
    .setImage(user.user.displayAvatarURL)
    message.channel.send(embed)
}
module.exports.help = {
    "description": "Sends the avatar of the given user.",
    "usage": "/avatar [user]",
    "perms": "USER",
    "state": "functional"
}
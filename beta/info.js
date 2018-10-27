const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let user = message.mentions.members.first();
    if (!user) {
        if (!parseInt(args[0])) return message.channel.send("**ERROR**: \`/info <user>\`");
        user = message.guild.members.get(`${args[0]}`);
    }
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setTitle(`User Info of ${user.user.tag}`)
    .setColor(0xffffff)
    .setThumbnail(user.user.avatarURL)
    .addField("User ID:", user.id, 1)
    .addField("Created At:", user.user.createdAt, 1)
    .addField("Joined At:", user.joinedAt, 1)
    .addField("Last Message:", user.lastMessage.createdAt)
    .addField("Roles:", `<@${user.roles.join("> <@")}`, 1)
}

module.exports.help = {
    "description": "Gives information about given user.",
    "usage": "",
    "perms": "",
    "state": ""
}
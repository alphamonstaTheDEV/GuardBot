const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");
array = [""]
module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
    let user = message.mentions.members.first();
    if (!user) {
        if (!parseInt(args[0])) return message.channel.send("**ERROR**: \`/hug **<user>**\`");
        user = message.guild.members.get(args[0]);
    }
    message.channel.send(`***${message.author.username}** hugs **${user.user.username}*** :hugging:`)
}

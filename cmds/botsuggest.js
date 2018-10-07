const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let suggestionChat = client.channels.get("498008858267222026");
    suggestion = args.join(" ");
    if (!args[0]) return message.channel.send("**ERROR**: \`/botsuggestion **<a suggestion for the bot>**\`")
    let suggestionEmbed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setColor(0xffff00)
    .setTitle("New Suggestion for GuardBot!")
    .setDescription(suggestion)
    .setTimestamp()

    suggestionChat.send(suggestionEmbed).then(msg => {
        msg.react("👍").then(msg1 =>{msg1.react("👎")})
    })
    message.delete();
    return message.channel.send("Thank you for your suggestion.").then(msg => {
        msg.delete(10000)
    })
}

module.exports.help = {
    "description": "Sends your suggestion for the GearBot to Developers.",
    "usage": "/botsuggestion <a suggestion for the bot>",
    "perms": "USER",
    "state": "functional"
}
const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let owner = client.users.get("316641074967871500");
    suggestion = args.join(" ");
    if (!args[0]) return message.channel.send("**ERROR**: \`/botsuggestion **<a suggestion for the bot>**\`")
    let suggestionEmbed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setColor(0xffff00)
    .setTitle("New Suggestion for GuardBot!")
    .setDescription(suggestion)
    .setTimestamp()

    owner.send(suggestionEmbed);
    message.delete();
    return message.channel.send("Thank you for your suggestion.")
}

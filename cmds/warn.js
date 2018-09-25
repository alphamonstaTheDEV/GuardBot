const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let reportChannel = message.guild.channels.find("name", "mod-log") || message.guild.channels.find("name", "log")
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
    let user = message.mentions.users.first();
    let reason = args.slice(1).join(" ");
    if (!user) {
        if (!parseInt(args[0])) return message.channel.send("**ERROR**: \`/warn **<user>** <reason>\`");
        user = message.guild.users.get(args[0]);
    }
    if (user == message.author) return;

    try {
        let embed = new Discord.RichEmbed()
            .setColor(0x00ff00)
            .setTitle("Warn")
            .addField("Warn Received From:", `<@${message.author.id}>`)
            .addField("Target User:", `<@${user.id}>`)
            .addField("Reason:", reason)
            .setTimestamp()
            .setThumbnail("https://ipvm-uploads.s3.amazonaws.com/uploads/5ac5/9b52/Critical.png")
            .setFooter(client.user.username, client.user.avatarURL)
        reportChannel.send(embed)
    } catch (err) {
        try {
            user.send("You have been warned. Reason: `" + reason + "`");
        } catch (err) { }
    }
    auto.log(message, "warned", message.mentions.members.first(), reason)
    auto.actionTaken(message, "warned", message.mentions.members.first(), reason)
}

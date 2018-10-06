const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let reportChannel = message.guild.channels.find("name", "mod-log") || message.guild.channels.find("name", "reports") || message.guild.channels.find("name", "log") || message.guild.channels.find("name", "guardbot-log")
    if (!reportChannel) return message.channel.send("This server does not have a` #log` / `#mod-log` / `#reports` channel. Until the channel is opened, this command is unavailable. :lock:")
    let user = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!user) {
        if (!parseInt(args[0])) return message.channel.send("**ERROR**: \`/report **<user>** <reason>\`");
        user = message.guild.members.get(args[0]);
    }
    if (user == message.member) return;
    if (!reason) return message.channel.send("**ERROR**: \`/report <user> **<reason>**\`");
    let embed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setTitle("Report")
        .setThumbnail("http://www.datixinc.com/wp-content/uploads/2015/02/report-icon.gif")
        .addField("Reported By:", `<@${message.author.id}>`, 1)
        .addField("Target User:", `<@${user.id}>`, 1)
        .addField("Reason:", `\`\`\`${reason}\`\`\``)
        .setTimestamp()
        .setFooter(`Reported by: ${message.author.tag} | Reported user: ${user.user.tag}`)
    reportChannel.send(embed)
    message.delete();
    message.channel.send("Your report has been sent.").then(msg => {msg.delete(8000)});
}

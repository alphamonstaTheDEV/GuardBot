const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.profile = (message) => {
    return message.reply(`Your profile is not set. Please type \`${serverdata[message.guild.id].prefix}profile.\``)
}

module.exports.cmdinfo = (message, command, usage) => {
	let embed = new Discord.RichEmbed()
	.setColor(0xff0000)
	.setTitle("USAGE ERROR")
	.setDescription(`${serverdata[message.guild.id].prefix}${command} ` + usage)
	return message.channel.send(embed).then(msg => {msg.delete(10000)})
	
	}

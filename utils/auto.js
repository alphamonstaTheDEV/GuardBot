const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.actionTaken = (message, action, member, reason) => {
	if (!reason) return message.channel.send(`**${member.user.tag}\` (${member.user.id})\`** has been ${action} by **${message.author.tag}**`);
	if (action === "force banned") {
		return message.channel.send(`🛡 **${member}\`** has been ${action} by **${message.author.tag}\` (${message.author.id})\`** | Reason: \`${reason}\``);
	} 
	return message.channel.send(`**${member.user.tag}\` (${member.user.id})\`** has been ${action} by **${message.author.tag}** | Reason: \`${reason}\``);

}

module.exports.log = (message, action, member, reason) => {
	let logChannel = message.guild.channels.find("name", "guardbot-log");
	if (!logChannel) return;
	if (!reason) {
		reason = "Not given."
	}
	if (action === "lock") {
		return logChannel.send(`:lock: <#${message.channel.id}> has been locked by **${message.author.tag}\` (${message.author.id})\`** for ${member}`);
	} else if (action === "unlock") {
		return logChannel.send(`:unlock: <#${message.channel.id}> has been unlocked by **${message.author.tag}\` (${message.author.id})\`**`);
	} /*else if (action === "clear") {
		logChannel.send(`${message.author.tag}\` (${message.author.id})\``)
	}*/ else if (action === "force banned") {
		return logChannel.send(`🛡 **${member}\`** has been ${action} by **${message.author.tag}\` (${message.author.id})\`** | Reason: \`${reason}\``);
	} else if (action === "clear") {
		return logChannel.send(`🛡 **${message.author.tag}\` (${message.author.id})\`** has bulk deleted <#${message.channel.id}> (${message.channel.id})`);
	} else {
		if (!reason) return logChannel.send(`🛡 **${member.user.tag}\` (${member.user.id})\`** has been ${action} by **${message.author.tag}\` (${message.author.id})\`**`);
		return logChannel.send(`🛡 **${member.user.tag}\` (${member.user.id})\`** has been ${action} by **${message.author.tag}\` (${message.author.id})\`** | Reason: \`${reason}\``);
	}

}

const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");
array = ["{user} tries to hug {user2} but the server owner steals it!", "{user} turns into a GIANT FLUFFY BUNNY and hugs {user2}", "{user} tried to hug {user2} but fought them instead.", "{user} Sent a virtual hug to {user2}",]
module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
    let user = message.mentions.members.first();
    if (!user) {
        if (!parseInt(args[0])) return message.channel.send("**ERROR**: \`/hug **<user>**\`");
        user = message.guild.members.get(args[0]);
    }
    randomTxt1 = array[Math.floor(Math.random()* array.length)].replace("{user}", `<@${message.author.id}>`)
    randomTxtFinal = array[Math.floor(Math.random() * array.length)].replace("{user2}", `<@${user.id}>`)
    message.channel.send(randomTxtFinal);
}

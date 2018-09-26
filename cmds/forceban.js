const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return;
    let user = args[0];
    let reason = args.slice(1).join(" ");
    client.fetchUser(user).then(id => {
        message.guild.ban(id).catch(err => {
            message.channel.send("Failed to ban user " + id)
            console.log(err)
        })
        auto.actionTaken(message, "force banned", user, reason);
        auto.log(message, "force banned", user, reason);
    })

}

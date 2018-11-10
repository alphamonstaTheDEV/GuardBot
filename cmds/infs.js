const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");
const table = require("table");
module.exports.run = async (client, message, args) => {
    let data, output;
    let user = auto.getUser(message, args);
    if (user == "error") return message.channel.send(help.usage)
    data = [
        ["Created At", "User", "Action", "Moderator", "Reason"]
    ]

    await auto.fetchInf(message, user.id, "all").then(array => {
        array.map(inf => {
            let date = new Date(inf.date)
            let mod = client.users.get(inf.moderator).tag || inf.moderator;
            let dada = date.toString.replace("(Coordinated Universal Time)", "")
            data.push([dada, user.user.tag, inf.action, inf.moderator, inf.reason])
        })
    })
    output = table.table(data);
    return message.channel.send("```" + output + "```");


}

module.exports.help = {
    "description": "Gives the infractions of the member",
    "usage": "/infs <user>",
    "perms": "KICK_MEMBERS",
    "state": "in beta"
}
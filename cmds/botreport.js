const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let bugChannel = client.channels.get("498009184097533963");
    if(message.channel.id = bugChannel.id) {
        let command = args[0]
        let bugMessage = bugChannel.fetchMessage(args[1]);
        if (!bugMessage) return message.channel.send("Error: Couldn't fetch that report.").then(msg => msg.delete(10000));
        if (bugMessage.author.id == message.author.id) return;
        switch(command) {
            case "approve":
                bugMessage.edit(bugMessage.content + `\n:white_check_mark:**${message.author.tag}** | \`${args.slice(3).join(" ")}\``)
            break;
            case "deny":
                bugMessage.edit(bugMessage.content + `\n:negative_squared_cross_mark:**${message.author.tag}** | \`${args.slice(3).join(" ")}\``)
            break;
            case "note":
                bugMessage.edit(bugMessage.content + `\n:pencil:**${message.author.tag}** | \`${args.slice(3).join(" ")}\``)
            break;
        }
    }
    bugChannel.send(`**───────────────────\n${message.author.tag}** reported:\n ${args.join(" ")}\n\n The bug report above needs to be approved.`);

}

module.exports.help = {
    "description": "Report bugs to GuardBot Developers.",
    "usage": "/botreport --desc <short description of the bug>",
    "perms": "USER",
    "state": "in beta"
}
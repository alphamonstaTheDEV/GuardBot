const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");
const ms = require("ms");
module.exports.run = async (client, message, args) => {

    if (!config.ownerID.includes(message.author.id)) return message.channel.send("Soon:tm:")
    let giveawayRole = message.guild.roles.find("name", "giveaway");
    if (!giveawayRole) {
        if (message.member.hasPermission("ADMINISTRATOR") || message.member.id == message.guild.owner.id) return giveaway(client, message, args);
        message.channel.send("Unable to use `giveaway` command. **Reason:** `Cannot find role: \"giveaway\"`");
    }
    if (message.member.roles.has(giveawayRole.id)) return giveaway(client, message, args);
    return;
}

const giveaway = (client, message, args) => {
    let duration = args[0];
    let winnerCount = parseInt(args[1]);
    let Title = args.slice(2).join(" ");
    if (!duration) return message.channel.send("**ERROR**: \`/giveaway **<duration>** <WinnerAmount> <Title>\`");
    if (!winnerCount) return message.channel.send("**ERROR**: \`/giveaway <duration> **<WinnerAmount>** <Title>\`");
    if (!Title) return message.channel.send("**ERROR**: \`/giveaway <duration> <WinnerAmount> **<Title>**\`");
    let embed = new Discord.RichEmbed()
        .setColor(0x0000ff)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle("Giveaway Started!")
        .setDescription(Title + "\n\n*to enter, React with :bacon:!*")
        .setFooter(`${winnerCount} winners. | Ends at: ${Date.now() + ms(duration)}`)
    message.channel.send(embed).then(msg => {
        msg.react("🥓")
        setTimeout(() => {
            let users = msg.reactions.array().indexOf("🥓").members
            let winnerz = []
            console.log(users);
           
                while (winnerz.length < winnerCount) {
                    let randomPushIndex = Math.floor(Math.random() * users[0].message.users.length)
                    winnerz.push(users[0].message.users[randomPushIndex].id);
                }

            embed.setColor(0x010101)
            embed.setTitle("Giveaway Ended!")
            embed.setFooter()
            msg.edit(embed);
            message.channel.send(`Winner(s) of \`${Title}\` giveaway: <@${winnerz.join("> | <@")}> !`);
        }, ms(duration));
    })
}

module.exports.help = {
    "description": "COMMAND UNAVAILABLE",
    "usage": "",
    "perms": ""
}
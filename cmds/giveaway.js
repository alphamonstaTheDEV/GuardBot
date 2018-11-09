const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");
const ms = require("ms");
const giveawayEmote = "✅"
module.exports.run = async (client, message, args) => {

    let giveawayRole = message.guild.roles.find("name", "giveaway");
    if (!giveawayRole) {
        if (message.member.hasPermission("ADMINISTRATOR") || message.member.id == message.guild.owner.id) return giveaway(client, message, args);
        message.channel.send("Unable to use `giveaway` command. **Reason:** `Cannot find role: \"giveaway\"`");
    }
    if (message.member.roles.has(giveawayRole.id)) return giveaway(client, message, args);
    return;
}

const giveaway = async (client, message, args) => {
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
        .setDescription(Title + "\n\n*to enter, React with :white_check_mark:!*")
        .setFooter(`${winnerCount} winners. | Ends at: ${Date.now() + ms(duration)}`)
    await message.channel.send(embed).then(async msg => {
        await msg.react(giveawayEmote)
        const filter = (reaction) => reaction.emoji.name === giveawayEmote;
        let allUsers = []
        let winners = []
        await msg.awaitReactions(filter, {time: ms(duration)}).then(reactions => {
            reactions.get(giveawayEmote).users.forEach(user => {
                allUsers.push(user.id);
            });
        })

        while (winners.length < winnerCount) {
            let www = allUsers[Math.floor(Math.random() * allUsers.length)];
            if (allUsers.includes(www) || www === client.id) return;
            winners.push(www)
        }

        message.channel.send(`Winner(s) of the \`${Title}\` giveaway are/is: <@${winners.join(">, <@")}> | Congrats!`)
    })
}

module.exports.help = {
    "description": "COMMAND UNAVAILABLE",
    "usage": "/giveaway <duration> <WinnerAmount> <Title>",
    "perms": "ADMINISTRATOR",
    "state": "in beta" 
}
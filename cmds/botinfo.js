const fs = require(`fs`);
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const auto = require("../utils/auto.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let cmds = [];
    message.delete()
    await fs.readdir("./cmds/", async (err, files) => {
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        jsfiles.forEach((f) => {
            let cmdname = f.replace(".js", "");
            if (cmdname === "eval" || cmdname === "reload") return;
            cmds.push(cmdname);
        });
    
    let embed = new Discord.RichEmbed()
        .setColor(0xffff00)
        .setAuthor(client.user.username, client.user.avatarURL)
        .setTitle("Info")
        .setDescription("Hi!\nI am a complete moderation bot made by C4Navar#5799(316641074967871500).\nIf you have any questions/feedbacks please visit my Discord Server: [Click to Join!](https://discord.gg/CGPsfGd) \n **Future Plans:**\n *Database System soon:tm:\n*With database, more commands soon:tm:")
        .addField("Commands:", `\`${cmds.join(", ")}\``)
        .addField("You can also create a channel named `guardbot-log` for me to log actions!")
        .addField("Invite Link:", "[Click to Invite!](https://discordapp.com/api/oauth2/authorize?client_id=487984632265179178&permissions=8&scope=bot)")
        .setTimestamp()
        .setFooter("<3")
    await message.author.send(embed)
        message.channel.send("*:mailbox_with_mail: Check your DMs*").then(msg => {
        msg.delete(10000)
    })
    })
}

module.exports.help = {
    "description": "Gives information about the bot.",
    "usage": "/botinfo",
    "perms": "USER",
    "state": "functional"
}
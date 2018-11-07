const fs = require(`fs`);
const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const pref = process.env.prefix;
client.ownerID = "316641074967871500";


client.on("channelCreate", async channel => {
    let logChannel = channel.guild.channels.find("name", "guardbot-log");
    if (!logChannel) return;
    logChannel.send(`:heavy_plus_sign: A \`${channel.type}\` channel has been created. \`${channel.name} (${channel.id})\``);
})

client.on("guildMemberAdd", async member => {
    let logChannel = member.guild.channels.find("name", "guardbot-log");
    if (!logChannel) return;
    let createdAt = new Date(member.user.createdAt)
    logChannel.send(`:new: Member: **${member.user.tag} (${member.id})** (Created at ${createdAt.toDateString().slice(4)})`)
})

client.on("guildMemberRemove", async member => {
    let logChannel = member.guild.channels.find("name", "guardbot-log");
    if (!logChannel) return;
    logChannel.send(`:no_entry: Member has left: **${member.user.tag} (${member.id})**`)
})


client.on("channelDelete", async channel => {
    let logChannel = channel.guild.channels.find("name", "guardbot-log");
    if (!logChannel) return;
    logChannel.send(`:heavy_minus_sign: A \`${channel.type}\` channel has been deleted. \`${channel.name} (${channel.id})\``);
})

client.on("messageDelete", async message => {
    let logChannel = message.guild.channels.find("name", "guardbot-log");
    if (!logChannel) return;
    logChannel.send(`❗ A message sent by ${message.author.tag} (\`${message.author.id}\`) has been deleted. **Message Channel:** \`${message.channel.name} (${message.channel.id})\` **Message Content:** \n \`${message.content}\``);
})

client.on("ready", () => {
    console.log("I am ready to roll.")
    client.channels.get("498011161891962910").send("Build Success.")
    client.user.setPresence({game: { type: "LISTENING", name: "commands! | Prefix: `/`"}, status: "idle"})

});
client.on("guildCreate", guild => {
    client.channels.get("498011161891962910").send(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

});
client.on("guildDelete", guild => {
    client.channels.get("498011161891962910").send(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

const neededPerms = ["BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_MESSAGES", "MANAGE_CHANNELS", "MANAGE_ROLES", "EMBED_LINKS", "VIEW_CHANNEL"]

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (!message.content.startsWith(pref)) return;
    const args = message.content.slice(pref.length).trim().split(/ +/g);
    // if (!message.guild.members.get(client.user.id).hasPermission("ADMINISTRATOR")) return message.channel.send("I require `ADMINISTRATOR` permission for all my commands.")
    let doesntHavePerms = [];
    neededPerms.forEach(perm => {
        if (!message.guild.members.get(client.user.id).hasPermission(perm)) return doesntHavePerms.push(perm)
    });
    if (doesntHavePerms[0]) return message.channel.send(`I require \`${doesntHavePerms.join(", ")}\` permissions to work perfectly.`)

    const command = args.shift().toLowerCase();
        let commandFile = require(`./cmds/${command}.js`);
        if (!commandFile.help && command != "eval") return;
    if (commandFile.help.status == "unavailable" || commandFile.help.status == "beta" && message.author.id != client.ownerID) return message.channel.send("This command is unavailable at the moment.")
        return commandFile.run(client, message, args);


});

client.login(process.env.TOKEN);
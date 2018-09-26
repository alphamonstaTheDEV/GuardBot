const fs = require(`fs`);
const Discord = require("discord.js");
/*const userdata = require("./database/userdata/userdata.json");
const inv = require("./database/userdata/userinv.json");
const map = require("./database/locationdata/map.json");
const items = require("./database/itemdata/itemlist.json");
const recipe = require("./database/itemdata/recipe.json");
const serverdata = require("./database/serverdata/serverdata.json");
const errors = require("./utils/errors.js");
const auto = require("./utils/auto.js");*/
const config = require("./config.json");
const talkedRecently = new Set();
const client = new Discord.Client({ disableEveryone: true });
client.commands = new Discord.Collection();
const pref = process.env.prefix;
fs.readdir("./cmds/", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("komut yok");
        return;
    }
    console.log(`Loading ${jsfiles.length} commands!`);
    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f}`);
        client.commands.set(f, props);

    });
});

client.on("ready", () => {
    console.log("I am ready to roll.")
    client.user.setPresence({game: { type: "LISTENING", name: "commands! | Prefix: `/`"}, status: "idle"})

});
client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

});
client.on("guildDelete", guild => {
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
        return commandFile.run(client, message, args);


});

client.login(process.env.TOKEN);
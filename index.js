require('dotenv').config();
const fs = require('fs')
const { Client, GatewayIntentBits, ActivityType, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Looking next for efficient way(s) to do this!
client.commands = client.aliases = client.events = client.slashCommands = new Collection();
module.exports.client = client

// Looking for ways to merge these two handlers into one.
// Or maybe just make a single handler for both commands and slash commands. (Handlers folder)

// Events Handler
fs.readdirSync('./events/').forEach( event => {
    const eventGet = require(`./events/${event}`);
    let check = false;
    try {
        client.events.set(eventGet.name, eventGet);
        if (check == false) {
            console.log(`[EVENT HANDLER] - File ${event} was loaded`);
            check = true;
        }
    } catch (err) {
        return console.log(err);
    }
});

// Commands Handler
fs.readdirSync('./commands/').forEach( file => {
    var fileGet = require(`./commands/${file}`);
    try {
        if (fileGet.commandInfo) {
            client.commands.set(fileGet.commandInfo.name, fileGet)
            fileGet.commandInfo.aliases.forEach(alias => { client.aliases.set(alias, fileGet.commandInfo.name) })
        }
        if (fileGet.slashCommandInfo) {
            client.slashCommands.set(fileGet.slashCommandInfo.name, fileGet)
        }
        console.log(`[BOTH COMMAND HANDLER] - File ${file} was loaded.`);
    } 
    catch (err) {
        return console.log(err)
    }
});

client.login(process.env.TOKEN);
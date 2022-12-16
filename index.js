require('dotenv').config();
const fs = require('fs')
const { Client, GatewayIntentBits, ActivityType, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

message_replies = {'yee': 'haw!', 'ping': 'pong!', 'hi': 'hello!', 
                   'hello': 'hi!', 'hey': 'hi!', 'yo': 'hey!',
                   'how are you?': 'I am good'}

Client.commands = Client.aliases = Client.events = Client.slashCommands = new Collection();
module.exports.Client = Client

// Events Handler
fs.readdirSync('./events/').forEach( event => {
    const eventGet = require(`./events/${event}`);
    let check = false;
    try {
        Client.events.set(eventGet.name, eventGet);
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
            Client.commands.set(fileGet.commandInfo.name, fileGet)
            fileGet.commandInfo.aliases.forEach(alias => { Client.aliases.set(alias, fileGet.commandInfo.name) })
        }
        if (fileGet.slashCommandInfo) {
            Client.slashCommands.set(fileGet.slashCommandInfo.name, fileGet)
        }
        console.log(`[BOTH COMMAND HANDLER] - File ${file} was loaded.`);
    } 
    catch (err) {
        return console.log(err)
    }
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ 
        activities: [{ name: 'Da Bible', type: ActivityType.Listening }] });
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() in message_replies) {
        message.reply(message_replies[message.content.toLowerCase()]);
    }
})

client.login(process.env.TOKEN);
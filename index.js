require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType, Presence } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

message_replies = {'yee': 'haw!', 'ping': 'pong!', 'hi': 'hello!', 
                   'hello': 'hi!', 'hey': 'hi!', 'yo': 'hey!',
                   'how are you?': 'I am good'}

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
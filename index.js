require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on('messageCreate', async (message) => {
    if (message.content === 'ping') {
        message.reply('Pong!');
    }
    else if (message.content === 'yee') {
        message.reply('haw!');
    }
})

client.login(process.env.TOKEN);
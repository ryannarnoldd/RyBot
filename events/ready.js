const client = require('../index').client
require('dotenv').config()
const fs = require('fs')

client.on('ready', async () => {
    client.user.setPresence({ activities: [{ name: 'The Bible', type: 2 }] });
    console.log(`${client.user.tag} is online!`);

    commandsInfo = []
    fs.readdirSync('./commands/').forEach(file => {
        var fileGet = require(`../commands/${file}`);
        try { commandsInfo.push(fileGet.slashCommandInfo) } 
        catch (err) { return console.log(err) }
    });
    await client.guilds.cache.get(process.env.GUILD)?.commands.set(commandsInfo)
})
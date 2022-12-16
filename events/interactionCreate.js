const client = require('../index').client

client.on('interactionCreate', async inter => {
    if (inter.isCommand() || inter.isContextMenu()) {
        let slashCommands = client.slashCommands.get(inter.commandName);
        if (slashCommands) slashCommands.slashCommand(inter);
    }
})
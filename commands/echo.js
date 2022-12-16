const discord = require('discord.js');

module.exports = {
    command: async (client, message, args, prefix) => {
        var text = (args.length === 0) ? "Do !echo [message]." : message.content.slice(6);
        await message.reply({ content: text });
    },
    
    slashCommand: async (inter) => {
        const text = inter.options.getString('text');
        await inter.reply({ content: text });
    },

    commandInfo: {
        name: 'echo',
        aliases: ['say', 'repeat']
    },

    slashCommandInfo: {
        name: 'echo',
        description: 'This will echo a message back to you.',
        options: [{
            name: 'text',
            type: "STRING",
            description: "The message to be echoed back.",
            required: true
        }]
    }
}
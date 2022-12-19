const discord = require('discord.js');

module.exports = {
    command: async (Client, message, args, prefix) => {
        let n = args[0];
        n = (n) ? ((n < 1) ? 6 : n) : 6;
        const roll = (Math.floor(Math.random() * n) + 1).toString();
        await message.reply({ content: `1-${n}: **${roll}**` });
    },
    
    slashCommand: async (inter) => {
        let n = inter.options.getInteger('num');
        n = (n) ? ((n < 0) ? 6 : n) : 6;
        const roll = (Math.floor(Math.random() * n) + 1).toString();
        await inter.reply({ content: `1-${n}: **${roll}**` });
    },

    commandInfo: {
        name: 'roll',
        aliases: []
    },

    slashCommandInfo: {
        name: 'roll',
        description: 'roll descirption',
        options: [{
            name: 'num',
            type: "INTEGER",
            description: "The upper limit on the roll.",
            required: true,
        }]
    },
}
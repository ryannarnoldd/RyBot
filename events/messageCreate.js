const client = require('../index').client

message_replies = {'yee': 'haw!', 'ping': 'pong!', 'hi': 'hello!', 
                   'hello': 'hi!', 'hey': 'hi!', 'yo': 'hey!',
                   'how are you?': 'I am good'}

client.on('messageCreate', async message => {
    if (message.author.bot || message.channel.type=='DM') return;

    let prefix = '!';
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commands = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));

    if (commands && cmd.startsWith(prefix)) {
        commands.command(client, message, args, prefix)
    }

    if (message.content.toLowerCase() in message_replies) {
        message.reply(message_replies[message.content.toLowerCase()]);
    }
})
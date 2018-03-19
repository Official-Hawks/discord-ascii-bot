const Discord = require('discord.js');

const client = new Discord.Client();
client.config = require('./config.json');
client.log = require('./functions/log.js');

client.commands = new Discord.Collection();

// set commands
client.commands.set('ping', require('./commands/ping.js'));
client.commands.set('image', require('./commands/image'));

// import event handlers
const onReady = require('./events/ready.js');
const onMessage = require('./events/message.js');

// set event handlerts
client.on('ready', () => onReady(client));
client.on('message', message => onMessage(client, message));

// log events
// TODO: move event handlers in separate files
client
  // .on('debug', info => client.log('info', info))
  .on('warn', warning => client.log('warn', warning))
  .on('error', err => client.log('error', err))
  .on('disconnect', () => client.log('warn', 'Bot disconnected!'))
  .on('reconnecting', () => client.log('warn', 'Reconnecting...'));

// start the bot
client.login(client.config.token);
client.log('info', 'Bot starting...');

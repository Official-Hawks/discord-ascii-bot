const minimist = require('minimist');

module.exports = (client, message) => {
  if (message.author.bot) return;

  // matches messages that start with prefix OR mention
  // regExp computes to something like /^(!|<@!?123456789123456789>)/
  // FIXME: possible regExp DoS, however this stuff is controlled by the bot owner so no big deal
  const regExp = new RegExp(`^(${client.config.prefix}|<@!?${client.user.id}>)`);
  const matches = regExp.exec(message.content);
  if (!matches) return;

  const split = message.content.slice(matches[0].length).trim().split(/ +/g);
  const command = split.shift().toLowerCase();

  if (client.commands.has(command)) {
    const args = minimist(split);

    client.commands.get(command)(client, message, args);
  }
};

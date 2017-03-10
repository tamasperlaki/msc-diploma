const irc = require('irc');

const bot = new irc.Client('irc.chat.twitch.tv', 'tankika', {
    autoConnect: false,
    sasl: true
});

bot.addListener('raw', m => console.log(m));
bot.connect();asd
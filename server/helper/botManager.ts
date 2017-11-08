import Bot from 'msc-diploma-bot';
import { IUser } from '../../models/user';
import { ICommand, Command } from '../../models/command';

const bots = {};

function startBots(users: IUser[]) {
  users.forEach(user => createBot(user));
}

function createBot(user: IUser) {
  let bot = bots[user._id];

  if (!bot) {
    bot = new Bot(user.name);
    addUserCommands(user);

    bots[user._id] = bot;
  } else {
    resetBot(user);
  }
}

function addCommand(user: IUser, command: ICommand) {
  const bot = bots[user._id];

  if (!bot) {
    throw new Error(`Bot does not exist for user: ${user.name} with id: ${user._id}`);
  }

  if (command.enabled) {
    const text = command.text ? command.text : '';
    bot.addCommand(command.name, text);
  }
}

function addUserCommands(user: IUser) {
  Command.find({
    user: user._id
  })
  .then(commands => commands.forEach(command => addCommand(user, command)));
}

function resetBot(user: IUser) {
  const bot = bots[user._id];

  if (bot) {
    bot.resetCommands();
    addUserCommands(user);
  } else {
    throw new Error(`Bot does not exist for user: ${user.name} with id: ${user._id}`);
  }
}

export default {
  startBots: startBots,
  createBot: createBot,
  addCommand: addCommand,
  resetBot: resetBot
};

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
    addUserCommands(user._id);

    bots[user._id] = bot;
  } else {
    resetBot(user);
  }
}

function addCommand(userId: any, command: ICommand) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`addCommand - Bot does not exist for user with id: ${userId}`);
  }

  if (command.enabled) {
    const text = command.text ? command.text : '';
    bot.addCommand(command.name, text);
  }
}

function addUserCommands(userId: any) {
  Command.find({
    user: userId
  })
  .then(commands => commands.forEach(command => addCommand(userId, command)));
}

function resetBot(userId: any) {
  const bot = bots[userId];

  if (bot) {
    bot.resetCommands();
    addUserCommands(userId);
  } else {
    throw new Error(`resetBot - Bot does not exist for user with id: ${userId}`);
  }
}

function runCommand(userId: any, commandName: string) {
  const bot = bots[userId];

  if (bot) {
    bot.runCommand(commandName);
  } else {
    throw new Error(`runCommand - Bot does not exist for user with id: ${userId}`);
  }
}

export default {
  startBots: startBots,
  createBot: createBot,
  addCommand: addCommand,
  resetBot: resetBot,
  runCommand: runCommand
};

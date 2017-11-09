import { duration } from 'moment';
import Bot from 'msc-diploma-bot';
import { IUser } from '../../models/user';
import { ICommand, Command } from '../../models/command';
import { ITimer } from '../../models/timer';

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

function setCommand(userId: any, command: ICommand) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`addCommand - Bot does not exist for user with id: ${userId}`);
  }

  if (command.enabled) {
    const text = command.text ? command.text : '';
    bot.addCommand(command.name, text);
  } else {
    bot.removeCommand(command.name);
  }
}

function addUserCommands(userId: any) {
  Command.find({
    user: userId
  })
  .then(commands => commands.forEach(command => setCommand(userId, command)));
}

function runCommand(userId: any, commandName: string) {
  const bot = bots[userId];

  if (bot) {
    bot.runCommand(commandName);
  } else {
    throw new Error(`runCommand - Bot does not exist for user with id: ${userId}`);
  }
}

function removeCommand(userId: any, command: ICommand) {
  const bot = bots[userId];

  if (bot) {
    bot.removeCommand(command.name);
  } else {
    throw new Error(`removeCommand - Bot does not exist for user with id: ${userId}`);
  }
}

function addTimer(userId: any, timer: ITimer) {
  const bot = bots[userId];

  if (bot) {
    const timeInMillis = duration(timer.timeInMinutes).asMilliseconds();

    Command
      .find({_id: timer.commands})
      .then(commands => console.log(commands));

    bot.addTimer(userId, );
  } else {
    throw new Error(`addTImer - Bot does not exist for user with id: ${userId}`);
  }
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

export default {
  startBots: startBots,
  createBot: createBot,
  setCommand: setCommand,
  runCommand: runCommand,
  removeCommand: removeCommand,
  addTimer: addTimer,
  resetBot: resetBot
};

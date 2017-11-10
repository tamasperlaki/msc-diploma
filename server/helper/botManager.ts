import { map, isEmpty } from 'lodash';
import Bot from 'msc-diploma-bot';
import { IUser } from '../../models/user';
import { ICommand, Command } from '../../models/command';
import { ITimer, Timer } from '../../models/timer';

const bots = {};

function startBots(users: IUser[]) {
  users.forEach(user => createBot(user));
}

function createBot(user: IUser) {
  let bot = bots[user._id];

  if (!bot) {
    bot = new Bot(user.name);
    setUserCommands(user._id);
    setUserTimers(user._id);

    bots[user._id] = bot;
  } else {
    resetBot(user);
  }
}

function setCommand(userId: any, command: ICommand) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`setCommand - Bot does not exist for user with id: ${userId}`);
  }

  if (command.enabled) {
    const text = command.text ? command.text : '';
    bot.setCommand(command.name, text);
  } else {
    bot.removeCommand(command.name);
  }
}

function setUserCommands(userId: any) {
  Command.find({
    user: userId,
    enabled: true
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

  if (!bot) {
    throw new Error(`removeCommand - Bot does not exist for user with id: ${userId}`);
  }

  bot.removeCommand(command.name);
}

function setTimer(userId: any, timer: ITimer) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`setTimer - Bot does not exist for user with id: ${userId}`);
  }

  if (timer.enabled && !isEmpty(timer.commands)) {
    Command
      .find({
        _id: timer.commands,
        enabled: true
      })
      .then(commands => {
        const commandNames = map(commands, 'name');

        bot.setTimer(timer.name, timer.timeInMinutes, commandNames);
      });
  } else {
    bot.removeTimer(timer.name);
  }
}

function setUserTimers(userId: any) {
  Timer.find({
    user: userId,
    enabled: true
  })
  .then(timers => timers.forEach(timer => setTimer(userId, timer)));
}

function removeTimer(userId: any, timer: ITimer) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`removeTimer - Bot does not exist for user with id: ${userId}`);
  }

  bot.removeTimer(timer.name);
}

function resetBot(userId: any) {
  const bot = bots[userId];

  if (bot) {
    bot.resetCommands();
    setUserCommands(userId);
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
  setTimer: setTimer,
  setUserTimers: setUserTimers,
  removeTimer: removeTimer,
  resetBot: resetBot
};

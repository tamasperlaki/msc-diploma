import { map, isEmpty } from 'lodash';
import Bot from 'msc-diploma-bot';
import { IUser } from '../../models/user';
import { ICommand, Command } from '../../models/command';
import { ITimer, Timer } from '../../models/timer';
import { IAlias, Alias } from '../../models/alias';

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
    setUserAliases(user._id);

    bots[user._id] = bot;
  } else {
    throw new Error('Bot was already created for user with id: ${userId}');
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

function setAlias(userId: any, alias: IAlias) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`setAlias - Bot does not exist for user with id: ${userId}`);
  }

  if(alias.command.enabled) {
    bot.setAlias(alias.name, alias.command.name);
  } else {
    bot.removeAlias(alias.name);
  }
}

function setUserAliases(userId: any) {
  Alias.find({
    user: userId
  })
  .populate('command')
  .then(aliases => aliases.forEach(alias => setAlias(userId, alias)));
}

function removeAlias(userId: any, alias: IAlias) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`removeAlias - Bot does not exist for user with id: ${userId}`);
  }

  bot.removeAlias(alias.name);
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
  setAlias: setAlias,
  removeAlias: removeAlias,
  setUserAliases: setUserAliases
};

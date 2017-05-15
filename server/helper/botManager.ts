import Bot from "msc-diploma-bot";
import { IUser } from "../models/user";
import { ICommand } from "../models/command";

var bots = {};

function startBots(users: IUser[]) {
  users.forEach(user => createBot(user));
}

function createBot(user: IUser) {
  var bot = bots[user._id];

  if(!bot) {
    bot =  new Bot(user.name);
    user.commands.forEach(command => bot.addCommand(command.name, command.text));

    bots[user._id] = bot;
  }
}

function addCommand(user: IUser, command: ICommand) {
  var bot = bots[user._id];

  if(bot) {
    bot.addCommand(command.name, command.text);
  } else {
    throw new Error(`Bot does not exist for user: ${user.name} with id: ${user._id}`);
  }
}

function resetBot(user: IUser) {
  var bot = bots[user._id];

  if(bot) {
    bot.resetCommands();
    user.commands.forEach(command => bot.addCommand(command.name, command.text));
  } else {
    throw new Error(`Bot does not exist for user: ${user.name} with id: ${user._id}`);
  }
}

export default {
  startBots: startBots,
  createBot: createBot,
  addCommand: addCommand,
  resetBot: resetBot
}

import { map, isEmpty } from 'lodash';
import Bot from 'msc-diploma-bot';
import eventLogger from '../helper/eventLogger';
import redis from '../config/redis';
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
    bot = new Bot(user.name, user._id, eventLogger);
    bots[user._id] = bot;

    setUserCommands(user._id);
    setUserTimers(user._id);
    setUserAliases(user._id);

    redis.sismember('raffles', `${user._id}`, (isMemberError, isMemberReply) => {
      openRaffle(user._id, false);
    });
    redis.sismember('polls', `${user._id}`, (isMemberError, isMemberReply) => {
      openPoll(user._id);
    });
  } else {
    throw new Error('Bot was already created for user with id: ${userId}');
  }
}

function setCommand(userId: any, command: ICommand) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`Bot does not exist for user with id: ${userId}`);
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
    throw new Error(`Bot does not exist for user with id: ${userId}`);
  }
}

function removeCommand(userId: any, command: ICommand) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`Bot does not exist for user with id: ${userId}`);
  }

  bot.removeCommand(command.name);
}

function setTimer(userId: any, timer: ITimer) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`Bot does not exist for user with id: ${userId}`);
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
    throw new Error(`Bot does not exist for user with id: ${userId}`);
  }

  bot.removeTimer(timer.name);
}

function setAlias(userId: any, alias: IAlias) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`Bot does not exist for user with id: ${userId}`);
  }

  alias
    .populate('command')
    .execPopulate()
    .then(populatedAlias => {
      if (populatedAlias.command.enabled) {
        bot.setAlias(populatedAlias.name, populatedAlias.command.name);
      } else {
        bot.removeAlias(populatedAlias.name);
      }
    });
}

function setUserAliases(userId: any) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`Bot does not exist for user with id: ${userId}`);
  }

  bot.resetAliases();
  Alias.find({
    user: userId
  })
  .populate('command')
  .then(aliases => aliases.forEach(alias => setAlias(userId, alias)));
}

function removeAlias(userId: any, alias: IAlias) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`Bot does not exist for user with id: ${userId}`);
  }

  bot.removeAlias(alias.name);
}

function openRaffle(userId: any, announceStart: boolean) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`Bot does not exist for user with id: ${userId}`);
  }

  bot.openRaffle(announceStart);

  bot.on(bot.NEW_RAFFLER_EVENT, raffler => {
    redis.sismember('raffles', `${userId}`, (isMemberError, isMemberReply) => {
      if (isMemberError) {
        return console.error(isMemberError);
      }

      if (isMemberReply === 1) {
        redis.sadd(`rafflers:${userId}`, raffler, (addError, addReply) => {
          if (addError) {
            console.error(addError);
          }
        });
      }
    });
  });
}

function closeRaffle(userId: any) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`Bot does not exist for user with id: ${userId}`);
  }

  bot.removeAllListeners(bot.NEW_RAFFLER_EVENT);
  bot.closeRaffle();
}

function openPoll(userId: any, options: string[] = []) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`Bot does not exist for user with id: ${userId}`);
  }

  bot.openPoll(options);

  bot.on(bot.VOTE_EVENT, (voter, option) => {
    redis.batch()
      .sismember('polls', `${userId}`)
      .sismember(`poll:voters:${userId}`, voter)
      .zscore(`poll:${userId}`, option)
      .exec((error, replies) => {
        const isPollOpen = replies[0];
        const hasVotedAlready = replies[1];
        const isOptionExist = replies[2];

        if (error) {
          return console.error(error);
        } else if(isPollOpen.code === "ERR") {
          return console.error(isPollOpen);
        } else if(hasVotedAlready.code === "ERR") {
          return console.error(hasVotedAlready);
        } else if(isOptionExist.code === "ERR") {
          return console.error(isOptionExist);
        }

        if(isPollOpen === 1 && hasVotedAlready === 0 && isOptionExist !== null) {
          redis.multi()
            .sadd(`poll:voters:${userId}`, voter)
            .zincrby(`poll:${userId}`, 1, option)
            .exec((error, addVoteReplies) => {
              const addVoterReply = addVoteReplies[0];
              const increaseOptionVotesReply = addVoteReplies[1];

              if (error) {
                return console.error(error);
              } else if(addVoterReply.code === "ERR") {
                return console.error(addVoterReply);
              } else if(increaseOptionVotesReply.code === "ERR") {
                return console.error(increaseOptionVotesReply);
              }
            });
        }
    });
  });
}

function closePoll() {}

function sendMessage(userId: any, message: string) {
  const bot = bots[userId];

  if (!bot) {
    throw new Error(`Bot does not exist for user with id: ${userId}`);
  }

  bot.sendMessage(message);
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
  setUserAliases: setUserAliases,
  openRaffle: openRaffle,
  closeRaffle: closeRaffle,
  openPoll: openPoll,
  closePoll: closePoll,
  sendMessage: sendMessage
};

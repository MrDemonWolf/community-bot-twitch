import { TwitchCommand } from "../types/command";
import { ping } from "./ping";
import { reloadCommands } from "./reloadCommands";
import { command } from "./command";
import { uptime } from "./uptime";
import { accountage } from "./accountage";
import { bot } from "./bot";
import { queue } from "./queue";
import { filesay } from "./filesay";

export const commands = new Map<string, TwitchCommand>();

commands.set(ping.name, ping);
commands.set(reloadCommands.name, reloadCommands);
commands.set(command.name, command);
commands.set(uptime.name, uptime);
commands.set(accountage.name, accountage);
commands.set("accage", accountage);
commands.set("created", accountage);
commands.set(bot.name, bot);
commands.set(queue.name, queue);
commands.set(filesay.name, filesay);

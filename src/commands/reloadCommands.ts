import { TwitchCommand } from "../types/command";
import { commandCache } from "../services/commandCache";
import { loadRegulars } from "../services/accessControl";

export const reloadCommands: TwitchCommand = {
  name: "reloadcommands",
  description: "Reloads commands and regulars from the database (mod/broadcaster only)",
  async execute(client, channel, user, _args, msg) {
    if (!msg.userInfo.isMod && !msg.userInfo.isBroadcaster) {
      return;
    }

    await commandCache.reload();
    await loadRegulars();
    await client.say(channel, `@${user} Commands and regulars reloaded!`);
  },
};

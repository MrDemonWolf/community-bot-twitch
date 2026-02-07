import { TwitchCommand } from "../types/command";

export const ping: TwitchCommand = {
  name: "ping",
  description: "Replies with Pong!",
  async execute(client, channel, user) {
    await client.say(channel, `@${user} Pong!`);
  },
};

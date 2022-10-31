const mongoose = require('mongoose');

const { Schema } = mongoose;

const DiscordGuildSchema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  rules: {
    channelId: String,
    messageId: String,
    lastUpdated: Date,
  },
});

module.exports = mongoose.model('DiscordGuild', DiscordGuildSchema);
